<script setup>
  import { useAuthStore } from '@/stores/auth-store.js';
  import { useHeroesStore } from '@/stores/heroes-store.js';
  import TopNav from '@/components/layout/top-nav.vue';
  const authStore = useAuthStore();
  const heroesStore = useHeroesStore();
  authStore.init();
  heroesStore.fetchHeroes();
</script>
<template>
  <div class="min-h-screen bg-slate-50 antialiased">
    <TopNav class="hidden-print" />
    <Suspense>
      <div class="container mx-auto">
        <router-view></router-view>
      </div>
    </Suspense>
  </div>
</template>
