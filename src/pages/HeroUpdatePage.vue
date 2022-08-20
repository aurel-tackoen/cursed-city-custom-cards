<script setup>
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import HeroNav from '@/components/layout/hero-nav.vue';
import HeroCard from '@/components/cards/hero-card.vue';
import HeroNormalForm from '@/components/cards/hero-normal-form.vue';
import HeroInspiredForm from '@/components/cards/hero-inspired-form.vue';
const route = useRoute();
const responseMyHeroes = await fetch('/.netlify/functions/heroes-findone', {
  method: 'POST',
  body: JSON.stringify({
    _id: route.params.id,
  }),
});
const Hero = await responseMyHeroes.json();

const hero = reactive(Hero);
const tabs = reactive([
  { name: 'Path to Glory', current: true },
  { name: 'Inspired', current: false },
]);
</script>

<template>
  <div>
    <HeroCard
      v-if="tabs[0].current"
      status="normal"
      v-model:hero="hero"
      class="hero-card-display mt-4"
    />
    <HeroIoCard
      v-if="tabs[1].current"
      status="inspired"
      v-model:hero="hero"
      class="hero-card-display mt-4"
    />
    <HeroNav v-model:tabs="tabs" class="mt-4" />
    <HeroNormalForm v-if="tabs[0].current" v-model:hero="hero" class="mt-4" />
    <HeroInspiredForm v-if="tabs[1].current" v-model:hero="hero" class="mt-4" />
  </div>
</template>
