<script setup>
  import { computed } from 'vue';
  import draggable from 'vuedraggable';
  import Multiselect from '@vueform/multiselect';
  import FormCard from '@/components/layout/form-card.vue';
  const props = defineProps({
    status: String,
    hero: {
      type: Object,
      required: true,
    },
    errors: {
      type: Array,
      default() {
        return [];
      },
    },
  });
  const emit = defineEmits(['update:hero']);
  const hero = computed({
    get: () => props.hero,
    set: (value) => emit('update:hero', value),
  });
  const defaultWeapon = {
    name: '',
    activation: 1,
    type: 'melee',
    dices: '',
    damages: {
      base: 1,
      critical: 1,
    },
  };
  const defaultNotes = {
    name: '',
    rule: '',
  };
  const defaultAbilities = {
    name: '',
    rule: '',
  };
  const getError = (path) => {
    return props?.errors.find((e) => e.path === path);
  };
</script>
<template>
  <div class="mx-auto space-y-4">
    <FormCard id="user-hero" title="Hero">
      <div class="flex w-full bg-white">
        <div class="grow space-y-3">
          <div class="grid grid-cols-5">
            <span class="flex items-center">Name: </span>
            <input
              v-model="hero.name"
              type="text"
              class="col-span-4 rounded border border-gray-300 bg-white outline-none"
              :class="{
                'border-red-800': getError('name'),
              }"
            />
            <span
              class="col-span-4 col-start-2 text-xs uppercase text-red-800"
              v-if="getError('name')"
              >{{ getError('name').message }}</span
            >
          </div>
          <div class="grid grid-cols-5">
            <span class="flex items-center">Tags: </span>
            <div class="col-span-4">
              <Multiselect
                v-model="hero.tags"
                mode="tags"
                :object="true"
                :close-on-select="false"
                :create-option="true"
                :caret="false"
                :searchable="true"
                :classes="{
                  tag: 'bg-red-500 text-white text-sm font-semibold py-0.5 pl-2 rounded mr-1 mb-1 flex items-center whitespace-nowrap rtl:pl-0 rtl:pr-2 rtl:mr-0 rtl:ml-1',
                  tagRemoveIcon:
                    'bg-multiselect-remove bg-center bg-no-repeat opacity-100 inline-block w-3 h-3 group-hover:opacity-60',
                  tagsSearch:
                    'absolute inset-0 border-0 outline-none focus:ring-0 appearance-none p-0 text-base font-sans box-border w-full',
                }"
              ></Multiselect>
            </div>
          </div>
          <div class="grid grid-cols-5">
            <span class="flex items-center">Size: </span>
            <select
              v-model="hero.size"
              class="col-span-4 rounded border border-gray-300 bg-white outline-none"
            >
              <option value="small">Small</option>
              <option value="large">Large</option>
            </select>
          </div>
          <div class="grid grid-cols-5">
            <span class="flex items-center">Picture: </span>
            <input
              v-model="hero.picture.url"
              type="text"
              class="col-span-4 rounded border border-gray-300 bg-white outline-none"
              :class="{
                'border-red-800': getError('name'),
              }"
            />
            <span
              class="col-span-4 col-start-2 text-xs uppercase text-red-800"
              v-if="getError('picture.url')"
              >{{ getError('picture.url').message }}</span
            >
          </div>
          <div class="grid grid-cols-5">
            <span class="flex items-center">Picture Offset X/Y: </span>
            <input
              v-model="hero.picture.offsetX"
              type="number"
              class="col-span-2 mr-1 rounded border border-gray-300 bg-white outline-none"
            />
            <input
              v-model="hero.picture.offsetY"
              type="number"
              class="col-span-2 ml-1 rounded border border-gray-300 bg-white outline-none"
            />
          </div>
          <div class="grid grid-cols-5">
            <span class="flex items-center">Picture Zoom: </span>
            <input
              step="0.01"
              v-model="hero.picture.zoom"
              type="number"
              class="col-span-4 rounded border border-gray-300 bg-white outline-none"
            />
          </div>
        </div>
        <div
          class="-mr-4 w-12 flex-row items-center justify-center text-center"
        ></div>
      </div>
    </FormCard>
    <FormCard id="user-hero-stats" title="Hero Stats">
      <div class="flex w-full bg-white">
        <div class="grow space-y-3">
          <div class="grid grid-cols-5">
            <span class="flex items-center">Move / Run: </span>
            <input
              v-model="hero[status].stats.move"
              type="number"
              class="col-span-2 mr-1 rounded border border-gray-300 bg-white outline-none"
            />
            <input
              v-model="hero[status].stats.run"
              type="number"
              class="col-span-2 ml-1 rounded border border-gray-300 bg-white outline-none"
            />
          </div>
          <div class="grid grid-cols-5">
            <span class="flex items-center">Agility: </span>
            <select
              v-model="hero[status].stats.agility"
              class="col-span-4 rounded border border-gray-300 bg-white outline-none"
            >
              <option value="d6">D6 (Square)</option>
              <option value="d8">D8 (Triangle)</option>
              <option value="d12">D12 (Pentagone)</option>
            </select>
          </div>
          <div class="grid grid-cols-5">
            <span class="flex items-center">Vitality: </span>
            <select
              v-model="hero[status].stats.vitality"
              class="col-span-4 rounded border border-gray-300 bg-white outline-none"
            >
              <option value="d6">D6 (Square)</option>
              <option value="d8">D8 (Triangle)</option>
              <option value="d12">D12 (Pentagone)</option>
            </select>
          </div>
          <div class="grid grid-cols-5">
            <span class="flex items-center">Defence: </span>
            <select
              v-model="hero[status].stats.defence"
              class="col-span-4 rounded border border-gray-300 bg-white outline-none"
            >
              <option value="d6">D6 (Square)</option>
              <option value="d8">D8 (Triangle)</option>
              <option value="d12">D12 (Pentagone)</option>
            </select>
          </div>
        </div>
        <div
          class="-mr-4 w-12 flex-row items-center justify-center text-center"
        ></div>
      </div>
    </FormCard>
    <FormCard id="user-weapons" title="Weapons">
      <draggable
        v-model="hero[status].weapons"
        item-key="name"
        handle=".handle"
      >
        <template #item="{ element: weapon, index }">
          <div class="mb-2 flex w-full border-b-2 border-dashed bg-white pb-2">
            <div class="grow space-y-3">
              <div class="grid grid-cols-5">
                <span class="flex items-center">Name: </span>
                <input
                  v-model="weapon.name"
                  type="text"
                  class="col-span-4 rounded border border-gray-300 bg-white outline-none"
                />
              </div>
              <div class="grid grid-cols-5">
                <span class="flex items-center">Activation / Type: </span>
                <input
                  v-model="weapon.activation"
                  type="number"
                  class="col-span-2 mr-1 rounded border border-gray-300 bg-white outline-none"
                />
                <select
                  v-model="weapon.type"
                  class="col-span-2 ml-1 rounded border border-gray-300 bg-white outline-none"
                >
                  <option value="melee">Melee</option>
                  <option value="ranged">Ranged</option>
                  <option value="ranged">Dual</option>
                  <option value="area">Area</option>
                </select>
              </div>
              <div class="grid grid-cols-5">
                <span class="flex items-center">Dices: </span>
                <select
                  v-model="weapon.dice1"
                  class="col-span-2 mr-1 rounded border border-gray-300 bg-white outline-none"
                >
                  <option value="d6">D6 (Square)</option>
                  <option value="d8">D8 (Triangle)</option>
                  <option value="d12">D12 (Pentagone)</option>
                </select>
                <select
                  v-model="weapon.dice2"
                  class="col-span-2 ml-1 rounded border border-gray-300 bg-white outline-none"
                >
                  <option value="">None</option>
                  <option value="d6">D6 (Square)</option>
                  <option value="d8">D8 (Triangle)</option>
                  <option value="d12">D12 (Pentagone)</option>
                </select>
              </div>
              <div class="grid grid-cols-5">
                <span class="flex items-center">Damage / Critical: </span>
                <input
                  v-model="weapon.damages.base"
                  type="number"
                  class="col-span-2 mr-1 rounded border border-gray-300 bg-white outline-none"
                />
                <input
                  v-model="weapon.damages.critical"
                  type="number"
                  class="col-span-2 ml-1 rounded border border-gray-300 bg-white outline-none"
                />
              </div>
              <div class="grid grid-cols-5">
                <span class="flex items-center">Notes: </span>
                <select
                  multiple
                  class="col-span-4 h-14 rounded border border-gray-300 bg-white outline-none"
                  v-model="weapon.notes"
                >
                  <option
                    v-for="(note, index) in hero[status].notes"
                    :key="index"
                    :value="index + 1"
                  >
                    {{ index + 1 }} {{ note.name }}
                  </option>
                </select>
              </div>
            </div>
            <div
              class="-mr-4 w-12 flex-row items-center justify-center text-center"
            >
              <div class="handle cursor-move">
                <fa-icon
                  class="fa-fw text-gray-300 hover:text-red-700"
                  :icon="['fas', 'grip-vertical']"
                />
              </div>
              <button @click="hero[status].weapons.splice(index, 1)">
                <fa-icon
                  class="fa-fw text-gray-300 hover:text-red-700"
                  :icon="['fas', 'trash']"
                />
              </button>
            </div>
          </div>
        </template>
      </draggable>
      <div class="flex items-center justify-center">
        <button
          class="fa-fw text-gray-300 hover:text-red-700"
          @click="hero[status].weapons.push(defaultWeapon)"
        >
          <fa-icon class="fa-fw" :icon="['fas', 'plus-large']" />
        </button>
      </div>
    </FormCard>
    <FormCard id="user-weapons-notes" title="Weapons Notes">
      <draggable v-model="hero[status].notes" item-key="name" handle=".handle">
        <template #item="{ element: note, index }">
          <div class="mb-2 flex w-full border-b-2 border-dashed bg-white pb-2">
            <div class="grow space-y-3">
              <div class="grid grid-cols-5">
                <span class="flex items-center">Name: </span>
                <input
                  v-model="note.name"
                  type="text"
                  class="col-span-4 rounded border border-gray-300 bg-white outline-none"
                />
              </div>
              <div class="grid grid-cols-5">
                <span class="flex items-center">Rule: </span>
                <textarea
                  v-model="note.rule"
                  type="text"
                  class="col-span-4 rounded border border-gray-300 bg-white outline-none"
                />
              </div>
            </div>
            <div
              class="-mr-4 w-12 flex-row items-center justify-center text-center"
            >
              <div class="handle cursor-move">
                <fa-icon
                  class="fa-fw text-gray-300 hover:text-red-700"
                  :icon="['fas', 'grip-vertical']"
                />
              </div>
              <button @click="hero[status].notes.splice(index, 1)">
                <fa-icon
                  class="fa-fw text-gray-300 hover:text-red-700"
                  :icon="['fas', 'trash']"
                />
              </button>
            </div>
          </div>
        </template>
      </draggable>
      <div class="flex items-center justify-center">
        <button
          class="fa-fw text-gray-300 hover:text-red-700"
          @click="hero[status].notes.push(defaultNotes)"
        >
          <fa-icon class="fa-fw" :icon="['fas', 'plus-large']" />
        </button>
      </div>
    </FormCard>
    <FormCard id="user-abilities" title="Unique Abilities">
      <draggable
        v-model="hero[status].abilities"
        item-key="name"
        handle=".handle"
      >
        <template #item="{ element: ability, index }">
          <div class="mb-2 flex w-full border-b-2 border-dashed bg-white pb-2">
            <div class="grow space-y-3">
              <div class="grid grid-cols-5">
                <span class="flex items-center">Name: </span>
                <input
                  v-model="ability.name"
                  type="text"
                  class="col-span-4 rounded border border-gray-300 bg-white outline-none"
                />
              </div>
              <div class="grid grid-cols-5">
                <span class="flex items-center">Activation</span>
                <input
                  v-model="ability.activation"
                  type="number"
                  class="col-span-4 rounded border border-gray-300 bg-white outline-none"
                />
              </div>
              <div class="grid grid-cols-5">
                <span class="flex items-center">Rule: </span>
                <textarea
                  v-model="ability.rule"
                  type="text"
                  class="col-span-4 rounded border border-gray-300 bg-white outline-none"
                />
              </div>
            </div>
            <div
              class="-mr-4 w-12 flex-row items-center justify-center text-center"
            >
              <div class="handle cursor-move">
                <fa-icon
                  class="fa-fw text-gray-300 hover:text-red-700"
                  :icon="['fas', 'grip-vertical']"
                />
              </div>
              <button @click="hero[status].abilities.splice(index, 1)">
                <fa-icon
                  class="fa-fw text-gray-300 hover:text-red-700"
                  :icon="['fas', 'trash']"
                />
              </button>
            </div>
          </div>
        </template>
      </draggable>
      <div class="flex items-center justify-center">
        <button
          class="fa-fw text-gray-300 hover:text-red-700"
          @click="hero[status].abilities.push(defaultAbilities)"
        >
          <fa-icon class="fa-fw" :icon="['fas', 'plus-large']" />
        </button>
      </div>
    </FormCard>
    <FormCard v-if="status === 'normal'" id="user-path" title="Path to Glory">
      <div class="flex w-full bg-white">
        <div class="grow space-y-3">
          <div class="grid grid-cols-5">
            <span class="flex items-center">Name: </span>
            <input
              v-model="hero[status].path.name"
              type="text"
              class="col-span-4 rounded border border-gray-300 bg-white outline-none"
            />
          </div>
          <div class="grid grid-cols-5">
            <span class="flex items-center">Rule: </span>
            <textarea
              v-model="hero[status].path.rule"
              type="text"
              class="col-span-4 rounded border border-gray-300 bg-white outline-none"
            />
          </div>
        </div>
        <div
          class="-mr-4 w-12 flex-row items-center justify-center text-center"
        ></div>
      </div>
    </FormCard>
  </div>
</template>