<script setup>
import { userAuth } from '@/plugins/netlify-identity';
import DiceD6 from '@/components/dices/dice-d6.vue';
import DiceD8 from '@/components/dices/dice-d8.vue';
import DiceD12 from '@/components/dices/dice-d12.vue';

const { User, userAuthAction } = userAuth();
console.log(User.value.email);
let MyHeroes = [];
if (User.value.email) {
  const responseMyHeroes = await fetch('/.netlify/functions/heroes-find', {
    method: 'POST',
    body: JSON.stringify({ params: { 'user.email': User.value.email } }),
  });
  MyHeroes = await responseMyHeroes.json();
}
const responseHeroes = await fetch('/.netlify/functions/heroes-find', {
  method: 'POST',
  body: JSON.stringify({}),
});
const Heroes = await responseHeroes.json();
console.log(MyHeroes);
</script>

<template>
  <div class="shadow bg-white rounded">
    <div class="mt-8">
      <div class="flex items-center justify-between h-16 px-4">
        <div class="">
          <h3 class="text-lg leading-6 font-medium text-gray-900">My Heroes</h3>
        </div>
        <div v-if="MyHeroes.length > 0" class="flex-shrink-0">
          <router-link
            :to="{
              name: 'heroes-create',
            }"
            class="px-4 py-2 border-2 border-white shadow text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700"
          >
            Create a new Hero
          </router-link>
        </div>
      </div>
      <div v-if="MyHeroes.length === 0" class="overflow-x-auto">
        <div class="py-8 text-center border-t">
          <fa-icon
            class="fa-fw fa-3x mb-3 text-red-700"
            :icon="['fad', 'book-skull']"
          />
          <div class="text-xl text-gray-400">
            You don't have any heroes yet.
          </div>
          <div
            v-if="!User.email"
            class="text-gray-400 flex justify-center w-full mt-2"
          >
            Please
            <button
              class="border-b border-grey-200 hover:border-red-700 px-1 hover:text-red-800"
              @click="userAuthAction('login')"
            >
              log In
            </button>
            before creating a new Hero.
          </div>
          <div v-if="User.email" class="flex-shrink-0">
            <router-link
              :to="{
                name: 'heroes-create',
              }"
              class="px-4 py-2 border-2 border-white shadow text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700"
            >
              Create a new Hero
            </router-link>
          </div>
        </div>
      </div>
      <div v-if="MyHeroes.length > 0" class="overflow-x-auto">
        <div class="inline-block min-w-full">
          <div class="overflow-hidden border-t">
            <table class="min-w-full divide-y">
              <thead class="bg-gray-50 text-sm text-gray-500">
                <tr class="divide-x divide-gray-100">
                  <th scope="col" class="py-2 text-left px-4 font-normal">
                    Picture
                  </th>
                  <th scope="col" class="py-2 text-left px-4 font-normal">
                    Name
                  </th>
                  <th scope="col" class="py-2 text-left px-4 font-normal">
                    Author
                  </th>
                  <th scope="col" class="py-2 text-left px-4 font-normal">
                    Move
                  </th>
                  <th scope="col" class="py-2 text-left px-4 font-normal">
                    Agility
                  </th>
                  <th scope="col" class="py-2 text-left px-4 font-normal">
                    Vitality
                  </th>
                  <th scope="col" class="py-2 text-left px-4 font-normal">
                    Defence
                  </th>
                  <th scope="col" class="py-2 text-left px-4 font-normal">
                    Tags
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="hero in MyHeroes" :key="hero._id">
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
                  <td class="whitespace-nowrap py-1 px-4 text-center">
                    {{ hero.normal.stats.move }} / {{ hero.normal.stats.run }}
                  </td>
                  <td class="whitespace-nowrap py-1 px-4">
                    <DiceD6
                      v-if="hero.normal.stats.agility === 'd6'"
                      class="w-6 h-6 mx-auto"
                    />
                    <DiceD8
                      v-if="hero.normal.stats.agility === 'd8'"
                      class="w-6 h-6 mx-auto"
                    />
                    <DiceD12
                      v-if="hero.normal.stats.agility === 'd12'"
                      class="w-6 h-6 mx-auto"
                    />
                  </td>
                  <td class="whitespace-nowrap py-1 px-4">
                    <DiceD6
                      v-if="hero.normal.stats.vitality === 'd6'"
                      class="w-6 h-6 mx-auto"
                    />
                    <DiceD8
                      v-if="hero.normal.stats.vitality === 'd8'"
                      class="w-6 h-6 mx-auto"
                    />
                    <DiceD12
                      v-if="hero.normal.stats.vitality === 'd12'"
                      class="w-6 h-6 mx-auto"
                    />
                  </td>
                  <td class="whitespace-nowrap py-1 px-4">
                    <DiceD6
                      v-if="hero.normal.stats.defence === 'd6'"
                      class="w-6 h-6 mx-auto"
                    />
                    <DiceD8
                      v-if="hero.normal.stats.defence === 'd8'"
                      class="w-6 h-6 mx-auto"
                    />
                    <DiceD12
                      v-if="hero.normal.stats.defence === 'd12'"
                      class="w-6 h-6 mx-auto"
                    />
                  </td>
                  <td class="whitespace-nowrap py-1 px-4">
                    <span v-for="(tag, index) in hero.tags" :key="tag.name">
                      {{ tag.label
                      }}<span v-if="index < hero.tags.length - 1">, </span>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="shadow bg-white rounded">
    <div class="mt-8">
      <div class="flex items-center justify-between h-16 px-4">
        <div class="">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            All Heroes
          </h3>
        </div>
      </div>
      <div class="overflow-x-auto">
        <div class="inline-block min-w-full">
          <div class="overflow-hidden border-t">
            <table class="min-w-full divide-y">
              <thead class="bg-gray-50 text-sm text-gray-500">
                <tr class="divide-x divide-gray-100">
                  <th scope="col" class="py-2 text-left px-4 font-normal">
                    Picture
                  </th>
                  <th scope="col" class="py-2 text-left px-4 font-normal">
                    Name
                  </th>
                  <th scope="col" class="py-2 text-left px-4 font-normal">
                    Author
                  </th>
                  <th scope="col" class="py-2 text-left px-4 font-normal">
                    Move
                  </th>
                  <th scope="col" class="py-2 text-left px-4 font-normal">
                    Agility
                  </th>
                  <th scope="col" class="py-2 text-left px-4 font-normal">
                    Vitality
                  </th>
                  <th scope="col" class="py-2 text-left px-4 font-normal">
                    Defence
                  </th>
                  <th scope="col" class="py-2 text-left px-4 font-normal">
                    Tags
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="hero in Heroes" :key="hero._id">
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
                        name: 'heroes-single',
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
                  <td class="whitespace-nowrap py-1 px-4 text-center">
                    {{ hero.normal.stats.move }} / {{ hero.normal.stats.run }}
                  </td>
                  <td class="whitespace-nowrap py-1 px-4">
                    <DiceD6
                      v-if="hero.normal.stats.agility === 'd6'"
                      class="w-6 h-6 mx-auto"
                    />
                    <DiceD8
                      v-if="hero.normal.stats.agility === 'd8'"
                      class="w-6 h-6 mx-auto"
                    />
                    <DiceD12
                      v-if="hero.normal.stats.agility === 'd12'"
                      class="w-6 h-6 mx-auto"
                    />
                  </td>
                  <td class="whitespace-nowrap py-1 px-4">
                    <DiceD6
                      v-if="hero.normal.stats.vitality === 'd6'"
                      class="w-6 h-6 mx-auto"
                    />
                    <DiceD8
                      v-if="hero.normal.stats.vitality === 'd8'"
                      class="w-6 h-6 mx-auto"
                    />
                    <DiceD12
                      v-if="hero.normal.stats.vitality === 'd12'"
                      class="w-6 h-6 mx-auto"
                    />
                  </td>
                  <td class="whitespace-nowrap py-1 px-4">
                    <DiceD6
                      v-if="hero.normal.stats.defence === 'd6'"
                      class="w-6 h-6 mx-auto"
                    />
                    <DiceD8
                      v-if="hero.normal.stats.defence === 'd8'"
                      class="w-6 h-6 mx-auto"
                    />
                    <DiceD12
                      v-if="hero.normal.stats.defence === 'd12'"
                      class="w-6 h-6 mx-auto"
                    />
                  </td>
                  <td class="whitespace-nowrap py-1 px-4">
                    <span v-for="(tag, index) in hero.tags" :key="tag.name">
                      {{ tag.label
                      }}<span v-if="index < hero.tags.length - 1">, </span>
                    </span>
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
