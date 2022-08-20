<script setup>
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import HeroNormalCard from '@/components/cards/hero-normal-card.vue';
import HeroInspiredCard from '@/components/cards/hero-inspired-card.vue';
const route = useRoute();
const responseMyHeroes = await fetch('/.netlify/functions/heroes-findone', {
  method: 'POST',
  body: JSON.stringify({
    _id: route.params.id,
  }),
});
const Hero = await responseMyHeroes.json();
const hero = reactive(Hero);
function printHero() {
  window.print();
}
</script>

<template>
  <div>
    <HeroNormalCard v-model:hero="hero" class="hero-card-display mt-4" />
    <HeroInspiredCard v-model:hero="hero" class="hero-card-display mt-4" />
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
