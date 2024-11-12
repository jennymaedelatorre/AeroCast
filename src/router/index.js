import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/auth/LoginView.vue';
import RegisterView from '@/views/auth/RegisterView.vue';
import DashboardView from '@/views/system/DashboardView.vue'; // Layout with sidebar
import HomeContent from '@/components/dashboard/HomeContent.vue';
import MapContent from '@/components/dashboard/MapContent.vue';
import LocationContent from '@/components/dashboard/LocationContent.vue';
import CalendarContent from '@/components/dashboard/CalendarContent.vue';
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
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView, 
      children: [
        {
          path: 'home', 
          name: 'home',
          component: HomeContent,
        },
        {
          path: 'map',  
          name: 'map',
          component: MapContent,
        },
        {
          path: 'location',  
          name: 'location',
          component: LocationContent,
        },
        {
          path: 'calendar',  
          name: 'calendar',
          component: CalendarContent,
        },
        {
          path: 'settings',  
          name: 'settings',
          component: SettingContent,
        },
        {
          path: '',  
          redirect: '/dashboard/home',
        },
      ],
    },
  ],
});

export default router;
