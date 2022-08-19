import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import HeroFormPage from '@/pages/HeroFormPage.vue';
import HeroPrintPage from '@/pages/HeroPrintPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/heroes',
      name: 'heroes',
      component: HeroFormPage,
    },
    {
      path: '/heroes/print',
      name: 'heroes-print',
      component: HeroPrintPage,
    },
  ],
});

export default router;
