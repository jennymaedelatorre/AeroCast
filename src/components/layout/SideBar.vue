<template>
  <v-navigation-drawer permanent class="nav-drawer text-white" width="230" style="position: fixed; top: 0; bottom: 0; z-index: 1;">
    <v-list class="d-flex flex-column align-center">
      <v-list-item class="d-flex flex-column align-center mt-8 mb-6">
        <img src="/imgs/logo1.png" alt="Logo" class="logo-img" />
      </v-list-item>
    </v-list>

    <v-divider class="mb-10"></v-divider>

    <v-list density="compact" nav active>
      <!-- Correct the paths here to include /dashboard -->
      <router-link to="/dashboard/home" class="spaced-list-item" style="text-decoration: none; color: inherit;" active-class="active-link">
        <v-list-item prepend-icon="mdi-view-grid-outline">
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link to="/dashboard/map" class="spaced-list-item" style="text-decoration: none; color: inherit;" active-class="active-link">
        <v-list-item prepend-icon="mdi-map-outline">
          <v-list-item-title>Map</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link to="/dashboard/location" class="spaced-list-item" style="text-decoration: none; color: inherit;" active-class="active-link">
        <v-list-item prepend-icon="mdi-map-marker-radius">
          <v-list-item-title>Cities</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link to="/dashboard/calendar" class="spaced-list-item" style="text-decoration: none; color: inherit;" active-class="active-link">
        <v-list-item prepend-icon="mdi-calendar-month">
          <v-list-item-title>Calendar</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link to="/dashboard/settings" class="spaced-list-item" style="text-decoration: none; color: inherit;" active-class="active-link">
        <v-list-item prepend-icon="mdi-cog">
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item>
      </router-link>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(null)
</script>

<style scoped>
body {
  background: #191d2c;
}

.nav-drawer {
  position: fixed; 
  top: 0;  
  bottom: 0; 
  width: 230px;  
  background-color: #2a2e3b;  
  z-index: 1; 
  overflow-y: auto; 
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px
}

.v-list-item {
  font-size: 15px;
}

.spaced-list-item {
  display: flex;
  align-items: center;
  padding: 15px;
}
.active-link {
  background-color: rgba(124, 123, 123, 0.247); 
  border-radius: 20px;
  color: #fff;
  font-weight: bolder;
}
.active-link .v-list-item-title, 
.active-link .v-list-item {
  color: #fff !important; 
  font-weight: bolder; 
  font-size: 16px;
}

.logo-img {
  width: 180px;
  height: auto;
  transition: width 0.3s ease;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0); 
  }
  50% {
    transform: translateY(-10px); 
  }
}

.main-content {
  margin-left: 230px;  
}
</style>
