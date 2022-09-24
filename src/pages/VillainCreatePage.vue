<script setup>
  import { reactive } from 'vue';
  import { cloneDeep } from 'lodash';
  import { defaultVillain } from '@/assets/data/villain.js';
  import VillainCard from '@/components/cards/villain-card.vue';
  const newVillain = reactive(cloneDeep(defaultVillain));
</script>

<template>
  <div class="mt-4 space-y-4">
    <div
      class="flex flex-col justify-center space-y-2 lg:flex-row lg:space-x-2 lg:space-y-0"
    >
      <VillainCard
        status="normal"
        v-model:villain="newVillain"
        class="villain-card-display"
      />
    </div>
    <!-- <VillainForm
      v-if="tabs[0].current"
      status="normal"
      :errors="HeroErrors"
      v-model:villain="newVillain"
    /> -->
  </div>
</template>
