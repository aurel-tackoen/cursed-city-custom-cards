<script setup>
import { reactive, inject } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth-store.js';
import { useHeroesStore } from '@/stores/heroes-store.js';
import { defaultHero } from '@/assets/data/heroes.js';

import HeroNav from '@/components/layout/hero-nav.vue';
import HeroCard from '@/components/cards/hero-card.vue';
import HeroForm from '@/components/cards/hero-form.vue';
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
const { Hero, HeroErrors } = storeToRefs(heroesStore);

hero.user.email = User.value.email;
hero.user.username = User.value.username;
hero.date = dayjs().unix();
hero.fake = 'fake';

function createHero() {
  const result = heroesStore.createHero(hero);
}
</script>

<template>
  <div class="space-y-4">
    <HeroNav
      @create:hero="createHero()"
      :hero="hero"
      v-model:tabs="tabs"
      :save="false"
      :create="true"
    />
    <HeroCard
      v-if="tabs[0].current"
      status="normal"
      v-model:hero="hero"
      class="hero-card-display"
    />
    <HeroCard
      v-if="tabs[1].current"
      status="inspired"
      v-model:hero="hero"
      class="hero-card-display"
    />
    <HeroForm
      v-if="tabs[0].current"
      status="normal"
      :errors="HeroErrors"
      v-model:hero="hero"
    />
    <HeroForm
      v-if="tabs[1].current"
      status="inspired"
      :errors="HeroErrors"
      v-model:hero="hero"
    />
  </div>
</template>
