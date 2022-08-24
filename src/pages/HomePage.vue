<script setup>
  import { storeToRefs } from 'pinia';
  import { useAuthStore } from '@/stores/auth-store.js';
  import { useHeroesStore } from '@/stores/heroes-store.js';
  import HeroesList from '@/components/layout/heroes-list.vue';

  const authStore = useAuthStore();
  const { User } = storeToRefs(authStore);
  const heroesStore = useHeroesStore();
  const { UserHeroes, Heroes } = storeToRefs(heroesStore);

  if (User.value.authenticated) {
    await heroesStore.fetchUserHeroes();
  }
  await heroesStore.fetchHeroes();
</script>

<template>
  <div>
    <div class="rounded bg-white shadow">
      <div class="mt-8">
        <div
          class="flex h-16 items-center justify-between bg-gradient-to-t from-slate-50 to-white px-4"
        >
          <div class="">
            <h3 class="text-lg font-medium leading-6 text-slate-900">
              All Heroes
            </h3>
          </div>
        </div>
        <div>
          <HeroesList :heroes="Heroes" target="single" />
        </div>
      </div>
    </div>
  </div>
</template>
