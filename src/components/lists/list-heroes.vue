<script setup>
  import { inject } from 'vue';
  const dayjs = inject('dayjs');
  defineProps({
    heroes: Array,
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
          v-for="hero in heroes"
          :key="hero._id"
          class="flex w-full items-center justify-start space-x-4 py-2 px-4"
        >
          <div class="">
            <div
              class="flex items-center justify-center overflow-hidden rounded-full border shadow-inner"
              style="width: 12mm; height: 12mm"
            >
              <img
                v-if="hero.picture && hero.picture.url"
                :src="hero.picture.url"
                alt="Hero Picture"
                class="max-w-max"
                :style="`
                  transform: scale(${hero.picture.small_zoom / 2});
                  margin-top: ${hero.picture.small_offsetY / 2}px;
                  margin-left: ${hero.picture.small_offsetX / 2}px;
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
                name: `heroes-${target}`,
                params: { id: hero._id },
              }"
              class="text-lg font-bold leading-5 text-slate-900 hover:text-red-900"
            >
              {{ hero.name }}
            </router-link>
            <div class="flex text-xs italic text-slate-600">
              <span v-for="(tag, index) in hero.tags" :key="tag.name">
                {{ tag.label
                }}<span v-if="index < hero.tags.length - 1">,&nbsp;</span>
              </span>
            </div>
            <!-- <div
              v-if="size === 'small'"
              class="block text-xs italic text-slate-600"
            >
              Created by <span class="font-bold">{{ hero.user.username }}</span>
              {{ dayjs(hero.date * 1000).fromNow() }}
            </div> -->
          </div>
          <span
            v-if="size === 'small'"
            class="fi fis ml-2 rounded-full"
            :class="'fi-' + hero.language"
          ></span>
          <div v-if="size === 'large'" class="flex">
            <div class="hidden text-sm leading-4 text-slate-600 sm:block">
              Created by <span class="font-bold">{{ hero.user.username }}</span>
              {{ dayjs(hero.date * 1000).fromNow() }}
            </div>
            <span
              class="fi fis ml-2 rounded-full"
              :class="'fi-' + hero.language"
            ></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
