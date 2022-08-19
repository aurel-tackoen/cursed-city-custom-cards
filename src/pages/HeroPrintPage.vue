<script setup>
import { reactive } from 'vue';
import heroes from '@/assets/data/heroes.js';
import HeroNormalCard from '@/components/cards/hero-normal-card.vue';
import HeroInspiredCard from '@/components/cards/hero-inspired-card.vue';
const index = 1;
const hero = reactive(heroes[index]);
</script>

<template>
  <div>
    <div
      class="rounded-md border-2 border-dashed border-red-700 bg-red-50 px-4 py-2 w-[915px] mx-auto mt-4 hidden-print"
    >
      Use ctrl+p (windows) or cmd+p (mac) to print this page as a pdf.
    </div>
    <HeroNormalCard v-model:hero="hero" class="hero-card-display mt-4" />
    <HeroInspiredCard v-model:hero="hero" class="hero-card-display mt-4" />
  </div>
</template>
