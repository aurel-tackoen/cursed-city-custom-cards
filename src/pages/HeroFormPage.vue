<script setup>
import { reactive } from 'vue';
import heroes from '@/assets/data/heroes.js';
import HeroNav from '@/components/layout/hero-nav.vue';
import HeroNormalCard from '@/components/cards/hero-normal-card.vue';
import HeroInspiredCard from '@/components/cards/hero-inspired-card.vue';
import HeroNormalForm from '@/components/cards/hero-normal-form.vue';
import HeroInspiredForm from '@/components/cards/hero-inspired-form.vue';
const index = 1;
const hero = reactive(heroes[index]);
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
    <HeroNav v-model:tabs="tabs" class="mt-4" style="width: 915px" />
    <HeroNormalForm
      v-if="tabs[0].current"
      v-model:hero="hero"
      class="mt-4"
      style="width: 915px"
    />
    <HeroInspiredForm
      v-if="tabs[1].current"
      v-model:hero="hero"
      class="mt-4"
      style="width: 915px"
    />
  </div>
</template>
