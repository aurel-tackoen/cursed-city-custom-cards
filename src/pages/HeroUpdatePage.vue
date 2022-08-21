<script setup>
  import { reactive } from 'vue';
  import { useRoute } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import { useAuthStore } from '@/stores/auth-store.js';
  import { useHeroesStore } from '@/stores/heroes-store.js';

  import HeroNav from '@/components/layout/hero-nav.vue';
  import HeroCard from '@/components/cards/hero-card.vue';
  import HeroForm from '@/components/cards/hero-form.vue';
  import ErrorsAlert from '@/components/layout/errors-alert.vue';

  const route = useRoute();
  const authStore = useAuthStore();
  const { User } = storeToRefs(authStore);
  const heroesStore = useHeroesStore();
  await heroesStore.fetchHero(route.params.id);
  const { Hero, HeroErrors } = storeToRefs(heroesStore);

  function updateHero() {
    heroesStore.updateHero();
  }

  const tabs = reactive([
    { name: 'Path to Glory', current: true },
    { name: 'Inspired', current: false },
  ]);
</script>

<template>
  <div class="mt-4 space-y-4">
    <div
      v-if="User.email !== Hero.user.email"
      class="mt-4 rounded border-2 border-dashed border-red-700 bg-red-50 px-4 py-3 text-red-800"
    >
      You are not allowed to update this Hero.
    </div>
    <HeroNav
      @update:hero="updateHero"
      :hero="Hero"
      v-model:tabs="tabs"
      :save="true"
      :single="true"
    />
    <HeroCard
      v-if="tabs[0].current"
      status="normal"
      v-model:hero="Hero"
      class="hero-card-display"
    />
    <HeroCard
      v-if="tabs[1].current"
      status="inspired"
      v-model:hero="Hero"
      class="hero-card-display"
    />
    <ErrorsAlert :errors="HeroErrors" />
    <HeroForm
      v-if="User.email === Hero.user.email && tabs[0].current"
      status="normal"
      v-model:hero="Hero"
      :errors="HeroErrors"
    />
    <HeroForm
      v-if="User.email === Hero.user.email && tabs[1].current"
      status="inspired"
      v-model:hero="Hero"
      :errors="HeroErrors"
    />
  </div>
</template>
