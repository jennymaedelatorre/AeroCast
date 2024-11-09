import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/auth/LoginView.vue';
import RegisterView from '@/views/auth/RegisterView.vue';
import DashboardView from '@/views/system/DashboardView.vue'; // Layout with sidebar
import HomeContent from '@/components/dashboard/HomeContent.vue';
import MapContent from '@/components/dashboard/MapContent.vue';
import LocationContent from '@/components/dashboard/LocationContent.vue';
import SettingContent from '@/components/dashboard/SettingContent.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/dashboard', // Main dashboard route (layout with sidebar)
      name: 'dashboard',
      component: DashboardView, // This component will contain the sidebar and content area
      children: [
        {
          path: 'home',  // Route for the Home content
          name: 'home',
          component: HomeContent,
        },
        {
          path: 'map',  // Route for the Map content
          name: 'map',
          component: MapContent,
        },
        {
          path: 'location',  // Route for the Location content
          name: 'location',
          component: LocationContent,
        },
        {
          path: 'settings',  // Route for the Settings content
          name: 'settings',
          component: SettingContent,
        },
        {
          path: '',  // Default route (when no specific path is matched)
          redirect: '/dashboard/home',
        },
      ],
    },
  ],
});

export default router;
