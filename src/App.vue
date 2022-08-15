<script setup>
import { reactive } from 'vue';
import heroes from '@/assets/data/heroes.js';
import generatePDF from '@/services/generate-pdf';
import HeroNormalCard from '@/components/hero-normal-card.vue';
import HeroNormalForm from '@/components/hero-normal-form.vue';
const index = 1;
const hero = reactive(heroes[index]);
</script>
<template>
  <HeroNormalCard v-model:hero="hero" class="mt-4" />
  <HeroNormalForm v-model:hero="hero" class="mt-4" />
  <div class="w-full flex items-center justify-center mt-4 mb-8">
    <button
      class="inline-flex items-center px-8 py-2 text-lg font-semibold text-white border border-indigo-700 shadow-sm rounded-md bg-indigo-600 hover:bg-indigo-700"
      @click="generatePDF(hero)"
    >
      Generate PDF
    </button>
  </div>
</template>
