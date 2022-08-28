<script setup>
  import { storeToRefs } from 'pinia';
  import { useAuthStore } from '@/stores/auth-store.js';
  import { useHeroesStore } from '@/stores/heroes-store.js';
  import { createAvatar } from '@dicebear/avatars';
  import * as style from '@dicebear/avatars-initials-sprites';
  function getAvatar(username) {
    const avatar = createAvatar(style, {
      seed: username,
    });
    return avatar;
  }
  const authStore = useAuthStore();
  const heroesStore = useHeroesStore();
  const { User } = storeToRefs(authStore);
  const { UserHeroes } = storeToRefs(heroesStore);

  function login(action) {
    authStore.login(action);
  }
  function logout() {
    authStore.logout();
    UserHeroes.value = [];
  }
</script>

<template>
  <nav class="bg-white shadow">
    <div class="container mx-auto flex h-12 justify-between">
      <div class="flex">
        <div class="flex flex-shrink-0 items-center">
          <router-link to="/">
            <fa-icon :icon="['fad', 'dice-d8']" class="fa-2xl text-red-700" />
          </router-link>
          <router-link to="/" class="hidden sm:block">
            <div class="ml-2 text-xl tracking-tighter">
              Cursed City Custom Cards
            </div>
          </router-link>
        </div>
        <div class="ml-8 hidden space-x-8 sm:flex">
          <router-link
            to="/"
            class="inline-flex items-center border-b-2 border-red-700 px-1 pt-1 text-base text-slate-900"
          >
            Heroes
          </router-link>
          <div
            title="Soon !"
            class="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-base text-slate-400"
          >
            Hostiles
          </div>
        </div>
      </div>
      <div class="flex items-center text-sm">
        <button
          class="border-b border-transparent px-1 hover:border-red-700 hover:text-red-800"
          v-if="!User.authenticated"
          @click="login('login')"
        >
          Log In
        </button>
        <div class="px-1" v-if="!User.authenticated">or</div>
        <button
          class="border-b border-transparent px-1 hover:border-red-700 hover:text-red-800"
          v-if="!User.authenticated"
          @click="login('signup')"
        >
          Sign Up
        </button>
        <router-link
          v-if="User.authenticated"
          to="/user"
          class="border-b border-transparent px-1 text-slate-800 hover:border-red-700 hover:text-red-800"
        >
          {{ User.username }}
        </router-link>
        <router-link v-if="User.authenticated" to="/user" class="">
          <div
            class="mx-1 h-9 w-9 overflow-hidden rounded-full border border-white shadow"
            v-html="getAvatar(User.username)"
          ></div>
        </router-link>
      </div>
    </div>
  </nav>
</template>
