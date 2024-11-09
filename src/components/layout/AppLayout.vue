<template>
  <v-responsive class="border rounded">
    <v-app>
      <div class="layout-wrapper">
        <!-- Sidebar Section -->
        <aside class="app-background">
          <SideBar /> 
        </aside>

        <!-- Main Content Area -->
        <v-main class="main-content">
          <router-view /> 
        </v-main>
      </div>
    </v-app>
  </v-responsive>
</template>

<script setup>
import SideBar from '@/components/layout/SideBar.vue'  
</script>

<style scoped>
.layout-wrapper {
  display: flex;
  min-height: 100vh;  
  overflow: hidden;  
}

.app-background {
  background-color: #1f2235;
}

.main-content {
  flex: 1;  
  background-color: #191d2c;  
  padding-left: 230px;
  overflow-y: auto; 
  height: 100vh;  
  padding-top: 30px;  
}
</style>
