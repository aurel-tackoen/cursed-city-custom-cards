<script setup>
import { reactive } from 'vue';
import heroes from '@/assets/data/heroes.js';
import HeroNormalCard from '@/components/hero-normal-card.vue';
import HeroNormalForm from '@/components/hero-normal-form.vue';
const index = 0;
const hero = reactive(heroes[index]);
</script>
<template>
  <HeroNormalCard v-model:hero="hero" class="mt-4" />
  <HeroNormalForm v-model:hero="hero" class="mt-4" />
</template>
