<script setup>
import { reactive } from 'vue';
import { defaultHero } from '@/assets/data/heroes.js';
import HeroNav from '@/components/layout/hero-nav.vue';
import HeroNormalCard from '@/components/cards/hero-normal-card.vue';
import HeroInspiredCard from '@/components/cards/hero-inspired-card.vue';
import HeroNormalForm from '@/components/cards/hero-normal-form.vue';
import HeroInspiredForm from '@/components/cards/hero-inspired-form.vue';

const hero = reactive(defaultHero);
const tabs = reactive([
  { name: 'Path to Glory', current: true },
  { name: 'Inspired', current: false },
]);
</script>

<template>
  <div>
    <HeroNormalCard
      v-if="tabs[0].current"
      v-model:hero="hero"
      class="hero-card-display mt-4"
    />
    <HeroInspiredCard
      v-if="tabs[1].current"
      v-model:hero="hero"
      class="hero-card-display mt-4"
    />
    <HeroNav v-model:tabs="tabs" class="mt-4" />
    <HeroNormalForm v-if="tabs[0].current" v-model:hero="hero" class="mt-4" />
    <HeroInspiredForm v-if="tabs[1].current" v-model:hero="hero" class="mt-4" />
  </div>
</template>
