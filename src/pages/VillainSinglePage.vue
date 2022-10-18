<script setup>
  import { useRoute } from 'vue-router';
  import { reactive } from 'vue';
  import VillainCard from '@/components/cards/villain-card.vue';
  import { useVillainsStore } from '@/stores/villains-store.js';
  import VillainNav from '@/components/layout/villain-nav.vue';

  const tabs = reactive([
    { name: 'Path to Glory', current: true },
    { name: 'Inspired', current: false },
  ]);
  const route = useRoute();
  const villainsStore = useVillainsStore();
  await villainsStore.fetchVillain(route.params.id);
  const Villain = villainsStore.Villain;
</script>

<template>
  <div class="mt-4 space-y-4">
    <VillainNav
      @create:villain="createVillain()"
      :villain="Villain"
      v-model:tabs="tabs"
      :print="true"
      :status="false"
    />
    <div class="print-container flex-row justify-center space-y-4">
      <VillainCard
        status="normal"
        v-model:villain="Villain"
        class="villain-card-display"
      />
    </div>
    <div class="print-container flex-row justify-center space-y-4">
      <VillainCard
        status="empowered"
        v-model:villain="Villain"
        class="villain-card-display"
      />
    </div>
  </div>
</template>
