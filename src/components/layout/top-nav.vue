<script setup>
import { triggerNetlifyIdentityAction } from '@/plugins/netlify-identity';
</script>

<template>
  <nav class="bg-white shadow">
    <div class="flex justify-between h-12">
      <div class="flex">
        <div class="flex-shrink-0 flex items-center">
          <fa-icon
            :icon="['fad', 'dice-d8']"
            class="fa-2xl text-red-700 ml-6"
          />
        </div>
        <div class="ml-8 flex space-x-8">
          <!-- Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
          <router-link
            to="/"
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
      <div class="space-x-2 text-sm flex items-center mr-6">
        <button @click="triggerNetlifyIdentityAction('login')">Log In</button>
        <!-- <button @click="triggerNetlifyIdentityAction('signup')">Sign Up</button> -->
        <!-- <button @click="triggerNetlifyIdentityAction('logout')">Log Out</button> -->
      </div>
    </div>
  </nav>
</template>
