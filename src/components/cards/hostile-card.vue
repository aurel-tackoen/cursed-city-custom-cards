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
        v-if="hostile[status]"
        class="absolute grid w-12 grid-cols-2 text-black"
        style="top: 280px; left: 70px; width: 100px"
      >
        aaa
      </div>
    </div>
  </div>
</template>
