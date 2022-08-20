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
    <div class="flex justify-center items-center mt-4">
      <!-- <router-link
        target="_blank"
        :to="{
          name: 'heroes-print',
          params: { id: hero._id },
        }"
        class="border-2 border-white shadow rounded-lg px-8 py-2 bg-red-500 hover:bg-red-600 text-white uppercase font-bold text-lg"
      >
        Print it
      </router-link> -->
    </div>
    <HeroNav v-model:tabs="tabs" class="mt-4" />
    <HeroNormalForm v-if="tabs[0].current" v-model:hero="hero" class="mt-4" />
    <HeroInspiredForm v-if="tabs[1].current" v-model:hero="hero" class="mt-4" />
  </div>
</template>
