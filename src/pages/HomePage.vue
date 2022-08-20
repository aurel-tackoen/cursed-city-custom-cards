<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/uth-store.js';
import HeroesList from '@/components/layout/heroes-list.vue';

const authStore = useAuthStore();
const { User } = storeToRefs(authStore);

console.log(User.value.email);

let MyHeroes = [];
if (User.value.authenticated) {
  const responseMyHeroes = await fetch('/.netlify/functions/heroes-find', {
    method: 'POST',
    body: JSON.stringify({
      params: { 'user.email': User.value.email },
    }),
  });
  MyHeroes = await responseMyHeroes.json();
}
const responseHeroes = await fetch('/.netlify/functions/heroes-find', {
  method: 'POST',
  body: JSON.stringify({}),
});
const Heroes = await responseHeroes.json();
console.log(MyHeroes);
</script>

<template>
  <div class="shadow bg-white rounded">
    <div class="mt-8">
      <div class="flex items-center justify-between h-16 px-4">
        <div class="">
          <h3 class="text-lg leading-6 font-medium text-gray-900">My Heroes</h3>
        </div>
        <div v-if="MyHeroes.length > 0" class="flex-shrink-0">
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
      <div v-if="MyHeroes.length > 0">
        <HeroesList :heroes="MyHeroes" target="update" />
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
