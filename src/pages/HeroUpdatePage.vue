<script setup>
  import { reactive, onUnmounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import { useAuthStore } from '@/stores/auth-store.js';
  import { useHeroesStore } from '@/stores/heroes-store.js';

  import HeroNav from '@/components/layout/hero-nav.vue';
  import HeroCard from '@/components/cards/hero-card.vue';
  import HeroForm from '@/components/cards/hero-form.vue';
  import ErrorsAlert from '@/components/layout/errors-alert.vue';

  const route = useRoute();
  const router = useRouter();
  const authStore = useAuthStore();
  const { User } = storeToRefs(authStore);
  const heroesStore = useHeroesStore();
  await heroesStore.fetchHero(route.params.id);
  const { Hero, HeroErrors } = storeToRefs(heroesStore);

  function updateHero() {
    heroesStore.updateHero();
  }
  async function removeHero() {
    if (confirm('Are you sure you want to delete this hero?') == true) {
      await heroesStore.removeHero(Hero.value._id);
      router.push({ name: 'home' });
    }
  }

  onUnmounted(() => {
    HeroErrors.value = [];
  });

  const tabs = reactive([
    { name: 'Path to Glory', current: true },
    { name: 'Inspired', current: false },
  ]);
</script>

<template>
  <div class="mt-4 space-y-4" v-if="Hero">
    <div v-if="User.email !== Hero.user.email" class="alert-container">
      You are not allowed to update this Hero.
    </div>
    <HeroNav
      @update:hero="updateHero"
      :hero="Hero"
      v-model:tabs="tabs"
      :save="User.email === Hero.user.email ? true : false"
      :single="true"
    />
    <ErrorsAlert :errors="HeroErrors" />
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
    <div
      v-if="User.email === Hero.user.email"
      class="flex w-full items-center justify-start border-t pt-2"
    >
      <button
        class="cursor-pointer text-red-500 hover:text-red-700 hover:underline"
        @click="removeHero"
      >
        Delete this hero
      </button>
    </div>
  </div>
</template>
