<script setup>
import { computed, inject } from 'vue';
const dayjs = inject('dayjs');
const props = defineProps({
  hero: Object,
  tabs: Array,
  status: {
    type: Boolean,
    default: true,
  },
  save: {
    type: Boolean,
    default: false,
  },
  create: {
    type: Boolean,
    default: false,
  },
  print: {
    type: Boolean,
    default: false,
  },
  single: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:tabs', 'update:hero', 'create:hero']);
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
function printHero() {
  window.print();
}
</script>
<template>
  <nav
    class="sticky top-0 h-20 px-2 mx-auto z-50 flex items-center w-full bg-gradient-to-t from-gray-50 to-white shadow rounded overflow-hidden"
    aria-label="Tabs"
  >
    <div class="w-5/12 flex items-center">
      <div v-if="hero.picture && hero.picture.url">
        <div
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
      <div class="grow hidden sm:flex flex-col px-4 space-y-1">
        <div class="text-lg leading-4 font-bold text-gray-900">
          {{ hero.name }}
        </div>
        <div class="text-xs leading-4 text-gray-600 italic">
          Created by <span class="font-bold">{{ hero.user.username }}</span>
          {{ dayjs(hero.date * 1000).fromNow() }}
        </div>
      </div>
    </div>
    <div class="w-4/12 flex justify-center self-stretch">
      <div v-if="status === true">
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
    </div>
    <div class="w-3/12 flex justify-end items-center space-x-2">
      <button
        v-if="save === true"
        @click="emit('update:hero')"
        class="px-4 py-2 border-2 border-white shadow text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700"
      >
        Save
      </button>
      <button
        v-if="create === true"
        @click="emit('create:hero')"
        class="px-4 py-2 border-2 border-white shadow text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700"
      >
        Create
      </button>
      <router-link
        v-if="single === true"
        :to="{ name: 'heroes-single', params: { id: hero._id } }"
        class="px-4 py-2 border-2 border-white shadow text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700"
      >
        View
      </router-link>
      <button
        v-if="print === true"
        @click="printHero()"
        class="px-4 py-2 border-2 border-white shadow text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700"
      >
        Print
      </button>
    </div>
  </nav>
</template>
