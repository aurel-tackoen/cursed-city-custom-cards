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
    class="drop-shadow-lg border relative font-Cardo rounded-3xl overflow-hidden mx-auto"
    style="width: 915px"
  >
    <div id="hero-background-normal" class="">
      <img
        class=""
        src="@/assets/pictures/hero-background-normal.png"
        width="915"
        alt="Hero Background"
      />
    </div>
    <div
      id="hero-picture"
      class="absolute rounded-tr-full rounded-bl-full rounded-br-full overflow-hidden flex items-center"
      style="top: -26px; left: -20px; width: 292px; height: 292px"
    >
      <img
        :src="hero.picture"
        alt="Hero Picture"
        class="max-w-max"
        style="margin-top: 120px; margin-left: -50px; height: 500px"
      />
    </div>
    <div
      id="hero-stats"
      class="absolute text-black w-12 grid grid-cols-2 text-2xl"
      style="top: 305px; left: 83px; width: 104px; height: 106px"
    >
      <div class="col-span-2 flex justify-center font-semibold mb-1">
        {{ hero.stats.move }}/{{ hero.stats.run }}
      </div>
      <div class="flex justify-start">
        <DiceD6 v-if="hero.stats.agility === 'd6'" class="w-6 h-6 mt-2 mb-2" />
        <DiceD8 v-if="hero.stats.agility === 'd8'" class="w-6 h-6 mt-2 mb-2" />
        <DiceD12
          v-if="hero.stats.agility === 'd12'"
          class="w-6 h-6 mt-2 mb-2"
        />
      </div>
      <div class="flex justify-end">
        <DiceD6 v-if="hero.stats.vitality === 'd6'" class="w-6 h-6 mt-2 mb-2" />
        <DiceD8 v-if="hero.stats.vitality === 'd8'" class="w-6 h-6 mt-2 mb-2" />
        <DiceD12
          v-if="hero.stats.vitality === 'd12'"
          class="w-6 h-6 mt-2 mb-2"
        />
      </div>
      <div class="col-span-2 flex justify-center">
        <DiceD6 v-if="hero.stats.defence === 'd6'" class="w-6 h-6 mt-2 mb-2" />
        <DiceD8 v-if="hero.stats.defence === 'd8'" class="w-6 h-6 mt-2 mb-2" />
        <DiceD12
          v-if="hero.stats.defence === 'd12'"
          class="w-6 h-6 mt-2 mb-2"
        />
      </div>
    </div>
    <div
      id="hero-name"
      class="absolute text-center text-4xl leading-none font-semibold"
      style="top: 60px; left: 320px; width: 520px; height: 34px"
    >
      <div>{{ hero.name }}</div>
    </div>
    <div
      id="hero-tags"
      class="absolute text-center text-lg italic leading-none font-semibold"
      style="top: 96px; left: 320px; width: 520px; height: 20px"
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
      style="top: 118px; left: 320px; width: 520px; height: 16px"
    >
      <div>
        Size: <span class="capitalize">{{ hero.size }}</span>
      </div>
    </div>
    <div
      id="hero-weapons"
      class="absolute"
      style="top: 290px; left: 300px; width: 560px"
    >
      <div>
        <div
          v-for="(weapon, index) in hero.weapons"
          :key="weapon.name"
          class="text-base font-semibold flex justify-center items-center h-7 -ml-4 pl-4"
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
          <div v-for="(note, index) in hero.notes" :key="index">
            <sup>{{ index + 1 }}</sup
            >&nbsp;
            <span class="font-semibold">{{ note.name }}</span>
            {{ note.rule }}
          </div>
        </div>
      </div>
      <div class="mt-2 w-full text-center text-lg uppercase leading-none">
        Unique Abilities
      </div>
      <div class="text-sm">
        <div v-for="ability in hero.abilities" :key="ability.name">
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
      <strong>{{ hero.path.name }}: </strong>{{ hero.path.rule }}
    </div>
  </div>
</template>
