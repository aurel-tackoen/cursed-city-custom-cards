<script setup>
  import { inject } from 'vue';
  const dayjs = inject('dayjs');
  defineProps({
    heroes: Array,
    params: Object,
    target: String,
  });
</script>

<template>
  <div class="block min-w-full">
    <div class="overflow-hidden border-t">
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
              id="hero-picture"
              class="flex items-center overflow-hidden rounded-lg border-slate-100 shadow shadow-slate-200"
              style="width: 58px; height: 58px"
            >
              <img
                :src="hero.picture.url"
                alt="Hero Picture"
                class="max-w-max"
                :style="`
                  transform: scale(${hero.picture.zoom});
                  margin-top: calc(${hero.picture.offsetY - 10}px / 5);
                  margin-left: calc(${hero.picture.offsetX}px / 5);
                  height: calc(500px / 5)
                `"
              />
            </div>
          </div>
          <div class="flex grow flex-col space-y-2">
            <router-link
              :to="{
                name: `heroes-${target}`,
                params: { id: hero._id },
              }"
              class="text-lg font-bold leading-4 text-slate-900 hover:text-red-900"
            >
              {{ hero.name }}
            </router-link>
            <div class="hidden text-sm italic leading-4 text-slate-600 sm:flex">
              <span v-for="(tag, index) in hero.tags" :key="tag.name">
                {{ tag.label
                }}<span v-if="index < hero.tags.length - 1">,&nbsp;</span>
              </span>
            </div>
            <div
              class="block text-sm italic leading-4 text-slate-600 sm:hidden"
            >
              Created by <span class="font-bold">{{ hero.user.username }}</span>
              {{ dayjs(hero.date * 1000).fromNow() }}
            </div>
          </div>
          <div class="">
            <div class="hidden text-sm leading-4 text-slate-600 sm:block">
              Created by <span class="font-bold">{{ hero.user.username }}</span>
              {{ dayjs(hero.date * 1000).fromNow() }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
