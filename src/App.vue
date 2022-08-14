<script setup>
import { reactive } from 'vue';
import Multiselect from '@vueform/multiselect';
const state = reactive({
  hero: {
    picture:
      'https://www.games-workshop.com/resources/catalog/product/920x950/99120205036_GotrekGurnisson01.jpg',
    name: 'Gotrek Gurnisson',
    stats: {
      move: 3,
      run: 4,
      agility: 'A',
      vitality: 'B',
      defence: 'C',
    },
    tags: [
      { label: 'Monster Slayer', value: 'monster-slayer' },
      { label: 'Fyreslayer', value: 'fyreslayer' },
    ],
    size: 'large',
    weapons: [
      {
        name: 'Runic Axe',
        activation: 1,
        notes: [1],
        type: 'melee',
        dices: 'A',
        damages: {
          normal: 1,
          critical: 2,
        },
      },
      {
        name: 'Zangrom-Thaz',
        activation: 6,
        notes: [2, 3],
        type: 'melee',
        dices: 'BB',
        damages: {
          normal: 2,
          critical: 3,
        },
      },
    ],
    notes: [
      {
        name: 'Runic Power',
        rule: 'Lorem ipsum dolore sit amens, the quick brown fox jumps over the lazy dog.',
      },
      {
        name: 'Throwing Axe',
        rule: 'The quick brown fox jumps over the lazy dog.',
      },
      {
        name: '',
        rule: 'Tailwind lets you conditionally apply utility classes in different states using variant. ',
      },
    ],
    abilities: [
      {
        name: 'Krag Blackhammer’s Rune',
        rule: 'Once per turn, Gotrek lorem ipsum dolore sit amens, felix and gotrek in a balad.',
      },
      {
        name: 'Unstoppable Battle Fury',
        rule: 'When a reaction occur, lorem ipsum dolore sit amens.',
      },
      {
        name: 'Shoulder Plate of Edassa',
        rule: 'Every time This keeps your base styling decisions in your markup alongside all of your other styles.',
      },
    ],
    path: {
      name: 'Avatar of Grimnir',
      rule: 'Gotrek has survived countless battles and trials over the years, to become an almost unstoppable avatar of the duardin warrior-god Grimnir.',
    },
  },
});
</script>
<template>
  <div class="relative font-Cardo">
    <div id="hero-background-normal">
      <img
        class=""
        src="@/assets/pictures/hero-background-normal.png"
        width="915"
        alt="Hero Background"
      />
    </div>
    <div
      id="hero-picture"
      class="absolute rounded-full overflow-hidden flex items-center"
      style="top: -26px; left: -20px; width: 292px; height: 292px"
    >
      <img
        :src="state.hero.picture"
        alt="Hero Picture"
        class="max-w-max"
        style="margin-top: 120px; margin-left: -50px; height: 500px"
      />
    </div>
    <div
      id="hero-stats"
      class="absolute text-black w-12 grid grid-cols-2 text-2xl"
      style="top: 310px; left: 86px; width: 100px; height: 106px"
    >
      <div class="col-span-2 text-center">
        {{ state.hero.stats.move }}/{{ state.hero.stats.run }}
      </div>
      <div class="text-left">{{ state.hero.stats.agility }}</div>
      <div class="text-right">{{ state.hero.stats.vitality }}</div>
      <div class="col-span-2 text-center">{{ state.hero.stats.defence }}</div>
    </div>
    <div
      id="hero-name"
      class="absolute text-center text-4xl leading-none"
      style="top: 60px; left: 320px; width: 520px; height: 34px"
    >
      <div>{{ state.hero.name }}</div>
    </div>
    <div
      id="hero-tags"
      class="absolute text-center text-lg italic leading-none"
      style="top: 96px; left: 320px; width: 520px; height: 20px"
    >
      <div>
        <span v-for="(tag, index) in state.hero.tags" :key="tag.name">
          {{ tag.label
          }}<span v-if="index < state.hero.tags.length - 1">, </span>
        </span>
      </div>
    </div>
    <div
      id="hero-tags"
      class="absolute text-center text-base italic text-red-800 leading-none"
      style="top: 118px; left: 320px; width: 520px; height: 16px"
    >
      <div>
        Size: <span class="capitalize">{{ state.hero.size }}</span>
      </div>
    </div>
    <div
      id="hero-weapons"
      class="absolute"
      style="top: 290px; left: 300px; width: 560px"
    >
      <div>
        <div
          v-for="(weapon, index) in state.hero.weapons"
          :key="weapon.name"
          class="text-base font-bold flex justify-center items-center h-7 -ml-4 pl-4"
          :class="{ 'bg-gray-100': index % 2 !== 0 }"
        >
          <div class="w-72 pl-1">
            {{ weapon.name }} ({{ weapon.activation }}+)<sup
              v-for="note in weapon.notes"
              :key="note"
              >{{ note }}</sup
            >
          </div>
          <div class="w-24 text-center capitalize">{{ weapon.type }}</div>
          <div class="w-20 text-center">{{ weapon.dices }}</div>
          <div class="w-28 text-center">
            {{ weapon.damages.normal }}/{{ weapon.damages.critical }}
          </div>
        </div>
        <div class="mt-1 text-sm">
          <div v-for="(note, index) in state.hero.notes" :key="index">
            <sup>{{ index + 1 }}</sup
            >&nbsp;
            <span class="font-bold">{{ note.name }}</span>
            {{ note.rule }}
          </div>
        </div>
      </div>
      <div class="mt-2 w-full text-center text-lg uppercase leading-none">
        Unique Abilities
      </div>
      <div class="text-sm">
        <div v-for="ability in state.hero.abilities" :key="ability.name">
          <strong v-if="ability.name">{{ ability.name }}: </strong
          >{{ ability.rule }}
        </div>
      </div>
    </div>
    <div
      id="hero-path"
      class="absolute text-sm leading-4"
      style="top: 572px; left: 305px; width: 545px; height: 40px"
    >
      <strong>{{ state.hero.path.name }}: </strong>{{ state.hero.path.rule }}
    </div>
  </div>
  <div class="mb-96">
    <div id="user-hero">
      <div class="text-lg font-bold mt-4 mb-2">Hero:</div>
      <div class="grid grid-cols-4">
        <span>Name: </span>
        <input v-model="state.hero.name" type="text" class="col-span-3" />
      </div>
      <div class="grid grid-cols-4">
        <span>Picture: </span>
        <input v-model="state.hero.picture" type="text" class="col-span-3" />
      </div>
      <div class="grid grid-cols-4">
        <span>Tags: </span>
        <div class="col-span-3">
          <Multiselect
            v-model="state.hero.tags"
            mode="tags"
            :object="true"
            :close-on-select="false"
            :create-option="true"
            :caret="false"
            :searchable="true"
          ></Multiselect>
        </div>
      </div>
      <div class="grid grid-cols-4">
        <span>Size: </span>
        <select v-model="state.hero.size" class="col-span-3">
          <option value="small">Small</option>
          <option value="large">Large</option>
        </select>
      </div>
    </div>
    <hr class="mt-2" />
    <div id="user-hero-stats">
      <div class="text-lg font-bold mt-4 mb-2">Hero Stats:</div>
      <div class="grid grid-cols-4">
        <span>Move: </span>
        <input
          v-model="state.hero.stats.move"
          type="number"
          class="col-span-3"
        />
      </div>
      <div class="grid grid-cols-4">
        <span>Run: </span>
        <input
          v-model="state.hero.stats.run"
          type="number"
          class="col-span-3"
        />
      </div>
      <div class="grid grid-cols-4">
        <span>Agility: </span>
        <input
          v-model="state.hero.stats.agility"
          type="text"
          class="col-span-3"
        />
      </div>
      <div class="grid grid-cols-4">
        <span>Vitality: </span>
        <input
          v-model="state.hero.stats.vitality"
          type="text"
          class="col-span-3"
        />
      </div>
      <div class="grid grid-cols-4">
        <span>Defence: </span>
        <input
          v-model="state.hero.stats.defence"
          type="text"
          class="col-span-3"
        />
      </div>
    </div>
    <hr class="mt-2" />
    <div id="user-weapons">
      <div class="text-lg font-bold mt-4 mb-2">Weapons Stats:</div>
      <div v-for="weapon in state.hero.weapons" :key="weapon.name" class="mb-2">
        <div class="grid grid-cols-4">
          <span>Name: </span>
          <input v-model="weapon.name" type="text" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4">
          <span>Activation: </span>
          <input v-model="weapon.activation" type="number" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4">
          <span>Notes: {{ weapon.notes }}</span>
          <select multiple class="col-span-3" v-model="weapon.notes">
            <option
              v-for="(note, index) in state.hero.notes"
              :key="index"
              :value="index + 1"
            >
              {{ index + 1 }} {{ note.name }}
            </option>
          </select>
        </div>
        <div class="grid grid-cols-4">
          <span>Type: </span>
          <select v-model="weapon.type" class="col-span-3">
            <option value="melee">Melee</option>
            <option value="ranged">Ranged</option>
            <option value="area">Area</option>
          </select>
        </div>
        <div class="grid grid-cols-4">
          <span>Dices: </span>
          <input v-model="weapon.dices" type="text" class="col-span-3" />
        </div>
        <hr class="mt-2" />
      </div>
      <div>
        <button
          class=""
          @click="
            state.hero.weapons.push({
              name: '',
              activation: 1,
              type: 'melee',
              dices: '',
              damages: {
                normal: 1,
                critical: 1,
              },
            })
          "
        >
          Add a weapon
        </button>
      </div>
      <hr class="mt-2" />
      <div>
        <div class="text-lg font-bold mt-4 mb-2">Weapons Notes:</div>
        <div
          v-for="(note, index) in state.hero.notes"
          :key="note.name"
          class="mb-2"
        >
          <div class="grid grid-cols-4">
            <span>Code: </span>
            <span class="col-span-3">{{ index + 1 }}</span>
          </div>
          <div class="grid grid-cols-4">
            <span>Name: </span>
            <input v-model="note.name" type="text" class="col-span-3" />
          </div>
          <div class="grid grid-cols-4">
            <span>Rule: </span>
            <textarea v-model="note.rule" type="text" class="col-span-3" />
          </div>
          <hr class="mt-2" />
        </div>
        <div>
          <button
            class=""
            @click="
              state.hero.notes.push({
                name: '',
                rule: '',
              })
            "
          >
            Add a note
          </button>
        </div>
      </div>
    </div>
    <hr class="mt-2" />
    <div id="user-abilities">
      <div class="text-lg font-bold mt-4 mb-2">Unique Abilities:</div>
      <div
        v-for="ability in state.hero.abilities"
        :key="ability.name"
        class="mb-2"
      >
        <div class="grid grid-cols-4">
          <span>Name: </span>
          <input v-model="ability.name" type="text" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4">
          <span>Rule: </span>
          <textarea v-model="ability.rule" type="text" class="col-span-3" />
        </div>
        <hr class="mt-2" />
      </div>
      <div>
        <button
          class=""
          @click="
            state.hero.abilities.push({
              name: '',
              rule: '',
            })
          "
        >
          Add an ability
        </button>
      </div>
    </div>
    <hr class="mt-2" />
    <div id="user-path">
      <div class="text-lg font-bold mt-4 mb-2">Path to Glory:</div>
      <div class="grid grid-cols-4">
        <span>Name: </span>
        <input v-model="state.hero.path.name" type="text" class="col-span-3" />
      </div>
      <div class="grid grid-cols-4">
        <span>Rule: </span>
        <textarea
          v-model="state.hero.path.rule"
          type="text"
          class="col-span-3"
        />
      </div>
    </div>
  </div>
</template>
