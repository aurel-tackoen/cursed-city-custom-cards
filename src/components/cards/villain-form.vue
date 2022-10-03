<script setup>
  import { computed, toRaw } from 'vue';
  import Slider from '@vueform/slider';
  import draggable from 'vuedraggable';
  import Multiselect from '@vueform/multiselect';
  import { v4 as uuidv4 } from 'uuid';
  import FormCard from '@/components/layout/form-card.vue';
  import DocMarkdown from '@/components/layout/doc-markdown.vue';
  import DocPicture from '@/components/layout/doc-picture.vue';
  import DocWeapons from '@/components/layout/doc-weapons.vue';
  const props = defineProps({
    status: String,
    villain: {
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
  const emit = defineEmits(['update:villain']);
  const villain = computed({
    get: () => props.villain,
    set: (value) => emit('update:villain', value),
  });
  async function remove(target, index) {
    if (confirm('Are you sure you want to delete this?') == true) {
      villain.value[props.status][target].splice(index, 1);
    }
  }
  const defaultWeapon = {
    name: '',
    type: 'melee',
    dices: '',
    damages: {
      base: 1,
      critical: 1,
    },
    notes: [],
  };
  const defaultNotes = {
    name: '',
    rule: '',
  };
  const defaultspecials = {
    name: '',
    rule: '',
  };
  const defaultBehaviours = {
    roll: '',
    name: '',
    rule: '',
  };
  function getError(path) {
    return props?.errors.find((e) => e.path === path);
  }
  function copy(item) {
    return structuredClone(toRaw(item));
  }
  function clone(item) {
    if (confirm('Are you sure you want to copy this?') == true) {
      return structuredClone(toRaw(item));
    }
  }
</script>
<template>
  <div class="mx-auto space-y-4">
    <FormCard id="user-picture" title="Picture">
      <div class="flex w-full bg-white">
        <div class="grow space-y-3">
          <div class="grid grid-cols-5">
            <span class="flex items-center">Picture: </span>
            <input
              id="pictureInput"
              v-model="villain.picture.url"
              type="url"
              pattern="https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)(.jpg|.png|.gif)"
              class="col-span-4 rounded border border-slate-300 bg-white outline-none"
              :class="{
                'border-red-800': getError('picture.url'),
              }"
            />
            <span
              class="col-span-4 col-start-2 text-xs uppercase text-red-800"
              v-if="getError('picture.url')"
              >{{ getError('picture.url').message }}</span
            >
          </div>
          <hr class="border border-dashed border-slate-200" />
          <div class="grid grid-cols-5">
            <span class="flex items-center">Picture Offset X/Y: </span>
            <div
              v-if="villain.picture.offsetX !== undefined"
              class="col-span-2 mt-8 pr-2"
            >
              <Slider
                :lazy="false"
                v-model="villain.picture.offsetX"
                :min="-200"
                :max="100"
              />
            </div>
            <div v-else class="col-span-2">
              <input
                v-model="villain.picture.offsetX"
                type="number"
                class="col-span-2 ml-1 rounded border border-slate-300 bg-white outline-none"
              />
            </div>
            <div
              v-if="villain.picture.offsetY !== undefined"
              class="col-span-2 mt-8 pl-4"
            >
              <Slider
                :lazy="false"
                v-model="villain.picture.offsetY"
                :min="-200"
                :max="400"
              />
            </div>
            <div v-else class="col-span-2">
              <input
                v-model="villain.picture.offsetY"
                type="number"
                class="col-span-2 ml-1 rounded border border-slate-300 bg-white outline-none"
              />
            </div>
            <div
              v-if="getError('picture.offsetX')"
              class="col-span-4 col-start-2"
            >
              <span class="text-xs uppercase text-red-800">{{
                getError('picture.offsetX').message
              }}</span>
            </div>
            <div
              v-if="getError('picture.offsetY')"
              class="col-span-4 col-start-2"
            >
              <span class="text-xs uppercase text-red-800">{{
                getError('picture.offsetY').message
              }}</span>
            </div>
          </div>
          <div class="grid grid-cols-5">
            <span class="flex items-center">Picture Zoom: </span>
            <div
              v-if="villain.picture.zoom !== undefined"
              class="col-span-4 mt-8"
            >
              <Slider
                :lazy="false"
                v-model="villain.picture.zoom"
                :min="0"
                :max="5"
                :step="-1"
              />
            </div>
            <div v-else class="col-span-4">
              <input
                v-model="villain.picture.zoom"
                type="number"
                class="col-span-2 ml-1 rounded border border-slate-300 bg-white outline-none"
              />
            </div>
            <span
              class="col-span-4 col-start-2 text-xs uppercase text-red-800"
              v-if="getError('picture.zoom')"
              >{{ getError('picture.zoom').message }}</span
            >
          </div>
          <hr class="border border-dashed border-slate-200" />
          <div class="grid grid-cols-5">
            <span class="flex items-center">Small Picture Offset X/Y: </span>
            <div
              v-if="villain.picture.small_offsetX !== undefined"
              class="col-span-2 mt-8 pr-2"
            >
              <Slider
                :lazy="false"
                v-model="villain.picture.small_offsetX"
                :min="-200"
                :max="100"
              />
            </div>
            <div v-else class="col-span-2">
              <input
                v-model="villain.picture.small_offsetX"
                type="number"
                class="col-span-2 ml-1 rounded border border-slate-300 bg-white outline-none"
              />
            </div>
            <div
              v-if="villain.picture.small_offsetY !== undefined"
              class="col-span-2 mt-8 pl-4"
            >
              <Slider
                :lazy="false"
                v-model="villain.picture.small_offsetY"
                :min="-200"
                :max="400"
              />
            </div>
            <div v-else class="col-span-2">
              <input
                v-model="villain.picture.small_offsetY"
                type="number"
                class="col-span-2 ml-1 rounded border border-slate-300 bg-white outline-none"
              />
            </div>
            <div
              v-if="getError('picture.small_offsetX')"
              class="col-span-4 col-start-2"
            >
              <span class="text-xs uppercase text-red-800">{{
                getError('picture.small_offsetX').message
              }}</span>
            </div>
            <div
              v-if="getError('picture.small_offsetY')"
              class="col-span-4 col-start-2"
            >
              <span class="text-xs uppercase text-red-800">{{
                getError('picture.small_offsetY').message
              }}</span>
            </div>
          </div>
          <div class="grid grid-cols-5">
            <span class="flex items-center">Picture Zoom: </span>
            <div
              v-if="villain.picture.small_zoom !== undefined"
              class="col-span-4 mt-8"
            >
              <Slider
                :lazy="false"
                v-model="villain.picture.small_zoom"
                :min="0"
                :max="10"
                :step="-1"
              />
            </div>
            <div v-else class="col-span-4">
              <input
                v-model="villain.picture.small_zoom"
                type="number"
                class="col-span-2 ml-1 rounded border border-slate-300 bg-white outline-none"
              />
            </div>
            <span
              class="col-span-4 col-start-2 text-xs uppercase text-red-800"
              v-if="getError('picture.small_zoom')"
              >{{ getError('picture.small_zoom').message }}</span
            >
          </div>
        </div>
        <div
          class="-mr-4 w-12 flex-row items-center justify-center text-center"
        >
          <DocPicture />
        </div>
      </div>
    </FormCard>
    <FormCard id="user-villain" title="Villain">
      <div class="flex w-full bg-white">
        <div class="grow space-y-3">
          <div class="grid grid-cols-5">
            <span class="flex items-center">Name: </span>
            <input
              v-model="villain.name"
              type="text"
              class="col-span-4 rounded border border-slate-300 bg-white outline-none"
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
                v-model="villain.tags"
                mode="tags"
                :object="true"
                :close-on-select="false"
                :create-option="true"
                :caret="false"
                :searchable="true"
                :classes="{
                  tag: `
                    bg-red-500 text-white text-sm font-semibold py-0.5 pl-2 rounded mr-1 mb-1 flex items-center 
                    whitespace-nowrap rtl:pl-0 rtl:pr-2 rtl:mr-0 rtl:ml-1
                  `,
                  tagRemoveIcon: `
                    bg-multiselect-remove bg-center bg-no-repeat opacity-100 inline-block w-3 h-3 group-hover:opacity-60
                  `,
                  tagsSearch: `
                    absolute inset-0 border-0 outline-none focus:ring-0 appearance-none p-0 text-base
                    font-sans box-border w-full
                  `,
                }"
              ></Multiselect>
            </div>
          </div>
          <div class="grid grid-cols-5">
            <span class="flex items-center">Move / Run: </span>
            <input
              v-model="villain[status].stats.move"
              type="number"
              class="col-span-2 mr-1 rounded border border-slate-300 bg-white outline-none"
              :class="{
                'border-red-800': getError(`${status}.stats.move`),
              }"
            />
            <input
              v-model="villain[status].stats.run"
              type="number"
              class="col-span-2 ml-1 rounded border border-slate-300 bg-white outline-none"
              :class="{
                'border-red-800': getError(`${status}.stats.run`),
              }"
            />
            <span
              class="col-span-4 col-start-2 text-xs uppercase text-red-800"
              v-if="getError(`${status}.stats.move`)"
              >{{ getError(`${status}.stats.move`).message }}</span
            >
            <span
              class="col-span-4 col-start-2 text-xs uppercase text-red-800"
              v-if="getError(`${status}.stats.run`)"
              >{{ getError(`${status}.stats.run`).message }}</span
            >
          </div>
          <div class="grid grid-cols-5">
            <span class="flex items-center">Wounds: </span>
            <input
              v-model="villain[status].stats.wounds"
              type="number"
              class="col-span-4 rounded border border-slate-300 bg-white outline-none"
              :class="{
                'border-red-800': getError(`${status}.stats.wounds`),
              }"
            />
            <span
              class="col-span-4 col-start-2 text-xs uppercase text-red-800"
              v-if="getError(`${status}.stats.agility`)"
              >{{ getError(`${status}.stats.agility`).message }}</span
            >
          </div>
          <div class="grid grid-cols-5">
            <span class="flex items-center">Size: </span>
            <select
              v-model="villain.size"
              class="col-span-4 rounded border border-slate-300 bg-white outline-none"
              :class="{
                'border-red-800': getError('size'),
              }"
            >
              <option value="small">Small</option>
              <option value="large">Large</option>
            </select>
            <span
              class="col-span-4 col-start-2 text-xs uppercase text-red-800"
              v-if="getError('size')"
              >{{ getError('size').message }}</span
            >
          </div>
          <div class="grid grid-cols-5">
            <span class="flex items-center">Defence: </span>
            <input
              v-model="villain[status].stats.defence"
              type="number"
              class="col-span-4 rounded border border-slate-300 bg-white outline-none"
              :class="{
                'border-red-800': getError(`${status}.stats.defence`),
              }"
            />
            <span
              class="col-span-4 col-start-2 text-xs uppercase text-red-800"
              v-if="getError(`${status}.stats.vitality`)"
              >{{ getError(`${status}.stats.vitality`).message }}</span
            >
          </div>
        </div>
        <div
          class="-mr-4 w-12 flex-row items-center justify-center text-center"
        ></div>
      </div>
    </FormCard>
    <FormCard id="user-weapons" title="Weapons">
      <draggable
        v-model="villain[status].weapons"
        :item-key="uuidv4()"
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
                  class="col-span-4 rounded border border-slate-300 bg-white outline-none"
                />
              </div>
              <div class="grid grid-cols-5">
                <span class="flex items-center">Activation / Type: </span>
                <select
                  v-model="weapon.type"
                  class="col-span-4 rounded border border-slate-300 bg-white outline-none"
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
                  class="col-span-2 mr-1 rounded border border-slate-300 bg-white outline-none"
                >
                  <option value="d6">D6 (Square)</option>
                  <option value="d8">D8 (Triangle)</option>
                  <option value="d12">D12 (Pentagone)</option>
                </select>
                <select
                  v-model="weapon.dice2"
                  class="col-span-2 ml-1 rounded border border-slate-300 bg-white outline-none"
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
                  class="col-span-2 mr-1 rounded border border-slate-300 bg-white outline-none"
                />
                <input
                  v-model="weapon.damages.critical"
                  type="number"
                  class="col-span-2 ml-1 rounded border border-slate-300 bg-white outline-none"
                />
              </div>
              <div class="grid grid-cols-5">
                <span class="flex items-center">Notes: </span>
                <select
                  multiple
                  class="col-span-4 h-14 rounded border border-slate-300 bg-white outline-none"
                  v-model="weapon.notes"
                >
                  <option
                    v-for="(note, index) in villain[status].notes"
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
              <DocWeapons />
              <div class="handle cursor-move">
                <fa-icon
                  class="fa-fw text-slate-500 hover:text-red-700"
                  :icon="['fas', 'line-height']"
                  title="Drag to reorder"
                />
              </div>
              <button @click="remove('weapons', index)">
                <fa-icon
                  class="fa-fw text-slate-500 hover:text-red-700"
                  :icon="['fas', 'trash']"
                  title="Delete this weapon"
                />
              </button>
            </div>
          </div>
        </template>
      </draggable>
      <div class="flex items-center justify-center">
        <button
          class="fa-fw text-slate-300 hover:text-red-700"
          @click="villain[status].weapons.push(copy(defaultWeapon))"
          title="Add a weapon"
        >
          <fa-icon class="fa-fw" :icon="['fas', 'plus-large']" />
        </button>
        <button
          v-if="status === 'empowered'"
          @click="villain.empowered.weapons = clone(villain.normal.weapons)"
          title="Copy weapons from normal"
        >
          <fa-icon
            class="fa-fw text-gray-300 hover:text-red-700"
            :icon="['fas', 'copy']"
          />
        </button>
      </div>
    </FormCard>
    <FormCard id="user-weapons-notes" title="Weapons Notes">
      <draggable
        v-model="villain[status].notes"
        :item-key="uuidv4()"
        handle=".handle"
      >
        <template #item="{ element: note, index }">
          <div class="mb-2 flex w-full border-b-2 border-dashed bg-white pb-2">
            <div class="grow space-y-3">
              <div class="grid grid-cols-5">
                <span class="flex items-center">Name: </span>
                <input
                  v-model="note.name"
                  type="text"
                  class="col-span-4 rounded border border-slate-300 bg-white outline-none"
                />
              </div>
              <div class="grid grid-cols-5">
                <span class="flex items-center">Rule: </span>
                <textarea
                  v-model="note.rule"
                  type="text"
                  class="col-span-4 rounded border border-slate-300 bg-white outline-none"
                />
              </div>
            </div>
            <div
              class="-mr-4 w-12 flex-row items-center justify-center text-center"
            >
              <DocWeapons />
              <DocMarkdown />
              <div class="handle cursor-move">
                <fa-icon
                  class="fa-fw text-slate-500 hover:text-red-700"
                  :icon="['fas', 'line-height']"
                  title="Drag to reorder"
                />
              </div>
              <button @click="remove('notes', index)">
                <fa-icon
                  class="fa-fw text-slate-500 hover:text-red-700"
                  :icon="['fas', 'trash']"
                  title="Delete this note"
                />
              </button>
            </div>
          </div>
        </template>
      </draggable>
      <div class="flex items-center justify-center">
        <button
          class="fa-fw text-slate-300 hover:text-red-700"
          @click="villain[status].notes.push(copy(defaultNotes))"
          title="Add a new note"
        >
          <fa-icon class="fa-fw" :icon="['fas', 'plus-large']" />
        </button>
        <button
          v-if="status === 'empowered'"
          @click="villain.empowered.notes = clone(villain.normal.notes)"
          title="Copy notes from normal"
        >
          <fa-icon
            class="fa-fw text-gray-300 hover:text-red-700"
            :icon="['fas', 'copy']"
          />
        </button>
      </div>
    </FormCard>
    <FormCard id="user-specials" title="Unique specials">
      <draggable
        v-model="villain[status].specials"
        :item-key="uuidv4()"
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
                  class="col-span-4 rounded border border-slate-300 bg-white outline-none"
                />
              </div>
              <div class="grid grid-cols-5">
                <span class="flex items-center">Rule: </span>
                <textarea
                  v-model="ability.rule"
                  type="text"
                  class="col-span-4 rounded border border-slate-300 bg-white outline-none"
                />
              </div>
            </div>
            <div
              class="-mr-4 w-12 flex-row items-center justify-center text-center"
            >
              <DocMarkdown />
              <div class="handle cursor-move">
                <fa-icon
                  class="fa-fw text-slate-500 hover:text-red-700"
                  :icon="['fas', 'line-height']"
                  title="Drag to reorder"
                />
              </div>
              <button @click="remove('specials', index)">
                <fa-icon
                  class="fa-fw text-slate-500 hover:text-red-700"
                  :icon="['fas', 'trash']"
                  title="Delete an ability"
                />
              </button>
            </div>
          </div>
        </template>
      </draggable>
      <div class="flex items-center justify-center">
        <button
          class="fa-fw text-slate-300 hover:text-red-700"
          @click="villain[status].specials.push(copy(defaultspecials))"
          title="Add a new ability"
        >
          <fa-icon class="fa-fw" :icon="['fas', 'plus-large']" />
        </button>
        <button
          v-if="status === 'empowered'"
          @click="villain.empowered.specials = clone(villain.normal.specials)"
          title="Copy specials from normal"
        >
          <fa-icon
            class="fa-fw text-gray-300 hover:text-red-700"
            :icon="['fas', 'copy']"
          />
        </button>
      </div>
    </FormCard>
    <FormCard id="user-behaviours" title="Behaviours">
      <draggable
        v-model="villain[status].behaviours"
        :item-key="uuidv4()"
        handle=".handle"
      >
        <template #item="{ element: ability, index }">
          <div class="mb-2 flex w-full border-b-2 border-dashed bg-white pb-2">
            <div class="grow space-y-3">
              <div class="grid grid-cols-5">
                <span class="flex items-center">Roll: </span>
                <input
                  v-model="ability.roll"
                  type="text"
                  class="col-span-4 rounded border border-slate-300 bg-white outline-none"
                />
              </div>
              <div class="grid grid-cols-5">
                <span class="flex items-center">Name: </span>
                <input
                  v-model="ability.name"
                  type="text"
                  class="col-span-4 rounded border border-slate-300 bg-white outline-none"
                />
              </div>
              <div class="grid grid-cols-5">
                <span class="flex items-center">Rule: </span>
                <textarea
                  v-model="ability.rule"
                  type="text"
                  class="col-span-4 rounded border border-slate-300 bg-white outline-none"
                />
              </div>
            </div>
            <div
              class="-mr-4 w-12 flex-row items-center justify-center text-center"
            >
              <DocMarkdown />
              <div class="handle cursor-move">
                <fa-icon
                  class="fa-fw text-slate-500 hover:text-red-700"
                  :icon="['fas', 'line-height']"
                  title="Drag to reorder"
                />
              </div>
              <button @click="remove('behaviours', index)">
                <fa-icon
                  class="fa-fw text-slate-500 hover:text-red-700"
                  :icon="['fas', 'trash']"
                  title="Delete an ability"
                />
              </button>
            </div>
          </div>
        </template>
      </draggable>
      <div class="flex items-center justify-center">
        <button
          class="fa-fw text-slate-300 hover:text-red-700"
          @click="villain[status].behaviours.push(copy(defaultBehaviours))"
          title="Add a new ability"
        >
          <fa-icon class="fa-fw" :icon="['fas', 'plus-large']" />
        </button>
        <button
          v-if="status === 'empowered'"
          @click="
            villain.empowered.behaviours = clone(villain.normal.behaviours)
          "
          title="Copy behaviours from normal"
        >
          <fa-icon
            class="fa-fw text-gray-300 hover:text-red-700"
            :icon="['fas', 'copy']"
          />
        </button>
      </div>
    </FormCard>
  </div>
</template>

<style scoped>
  #pictureInput:invalid {
    outline: 2px solid red;
  }
</style>
