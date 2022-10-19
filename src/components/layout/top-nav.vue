<script setup>
  import { storeToRefs } from 'pinia';
  import { useAuthStore } from '@/stores/auth-store.js';
  import { createAvatar } from '@dicebear/avatars';
  import * as style from '@dicebear/avatars-initials-sprites';
  function getAvatar(username) {
    const avatar = createAvatar(style, {
      seed: username,
    });
    return avatar;
  }
  const authStore = useAuthStore();
  const { User } = storeToRefs(authStore);

  function login(action) {
    authStore.login(action);
  }
  function logout() {
    authStore.logout();
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
        <!-- <div class="ml-8 hidden space-x-8 sm:flex">
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
            Villains
          </div>
        </div> -->
      </div>
      <div class="flex items-center text-sm">
        <button
          v-if="!User.authenticated"
          @click="login('login')"
          class="border-b border-transparent px-1 hover:border-red-700 hover:text-red-800"
        >
          Log In
        </button>
        <div class="px-1" v-if="!User.authenticated">or</div>
        <button
          v-if="!User.authenticated"
          @click="login('signup')"
          class="border-b border-transparent px-1 hover:border-red-700 hover:text-red-800"
        >
          Sign Up
        </button>
        <button
          v-if="User.authenticated"
          @click="logout()"
          class="border-b border-transparent px-1 hover:border-red-700 hover:text-red-800"
        >
          Logout
        </button>
        <div
          v-if="User.authenticated"
          class="border-b border-transparent px-1 text-slate-800"
        >
          {{ User.username }}
        </div>
        <div v-if="User.authenticated" class="">
          <div
            class="mx-1 h-9 w-9 overflow-hidden rounded-full border border-white shadow"
            v-html="getAvatar(User.username)"
          ></div>
        </div>
      </div>
    </div>
  </nav>
</template>
