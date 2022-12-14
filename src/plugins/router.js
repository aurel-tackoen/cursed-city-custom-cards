import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import HeroSinglePage from '@/pages/HeroSinglePage.vue';
import HeroCreatePage from '@/pages/HeroCreatePage.vue';
import HeroUpdatePage from '@/pages/HeroUpdatePage.vue';
import VillainSinglePage from '@/pages/VillainSinglePage.vue';
import VillainCreatePage from '@/pages/VillainCreatePage.vue';
import VillainUpdatePage from '@/pages/VillainUpdatePage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/heroes/create',
      name: 'heroes-create',
      component: HeroCreatePage,
    },
    {
      path: '/heroes/:id',
      name: 'heroes-single',
      component: HeroSinglePage,
    },
    {
      path: '/heroes/:id/update',
      name: 'heroes-update',
      component: HeroUpdatePage,
    },
    {
      path: '/villains/create',
      name: 'villains-create',
      component: VillainCreatePage,
    },
    {
      path: '/villains/:id',
      name: 'villains-single',
      component: VillainSinglePage,
    },
    {
      path: '/villains/:id/update',
      name: 'villains-update',
      component: VillainUpdatePage,
    },
  ],
});

export default router;
