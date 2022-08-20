<script setup>
defineProps({
  heroes: Array,
  target: String,
});
</script>

<template>
  <div class="block min-w-full">
    <div class="overflow-hidden border-t">
      <div class="">
        <div
          v-for="hero in heroes"
          :key="hero._id"
          class="flex justify-start items-center w-full py-2"
        >
          <div class="px-4">
            <div
              id="hero-picture"
              class="rounded-full border-2 border-gray-100 shadow-sm overflow-hidden flex items-center"
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
            <router-link
              :to="{
                name: `heroes-${target}`,
                params: { id: hero._id },
              }"
              class="text-lg leading-4 font-bold text-gray-900 hover:text-red-900"
            >
              {{ hero.name }}
            </router-link>
            <div class="text-sm leading-4 text-gray-600 italic">
              <span v-for="(tag, index) in hero.tags" :key="tag.name">
                {{ tag.label
                }}<span v-if="index < hero.tags.length - 1">, </span>
              </span>
            </div>
          </div>
          <div class="px-4">
            <div class="text-sm leading-4 text-gray-600">
              Created by <span class="font-bold">{{ hero.user.username }}</span>
              {{ $dayjs(hero.date * 1000).fromNow() }}
            </div>
          </div>
        </div>
      </div>
      <!-- <table class="min-w-full divide-y">
        <thead class="bg-gray-50 text-sm text-gray-500">
          <tr class="divide-x divide-gray-100">
            <th scope="col" class="py-2 text-left px-4 font-normal">Picture</th>
            <th scope="col" class="py-2 text-left px-4 font-normal">Name</th>
            <th scope="col" class="py-2 text-left px-4 font-normal">Author</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          <tr v-for="hero in heroes" :key="hero._id">
            <td class="whitespace-nowrap py-1 px-4 text-sm">
              <div
                id="hero-picture"
                class="rounded-full border-2 border-gray-100 shadow-sm overflow-hidden flex items-center"
                style="width: 58px; height: 58px"
              >
                <img
                  :src="hero.picture.url"
                  alt="Hero Picture"
                  class="max-w-max"
                  :style="`transform: scale(${hero.picture.zoom});margin-top: calc(${hero.picture.offsetY}px / 5); margin-left: calc(${hero.picture.offsetX}px / 5); height: calc(500px / 5)`"
                />
              </div>
            </td>
            <td class="whitespace-nowrap py-1 px-4 text-lg">
              <router-link
                :to="{
                  name: 'heroes-update',
                  params: { id: hero._id },
                }"
                class="font-bold text-gray-900 hover:text-red-900"
              >
                {{ hero.name }}
              </router-link>
            </td>
            <td class="whitespace-nowrap py-1 px-4">
              {{ hero.user.username }}
            </td>
          </tr>
        </tbody>
      </table> -->
    </div>
  </div>
</template>
