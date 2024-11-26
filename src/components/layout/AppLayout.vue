<template>
  <v-responsive>
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
        
        <!-- Updated Bottom Navigation for Mobile -->
        <v-bottom-navigation
          v-if="isMobile"
          mode="shift"
          class="mobile-nav spaced-icons"
        >
          <v-btn to="/dashboard/home" class="icon-btn">
            <v-icon>mdi-view-grid-outline</v-icon>
            <span>Home</span>
          </v-btn>

          <v-btn to="/dashboard/map" class="icon-btn">
            <v-icon>mdi-map-outline</v-icon>
            <span>Map</span>
          </v-btn>

          <v-btn to="/dashboard/location" class="icon-btn">
            <v-icon>mdi-map-marker-radius</v-icon>
            <span>Cities</span>
          </v-btn>

          <v-btn to="/dashboard/calendar" class="icon-btn">
            <v-icon>mdi-calendar-month</v-icon>
            <span>Calendar</span>
          </v-btn>

          <v-btn to="/dashboard/settings" class="icon-btn">
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

const { smAndDown } = useDisplay()
const isMobile = computed(() => smAndDown.value)
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


.spaced-icons .icon-btn {
  min-width: 56px; 
  padding: 0 8px;  
  margin: 0;      
}

.spaced-icons v-icon {
  font-size: 20px; 
}
</style>
