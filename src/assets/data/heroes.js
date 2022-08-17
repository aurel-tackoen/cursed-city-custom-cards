const heroes = [
  {
    picture: {
      offsetY: 100,
      offsetX: -50,
      zoom: 1,
    },
    stats: {
      move: 3,
      run: 4,
    },
    tags: [],
    weapons: [],
    notes: [],
    abilities: [],
    path: {},
  },
  {
    name: 'Gotrek Gurnisson',
    picture: {
      url: 'https://www.games-workshop.com/resources/catalog/product/920x950/99120205036_GotrekGurnisson01.jpg',
      offsetY: 160,
      offsetX: -80,
      zoom: 0.9,
    },
    tags: [
      { label: 'Monster Slayer', value: 'monster-slayer' },
      { label: 'Fyreslayer', value: 'fyreslayer' },
    ],
    size: 'large',
    normal: {
      stats: {
        move: 3,
        run: 4,
        agility: 'd6',
        vitality: 'd8',
        defence: 'd12',
      },
      weapons: [
        {
          name: 'Runic Axe',
          activation: 1,
          notes: [1],
          type: 'melee',
          dice1: 'd6',
          dice2: 'd6',
          damages: {
            base: 1,
            critical: 2,
          },
        },
        {
          name: 'Zangrom-Thaz',
          activation: 6,
          notes: [2, 3],
          type: 'melee',
          dice1: 'd8',
          dice2: 'd12',
          damages: {
            base: 2,
            critical: 3,
          },
        },
      ],
      notes: [
        {
          name: 'Runic Power',
          rule: 'Lorem ipsum dolore sit amens, the quick brown fox jumps over the lazy dog.',
        },
        {
          name: 'Throwing Axe',
          rule: 'The quick brown fox jumps over the lazy dog.',
        },
        {
          name: '',
          rule: 'Tailwind lets you conditionally apply utility classes in different states using variant. ',
        },
      ],
      abilities: [
        {
          name: 'Krag Blackhammer’s Rune',
          rule: 'Once per turn, Gotrek lorem ipsum dolore sit amens, felix and gotrek in a balad.',
        },
        {
          name: 'Unstoppable Battle Fury',
          rule: 'When a reaction occur, lorem ipsum dolore sit amens.',
        },
        {
          name: 'Shoulder Plate of Edassa',
          rule: 'Every time This keeps your base styling decisions in your markup alongside all of your other styles.',
        },
      ],
      path: {
        name: 'Avatar of Grimnir',
        rule: 'Gotrek has survived countless battles and trials over the years, to become an almost unstoppable avatar of the duardin warrior-god Grimnir.',
      },
    },
    inspired: {
      stats: {},
      weapons: [],
      notes: [],
      abilities: [],
    },
  },
  {
    picture: {
      url: 'https://www.games-workshop.com/resources/catalog/product/threeSixty/6010799015_WHUHarrowdeepOTT1360/01-01.jpg',
      offsetY: 140,
      offsetX: -80,
      zoom: 0.8,
    },
    name: 'Calthia Xandire',
    stats: {
      move: 3,
      run: 4,
      agility: 'd8',
      vitality: 'd12',
      defence: 'd6',
    },
    tags: [
      { label: 'Blade', value: 'blade' },
      { label: 'Stormcast Eternal', value: 'stormcast' },
      { label: 'Truthseeker', value: 'stormcast' },
    ],
    size: 'large',
    weapons: [
      {
        name: 'Broadsword',
        activation: 1,
        notes: [],
        type: 'melee',
        dice1: 'd8',
        dice2: 'd8',
        damages: {
          base: 1,
          critical: 3,
        },
      },
      {
        name: 'Lantern Astrala',
        activation: 6,
        notes: [],
        type: 'area',
        dice1: 'd8',
        dice2: null,
        damages: {
          base: 1,
          critical: 1,
        },
      },
    ],
    notes: [],
    abilities: [
      {
        name: 'Light of Azyr',
        rule: 'Critical Success = Stunned',
      },
      {
        name: 'Healing Light',
        rule: 'Heal 1 Wound Ally in Area',
      },
    ],
    path: {
      name: 'Sigmar Radiance',
      rule: 'Gain 1 inspiration point when 2 Lantern Stun',
    },
  },
  {
    picture: {
      url: 'https://www.games-workshop.com/resources/catalog/product/threeSixty/60120702001_WHUHexbanesHuntersOTT1360/01-01.jpg',
      offsetY: 100,
      offsetX: -110,
      zoom: 0.85,
    },
    name: 'Haskel Hexbane',
    stats: {
      move: 3,
      run: 4,
      agility: 'd8',
      vitality: 'd12',
      defence: 'd6',
    },
    tags: [
      { label: 'Blade', value: 'blade' },
      { label: 'Stormcast Eternal', value: 'stormcast' },
      { label: 'Truthseeker', value: 'stormcast' },
    ],
    size: 'large',
    weapons: [
      {
        name: 'Broadsword',
        activation: 1,
        notes: [],
        type: 'melee',
        dice1: 'd8',
        dice2: 'd8',
        damages: {
          base: 1,
          critical: 3,
        },
      },
      {
        name: 'Lantern Astrala',
        activation: 6,
        notes: [],
        type: 'area',
        dice1: 'd8',
        dice2: null,
        damages: {
          base: 1,
          critical: 1,
        },
      },
    ],
    notes: [],
    abilities: [
      {
        name: 'Light of Azyr',
        rule: 'Critical Success = Stunned',
      },
      {
        name: 'Healing Light',
        rule: 'Heal 1 Wound Ally in Area',
      },
    ],
    path: {
      name: 'Sigmar Radiance',
      rule: 'Gain 1 inspiration point when 2 Lantern Stun',
    },
  },
];

export default heroes;
