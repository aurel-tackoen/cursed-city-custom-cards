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
  <div class="sticky top-0 z-50 mx-auto">
    <nav
      class="flex h-20 w-full items-center overflow-hidden rounded bg-gradient-to-t from-gray-50 to-white px-2 shadow"
      aria-label="Tabs"
    >
      <div class="flex w-5/12 items-center">
        <div v-if="hero.picture && hero.picture.url">
          <div
            class="flex items-center overflow-hidden rounded-full border border-gray-100 shadow"
            style="width: 58px; height: 58px"
          >
            <img
              :src="hero.picture.url"
              alt="Hero Picture"
              class="max-w-max"
              :style="`
                transform: scale(${hero.picture.zoom});
                margin-top: calc(${hero.picture.offsetY}px / 5);
                margin-left: calc(${hero.picture.offsetX}px / 5);
                height: calc(500px / 5)
              `"
            />
          </div>
        </div>
        <div class="hidden grow flex-col space-y-1 px-4 sm:flex">
          <div class="text-lg font-bold leading-4 text-gray-900">
            {{ hero.name }}
          </div>
          <div class="text-xs italic leading-4 text-gray-600">
            Created by <span class="font-bold">{{ hero.user.username }}</span>
            {{ dayjs(hero.date * 1000).fromNow() }}
          </div>
        </div>
      </div>
      <div class="flex w-4/12 justify-center self-stretch">
        <div v-if="status === true">
          <button
            v-for="(tab, tabIdx) in tabs"
            class="relative h-full overflow-hidden px-3 text-center"
            :key="tab.name"
            :class="[
              tab.current
                ? 'cursor-default text-gray-900'
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
      <div class="flex w-3/12 items-center justify-end space-x-2">
        <button v-if="save === true" @click="emit('update:hero')" class="btn">
          Save
        </button>
        <button v-if="create === true" @click="emit('create:hero')" class="btn">
          Create
        </button>
        <router-link
          v-if="single === true"
          :to="{ name: 'heroes-single', params: { id: hero._id } }"
          class="btn"
        >
          View
        </router-link>
        <button v-if="print === true" @click="printHero()" class="btn">
          Print
        </button>
      </div>
    </nav>
  </div>
</template>
