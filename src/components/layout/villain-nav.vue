<script setup>
  import { computed, inject } from 'vue';
  const dayjs = inject('dayjs');
  const props = defineProps({
    villain: Object,
    tabs: Array,
    status: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
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
  const emit = defineEmits(['update:tabs', 'update:villain', 'create:villain']);
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
  function printVillain() {
    window.print();
  }
</script>
<template>
  <div class="hidden-print sticky top-0 z-50 mx-auto">
    <nav
      class="flex h-20 w-full items-center overflow-hidden rounded bg-gradient-to-t from-slate-50 to-white px-2 shadow"
      aria-label="Tabs"
    >
      <div class="flex w-7/12 items-center sm:w-5/12">
        <div>
          <div
            class="flex items-center justify-center overflow-hidden rounded-full border shadow-inner"
            style="width: 12mm; height: 12mm"
          >
            <img
              v-if="villain.picture && villain.picture.url"
              :src="villain.picture.url"
              alt="Villain Picture"
              class="max-w-max"
              :style="`
                  transform: scale(${villain.picture.small_zoom / 2});
                  margin-top: ${villain.picture.small_offsetY / 2}px;
                  margin-left: ${villain.picture.small_offsetX / 2}px;
                  height: 40.7mm
                `"
            />
            <fa-icon
              v-else
              class="fa-fw fa-xl mx-auto justify-self-center text-gray-400"
              :icon="['fad', 'ghost']"
            />
          </div>
        </div>
        <div class="flex grow flex-col space-y-1 px-4">
          <div class="text-lg font-bold leading-4 text-slate-900">
            {{ villain.name }}
          </div>
          <div class="hidden text-xs italic leading-4 text-slate-600 sm:block">
            Created by
            <span class="font-bold">{{ villain.user.username }}</span>
            {{ dayjs(villain.date * 1000).fromNow() }}
          </div>
        </div>
      </div>
      <div class="hidden justify-center self-stretch sm:flex sm:w-4/12">
        <div v-if="status === true">
          <button
            v-for="(tab, tabIdx) in tabs"
            class="relative h-full overflow-hidden px-3 text-center"
            :key="tab.name"
            :class="[
              tab.current
                ? 'cursor-default text-slate-900'
                : 'text-slate-500 hover:text-red-700',
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
      <div class="flex w-5/12 items-center justify-end space-x-2 sm:w-3/12">
        <button
          v-if="save === true"
          @click="emit('update:villain')"
          class="btn-primary"
        >
          Save
        </button>
        <button
          v-if="create === true && loading === false"
          @click="emit('create:villain')"
          class="btn-primary"
        >
          Create
        </button>
        <router-link
          v-if="single === true"
          :to="{ name: 'villains-single', params: { id: villain._id } }"
          class="btn-primary"
        >
          View
        </router-link>
        <button
          v-if="print === true"
          @click="printVillain()"
          class="btn-primary"
        >
          Print
        </button>
      </div>
    </nav>
    <nav
      class="flex h-12 w-full items-center rounded bg-gradient-to-t from-slate-50 to-white px-2 shadow sm:hidden"
      aria-label="Tabs"
    >
      <div class="flex w-full justify-center self-stretch sm:w-4/12">
        <div v-if="status === true">
          <button
            v-for="(tab, tabIdx) in tabs"
            class="relative h-full overflow-hidden px-3 text-center"
            :key="tab.name"
            :class="[
              tab.current
                ? 'cursor-default text-slate-900'
                : 'text-slate-500 hover:text-red-700',
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
    </nav>
  </div>
</template>
