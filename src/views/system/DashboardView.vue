<script setup>
import AppLayout from '@/components/layout/AppLayout.vue';
import SideBar from '@/components/layout/SideBar.vue';
import { ref } from 'vue';
import HomeContent from '@/components/dashboard/HomeContent.vue';
import MapContent from '@/components/dashboard/MapContent.vue';
import LocationContent from '@/components/dashboard/LocationContent.vue';
import CalendarContent from '@/components/dashboard/CalendarContent.vue';
import SettingContent from '@/components/dashboard/SettingContent.vue';


const components = {
  HomeContent,
  MapContent,
  LocationContent,
  CalendarContent,
  SettingContent
};


const currentContent = ref('HomeContent'); // Default content

// Function to change the current content component
function changeContent(content) {
  currentContent.value = content;
}
</script>

<template>
  <AppLayout>
    <!-- Sidebar Slot -->
    <template #navigation>
      <SideBar @navigate="changeContent" />
    </template>

    <!-- Dynamic Content Slot -->
    <template #content>
      <v-container fluid class="main-content">
        <component :is="components[currentContent]" />
      </v-container>
    </template>
  </AppLayout>
</template>
