<script setup>
import { computed } from 'vue';
const props = defineProps({
  hero: Object,
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
    class="sticky top-0 h-20 px-2 mx-auto z-50 flex items-center w-full bg-gradient-to-t from-gray-50 to-white shadow rounded overflow-hidden"
    aria-label="Tabs"
  >
    <div class="w-3/12 flex items-center">
      <div class="">
        <div
          id="hero-picture"
          class="rounded-full border border-gray-100 shadow overflow-hidden flex items-center"
          style="width: 58px; height: 58px"
        >
          <img
            :src="hero.picture.url"
            alt="Hero Picture"
            class="max-w-max"
            :style="`transform: scale(${hero.picture.zoom});margin-top: calc(${hero.picture.offsetY}px / 5); margin-left: calc(${hero.picture.offsetX}px / 5); height: calc(500px / 5)`"
          />
        </div>
      </div>
      <div class="grow flex flex-col px-4 space-y-1">
        <div class="text-lg leading-4 font-bold text-gray-900">
          {{ hero.name }}
        </div>
        <div class="text-sm leading-4 text-gray-600 italic">
          Created by <span class="font-bold">{{ hero.user.username }}</span>
          {{ $dayjs(hero.date * 1000).fromNow() }}
        </div>
      </div>
    </div>
    <div class="w-6/12 flex justify-center self-stretch">
      <button
        v-for="(tab, tabIdx) in tabs"
        class="relative overflow-hidden h-full px-3 text-center"
        :key="tab.name"
        :class="[
          tab.current
            ? 'text-gray-900 cursor-default'
            : 'text-gray-500 hover:text-red-700',
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
    <div class="w-3/12 flex justify-end items-center">
      <button
        v-if="save === true"
        class="px-4 py-2 border-2 border-white shadow text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700"
      >
        Save
      </button>
    </div>
  </nav>
</template>
