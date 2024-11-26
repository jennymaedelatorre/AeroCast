<template>
  <v-card class="map-content mb-16">
    <div id="map" class="map"></div>
  </v-card>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const locations = ref([
  { name: 'Manila', temperature: 32, coords: [14.5995, 120.9842], icon: '/imgs/sun.png' },
  { name: 'Butuan City', temperature: 25, coords: [8.9475, 125.5406], icon: '/imgs/sun.png' },
  { name: 'Cebu City', temperature: 26, coords: [10.3157, 123.8854], icon: '/imgs/sun.png' },
  { name: 'Cagayan de Oro City', temperature: 15, coords: [8.4542, 124.6319], icon: '/imgs/storm.png' },
  { name: 'Baguio City', temperature: 18, coords: [16.4023, 120.5969], icon: '/imgs/rain.png' },
]);

const map = ref(null);

onMounted(() => {
  map.value = L.map('map', {
    center: [12.8797, 121.7740],
    zoom: 6,
    zoomControl: true,
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
  }).addTo(map.value);

  locations.value.forEach(location => {
    const popupContent = `
      <div class="location-weather" style="text-align: center; padding:10px;">
        <img src="${location.icon}" alt="${location.name}" style="width: 50px; height: 50px;"/>
        <h5 style="font-size:15px; margin-bottom:10px;"><b>${location.name}</b></h5>
        <span style="font-size:18px;"><strong>${location.temperature}°C</strong></span>
      </div>
    `;

    const marker = L.marker(location.coords).addTo(map.value).bindPopup(popupContent);

    // Optionally open the popup by default
    marker.openPopup();
  });

  // Ensure the map adjusts to the container size
  setTimeout(() => {
    map.value.invalidateSize();
  }, 0);
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
.location-card {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
  width: 100px;
  text-align: center;
  transition: transform 0.2s;
}

.location-card:hover {
  transform: scale(1.05);
}

.location-icon {
  display: block;
  width: 30px;
  height: 30px;
}

.location-info {
  font-size: 14px;
}
</style>
