<script setup>
  import { reactive, inject, onUnmounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useRouter } from 'vue-router';
  import { cloneDeep } from 'lodash';
  import { useAuthStore } from '@/stores/auth-store.js';
  import { useHeroesStore } from '@/stores/heroes-store.js';
  import { defaultHero } from '@/assets/data/heroes.js';

  import HeroNav from '@/components/layout/hero-nav.vue';
  import HeroCard from '@/components/cards/hero-card.vue';
  import HeroInitiativeCard from '@/components/cards/hero-initiative-card.vue';
  import HeroForm from '@/components/cards/hero-form.vue';
  import ErrorsAlert from '@/components/layout/errors-alert.vue';

  const router = useRouter();
  const dayjs = inject('dayjs');
  const newHero = reactive(cloneDeep(defaultHero));
  const tabs = reactive([
    { name: 'Path to Glory', current: true },
    { name: 'Inspired', current: false },
  ]);

  const authStore = useAuthStore();
  const { User } = storeToRefs(authStore);
  const heroesStore = useHeroesStore();
  const { HeroErrors } = storeToRefs(heroesStore);

  newHero.user.email = User.value.email;
  newHero.user.username = User.value.username;
  newHero.date = dayjs().unix();
  newHero.notInSchema = 'this data should not be in the database';

  async function createHero() {
    const result = await heroesStore.createHero(newHero);
    if (result) {
      router.push({ name: 'heroes-update', params: { id: result._id } });
      Object.assign(newHero, defaultHero);
    }
  }
  onUnmounted(() => {
    HeroErrors.value = [];
  });
</script>

<template>
  <div class="mt-4 space-y-4">
    <HeroNav
      @create:hero="createHero()"
      :hero="newHero"
      v-model:tabs="tabs"
      :create="true"
    />
    <ErrorsAlert :errors="HeroErrors" />
    <div
      class="flex flex-col justify-center space-y-2 lg:flex-row lg:space-x-2 lg:space-y-0"
    >
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
      <HeroInitiativeCard
        side="recto"
        v-model:hero="newHero"
        class="hero-initiative-card-display"
      />
    </div>
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
