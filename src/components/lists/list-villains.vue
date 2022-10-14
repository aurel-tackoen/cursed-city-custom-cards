<script setup>
  import { inject } from 'vue';
  const dayjs = inject('dayjs');
  defineProps({
    villains: Array,
    params: Object,
    target: String,
    size: String,
  });
</script>

<template>
  <div class="block min-w-full">
    <div class="overflow-hidden border-b">
      <div
        v-if="params.loading === true"
        class="flex h-96 items-center justify-center"
      >
        <fa-icon
          class="fa-fw fa-spin fa-2xl text-slate-300"
          :icon="['fat', 'dice-d12']"
        />
      </div>
      <div v-if="params.loading === false" class="divide-y divide-slate-100">
        <div
          v-for="villain in villains"
          :key="villain._id"
          class="flex w-full items-center justify-start space-x-4 py-2 px-4"
        >
          <div class="">
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
          <div class="flex grow flex-col space-y-1">
            <router-link
              :to="{
                name: `villains-${target}`,
                params: { id: villain._id },
              }"
              class="text-lg font-bold leading-5 text-slate-900 hover:text-red-900"
            >
              {{ villain.name }}
            </router-link>
            <div class="flex text-xs italic text-slate-600">
              <span v-for="(tag, index) in villain.tags" :key="tag.name">
                {{ tag.label
                }}<span v-if="index < villain.tags.length - 1">,&nbsp;</span>
              </span>
            </div>
            <!-- <div
              v-if="size === 'small'"
              class="block text-xs italic text-slate-600"
            >
              Created by
              <span class="font-bold">{{ villain.user.username }}</span>
              {{ dayjs(villain.date * 1000).fromNow() }}
            </div> -->
          </div>
          <div v-if="size === 'large'">
            <div class="hidden text-sm leading-4 text-slate-600 sm:block">
              Created by
              <span class="font-bold">{{ villain.user.username }}</span>
              {{ dayjs(villain.date * 1000).fromNow() }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
