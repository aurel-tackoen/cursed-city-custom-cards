<script setup>
import TopNav from '@/components/layout/top-nav.vue';
</script>
<template>
  <div class="antialiased">
    <TopNav class="hidden-print" />
    <Suspense>
      <div class="container mx-auto">
        <router-view></router-view>
      </div>
    </Suspense>
  </div>
</template>
