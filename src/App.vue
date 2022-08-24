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
  <div class="flex min-h-screen flex-col bg-slate-50 antialiased">
    <TopNav class="hidden-print grow-0" />
    <Suspense class="grow">
      <div class="container mx-auto h-full grow">
        <router-view></router-view>
      </div>
    </Suspense>
    <div class="mt-8 grow-0 border-t bg-white py-2 text-center text-xs">
      2022 - Cursed City Custom Cards
    </div>
  </div>
</template>
