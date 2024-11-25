<template>
  <v-responsive class="border rounded">
    <v-app>
      <div class="layout-wrapper">
        <!-- Sidebar Section (only visible on desktop) -->
        <aside v-if="!isMobile" class="app-background">
          <SideBar />
        </aside>

        <!-- Main Content Area -->
        <v-main
          class="main-content pt-8"
          :class="{ 'mobile-content': isMobile, 'desktop-content': !isMobile }"
        >
          <router-view />
        </v-main>
        
        <!-- Bottom Navigation for Mobile (only visible on mobile) -->
        <v-bottom-navigation
          v-if="isMobile"
          v-model="value"
          :bg-color="color"
          mode="shift"
          class="mobile-nav"
        >
          <v-btn to="/dashboard/home">
            <v-icon>mdi-view-grid-outline</v-icon>
            <span>Home</span>
          </v-btn>

          <v-btn to="/dashboard/map">
            <v-icon>mdi-map-outline</v-icon>
            <span>Map</span>
          </v-btn>

          <v-btn to="/dashboard/location">
            <v-icon>mdi-map-marker-radius</v-icon>
            <span>Cities</span>
          </v-btn>

          <v-btn to="/dashboard/calendar">
            <v-icon>mdi-calendar-month</v-icon>
            <span>Calendar</span>
          </v-btn>

          <v-btn to="/dashboard/settings">
            <v-icon>mdi-cog</v-icon>
            <span>Settings</span>
          </v-btn>
        </v-bottom-navigation>
      </div>
    </v-app>
  </v-responsive>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'
import SideBar from '@/components/layout/SideBar.vue'

// Detect screen size
const { smAndDown } = useDisplay()
const isMobile = computed(() => smAndDown.value)

// Bottom navigation state
const value = ref(0) // Keeps track of the active bottom nav item
const color = ref('#2a2e3b') // Background color of bottom nav
</script>

<style scoped>
.layout-wrapper {
  display: flex;
  min-height: 100vh;
  overflow: hidden;
}

.app-background {
  background-color: #1f2235;
  width: 230px; 
}

.main-content {
  flex: 1;
  background-color: #191d2c;
  padding: 0px;
  overflow-y: auto;
  height: 100vh;
  transition: padding-left 0.3s ease;
}

/* For mobile */
.mobile-content {
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 40px;
}


.mobile-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #2a2e3b;
  color: white;
  z-index: 100;
}
</style>
