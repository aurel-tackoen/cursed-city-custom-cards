<script setup>
import TopNav from '@/components/layout/top-nav.vue';
</script>
<template>
  <div class="antialiased">
    <TopNav class="" />
  </div>
</template>

<style scoped>
.hero-card-display {
  width: 233mm;
  height: 170mm;
  overflow: hidden;
}
@media print {
  .hero-card-display {
    transform: scale(0.64);
    overflow: visible;
  }
}
</style>
