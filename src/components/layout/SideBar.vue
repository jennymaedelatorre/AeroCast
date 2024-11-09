<template>

  <!-- <v-btn color="primary" @click.stop="drawer = !drawer">
    Toggle
  </v-btn> -->

  <v-navigation-drawer permanent class="nav-drawer text-white" width="230">
    <v-list class="d-flex flex-column align-center">
      <v-list-item class="d-flex flex-column align-center mt-8 mb-6">
        <img src="/imgs/logo1.png" alt="Logo" class="logo-img" />
        <!-- <v-list-item-title class="title-text mt-2">AeroCast</v-list-item-title> -->
      </v-list-item>
    </v-list>

    <v-divider class="mb-10"></v-divider>

    <v-list density="compact" nav>
      <v-list-item class="spaced-list-item" prepend-icon="mdi-view-grid-outline" value="home"
        @click="$emit('navigate', 'HomeContent')">
        <v-list-item-title style="font-size: 16px; font-weight: bold;" >Home</v-list-item-title>
      </v-list-item>
      <v-list-item class="spaced-list-item" prepend-icon="mdi-map-outline" value="map"
        @click="$emit('navigate', 'MapContent')">
        <v-list-item-title style="font-size: 16px; font-weight: bold;">Map</v-list-item-title>
      </v-list-item>
      <v-list-item class="spaced-list-item" prepend-icon="mdi-map-marker-radius" value="location"
        @click="$emit('navigate', 'LocationContent')">
        <v-list-item-title style="font-size: 16px; font-weight: bold;">Cities</v-list-item-title>
      </v-list-item>
      <v-list-item class="spaced-list-item" prepend-icon="mdi-calendar-month" value="calendar"
        @click="$emit('navigate', 'CalendarContent')">
        <v-list-item-title style="font-size: 16px; font-weight: bold;">Calendar</v-list-item-title>
      </v-list-item>
      <v-list-item class="spaced-list-item" prepend-icon="mdi-cog" value="setting"
        @click="$emit('navigate', 'SettingContent')">
        <v-list-item-title style="font-size: 16px; font-weight: bold;">Settings</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-main class="main-content" style="margin-left: -30px;">
    <router-view /> 
  </v-main>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(null)
</script>

<style>
body {
  background: #0a0404;
}

.nav-drawer {
  border-right: 55px;
  background-color: #2a2e3b;
}

.v-list-item {
  font-size: 20px;
}

.spaced-list-item {
  display: flex;
  align-items: center;
  padding: 20px;
}

.logo-img {
  width: 180px;
  height: auto;
  transition: width 0.3s ease;
}
.main-content {
  margin-left:-0px ; 
}
</style>
