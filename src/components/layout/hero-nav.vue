<script setup>
import { computed } from 'vue';
const props = defineProps({
  tabs: Array,
  save: Boolean,
});
const emit = defineEmits(['update:tabs']);
const tabs = computed({
  get: () => props.tabs,
  set: (value) => emit('update:tabs', value),
});
function setTabs(index) {
  tabs.value.map((tab) => {
    tab.current = false;
  });
  tabs.value[index].current = true;
}
</script>
<template>
  <nav
    class="sticky top-0 mx-auto z-50 flex justify-between items-center w-full bg-white shadow rounded overflow-hidden"
    aria-label="Tabs"
  >
    <div>
      <button
        v-for="(tab, tabIdx) in tabs"
        class="group relative min-w-0 flex-0 overflow-hidden bg-white py-4 px-4 text-lg text-center hover:bg-gray-50 focus:z-10"
        :key="tab.name"
        :class="[
          tab.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
        ]"
        :aria-current="tab.current ? 'page' : undefined"
        @click="setTabs(tabIdx)"
      >
        <span>{{ tab.name }}</span>
        <span
          aria-hidden="true"
          :class="[
            tab.current ? 'bg-red-700' : 'bg-transparent',
            'absolute inset-x-0 bottom-0 h-1',
          ]"
        />
      </button>
    </div>
    <div v-if="save === true" class="pr-4">
      <button
        class="px-4 py-2 border-2 border-white shadow text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700"
      >
        Save
      </button>
    </div>
  </nav>
</template>
