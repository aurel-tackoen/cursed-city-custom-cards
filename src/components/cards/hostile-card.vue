<script setup>
  import { generateHtml } from '@/plugins/markdown.js';
  import DiceD6 from '/public/svg/dice-d6.svg';
  import DiceD8 from '/public/svg/dice-d8.svg';
  import DiceD12 from '/public/svg/dice-d12.svg';
  defineProps({
    hostile: Object,
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
          src="@/assets/pictures/hostile-background-normal.png"
          alt="Hostile Background"
          style="width: 178mm; height: 241mm"
        />
        <img
          v-if="status === 'empowered'"
          src="@/assets/pictures/hostile-background-empowered.png"
          alt="Hostile Background"
          style="width: 178mm; height: 241mm"
        />
      </div>
      <div
        class="pointer-events-none absolute top-0 z-40 h-full w-full rounded-2xl border-2 border-slate-400"
      ></div>
      <div
        class="absolute flex items-center overflow-hidden rounded-full"
        style="top: -67px; left: -53px; width: 317px; height: 317px"
      >
        <img
          :src="hostile.picture.url"
          alt="Hostile Picture"
          class="max-w-max"
          :style="`
          transform: scale(${hostile.picture.zoom});
          margin-top: ${hostile.picture.offsetY}px;
          margin-left: ${hostile.picture.offsetX}px;
          height: 500px
        `"
        />
      </div>
      <div
        class="absolute text-center text-4xl font-semibold leading-none"
        style="top: 28px; left: 285px; width: 295px; height: 80px"
      >
        <div>{{ hostile.name }}</div>
      </div>
      <div
        class="absolute text-center text-lg font-semibold italic leading-none"
        style="top: 110px; left: 285px; width: 295px; height: 20px"
      >
        <div>
          <span v-for="(tag, index) in hostile.tags" :key="tag.name">
            {{ tag.label
            }}<span v-if="index < hostile.tags.length - 1">, </span>
          </span>
          <span v-if="status === 'empowered'">, Empowered </span>
        </div>
      </div>
      <div
        class="absolute flex justify-between text-center font-semibold italic leading-none text-white"
        style="top: 185px; left: 250px; width: 355px; height: 24px"
      >
        <div>
          <span class="uppercase">Move: </span
          >{{ hostile[status].stats.move }}/{{ hostile[status].stats.run }}
        </div>
        <div>
          <span class="uppercase">Wounds: </span
          >{{ hostile[status].stats.wounds }}
        </div>
        <div>
          <span class="uppercase">Size: </span
          ><span class="capitalize">{{ hostile.size }}</span>
        </div>
      </div>
      <div
        class="absolute flex justify-center text-center font-semibold italic leading-none"
        style="top: 220px; left: 250px; width: 355px; height: 24px"
      >
        <div>
          <span class="uppercase">Defence: </span
          >{{ hostile[status].stats.defence }}
        </div>
      </div>
      <div
        class="absolute flex pl-10 text-center font-semibold italic leading-none text-white"
        style="top: 254px; left: 40px; width: 555px; height: 16px"
      >
        <div class="uppercase" style="width: 270px">Weapon Action</div>
        <div class="uppercase" style="width: 80px">Type</div>
        <div class="uppercase" style="width: 75px">Dice</div>
        <div class="uppercase" style="width: 90px">Damage</div>
      </div>
      <div
        class="absolute"
        style="top: 286px; left: 40px; width: 555px; height: 16px"
      >
        <div
          v-for="weapon in hostile[status].weapons"
          :key="weapon.name"
          class="flex pl-10 text-center font-semibold italic leading-none"
        >
          <div class="" style="width: 270px">{{ weapon.name }}</div>
          <div class="capitalize" style="width: 80px">{{ weapon.type }}</div>
          <div style="width: 75px" class="flex justify-center">
            <DiceD6 v-if="weapon.dice1 === 'd6'" class="h-4 w-4" />
            <DiceD8 v-if="weapon.dice1 === 'd8'" class="h-4 w-4" />
            <DiceD12 v-if="weapon.dice1 === 'd12'" class="h-4 w-4" />
            <DiceD6 v-if="weapon.dice2 === 'd6'" class="ml-1 h-4 w-4" />
            <DiceD8 v-if="weapon.dice2 === 'd8'" class="ml-1 h-4 w-4" />
            <DiceD12 v-if="weapon.dice2 === 'd12'" class="ml-1 h-4 w-4" />
          </div>
          <div class="" style="width: 90px">
            {{ weapon.damages.base }}/{{ weapon.damages.critical }}
          </div>
        </div>
        <div
          class="mt-5 mb-1 w-full text-center text-lg font-semibold uppercase leading-none"
        >
          Special Rules
        </div>
        <div class="space-y-1 text-sm">
          <div
            v-for="special in hostile[status].special"
            :key="special.name"
            class="leading-tight"
          >
            <strong v-if="special.name">{{ special.name }}: </strong>
            <span v-html="generateHtml(special.rule)"></span>
          </div>
        </div>
        <div>
          <div
            class="mt-4 flex h-8 items-center justify-center bg-black text-lg uppercase leading-none text-white"
          >
            Behaviour Table
          </div>
          <div
            class="flex h-6 items-center justify-start bg-gray-400 leading-none text-black"
          >
            <div class="flex w-16 items-center justify-center font-semibold">
              Roll
            </div>
            <div
              class="flex h-full w-full items-center justify-start border-l border-gray-500 pl-2 font-semibold"
            >
              Result
            </div>
          </div>
          <div
            v-for="(behaviour, index) in hostile[status].behaviour"
            :key="behaviour.roll"
            class="min-h-12 flex items-center justify-start text-black"
            :class="{
              'bg-gray-100': index % 2 !== 0,
            }"
          >
            <div class="flex h-full w-16 items-center justify-center py-2">
              {{ behaviour.roll }}
            </div>
            <div
              class="h-full w-full border-l border-gray-200 py-2 pl-2 text-sm"
            >
              <span v-if="behaviour.title" class="font-semibold"
                >{{ behaviour.title
                }}<span v-if="behaviour.rule">: </span></span
              >
              <span v-if="behaviour.rule">
                <span v-html="generateHtml(behaviour.rule)"></span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
