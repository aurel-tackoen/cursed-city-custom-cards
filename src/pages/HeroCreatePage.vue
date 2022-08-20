<script setup>
import { reactive } from 'vue';
import { defaultHero } from '@/assets/data/heroes.js';
import HeroNav from '@/components/layout/hero-nav.vue';
import HeroCard from '@/components/cards/hero-card.vue';
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
    <HeroNav v-model:tabs="tabs" :save="true" class="mt-4" />
    <HeroCard
      v-if="tabs[0].current"
      status="normal"
      v-model:hero="hero"
      class="hero-card-display mt-4"
    />
    <HeroCard
      v-if="tabs[1].current"
      status="inspired"
      v-model:hero="hero"
      class="hero-card-display mt-4"
    />
    <HeroNormalForm v-if="tabs[0].current" v-model:hero="hero" class="mt-4" />
    <HeroInspiredForm v-if="tabs[1].current" v-model:hero="hero" class="mt-4" />
  </div>
</template>
