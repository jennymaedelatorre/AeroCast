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
const unitsStore = useUnitsStore();

// Function to fetch the coordinates using Nominatim API
const geocodeCity = async (city) => {
  if (!city || city.trim() === '') {
    console.error("City name is empty.");
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

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    }).addTo(map.value);

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

        // Create popup content
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

        // Add marker with popup
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

const fetchLocations = async () => {
  try {
    const { data, error } = await supabase
      .from('locations')
      .select('city');

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      console.error('No locations found in Supabase');
      return;
    }

    locations.value = data;
    updateMap();
  } catch (error) {
    console.error('Error fetching locations from Supabase:', error);
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
