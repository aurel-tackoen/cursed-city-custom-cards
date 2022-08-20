<script setup>
import { useRoute } from 'vue-router';
import HeroCard from '@/components/cards/hero-card.vue';
import { useHeroesStore } from '@/stores/heroes-store.js';

const route = useRoute();
const heroesStore = useHeroesStore();
await heroesStore.fetchHero(route.params.id);
const Hero = heroesStore.Hero;
function printHero() {
  window.print();
}
</script>

<template>
  <div>
    <HeroCard
      status="normal"
      v-model:hero="Hero"
      class="hero-card-display mt-4"
    />
    <HeroCard
      status="inspired"
      v-model:hero="Hero"
      class="hero-card-display mt-4"
    />
    <div class="flex justify-center items-center mt-4 hidden-print">
      <button
        @click="printHero()"
        class="border-2 border-white shadow rounded-lg px-8 py-2 bg-red-500 hover:bg-red-600 text-white uppercase font-bold text-lg"
      >
        Print it
      </button>
    </div>
  </div>
</template>
