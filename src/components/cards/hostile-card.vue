<script setup>
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
        <div><span class="uppercase">Move: </span>5/8</div>
        <div><span class="uppercase">Wounds: </span>12</div>
        <div><span class="uppercase">Size: </span>Large</div>
      </div>
      <div
        class="absolute flex justify-center text-center font-semibold italic leading-none"
        style="top: 220px; left: 250px; width: 355px; height: 24px"
      >
        <div><span class="uppercase">Defence: </span>None</div>
      </div>
    </div>
  </div>
</template>
