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
        v-if="side === 'recto'"
        id="hero-name"
        class="absolute flex items-center justify-center text-center text-xs font-semibold leading-none"
        style="top: 16px; left: 0px; width: 26mm; height: 26px"
      >
        <div>{{ hero.name }}</div>
      </div>
      <div
        v-if="side === 'recto'"
        class="absolute flex items-center justify-center overflow-hidden rounded-full shadow-lg"
        style="top: 62px; left: 3mm; width: 20mm; height: 20mm"
      >
        <img
          v-if="hero.picture && hero.picture.url"
          :src="hero.picture.url"
          alt="Hero Picture"
          class="max-w-max"
          :style="`
            transform: scale(${hero.picture.small_zoom});
            margin-top: ${hero.picture.small_offsetY}px;
            margin-left: ${hero.picture.small_offsetX}px;
            height: 40.7mm
          `"
        />
        <fa-icon
          v-else
          class="fa-fw fa-2x mx-auto justify-self-center text-gray-400"
          :icon="['fad', 'ghost']"
        />
      </div>
      <div
        v-if="side === 'recto'"
        class="absolute rounded-full"
        style="
          top: 62px;
          left: 3mm;
          width: 20mm;
          height: 20mm;
          box-shadow: rgb(0 0 0 / 40%) 0px -5px 20px 2px inset;
        "
      ></div>
    </div>
  </div>
</template>
