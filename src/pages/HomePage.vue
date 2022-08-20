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
  heroesStore.fetchUserHeroes();
}
heroesStore.fetchHeroes();
</script>

<template>
  <div class="shadow bg-white rounded">
    <div class="mt-8">
      <div class="flex items-center justify-between h-16 px-4">
        <div class="">
          <h3 class="text-lg leading-6 font-medium text-gray-900">My Heroes</h3>
        </div>
        <div v-if="UserHeroes.length > 0" class="flex-shrink-0">
          <router-link
            :to="{
              name: 'heroes-create',
            }"
            class="px-4 py-2 border-2 border-white shadow text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700"
          >
            Create a new Hero
          </router-link>
        </div>
      </div>
      <div v-if="UserHeroes.length === 0" class="overflow-x-auto">
        <div class="py-8 text-center border-t">
          <fa-icon
            class="fa-fw fa-3x mb-3 text-red-700"
            :icon="['fad', 'book-skull']"
          />
          <div class="text-xl text-gray-400">
            You don't have any heroes yet.
          </div>
          <div
            v-if="!User.authenticated"
            class="text-gray-400 flex justify-center w-full mt-2"
          >
            Please
            <button
              class="border-b border-grey-200 hover:border-red-700 px-1 hover:text-red-800"
              @click="authStore.login('login')"
            >
              log In
            </button>
            before creating a new Hero.
          </div>
          <div v-if="User.authenticated" class="mt-4 flex-shrink-0">
            <router-link
              :to="{
                name: 'heroes-create',
              }"
              class="px-4 py-2 border-2 border-white shadow text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700"
            >
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
  <div class="shadow bg-white rounded">
    <div class="mt-8">
      <div class="flex items-center justify-between h-16 px-4">
        <div class="">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
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
