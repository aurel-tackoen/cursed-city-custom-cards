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
          name: 'Supreme Ghoul King',
          rule: 'Increase the Damage values of all other Flesh-Eater hostiles weapon actions by +0/+1 while this hostile is on the battlefield',
        },
        {
          name: 'Imperial Blood',
          rule: 'Each time this hostile ends their activation, remove 2 wounds counter from the acting hostile.',
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
