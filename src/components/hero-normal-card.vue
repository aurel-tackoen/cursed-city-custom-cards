<script setup>
import DiceD6 from '@/components/dices/dice-d6.vue';
import DiceD8 from '@/components/dices/dice-d8.vue';
import DiceD12 from '@/components/dices/dice-d12.vue';
defineProps({
  hero: Object,
});
</script>
<template>
  <div
    class="drop-shadow-lg border relative font-Cardo rounded-3xl mx-auto bg-white"
  >
    <div id="hero-background-normal" class="-mt-6 -mb-4 -mx-4">
      <img
        class=""
        src="@/assets/pictures/hero-background-normal.png"
        alt="Hero Background"
        style="width: 241mm; height: 178mm"
      />
    </div>
    <div
      class="absolute top-0 z-40 h-full w-full border-2 border-gray-400 rounded-3xl"
    ></div>
    <div
      id="hero-picture"
      class="absolute rounded-full overflow-hidden flex items-center"
      style="top: -50px; left: -35px; width: 290px; height: 290px"
    >
      <img
        :src="hero.picture.url"
        alt="Hero Picture"
        class="max-w-max"
        :style="`transform: scale(${hero.picture.zoom});margin-top: ${hero.picture.offsetY}px; margin-left: ${hero.picture.offsetX}px; height: 500px`"
      />
    </div>
    <div
      id="hero-stats"
      class="absolute text-black w-12 grid grid-cols-2 text-2xl"
      style="top: 285px; left: 70px; width: 100px"
    >
      <div class="col-span-2 flex justify-center font-semibold mt-px mb-px">
        {{ hero.normal.stats.move
        }}<span v-if="hero.normal.stats.move && hero.normal.stats.run">/</span
        >{{ hero.normal.stats.run }}
      </div>
      <div class="flex justify-start mt-2">
        <DiceD6 v-if="hero.normal.stats.agility === 'd6'" class="w-6 h-6" />
        <DiceD8 v-if="hero.normal.stats.agility === 'd8'" class="w-6 h-6" />
        <DiceD12 v-if="hero.normal.stats.agility === 'd12'" class="w-6 h-6" />
      </div>
      <div class="flex justify-end mt-2">
        <DiceD6 v-if="hero.normal.stats.vitality === 'd6'" class="w-6 h-6" />
        <DiceD8 v-if="hero.normal.stats.vitality === 'd8'" class="w-6 h-6" />
        <DiceD12 v-if="hero.normal.stats.vitality === 'd12'" class="w-6 h-6" />
      </div>
      <div class="col-span-2 flex justify-center mt-3">
        <DiceD6 v-if="hero.normal.stats.defence === 'd6'" class="w-6 h-6" />
        <DiceD8 v-if="hero.normal.stats.defence === 'd8'" class="w-6 h-6" />
        <DiceD12 v-if="hero.normal.stats.defence === 'd12'" class="w-6 h-6" />
      </div>
    </div>
    <div
      id="hero-name"
      class="absolute text-center text-4xl leading-none font-semibold"
      style="top: 38px; left: 294px; width: 520px; height: 34px"
    >
      <div>{{ hero.name }}</div>
    </div>
    <div
      id="hero-tags"
      class="absolute text-center text-lg italic leading-none font-semibold"
      style="top: 74px; left: 294px; width: 520px; height: 20px"
    >
      <div>
        <span v-for="(tag, index) in hero.tags" :key="tag.name">
          {{ tag.label }}<span v-if="index < hero.tags.length - 1">, </span>
        </span>
      </div>
    </div>
    <div
      id="hero-tags"
      class="absolute text-center text-base italic text-red-800 leading-none"
      style="top: 96px; left: 294px; width: 520px; height: 16px"
    >
      <div v-if="hero.size">
        Size: <span class="capitalize">{{ hero.size }}</span>
      </div>
    </div>
    <div
      id="hero-weapons"
      class="absolute"
      style="top: 265px; left: 292px; width: 560px"
    >
      <div>
        <div
          v-for="(weapon, index) in hero.normal.weapons"
          :key="weapon.name"
          class="text-base font-semibold flex justify-center items-center h-7 -ml-4 pl-4"
          :class="{ 'bg-gray-100': index % 2 !== 0 }"
        >
          <div class="w-64 pl-1">
            {{ weapon.name }} ({{ weapon.activation }}+)<sup
              v-for="note in weapon.notes"
              :key="note"
              class="ml-1"
              >{{ note }}</sup
            >
          </div>
          <div class="w-24 text-center capitalize">{{ weapon.type }}</div>
          <div class="w-20 flex justify-center pr-3">
            <DiceD6 v-if="weapon.dice1 === 'd6'" class="w-4 h-4" />
            <DiceD8 v-if="weapon.dice1 === 'd8'" class="w-4 h-4" />
            <DiceD12 v-if="weapon.dice1 === 'd12'" class="w-4 h-4" />
            <DiceD6 v-if="weapon.dice2 === 'd6'" class="w-4 h-4 ml-1" />
            <DiceD8 v-if="weapon.dice2 === 'd8'" class="w-4 h-4 ml-1" />
            <DiceD12 v-if="weapon.dice2 === 'd12'" class="w-4 h-4 ml-1" />
          </div>
          <div class="w-28 text-center">
            {{ weapon.damages.base }}/{{ weapon.damages.critical }}
          </div>
        </div>
        <div class="mt-1 text-xs leading-snug">
          <div v-for="(note, index) in hero.normal.notes" :key="index">
            <sup class="mr-0.5">{{ index + 1 }}</sup>
            <span v-if="note.name" class="font-semibold">{{ note.name }}: </span
            >{{ note.rule }}
          </div>
        </div>
      </div>
      <div
        v-if="hero.normal.abilities.length > 0"
        class="mt-2 mb-px w-full text-center text-lg uppercase leading-none"
      >
        Unique Abilities
      </div>
      <div class="text-sm space-y-0.5">
        <div v-for="ability in hero.normal.abilities" :key="ability.name">
          <strong v-if="ability.name">{{ ability.name }}: </strong
          >{{ ability.rule }}
        </div>
      </div>
    </div>
    <div
      id="hero-path"
      class="absolute text-sm text-center leading-none"
      style="top: 544px; left: 292px; width: 522px; height: 40px"
    >
      <strong v-if="hero.normal.path.name">{{ hero.normal.path.name }}: </strong
      >{{ hero.normal.path.rule }}
    </div>
  </div>
</template>
