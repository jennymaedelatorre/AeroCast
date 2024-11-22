import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/auth/LoginView.vue';
import RegisterView from '@/views/auth/RegisterView.vue';
import HomeContent from '@/views/system/HomeContent.vue';
import MapContent from '@/views/system/MapContent.vue';
import LocationContent from '@/views/system/LocationContent.vue';
import CalendarContent from '@/views/system/CalendarContent.vue';
import SettingContent from '@/views/system/SettingContent.vue';
import DashboardView from '@/views/system/DashboardView.vue';
import { isAuthenticated } from '@/utils/supabase';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login', 
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: LoginView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      redirect: '/dashboard/home',
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
      ],
    },
  ],
});

router.beforeEach(async (to) => {
  const isLoggedIn = await isAuthenticated(); // Ensure it resolves correctly

  // Redirect unauthenticated users accessing dashboard routes
  if (to.path.startsWith('/dashboard') && !isLoggedIn) {
    return { name: 'login' }; // Redirect to login if not authenticated
  }

  // If logged in, prevent access to login/register pages
  if (isLoggedIn && (to.name === 'login' || to.name === 'register')) {
    return { name: 'home' }; // Redirect to the dashboard if logged in
  }
});

export default router;
