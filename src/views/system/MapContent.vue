<template>
  <v-card class="map-content mb-16">
    <div id="map" class="map"></div>
  </v-card>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { fetchWeather } from '@/utils/useWeather'; 
import { useUnitsStore } from '@/stores/unit';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Define the list of locations
const locations = ref([
  { name: 'Manila', coords: [14.5995, 120.9842] },
  { name: 'Butuan City', coords: [8.9475, 125.5406] },
  { name: 'Cebu City', coords: [10.3157, 123.8854] },
  { name: 'Cagayan de Oro City', coords: [8.4542, 124.6319] },
  { name: 'Baguio City', coords: [16.4023, 120.5969] },
]);

const map = ref(null);
const unitsStore = useUnitsStore(); // Initialize the store


const updateMap = async () => {
  try {
    map.value = L.map('map', {
      center: [12.8797, 121.7740],
      zoom: 6,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    }).addTo(map.value);

    // Fetch and add markers for each location
    for (const location of locations.value) {
      const weather = await fetchWeather(location.name);

       // Log the original values
       console.log(`Original Weather Data for ${location.name}:`, weather);

      // Adjust temperature, wind speed, and pressure based on selected units
      const temperature = unitsStore.tempUnit === 'C'
        ? `${weather.temperature}°C`
        : `${((weather.temperature * 9) / 5 + 32).toFixed(1)}°F`;

      console.log(
        `Temperature (${location.name}): Original: ${weather.temperature}°C, Converted: ${temperature}`
      );

      

      const pressure = unitsStore.pressureUnit === 'hPa'
        ? `${weather.pressure} hPa`
        : `${(weather.pressure * 0.750062).toFixed(1)} mmHg`;

      console.log(
        `Pressure (${location.name}): Original: ${weather.pressure} hPa, Converted: ${pressure}`
      );

      const precipitation = unitsStore.precipitationUnit === 'mm'
        ? `${weather.precipitation} mm`
        : `${(weather.precipitation / 25.4).toFixed(2)} in`; // Convert mm to inches

  
      // Create popup content
      const popupContent = `
  <div class="location-weather" style="text-align: center; padding:10px;">
    <img src="${weather.icon}" alt="${location.name}" style="width: 50px; height: 50px;"/>
    <h5 style="font-size:15px; margin-bottom:10px;"><b>${location.name}</b></h5>
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

      const marker = L.marker(location.coords).addTo(map.value).bindPopup(popupContent);
      marker.openPopup();
    }

    setTimeout(() => {
      map.value.invalidateSize();
    }, 0);

  } catch (error) {
    console.error('Error loading map or weather data:', error);
  }
};

onMounted(() => {
  unitsStore.loadUnitsFromLocalStorage();
  updateMap(); 
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
