<script setup>
import { reactive, inject } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth-store.js';
import { useHeroesStore } from '@/stores/heroes-store.js';
import { defaultHero } from '@/assets/data/heroes.js';

import HeroNav from '@/components/layout/hero-nav.vue';
import HeroCard from '@/components/cards/hero-card.vue';
import HeroNormalForm from '@/components/cards/hero-normal-form.vue';
import HeroInspiredForm from '@/components/cards/hero-inspired-form.vue';

const dayjs = inject('dayjs');
const hero = reactive(defaultHero);
const tabs = reactive([
  { name: 'Path to Glory', current: true },
  { name: 'Inspired', current: false },
]);

const authStore = useAuthStore();
const { User } = storeToRefs(authStore);
const heroesStore = useHeroesStore();
const { Hero } = storeToRefs(heroesStore);

hero.user.email = User.value.email;
hero.user.username = User.value.username;
hero.date = dayjs().unix();

function createHero() {
  console.log(hero);
  const result = heroesStore.createHero(hero);
  console.log(result);
  console.log(Hero);
}
</script>

<template>
  <div>
    <HeroNav
      @create:hero="createHero()"
      :hero="hero"
      v-model:tabs="tabs"
      :save="false"
      :create="true"
      class="mt-4"
    />
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
