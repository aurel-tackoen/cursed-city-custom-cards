<script setup>
  import { reactive, inject, onUnmounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useRouter } from 'vue-router';
  import { cloneDeep } from 'lodash';
  import { useAuthStore } from '@/stores/auth-store.js';
  import { useVillainsStore } from '@/stores/villains-store.js';
  import { defaultVillain } from '@/assets/data/villain.js';

  import VillainNav from '@/components/layout/villain-nav.vue';
  import VillainCard from '@/components/cards/villain-card.vue';
  import VillainForm from '@/components/cards/villain-form.vue';
  import ErrorsAlert from '@/components/layout/errors-alert.vue';

  const router = useRouter();
  const dayjs = inject('dayjs');
  const newVillain = reactive(cloneDeep(defaultVillain));
  const tabs = reactive([
    { name: 'Normal', current: true },
    { name: 'Empowered', current: false },
  ]);

  const authStore = useAuthStore();
  const { User } = storeToRefs(authStore);
  const villainsStore = useVillainsStore();
  const { VillainErrors } = storeToRefs(villainsStore);

  newVillain.user.email = User.value.email;
  newVillain.user.username = User.value.username;
  newVillain.date = dayjs().unix();

  async function createVillain() {
    const result = await villainsStore.createVillain(newVillain);
    if (result) {
      router.push({ name: 'villains-update', params: { id: result._id } });
      Object.assign(newVillain, defaultVillain);
    }
  }
  onUnmounted(() => {
    VillainErrors.value = [];
  });
</script>

<template>
  <div class="mt-4 space-y-4">
    <VillainNav
      @create:villain="createVillain()"
      :villain="newVillain"
      v-model:tabs="tabs"
      :create="true"
    />
    <ErrorsAlert :errors="VillainErrors" />
    <div class="grid grid-cols-1 gap-4 xl:grid-cols-12">
      <div class="col-span-12 xl:col-span-4">
        <VillainForm status="normal" v-model:villain="newVillain" />
      </div>
      <div class="order-first col-span-12 xl:order-last xl:col-span-8">
        <div
          class="flex flex-col justify-center space-y-2 xl:sticky xl:top-24 xl:items-start"
        >
          <VillainCard
            v-if="tabs[0].current"
            status="normal"
            v-model:villain="newVillain"
            class="villain-card-display"
          />
          <VillainCard
            v-if="tabs[1].current"
            status="empowered"
            v-model:villain="newVillain"
            class="villain-card-display"
          />
        </div>
      </div>
    </div>
  </div>
</template>
