<script setup>
import { userAuth } from '@/plugins/netlify-identity';
const { User } = userAuth();
const responseHeroes = await fetch('/.netlify/functions/heroes-find', {
  method: 'POST',
  body: JSON.stringify({}),
});
const Heroes = await responseHeroes.json();
const responseMyHeroes = await fetch('/.netlify/functions/heroes-find', {
  method: 'POST',
  body: JSON.stringify({ params: { 'user.email': User.email } }),
});
const MyHeroes = await responseMyHeroes.json();
</script>

<template>
  <div class="">
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div
            class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
          >
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="py-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Picture
                  </th>
                  <th
                    scope="col"
                    class="py-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Name
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="hero in MyHeroes" :key="hero._id">
                  <td class="whitespace-nowrap py-1 px-4 text-sm">
                    <div class="flex items-center">
                      <div class="flex-shrink-0">
                        <div
                          id="hero-picture"
                          class="rounded-full border-2 border-gray-100 shadow-sm overflow-hidden flex items-center"
                          style="width: 72px; height: 72px"
                        >
                          <img
                            :src="hero.picture.url"
                            alt="Hero Picture"
                            class="max-w-max"
                            :style="`transform: scale(${hero.picture.zoom});margin-top: calc(${hero.picture.offsetY}px / 4); margin-left: calc(${hero.picture.offsetX}px / 4); height: calc(500px / 4)`"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="whitespace-nowrap py-1 px-4 text-sm">
                    <div class="ml-4">
                      <router-link
                        :to="{
                          name: 'heroes-form',
                          params: { id: hero._id },
                        }"
                        class="font-medium text-gray-900"
                      >
                        {{ hero.name }}
                      </router-link>
                      <div class="text-gray-500">{{ hero.email }}</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="">{{ MyHeroes }}</div> -->
  <!-- <div class="">{{ Heroes }}</div> -->
</template>
