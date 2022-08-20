<script setup>
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth-store.js';
import HeroNav from '@/components/layout/hero-nav.vue';
import HeroCard from '@/components/cards/hero-card.vue';
import HeroNormalForm from '@/components/cards/hero-normal-form.vue';
import HeroInspiredForm from '@/components/cards/hero-inspired-form.vue';
const route = useRoute();

const authStore = useAuthStore();
const { User } = storeToRefs(authStore);

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
    <div
      v-if="User.email !== Hero.user.email"
      class="bg-red-50 border-2 border-red-700 rounded border-dashed text-red-800 px-4 py-3 mt-4"
    >
      You are not allowed to update this Hero.
    </div>
    <HeroNav :hero="hero" v-model:tabs="tabs" :save="true" class="mt-4" />
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
    <HeroNormalForm
      v-if="User.email === Hero.user.email && tabs[0].current"
      v-model:hero="hero"
      class="mt-4"
    />
    <HeroInspiredForm
      v-if="User.email === Hero.user.email && tabs[1].current"
      v-model:hero="hero"
      class="mt-4"
    />
  </div>
</template>
