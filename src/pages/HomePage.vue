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
  <div class="rounded bg-white shadow">
    <div class="mt-8">
      <div
        class="flex h-16 items-center justify-between bg-gradient-to-t from-slate-50 to-white px-4"
      >
        <div class="">
          <h3 class="text-lg font-medium leading-6 text-slate-900">
            My Heroes
          </h3>
        </div>
        <div v-if="UserHeroes.length > 0" class="flex-shrink-0">
          <router-link :to="{ name: 'heroes-create' }" class="btn-primary">
            Create a new Hero
          </router-link>
        </div>
      </div>
      <div v-if="UserHeroes.length === 0" class="overflow-x-auto">
        <div class="border-t py-8 text-center">
          <fa-icon
            class="fa-fw fa-3x mb-3 text-red-700"
            :icon="['fad', 'book-skull']"
          />
          <div class="text-xl text-slate-400">
            You don't have any heroes yet.
          </div>
          <div
            v-if="!User.authenticated"
            class="mt-2 flex w-full justify-center text-slate-400"
          >
            Please
            <button
              class="border-grey-200 border-b px-1 hover:border-red-700 hover:text-red-800"
              @click="authStore.login('login')"
            >
              log In
            </button>
            before creating a new Hero.
          </div>
          <div v-if="User.authenticated" class="mt-4 flex-shrink-0">
            <router-link :to="{ name: 'heroes-create' }" class="btn-primary">
              Create a new Hero
            </router-link>
          </div>
        </div>
      </div>
      <div v-if="UserHeroes.length > 0">
        <HeroesList :heroes="UserHeroes" target="update" />
      </div>
    </div>
  </div>
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
</template>
