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
// print();
</script>

<template>
  <div>
    <div
      class="rounded-md border-2 border-dashed border-red-700 bg-red-50 px-4 py-2 w-[915px] mx-auto mt-4 hidden-print text-red-900"
    >
      Use ctrl+p (windows) or cmd+p (mac) to print this page as a pdf.
    </div>
    <HeroNormalCard v-model:hero="hero" class="hero-card-display mt-4" />
    <HeroInspiredCard v-model:hero="hero" class="hero-card-display mt-4" />
  </div>
</template>
