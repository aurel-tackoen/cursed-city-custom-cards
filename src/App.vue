<script setup>
  import { useAuthStore } from '@/stores/auth-store.js';
  import TopNav from '@/components/layout/top-nav.vue';
  const authStore = useAuthStore();
  authStore.init();
</script>
<template>
  <div class="bg-slate-50 antialiased">
    <TopNav class="hidden-print" />
    <Suspense>
      <div class="container mx-auto">
        <router-view></router-view>
      </div>
    </Suspense>
  </div>
</template>
