<template>
  <AppLayout>
    <!-- Sidebar Slot -->
    <template #navigation>
      <SideBar />
    </template>

    <!-- Content Slot -->
    <template #content>
      <router-view /> 
    </template>
  </AppLayout>
</template>

<script setup>
import AppLayout from '@/components/layout/AppLayout.vue';
import SideBar from '@/components/layout/SideBar.vue';
</script>
