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
</script>

<template>
  <nav class="bg-white shadow">
    <div class="flex justify-between h-12 container mx-auto">
      <div class="flex">
        <div class="flex-shrink-0 flex items-center">
          <router-link to="/">
            <fa-icon :icon="['fad', 'dice-d8']" class="fa-2xl text-red-700" />
          </router-link>
          <router-link to="/">
            <div class="ml-2 tracking-tighter text-xl">
              Cursed City Custom Cards
            </div>
          </router-link>
        </div>
        <div class="ml-8 flex space-x-8">
          <!-- Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
          <router-link
            to="/heroes"
            class="border-red-700 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-base"
          >
            Heroes
          </router-link>
          <div
            title="Soon !"
            class="border-transparent text-gray-400 inline-flex items-center px-1 pt-1 border-b-2 text-base"
          >
            Monsters
          </div>
        </div>
      </div>
      <div class="text-sm flex items-center">
        <button
          class="border-b border-transparent hover:border-red-700 px-1 hover:text-red-800"
          v-if="!User.authenticated"
          @click="authStore.login('login')"
        >
          Log In
        </button>
        <div class="px-1" v-if="!User.authenticated">or</div>
        <button
          class="border-b border-transparent hover:border-red-700 px-1 hover:text-red-800"
          v-if="!User.authenticated"
          @click="authStore.login('signup')"
        >
          Sign Up
        </button>
        <button
          class="text-gray-500 border-b border-transparent hover:border-red-700 px-1 hover:text-red-800"
          v-if="User.authenticated"
          @click="authStore.logout()"
        >
          Log Out
        </button>
        <span v-if="User.authenticated" class="border-b border-transparent">
          {{ User.username }}
        </span>
        <div
          v-if="User.authenticated"
          class="rounded-full overflow-hidden h-9 w-9 border border-white shadow mx-1"
          v-html="getAvatar(User.username)"
        ></div>
      </div>
    </div>
  </nav>
</template>
