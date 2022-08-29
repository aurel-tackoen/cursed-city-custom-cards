<script setup>
  import HeroCard from '@/components/cards/hostile-card.vue';
  const Hostile = {
    name: 'Abhorrant Archregent',
    picture: {
      url: 'https://www.games-workshop.com/resources/catalog/product/920x950/99070207009_AbhorrantArchregent01.jpg',
      offsetY: 220,
      offsetX: -60,
      zoom: 1,
    },
    tags: [
      { label: 'Flesh-Eater', value: 'flesh-eater' },
      { label: 'Villain', value: 'villain' },
    ],
    normal: {
      special: [
        {
          name: 'Unstoppable Battle Fury',
          activation: 4,
          rule: 'When a reaction occur, lorem ipsum dolore sit amens.',
        },
        {
          name: 'Krag Blackhammer’s Rune',
          activation: 6,
          rule: 'Once per turn, Gotrek lorem ipsum dolore sit amens, felix and gotrek in a balad.',
        },
        {
          name: 'Shoulder Plate of Edassa',
          rule: 'Every time This keeps your base styling decisions in your markup alongside all of your other styles.',
        },
      ],
    },
    empowered: {
      special: {},
    },
  };
</script>

<template>
  <div class="mt-4 space-y-4">
    <HeroCard
      status="normal"
      v-model:hostile="Hostile"
      class="hostile-card-display"
    />
    <HeroCard
      status="empowered"
      v-model:hostile="Hostile"
      class="hostile-card-display"
    />
  </div>
</template>
