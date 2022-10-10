<script setup>
  import { watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useAuthStore } from '@/stores/auth-store.js';
  import { useHeroesStore } from '@/stores/heroes-store.js';
  import { useVillainsStore } from '@/stores/villains-store.js';
  import ListHeroes from '@/components/lists/list-heroes.vue';
  import ListVillains from '@/components/lists/list-villains.vue';
  import ListPagination from '@/components/lists/list-pagination.vue';

  const authStore = useAuthStore();
  const { User } = storeToRefs(authStore);
  const heroesStore = useHeroesStore();
  const villainsStore = useVillainsStore();
  const { UserHeroes, Heroes } = storeToRefs(heroesStore);
  const { UserHeroesParams, HeroesParams } = storeToRefs(heroesStore);
  const { UserVillains, Villains } = storeToRefs(villainsStore);
  const { UserVillainsParams, VillainsParams } = storeToRefs(villainsStore);

  watch(
    () => UserHeroesParams.value.skip,
    async (skip) => {
      await heroesStore.fetchUserHeroes();
    }
  );
  watch(
    () => HeroesParams.value.skip,
    async (skip) => {
      await heroesStore.fetchHeroes();
    }
  );
  watch(
    () => UserVillainsParams.value.skip,
    async (skip) => {
      await villainsStore.fetchUserVillains();
    }
  );
  watch(
    () => VillainsParams.value.skip,
    async (skip) => {
      await villainsStore.fetchVillains();
    }
  );

  if (User.value.authenticated) {
    await heroesStore.fetchUserHeroes();
    await villainsStore.fetchUserVillains();
  }
  await heroesStore.fetchHeroes();
  await villainsStore.fetchVillains();
</script>

<template>
  <div>
    <div class="rounded bg-white shadow">
      <div class="mt-8">
        <div
          class="flex h-16 items-center justify-between bg-gradient-to-t from-slate-50 to-white px-4"
        >
          <div class="">
            <router-link
              :to="{ name: 'home' }"
              class="text-lg font-medium leading-6 text-slate-900 hover:text-red-800"
            >
              My Heroes
            </router-link>
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
          <ListHeroes
            :params="UserHeroesParams"
            :heroes="UserHeroes"
            target="update"
          />
          <ListPagination v-model:params="UserHeroesParams" />
        </div>
      </div>
    </div>
    <div class="rounded bg-white shadow">
      <div class="mt-8">
        <div
          class="flex h-16 items-center justify-between bg-gradient-to-t from-slate-50 to-white px-4"
        >
          <div class="">
            <router-link
              :to="{ name: 'home' }"
              class="text-lg font-medium leading-6 text-slate-900 hover:text-red-800"
            >
              My Villains
            </router-link>
          </div>
          <div v-if="UserVillains.length > 0" class="flex-shrink-0">
            <router-link :to="{ name: 'villains-create' }" class="btn-primary">
              Create a new Villain
            </router-link>
          </div>
        </div>
        <div v-if="UserVillains.length === 0" class="overflow-x-auto">
          <div class="border-t py-8 text-center">
            <fa-icon
              class="fa-fw fa-3x mb-3 text-red-700"
              :icon="['fad', 'book-skull']"
            />
            <div class="text-xl text-slate-400">
              You don't have any villains yet.
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
              before creating a new Villain.
            </div>
            <div v-if="User.authenticated" class="mt-4 flex-shrink-0">
              <router-link
                :to="{ name: 'villains-create' }"
                class="btn-primary"
              >
                Create a new Villain
              </router-link>
            </div>
          </div>
        </div>
        <div v-if="UserVillains.length > 0">
          <ListVillains
            :params="UserVillainsParams"
            :villains="UserVillains"
            target="update"
          />
          <ListPagination v-model:params="UserVillainsParams" />
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
          <ListHeroes :params="HeroesParams" :heroes="Heroes" target="single" />
          <ListPagination v-model:params="HeroesParams" />
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
              All Villains
            </h3>
          </div>
        </div>
        <div>
          <ListVillains
            :params="VillainsParams"
            :villains="Villains"
            target="single"
          />
          <ListPagination v-model:params="VillainsParams" />
        </div>
      </div>
    </div>
  </div>
</template>
