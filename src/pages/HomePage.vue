<script setup>
// import { userAuth } from '@/plugins/netlify-identity';
// const { User } = userAuth();
// const responseMyHeroes = await fetch('/.netlify/functions/heroes-find', {
//   method: 'POST',
//   body: JSON.stringify({ params: { 'user.email': User.email } }),
// });
// const MyHeroes = await responseMyHeroes.json();
import DiceD6 from '@/components/dices/dice-d6.vue';
import DiceD8 from '@/components/dices/dice-d8.vue';
import DiceD12 from '@/components/dices/dice-d12.vue';
const responseHeroes = await fetch('/.netlify/functions/heroes-find', {
  method: 'POST',
  body: JSON.stringify({}),
});
const Heroes = await responseHeroes.json();
</script>

<template>
  <div class="">
    <div class="mt-8 flex flex-col">
      <div class="overflow-x-auto">
        <div class="inline-block min-w-full">
          <div class="overflow-hidden shadow rounded-lg border">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="py-2 text-left pl-4 font-normal text-gray-700"
                  >
                    Picture
                  </th>
                  <th
                    scope="col"
                    class="py-2 text-left pl-4 font-normal text-gray-700"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    class="py-2 text-left pl-4 font-normal text-gray-700"
                  >
                    Author
                  </th>
                  <th
                    scope="col"
                    class="py-2 text-left pl-4 font-normal text-gray-700"
                  >
                    Move
                  </th>
                  <th
                    scope="col"
                    class="py-2 text-left pl-4 font-normal text-gray-700"
                  >
                    Agility
                  </th>
                  <th
                    scope="col"
                    class="py-2 text-left pl-4 font-normal text-gray-700"
                  >
                    Vitality
                  </th>
                  <th
                    scope="col"
                    class="py-2 text-left pl-4 font-normal text-gray-700"
                  >
                    Defence
                  </th>
                  <th
                    scope="col"
                    class="py-2 text-left pl-4 font-normal text-gray-700"
                  >
                    Tags
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="hero in Heroes" :key="hero._id">
                  <td class="whitespace-nowrap py-1 pl-4 text-sm">
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
                  <td class="whitespace-nowrap py-1 pl-4 text-lg">
                    <router-link
                      :to="{
                        name: 'heroes-form',
                        params: { id: hero._id },
                      }"
                      class="font-bold text-gray-900 hover:text-red-900"
                    >
                      {{ hero.name }}
                    </router-link>
                  </td>
                  <td class="whitespace-nowrap py-1 pl-4">
                    {{ hero.user.username }}
                  </td>
                  <td class="whitespace-nowrap py-1 pl-4">
                    {{ hero.normal.stats.move }} / {{ hero.normal.stats.run }}
                  </td>
                  <td class="whitespace-nowrap py-1 pl-4">
                    <DiceD6
                      v-if="hero.normal.stats.agility === 'd6'"
                      class="w-6 h-6"
                    />
                    <DiceD8
                      v-if="hero.normal.stats.agility === 'd8'"
                      class="w-6 h-6"
                    />
                    <DiceD12
                      v-if="hero.normal.stats.agility === 'd12'"
                      class="w-6 h-6"
                    />
                  </td>
                  <td class="whitespace-nowrap py-1 pl-4">
                    <DiceD6
                      v-if="hero.normal.stats.vitality === 'd6'"
                      class="w-6 h-6"
                    />
                    <DiceD8
                      v-if="hero.normal.stats.vitality === 'd8'"
                      class="w-6 h-6"
                    />
                    <DiceD12
                      v-if="hero.normal.stats.vitality === 'd12'"
                      class="w-6 h-6"
                    />
                  </td>
                  <td class="whitespace-nowrap py-1 pl-4">
                    <DiceD6
                      v-if="hero.normal.stats.defence === 'd6'"
                      class="w-6 h-6"
                    />
                    <DiceD8
                      v-if="hero.normal.stats.defence === 'd8'"
                      class="w-6 h-6"
                    />
                    <DiceD12
                      v-if="hero.normal.stats.defence === 'd12'"
                      class="w-6 h-6"
                    />
                  </td>
                  <td class="whitespace-nowrap py-1 pl-4">
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
