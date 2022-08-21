<script setup>
  import { reactive, inject } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useAuthStore } from '@/stores/auth-store.js';
  import { useHeroesStore } from '@/stores/heroes-store.js';
  import { defaultHero } from '@/assets/data/heroes.js';

  import HeroNav from '@/components/layout/hero-nav.vue';
  import HeroCard from '@/components/cards/hero-card.vue';
  import HeroForm from '@/components/cards/hero-form.vue';
  import ErrorsAlert from '@/components/layout/errors-alert.vue';

  const dayjs = inject('dayjs');
  const newHero = reactive(defaultHero);
  const tabs = reactive([
    { name: 'Path to Glory', current: true },
    { name: 'Inspired', current: false },
  ]);

  const authStore = useAuthStore();
  const { User } = storeToRefs(authStore);
  const heroesStore = useHeroesStore();
  const { Hero, HeroErrors } = storeToRefs(heroesStore);

  newHero.user.email = User.value.email;
  newHero.user.username = User.value.username;
  newHero.date = dayjs().unix();
  newHero.fake = 'fake';

  function createHero() {
    const result = heroesStore.createHero(newHero);
  }
</script>

<template>
  <div class="mt-4 space-y-4">
    <HeroNav
      @create:hero="createHero()"
      :hero="newHero"
      v-model:tabs="tabs"
      :create="true"
    />
    <HeroCard
      v-if="tabs[0].current"
      status="normal"
      v-model:hero="newHero"
      class="hero-card-display"
    />
    <HeroCard
      v-if="tabs[1].current"
      status="inspired"
      v-model:hero="newHero"
      class="hero-card-display"
    />
    <ErrorsAlert :errors="HeroErrors" />
    <HeroForm
      v-if="tabs[0].current"
      status="normal"
      :errors="HeroErrors"
      v-model:hero="newHero"
    />
    <HeroForm
      v-if="tabs[1].current"
      status="inspired"
      :errors="HeroErrors"
      v-model:hero="newHero"
    />
  </div>
</template>
