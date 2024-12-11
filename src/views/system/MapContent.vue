<template>
  <v-card class="map-content mb-16">
    <div id="map" class="map"></div>
  </v-card>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { fetchWeather } from '@/utils/useWeather';
import { useUnitsStore } from '@/stores/unit';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import supabase from '@/utils/supabase';
import axios from 'axios';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const locations = ref([]);
const map = ref(null);
const currentUserId = ref(null);
const unitsStore = useUnitsStore();

// Function to fetch the coordinates using Nominatim API
const geocodeCity = async (city) => {
  if (!city || city.trim() === '') {
    console.error('City name is empty.');
    return null;
  }

  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: city,
        format: 'json',
        addressdetails: 1,
        limit: 1,
      },
      headers: {
        'User-Agent': 'YourAppName/1.0 (contact@yourdomain.com)',
      },
    });

    if (response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { lat, lon };
    } else {
      console.error(`City not found: ${city}`);
      return null;
    }
  } catch (error) {
    console.error('Error geocoding city:', error);
    return null;
  }
};

const updateMap = async () => {
  try {
    // Initialize the map
    map.value = L.map('map', {
      center: [12.8797, 121.7740], 
      zoom: 6,
      zoomControl: true,
    });

    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    }).addTo(map.value);

    
    const butuanCoordinates = await geocodeCity('Butuan City');
    if (butuanCoordinates) {
      const weather = await fetchWeather('Butuan City');
      const temperature = unitsStore.tempUnit === 'C'
        ? `${weather.temperature}°C`
        : `${((weather.temperature * 9) / 5 + 32).toFixed(1)}°F`;

      const pressure = unitsStore.pressureUnit === 'hPa'
        ? `${weather.pressure} hPa`
        : `${(weather.pressure * 0.750062).toFixed(1)} mmHg`;

      const precipitation = unitsStore.precipitationUnit === 'mm'
        ? `${weather.precipitation} mm`
        : `${(weather.precipitation / 25.4).toFixed(2)} in`;

      // Create popup content for Butuan City
      const butuanPopupContent = `
        <div class="location-weather" style="text-align: center; padding:10px;">
          <img src="${weather.icon}" alt="Butuan City" style="width: 50px; height: 50px;"/>
          <h5 style="font-size:15px; margin-bottom:10px;"><b>Butuan City</b></h5>
          <span style="font-size:18px;"><strong>${weather.temperature}${unitsStore.tempUnit === 'C' ? '°C' : '°F'}</strong></span><br>
          <p>Feels like: ${weather.feelsLike}°${unitsStore.tempUnit === 'C' ? '°C' : '°F'}</p>
          <p>Humidity: ${weather.humidity}%</p>
          <p>Pressure: ${pressure}</p>
          <p>Wind Speed: ${weather.windSpeed} m/s</p>
          <p>Visibility: ${weather.visibility} km</p>
          <p>Cloud Coverage: ${weather.clouds}%</p>
          <p>Precipitation: ${precipitation}</p>
          <p>Sunset: ${weather.sunset}</p>
        </div>
      `;
      
      const butuanMarker = L.marker([butuanCoordinates.lat, butuanCoordinates.lon]).addTo(map.value).bindPopup(butuanPopupContent);
      butuanMarker.openPopup();
    }

    
    for (const location of locations.value) {
      const coordinates = await geocodeCity(location.city);

      if (coordinates) {
        const weather = await fetchWeather(location.city);

        const temperature = unitsStore.tempUnit === 'C'
          ? `${weather.temperature}°C`
          : `${((weather.temperature * 9) / 5 + 32).toFixed(1)}°F`;

        const pressure = unitsStore.pressureUnit === 'hPa'
          ? `${weather.pressure} hPa`
          : `${(weather.pressure * 0.750062).toFixed(1)} mmHg`;

        const precipitation = unitsStore.precipitationUnit === 'mm'
          ? `${weather.precipitation} mm`
          : `${(weather.precipitation / 25.4).toFixed(2)} in`;

        // Create popup content for user-specific locations
        const popupContent = `
          <div class="location-weather" style="text-align: center; padding:10px;">
            <img src="${weather.icon}" alt="${location.city}" style="width: 50px; height: 50px;"/>
            <h5 style="font-size:15px; margin-bottom:10px;"><b>${location.city}</b></h5>
            <span style="font-size:18px;"><strong>${weather.temperature}${unitsStore.tempUnit === 'C' ? '°C' : '°F'}</strong></span><br>
            <p>Feels like: ${weather.feelsLike}°${unitsStore.tempUnit === 'C' ? '°C' : '°F'}</p>
            <p>Humidity: ${weather.humidity}%</p>
            <p>Pressure: ${pressure}</p>
            <p>Wind Speed: ${weather.windSpeed} m/s</p>
            <p>Visibility: ${weather.visibility} km</p>
            <p>Cloud Coverage: ${weather.clouds}%</p>
            <p>Precipitation: ${precipitation}</p>
            <p>Sunset: ${weather.sunset}</p>
          </div>
        `;

        // Add marker for user-specific locations
        const marker = L.marker([coordinates.lat, coordinates.lon]).addTo(map.value).bindPopup(popupContent);
        marker.openPopup();
      }
    }

    // Adjust map size
    setTimeout(() => {
      if (map.value) {
        map.value.invalidateSize();
      }
    }, 100);

  } catch (error) {
    console.error('Error loading map or weather data:', error);
  }
};

const fetchAuthenticatedUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      throw error;
    }

    if (!data || !data.user) {
      console.error('No authenticated user found');
      return null;
    }

    console.log('Authenticated user:', data.user);
    return data.user;
  } catch (error) {
    console.error('Error fetching authenticated user:', error);
    return null;
  }
};

const fetchLocations = async () => {
  try {
    const user = await fetchAuthenticatedUser();
    if (!user) {
      console.error('User not authenticated');
      return;
    }

    currentUserId.value = user.id; 

    
    const { data: userLocations, error: userLocationsError } = await supabase
      .from('user_locations')
      .select('location_id')
      .eq('user_id', user.id);

    if (userLocationsError) {
      throw userLocationsError;
    }

    if (!userLocations || userLocations.length === 0) {
      console.error('No locations found for this user in user_locations');
      return;
    }

    
    const locationIds = userLocations.map((entry) => entry.location_id);

    
    const { data: locationData, error: locationDataError } = await supabase
      .from('locations')
      .select('city')
      .in('id', locationIds); 

    if (locationDataError) {
      throw locationDataError;
    }

    if (!locationData || locationData.length === 0) {
      console.error('No cities found for these location IDs');
      return;
    }

    
    locations.value = locationData;
    updateMap();
  } catch (error) {
    console.error('Error fetching locations:', error);
  }
};

onMounted(() => {
  unitsStore.loadUnitsFromLocalStorage();
  fetchLocations();
});
</script>

<style scoped>
.map-content {
  border-radius: 20px;
  width: 95%;
  margin-left: 10px;
  margin-right: 10px;
}

.map {
  height: 100vh;
}

.location-weather {
  text-align: center;
  padding: 10px;
}
</style>
