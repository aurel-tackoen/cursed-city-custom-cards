<script setup>
  defineProps({
    hero: Object,
    side: String,
  });
</script>
<template>
  <div class="">
    <div
      class="relative mx-auto overflow-hidden rounded-2xl border bg-white font-Cardo"
    >
      <div class="">
        <img
          v-if="side === 'recto'"
          src="@/assets/pictures/hero-initiative-background-recto.png"
          alt="Hero Initiative Background"
          style="width: 26.5mm; height: 40.7mm"
        />
        <img
          v-if="side === 'verso'"
          src="@/assets/pictures/hero-initiative-background-verso.png"
          alt="Hero Initiative Background"
          style="width: 26.5mm; height: 40.7mm"
        />
      </div>
      <div
        id="hero-name"
        class="absolute flex items-center justify-center text-center text-xs font-semibold leading-none"
        style="top: 16px; left: 0px; width: 26mm; height: 26px"
      >
        <div>{{ hero.name }}</div>
      </div>
      <div
        v-if="side === 'recto'"
        class="absolute flex items-center justify-center overflow-hidden rounded-full"
        style="top: 50px; left: 0px; width: 26mm; height: 26mm"
      >
        <img
          :src="hero.picture.url"
          alt="Hero Picture"
          class="max-w-max"
          :style="`
            margin-top: ${hero.picture.offsetY / 3}px;
            height: 40.7mm
          `"
        />
      </div>
    </div>
  </div>
</template>
