<script setup>
  import { useRoute } from 'vue-router';
  import { reactive } from 'vue';
  import HeroCard from '@/components/cards/hero-card.vue';
  import HeroInitiativeCard from '@/components/cards/hero-initiative-card.vue';
  import { useHeroesStore } from '@/stores/heroes-store.js';
  import HeroNav from '@/components/layout/hero-nav.vue';

  const tabs = reactive([
    { name: 'Path to Glory', current: true },
    { name: 'Inspired', current: false },
  ]);
  const route = useRoute();
  const heroesStore = useHeroesStore();
  await heroesStore.fetchHero(route.params.id);
  const Hero = heroesStore.Hero;
</script>

<template>
  <div class="mt-4 space-y-4">
    <HeroNav
      @create:hero="createHero()"
      :hero="Hero"
      v-model:tabs="tabs"
      :print="true"
      :status="false"
    />
    <div class="print-container flex-row justify-center space-y-4">
      <HeroCard status="normal" v-model:hero="Hero" class="hero-card-display" />
      <HeroInitiativeCard
        side="recto"
        v-model:hero="Hero"
        class="hero-initiative-card-display"
      />
    </div>
    <div class="print-container flex-row justify-center space-y-4">
      <HeroCard
        status="inspired"
        v-model:hero="Hero"
        class="hero-card-display print-verso-fix"
      />
      <HeroInitiativeCard
        side="verso"
        v-model:hero="Hero"
        class="hero-initiative-card-display"
      />
    </div>
  </div>
</template>
