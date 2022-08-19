<script setup>
import TopNav from '@/components/layout/top-nav.vue';
</script>
<template>
  <div class="antialiased">
    <TopNav class="hidden-print" />
    <router-view></router-view>
  </div>
</template>
