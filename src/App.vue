<script setup>
import { reactive } from 'vue';
const state = reactive({
  count: 0,
  heroPicture:
    // 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Red_Color.jpg/450px-Red_Color.jpg?20170319170936',
    'https://www.games-workshop.com/resources/catalog/product/920x950/99120205036_GotrekGurnisson01.jpg',
});
</script>
<template>
  <div class="relative font-Cardo mb-96">
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
        :src="state.heroPicture"
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
      <div class="col-span-2 text-center">3/4</div>
      <div class="text-left">A</div>
      <div class="text-right">B</div>
      <div class="col-span-2 text-center">C</div>
    </div>
    <div
      id="hero-name"
      class="absolute text-center text-4xl leading-none"
      style="top: 60px; left: 320px; width: 520px; height: 34px"
    >
      <div>Gotrek Gurnisson</div>
    </div>
    <div
      id="hero-tags"
      class="absolute text-center text-lg italic leading-none"
      style="top: 96px; left: 320px; width: 520px; height: 20px"
    >
      <div>Monster Slayer, Fyreslayer, Axe</div>
    </div>
    <div
      id="hero-tags"
      class="absolute text-center text-base italic text-red-800 leading-none"
      style="top: 118px; left: 320px; width: 520px; height: 16px"
    >
      <div>Size: Large</div>
    </div>
    <div
      id="hero-weapons"
      class="absolute"
      style="top: 290px; left: 300px; width: 560px"
    >
      <div>
        <div
          class="text-base font-bold flex justify-center items-center h-8 -ml-4 pl-4"
        >
          <div class="w-72 pl-1">Runic Axe (1+)<sup>1</sup></div>
          <div class="w-24 text-center">Melee</div>
          <div class="w-20 text-center">X</div>
          <div class="w-28 text-center">1/2</div>
        </div>
        <div
          class="bg-gray-50 text-base font-bold flex justify-center items-center h-8 -ml-4 pl-4"
        >
          <div class="w-72 pl-1">Zangrom-Thaz (6+)</div>
          <div class="w-24 text-center">Melee</div>
          <div class="w-20 text-center">X X</div>
          <div class="w-28 text-center">2/3</div>
        </div>
      </div>
      <div class="mt-1 text-sm"><sup>1</sup> Every times lorem ipsum</div>
      <div class="mt-1 w-full text-center text-xl uppercase">
        Unique Abilities
      </div>
      <div class="text-sm">
        <div>
          <strong>Krag Blackhammer’s Rune: </strong>Once per turn, Gotrek lorem
          ipsum dolore sit amens, felix and gotrek in a balad.
        </div>
        <div>
          <strong>Unstoppable Battle Fury: </strong>Once per turn, Gotrek lorem
          ipsum dolore sit amens, felix and gotrek in a balad.
        </div>
        <div>
          <strong>Shoulder Plate of Edassa: </strong>Once per turn, Gotrek lorem
          ipsum dolore sit amens, felix and gotrek in a balad.
        </div>
      </div>
    </div>
    <div
      id="hero-path"
      class="absolute text-sm"
      style="top: 565px; left: 300px; width: 550px; height: 40px"
    >
      <div>Lorem ipsum dolore sit amens</div>
    </div>
  </div>
</template>
