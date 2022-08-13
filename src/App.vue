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
  <div class="relative">
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
  </div>
</template>
