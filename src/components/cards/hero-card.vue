<script setup>
  import DiceD6 from '@/components/dices/dice-d6.vue';
  import DiceD8 from '@/components/dices/dice-d8.vue';
  import DiceD12 from '@/components/dices/dice-d12.vue';
  defineProps({
    hero: Object,
    status: String,
  });
</script>
<template>
  <div class="">
    <div
      class="relative mx-auto overflow-hidden rounded-2xl border bg-white font-Cardo"
    >
      <div class="-mx-4 -mt-6 -mb-4">
        <img
          v-if="status === 'normal'"
          src="@/assets/pictures/hero-background-normal.png"
          alt="Hero Background"
          style="width: 241mm; height: 178mm"
        />
        <img
          v-if="status === 'inspired'"
          src="@/assets/pictures/hero-background-inspired.png"
          alt="Hero Background"
          style="width: 241mm; height: 178mm"
        />
      </div>
      <div
        class="pointer-events-none absolute top-0 z-40 h-full w-full rounded-2xl border-2 border-slate-400"
      ></div>
      <div
        class="absolute flex items-center overflow-hidden rounded-full"
        style="top: -50px; left: -35px; width: 290px; height: 290px"
      >
        <img
          :src="hero.picture.url"
          alt="Hero Picture"
          class="max-w-max"
          :style="`
          transform: scale(${hero.picture.zoom});
          margin-top: ${hero.picture.offsetY}px;
          margin-left: ${hero.picture.offsetX}px;
          height: 500px
        `"
        />
      </div>
      <div
        v-if="hero[status] && hero[status].stats"
        class="absolute grid w-12 grid-cols-2 text-black"
        style="top: 280px; left: 70px; width: 100px"
      >
        <div
          class="col-span-2 mt-px mb-px flex justify-center text-[28px] font-bold leading-[32px]"
        >
          {{ hero[status].stats.move
          }}<span v-if="hero[status].stats.move && hero[status].stats.run"
            >/</span
          >{{ hero[status].stats.run }}
        </div>
        <div class="mt-2 flex justify-start">
          <DiceD6 v-if="hero[status].stats.agility === 'd6'" class="h-6 w-6" />
          <DiceD8 v-if="hero[status].stats.agility === 'd8'" class="h-6 w-6" />
          <DiceD12
            v-if="hero[status].stats.agility === 'd12'"
            class="h-6 w-6"
          />
        </div>
        <div class="mt-2 flex justify-end">
          <DiceD6 v-if="hero[status].stats.vitality === 'd6'" class="h-6 w-6" />
          <DiceD8 v-if="hero[status].stats.vitality === 'd8'" class="h-6 w-6" />
          <DiceD12
            v-if="hero[status].stats.vitality === 'd12'"
            class="h-6 w-6"
          />
        </div>
        <div class="col-span-2 mt-3 flex justify-center">
          <DiceD6 v-if="hero[status].stats.defence === 'd6'" class="h-6 w-6" />
          <DiceD8 v-if="hero[status].stats.defence === 'd8'" class="h-6 w-6" />
          <DiceD12
            v-if="hero[status].stats.defence === 'd12'"
            class="h-6 w-6"
          />
        </div>
      </div>
      <div
        id="hero-name"
        class="absolute text-center text-4xl font-semibold leading-none"
        style="top: 38px; left: 294px; width: 520px; height: 34px"
      >
        <div>{{ hero.name }}</div>
      </div>
      <div
        id="hero-tags"
        class="absolute text-center text-lg font-semibold italic leading-none"
        style="top: 74px; left: 294px; width: 520px; height: 20px"
      >
        <div>
          <span v-for="(tag, index) in hero.tags" :key="tag.name">
            {{ tag.label }}<span v-if="index < hero.tags.length - 1">, </span>
          </span>
          <span v-if="status === 'inspired'">, Inspired </span>
        </div>
      </div>
      <div
        id="hero-size"
        class="absolute text-center text-sm font-semibold italic leading-none text-red-800"
        style="top: 96px; left: 294px; width: 520px; height: 16px"
      >
        <div v-if="hero.size">
          Size: <span class="capitalize">{{ hero.size }}</span>
        </div>
      </div>
      <div class="absolute" style="top: 265px; left: 292px; width: 560px">
        <div v-if="hero[status] && hero[status].weapons">
          <div
            v-for="(weapon, index) in hero[status].weapons"
            :key="weapon.name"
            class="-ml-4 flex h-7 items-center justify-start text-base font-semibold"
            :class="{ 'bg-slate-100': index % 2 !== 0 }"
          >
            <div class="pl-4" style="width: 310px">
              {{ weapon.name }} ({{ weapon.activation }})<sup
                v-for="note in weapon.notes"
                :key="note"
                class="ml-1"
                >{{ note }}</sup
              >
            </div>
            <div style="width: 75px" class="capitalize">
              {{ weapon.type }}
            </div>
            <div
              style="width: 70px; margin-right: 25px"
              class="flex justify-center"
            >
              <DiceD6 v-if="weapon.dice1 === 'd6'" class="h-4 w-4" />
              <DiceD8 v-if="weapon.dice1 === 'd8'" class="h-4 w-4" />
              <DiceD12 v-if="weapon.dice1 === 'd12'" class="h-4 w-4" />
              <DiceD6 v-if="weapon.dice2 === 'd6'" class="ml-1 h-4 w-4" />
              <DiceD8 v-if="weapon.dice2 === 'd8'" class="ml-1 h-4 w-4" />
              <DiceD12 v-if="weapon.dice2 === 'd12'" class="ml-1 h-4 w-4" />
            </div>
            <div style="width: 70px" class="text-center">
              {{ weapon.damages.base }}/{{ weapon.damages.critical }}
            </div>
          </div>
          <div class="mt-2 text-xs leading-snug">
            <div v-for="(note, index) in hero[status].notes" :key="index">
              <sup class="mr-0.5">{{ index + 1 }}</sup>
              <span v-if="note.name" class="font-semibold"
                >{{ note.name }}: </span
              >{{ note.rule }}
            </div>
          </div>
        </div>
        <div v-if="hero[status] && hero[status].abilities">
          <div
            v-if="hero[status].abilities.length > 0"
            class="mt-3 mb-px w-full text-center text-lg uppercase leading-none"
          >
            Unique Abilities
          </div>
          <div class="space-y-1 text-sm">
            <div
              v-for="ability in hero[status].abilities"
              :key="ability.name"
              class="leading-tight"
            >
              <strong v-if="ability.name"
                >{{ ability.name }}
                <span v-if="ability.activation"
                  >({{ ability.activation }}+)</span
                >: </strong
              >{{ ability.rule }}
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="status === 'normal' && hero[status] && hero[status].path"
        class="absolute text-center text-sm leading-none"
        style="top: 544px; left: 292px; width: 522px; height: 40px"
      >
        <strong v-if="hero.normal.path.name"
          >{{ hero.normal.path.name }}: </strong
        >{{ hero.normal.path.rule }}
      </div>
    </div>
  </div>
</template>
