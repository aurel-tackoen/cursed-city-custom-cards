const heroes = [
  {
    picture:
      'https://www.games-workshop.com/resources/catalog/product/920x950/99120205036_GotrekGurnisson01.jpg',
    name: 'Gotrek Gurnisson',
    stats: {
      move: 3,
      run: 4,
      agility: 'd6',
      vitality: 'd8',
      defence: 'd12',
    },
    tags: [
      { label: 'Monster Slayer', value: 'monster-slayer' },
      { label: 'Fyreslayer', value: 'fyreslayer' },
    ],
    size: 'large',
    weapons: [
      {
        name: 'Runic Axe',
        activation: 1,
        notes: [1],
        type: 'melee',
        dices: 'A',
        damages: {
          normal: 1,
          critical: 2,
        },
      },
      {
        name: 'Zangrom-Thaz',
        activation: 6,
        notes: [2, 3],
        type: 'melee',
        dices: 'BB',
        damages: {
          normal: 2,
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
];

export default heroes;
