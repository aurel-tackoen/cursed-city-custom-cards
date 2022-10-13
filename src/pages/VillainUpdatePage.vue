<script setup>
  import { reactive, onUnmounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import { useAuthStore } from '@/stores/auth-store.js';
  import { useVillainsStore } from '@/stores/villains-store.js';

  import VillainNav from '@/components/layout/villain-nav.vue';
  import VillainCard from '@/components/cards/villain-card.vue';
  import VillainForm from '@/components/cards/villain-form.vue';
  import ErrorsAlert from '@/components/layout/errors-alert.vue';

  const route = useRoute();
  const router = useRouter();
  const authStore = useAuthStore();
  const { User } = storeToRefs(authStore);
  const villainsStore = useVillainsStore();
  await villainsStore.fetchVillain(route.params.id);
  const { Villain, VillainErrors } = storeToRefs(villainsStore);

  function updateVillain() {
    villainsStore.updateVillain();
  }
  async function removeVillain() {
    if (confirm('Are you sure you want to delete this villain?') == true) {
      await villainsStore.removeVillain(Villain.value._id);
      router.push({ name: 'home' });
    }
  }

  onUnmounted(() => {
    VillainErrors.value = [];
  });

  const tabs = reactive([
    { name: 'Path to Glory', current: true },
    { name: 'Empowered', current: false },
  ]);
</script>

<template>
  <div class="mt-4 space-y-4" v-if="Villain">
    <div v-if="User.email !== Villain.user.email" class="alert-container">
      You are not allowed to update this Villain.
    </div>
    <VillainNav
      @update:villain="updateVillain"
      :villain="Villain"
      v-model:tabs="tabs"
      :save="User.email === Villain.user.email ? true : false"
      :single="true"
    />
    <ErrorsAlert :errors="VillainErrors" />
    <div class="grid grid-cols-1 gap-4 xl:grid-cols-12">
      <div class="col-span-12 xl:col-span-5">
        <VillainForm
          v-if="User.email === Villain.user.email && tabs[0].current"
          status="normal"
          v-model:villain="Villain"
          :errors="VillainErrors"
        />
        <VillainForm
          v-if="User.email === Villain.user.email && tabs[1].current"
          status="empowered"
          v-model:villain="Villain"
          :errors="VillainErrors"
        />
      </div>
      <div class="order-first col-span-12 xl:order-last xl:col-span-7">
        <div
          class="flex flex-col justify-center space-y-2 xl:sticky xl:top-24 xl:items-start"
        >
          <VillainCard
            v-if="tabs[0].current"
            status="normal"
            v-model:villain="Villain"
            class="villain-card-display"
          />
          <VillainCard
            v-if="tabs[1].current"
            status="empowered"
            v-model:villain="Villain"
            class="villain-card-display"
          />
        </div>
      </div>
    </div>
    <div
      v-if="User.email === Villain.user.email"
      class="flex w-full items-center justify-start border-t pt-2"
    >
      <button
        class="cursor-pointer text-red-500 hover:text-red-700 hover:underline"
        @click="removeVillain"
      >
        Delete this villain
      </button>
    </div>
  </div>
</template>
