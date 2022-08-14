<script setup>
import { computed } from 'vue';
import Multiselect from '@vueform/multiselect';
const props = defineProps({
  hero: Object,
});
const emit = defineEmits(['update:hero']);
const hero = computed({
  get: () => props.hero,
  set: (value) => emit('update:hero', value),
});
</script>
<template>
  <div class="mx-auto" style="width: 915px">
    <div id="user-hero" class="space-y-3">
      <div class="text-lg font-semibold">Hero:</div>
      <div class="grid grid-cols-4">
        <span>Name: </span>
        <input v-model="hero.name" type="text" class="col-span-3" />
      </div>
      <div class="grid grid-cols-4">
        <span>Picture: </span>
        <input v-model="hero.picture" type="text" class="col-span-3" />
      </div>
      <div class="grid grid-cols-4">
        <span>Tags: </span>
        <div class="col-span-3">
          <Multiselect
            v-model="hero.tags"
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
        <select v-model="hero.size" class="col-span-3">
          <option value="small">Small</option>
          <option value="large">Large</option>
        </select>
      </div>
    </div>
    <hr class="my-4" />
    <div id="user-hero-stats" class="space-y-3">
      <div class="text-lg font-semibold">Hero Stats:</div>
      <div class="grid grid-cols-4">
        <span>Move: </span>
        <input v-model="hero.stats.move" type="number" class="col-span-3" />
      </div>
      <div class="grid grid-cols-4">
        <span>Run: </span>
        <input v-model="hero.stats.run" type="number" class="col-span-3" />
      </div>
      <div class="grid grid-cols-4">
        <span>Agility: </span>
        <select v-model="hero.stats.agility" class="col-span-3">
          <option value="d6">D6 (Square)</option>
          <option value="d8">D8 (Triangle)</option>
          <option value="d12">D12 (Pentagone)</option>
        </select>
      </div>
      <div class="grid grid-cols-4">
        <span>Vitality: </span>
        <input v-model="hero.stats.vitality" type="text" class="col-span-3" />
      </div>
      <div class="grid grid-cols-4">
        <span>Defence: </span>
        <input v-model="hero.stats.defence" type="text" class="col-span-3" />
      </div>
    </div>
    <hr class="my-4" />
    <div id="user-weapons" class="space-y-3">
      <div class="text-lg font-semibold">Weapons Stats:</div>
      <div
        v-for="weapon in hero.weapons"
        :key="weapon.name"
        class="pb-2 mb-2 border-b-2 border-dashed space-y-3"
      >
        <div class="grid grid-cols-4">
          <span>Name: </span>
          <input v-model="weapon.name" type="text" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4">
          <span>Activation: </span>
          <input v-model="weapon.activation" type="number" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4">
          <span>Notes: </span>
          <select multiple class="col-span-3" v-model="weapon.notes">
            <option
              v-for="(note, index) in hero.notes"
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
      </div>
      <div>
        <button
          class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm rounded-md bg-white hover:bg-gray-50"
          @click="
            hero.weapons.push({
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
      <hr class="my-4" />
      <div id="weapon-notes" class="space-y-3">
        <div class="text-lg font-semibold mb-2">Weapons Notes:</div>
        <div
          v-for="(note, index) in hero.notes"
          :key="note.name"
          class="pb-2 mb-2 border-b-2 border-dashed space-y-3"
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
        </div>
        <div>
          <button
            class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm rounded-md bg-white hover:bg-gray-50"
            @click="
              hero.notes.push({
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
    <hr class="my-4" />
    <div id="user-abilities" class="space-y-3">
      <div class="text-lg font-semibold mb-2">Unique Abilities:</div>
      <div
        v-for="ability in hero.abilities"
        :key="ability.name"
        class="pb-2 mb-2 border-b-2 border-dashed space-y-3"
      >
        <div class="grid grid-cols-4">
          <span>Name: </span>
          <input v-model="ability.name" type="text" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4">
          <span>Rule: </span>
          <textarea v-model="ability.rule" type="text" class="col-span-3" />
        </div>
      </div>
      <div>
        <button
          class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm rounded-md bg-white hover:bg-gray-50"
          @click="
            hero.abilities.push({
              name: '',
              rule: '',
            })
          "
        >
          Add an ability
        </button>
      </div>
    </div>
    <hr class="my-4" />
    <div id="user-path" class="space-y-3">
      <div class="text-lg font-semibold mb-2">Path to Glory:</div>
      <div class="grid grid-cols-4">
        <span>Name: </span>
        <input v-model="hero.path.name" type="text" class="col-span-3" />
      </div>
      <div class="grid grid-cols-4">
        <span>Rule: </span>
        <textarea v-model="hero.path.rule" type="text" class="col-span-3" />
      </div>
    </div>
  </div>
</template>
