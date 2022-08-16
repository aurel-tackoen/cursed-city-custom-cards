<script setup>
import { computed } from 'vue';
const props = defineProps({
  tabs: Array,
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
    class="sticky top-0 mx-auto z-50 rounded-lg shadow border border-gray-500200 flex divide-x divide-gray-200"
    aria-label="Tabs"
  >
    <button
      v-for="(tab, tabIdx) in tabs"
      :key="tab.name"
      :class="[
        tab.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
        tabIdx === 0 ? 'rounded-l-lg' : '',
        tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
        'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10',
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
  </nav>
</template>
