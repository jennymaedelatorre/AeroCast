<script setup>
import { onMounted, ref } from 'vue';
import { useDisplay } from 'vuetify';

const props = defineProps(['isWithAppBarNavIcon']);
const emit = defineEmits(['isDrawerVisible']);

// Utilize pre-defined vue functions
const { mobile } = useDisplay();

// Load Variables
const isLoggedIn = ref(false);
const theme = ref(localStorage.getItem('theme') ?? 'light');

// Toggle Theme
const onToggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', theme.value);
};

// Load Functions during component rendering
onMounted(() => {
  // Assume getLoggedStatus is handled elsewhere
});
</script>

<template>
  <v-responsive class="border rounded">
    <v-app>
      <div class="layout-wrapper">
        <!-- Sidebar Slot -->
        <aside class="app-background">
          <slot name="navigation"></slot>
        </aside>

        <!-- Main Content Area -->
        <v-main class="main-content">
          <slot name="content"></slot>
        </v-main>
      </div>
    </v-app>
  </v-responsive>
</template>

<style scoped>
.layout-wrapper {
  display: flex;
  min-height: 100vh; 
  overflow: hidden;
  background-color: #191d2c;
}


.main-content {
  flex: 1;
  background-color: #191d2c; 
  padding: 24px;
  overflow-y: auto;
}
</style>
