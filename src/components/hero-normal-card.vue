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
    class="drop-shadow-lg border relative font-Cardo rounded-3xl mx-auto overflow-hidden"
    style="width: 881px; height: 645px"
  >
    <div id="hero-background-normal" class="-mt-6 -mb-4 -my-4">
      <img
        class=""
        src="@/assets/pictures/hero-background-normal.png"
        alt="Hero Background"
        style="width: 913px; height: 680px"
      />
    </div>
    <div
      id="hero-picture"
      class="absolute rounded-tr-full rounded-bl-full rounded-br-full overflow-hidden flex items-center"
      style="top: -48px; left: -18px; width: 280px; height: 290px"
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
      style="top: 285px; left: 80px; width: 100px"
    >
      <div class="col-span-2 flex justify-center font-semibold mt-px mb-px">
        {{ hero.stats.move
        }}<span v-if="hero.stats.move && hero.stats.run">/</span
        >{{ hero.stats.run }}
      </div>
      <div class="flex justify-start mt-2">
        <DiceD6 v-if="hero.stats.agility === 'd6'" class="w-6 h-6" />
        <DiceD8 v-if="hero.stats.agility === 'd8'" class="w-6 h-6" />
        <DiceD12 v-if="hero.stats.agility === 'd12'" class="w-6 h-6" />
      </div>
      <div class="flex justify-end mt-2">
        <DiceD6 v-if="hero.stats.vitality === 'd6'" class="w-6 h-6" />
        <DiceD8 v-if="hero.stats.vitality === 'd8'" class="w-6 h-6" />
        <DiceD12 v-if="hero.stats.vitality === 'd12'" class="w-6 h-6" />
      </div>
      <div class="col-span-2 flex justify-center mt-3">
        <DiceD6 v-if="hero.stats.defence === 'd6'" class="w-6 h-6" />
        <DiceD8 v-if="hero.stats.defence === 'd8'" class="w-6 h-6" />
        <DiceD12 v-if="hero.stats.defence === 'd12'" class="w-6 h-6" />
      </div>
    </div>
    <div
      id="hero-name"
      class="absolute text-center text-4xl leading-none font-semibold"
      style="top: 40px; left: 294px; width: 520px; height: 34px"
    >
      <div>{{ hero.name }}</div>
    </div>
    <div
      id="hero-tags"
      class="absolute text-center text-lg italic leading-none font-semibold"
      style="top: 78px; left: 294px; width: 520px; height: 20px"
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
      style="top: 98px; left: 294px; width: 520px; height: 16px"
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
          v-for="(weapon, index) in hero.weapons"
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
            {{ weapon.damages.normal }}/{{ weapon.damages.critical }}
          </div>
        </div>
        <div class="mt-1 text-xs leading-snug">
          <div v-for="(note, index) in hero.notes" :key="index">
            <sup class="mr-0.5">{{ index + 1 }}</sup>
            <span v-if="note.name" class="font-semibold">{{ note.name }}: </span
            >{{ note.rule }}
          </div>
        </div>
      </div>
      <div
        v-if="hero.abilities.length > 0"
        class="mt-3 mb-px w-full text-center text-lg uppercase leading-none"
      >
        Unique Abilities
      </div>
      <div class="text-sm space-y-0.5">
        <div v-for="ability in hero.abilities" :key="ability.name">
          <strong v-if="ability.name">{{ ability.name }}: </strong
          >{{ ability.rule }}
        </div>
      </div>
    </div>
    <div
      id="hero-path"
      class="absolute text-sm leading-4 text-center"
      style="top: 550px; left: 292px; width: 522px; height: 40px"
    >
      <strong v-if="hero.path.name">{{ hero.path.name }}: </strong
      >{{ hero.path.rule }}
    </div>
  </div>
</template>
