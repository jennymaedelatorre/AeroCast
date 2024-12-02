<template>
  <v-card class="map-content mb-16">
    <div id="map" class="map"></div>
  </v-card>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { fetchWeather } from '@/utils/useWeather'; 
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

      const popupContent = `
  <div class="location-weather" style="text-align: center; padding:10px;">
    <img src="${weather.icon}" alt="${location.name}" style="width: 50px; height: 50px;"/>
    <h5 style="font-size:15px; margin-bottom:10px;"><b>${location.name}</b></h5>
    <span style="font-size:18px;"><strong>${weather.temperature}°C</strong></span>
    <p>Feels like: ${weather.feelsLike}°C</p>
    <p>Humidity: ${weather.humidity}%</p>
    <p>Pressure: ${weather.pressure} hPa</p>
    <p>Wind Speed: ${weather.windSpeed} m/s</p>
    <p>Visibility: ${weather.visibility} km</p>
    <p>Cloud Coverage: ${weather.clouds}%</p>
    <p>Precipitation: ${weather.precipitation} mm</p>
    <p>Sunset: ${weather.sunset}</p>
  </div>
`;


      const marker = L.marker(location.coords).addTo(map.value).bindPopup(popupContent);

      // Optionally open the popup by default (if desired)
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
