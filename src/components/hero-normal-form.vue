<script setup>
import { computed } from 'vue';
import Multiselect from '@vueform/multiselect';
import FormCard from '@/components/layout/form-card.vue';
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
    <FormCard id="user-hero" title="Hero">
      <div class="grid grid-cols-4">
        <span class="flex items-center">Name: </span>
        <input
          v-model="hero.name"
          type="text"
          class="col-span-3 border border-gray-300 rounded bg-white outline-none"
        />
      </div>
      <div class="grid grid-cols-4">
        <span class="flex items-center">Picture: </span>
        <input
          v-model="hero.picture.url"
          type="text"
          class="col-span-3 border border-gray-300 rounded bg-white outline-none"
        />
      </div>
      <div class="grid grid-cols-4">
        <span class="flex items-center">Picture Offset X: </span>
        <input
          v-model="hero.picture.offsetX"
          type="number"
          class="col-span-3 border border-gray-300 rounded bg-white outline-none"
        />
      </div>
      <div class="grid grid-cols-4">
        <span class="flex items-center">Picture Offset Y: </span>
        <input
          v-model="hero.picture.offsetY"
          type="number"
          class="col-span-3 border border-gray-300 rounded bg-white outline-none"
        />
      </div>
      <div class="grid grid-cols-4">
        <span class="flex items-center">Tags: </span>
        <div class="col-span-3">
          <Multiselect
            v-model="hero.tags"
            mode="tags"
            :object="true"
            :close-on-select="false"
            :create-option="true"
            :caret="false"
            :searchable="true"
            :classes="{
              tag: 'bg-indigo-500 text-white text-sm font-semibold py-0.5 pl-2 rounded mr-1 mb-1 flex items-center whitespace-nowrap rtl:pl-0 rtl:pr-2 rtl:mr-0 rtl:ml-1',
              tagRemoveIcon:
                'bg-multiselect-remove bg-center bg-no-repeat opacity-100 inline-block w-3 h-3 group-hover:opacity-60',
              tagsSearch:
                'absolute inset-0 border-0 outline-none focus:ring-0 appearance-none p-0 text-base font-sans box-border w-full',
            }"
          ></Multiselect>
        </div>
      </div>
      <div class="grid grid-cols-4">
        <span class="flex items-center">Size: </span>
        <select
          v-model="hero.size"
          class="col-span-3 border border-gray-300 rounded bg-white outline-none"
        >
          <option value="small">Small</option>
          <option value="large">Large</option>
        </select>
      </div>
    </FormCard>
    <FormCard id="user-hero-stats" title="Hero Stats">
      <div class="grid grid-cols-4">
        <span class="flex items-center">Move: </span>
        <input
          v-model="hero.stats.move"
          type="number"
          class="col-span-3 border border-gray-300 rounded bg-white outline-none"
        />
      </div>
      <div class="grid grid-cols-4">
        <span class="flex items-center">Run: </span>
        <input
          v-model="hero.stats.run"
          type="number"
          class="col-span-3 border border-gray-300 rounded bg-white outline-none"
        />
      </div>
      <div class="grid grid-cols-4">
        <span class="flex items-center">Agility: </span>
        <select
          v-model="hero.stats.agility"
          class="col-span-3 border border-gray-300 rounded bg-white outline-none"
        >
          <option value="d6">D6 (Square)</option>
          <option value="d8">D8 (Triangle)</option>
          <option value="d12">D12 (Pentagone)</option>
        </select>
      </div>
      <div class="grid grid-cols-4">
        <span class="flex items-center">Vitality: </span>
        <select
          v-model="hero.stats.vitality"
          class="col-span-3 border border-gray-300 rounded bg-white outline-none"
        >
          <option value="d6">D6 (Square)</option>
          <option value="d8">D8 (Triangle)</option>
          <option value="d12">D12 (Pentagone)</option>
        </select>
      </div>
      <div class="grid grid-cols-4">
        <span class="flex items-center">Defence: </span>
        <select
          v-model="hero.stats.defence"
          class="col-span-3 border border-gray-300 rounded bg-white outline-none"
        >
          <option value="d6">D6 (Square)</option>
          <option value="d8">D8 (Triangle)</option>
          <option value="d12">D12 (Pentagone)</option>
        </select>
      </div>
    </FormCard>
    <FormCard id="user-weapons" title="Weapons">
      <div
        v-for="weapon in hero.weapons"
        :key="weapon.name"
        class="pb-2 mb-2 border-b-2 border-dashed space-y-3"
      >
        <div class="grid grid-cols-4">
          <span class="flex items-center">Name: </span>
          <input
            v-model="weapon.name"
            type="text"
            class="col-span-3 border border-gray-300 rounded bg-white outline-none"
          />
        </div>
        <div class="grid grid-cols-4">
          <span class="flex items-center">Activation: </span>
          <input
            v-model="weapon.activation"
            type="number"
            class="col-span-3 border border-gray-300 rounded bg-white outline-none"
          />
        </div>
        <div class="grid grid-cols-4">
          <span class="flex items-center">Notes: </span>
          <select
            multiple
            class="col-span-3 border border-gray-300 rounded bg-white outline-none"
            v-model="weapon.notes"
          >
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
          <span class="flex items-center">Type: </span>
          <select
            v-model="weapon.type"
            class="col-span-3 border border-gray-300 rounded bg-white outline-none"
          >
            <option value="melee">Melee</option>
            <option value="ranged">Ranged</option>
            <option value="area">Area</option>
          </select>
        </div>
        <div class="grid grid-cols-4">
          <span class="flex items-center">First Dice: </span>
          <select
            v-model="weapon.dice1"
            class="col-span-3 border border-gray-300 rounded bg-white outline-none"
          >
            <option value="d6">D6 (Square)</option>
            <option value="d8">D8 (Triangle)</option>
            <option value="d12">D12 (Pentagone)</option>
          </select>
        </div>
        <div class="grid grid-cols-4">
          <span class="flex items-center">Second Dice: </span>
          <select
            v-model="weapon.dice2"
            class="col-span-3 border border-gray-300 rounded bg-white outline-none"
          >
            <option value="">None</option>
            <option value="d6">D6 (Square)</option>
            <option value="d8">D8 (Triangle)</option>
            <option value="d12">D12 (Pentagone)</option>
          </select>
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
    </FormCard>
    <FormCard id="user-weapons-notes" title="Weapons Notes">
      <div
        v-for="(note, index) in hero.notes"
        :key="note.name"
        class="pb-2 mb-2 border-b-2 border-dashed space-y-3"
      >
        <div class="grid grid-cols-4">
          <span class="flex items-center">Code: </span>
          <span class="col-span-3">{{ index + 1 }}</span>
        </div>
        <div class="grid grid-cols-4">
          <span class="flex items-center">Name: </span>
          <input
            v-model="note.name"
            type="text"
            class="col-span-3 border border-gray-300 rounded bg-white outline-none"
          />
        </div>
        <div class="grid grid-cols-4">
          <span class="flex items-center">Rule: </span>
          <textarea
            v-model="note.rule"
            type="text"
            class="col-span-3 border border-gray-300 rounded bg-white outline-none"
          />
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
    </FormCard>
    <FormCard id="user-abilities" title="Abilities">
      <div
        v-for="ability in hero.abilities"
        :key="ability.name"
        class="pb-2 mb-2 border-b-2 border-dashed space-y-3"
      >
        <div class="grid grid-cols-4">
          <span class="flex items-center">Name: </span>
          <input
            v-model="ability.name"
            type="text"
            class="col-span-3 border border-gray-300 rounded bg-white outline-none"
          />
        </div>
        <div class="grid grid-cols-4">
          <span class="flex items-center">Rule: </span>
          <textarea
            v-model="ability.rule"
            type="text"
            class="col-span-3 border border-gray-300 rounded bg-white outline-none"
          />
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
    </FormCard>
    <FormCard id="user-path" title="Path to Glory">
      <div class="grid grid-cols-4">
        <span class="flex items-center">Name: </span>
        <input
          v-model="hero.path.name"
          type="text"
          class="col-span-3 border border-gray-300 rounded bg-white outline-none"
        />
      </div>
      <div class="grid grid-cols-4">
        <span class="flex items-center">Rule: </span>
        <textarea
          v-model="hero.path.rule"
          type="text"
          class="col-span-3 border border-gray-300 rounded bg-white outline-none"
        />
      </div>
    </FormCard>
  </div>
</template>
