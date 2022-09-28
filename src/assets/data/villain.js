// Example Villains
const villains = [
  {
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
    size: 'large',
    normal: {
      stats: {
        move: 5,
        run: 8,
        wounds: 12,
        defence: 'none',
      },
      weapons: [
        {
          name: 'Gory Talons and Fangs',
          type: 'melee',
          dice1: 'd6',
          dice2: 'd12',
          damages: {
            base: 3,
            critical: 5,
          },
        },
      ],
      special: [
        {
          name: 'Supreme Ghoul King',
          rule: 'Increase the Damage values of all other *Flesh-Eater* hostiles weapon actions by +1/+1 while this hostile is on the battlefield.',
        },
        {
          name: 'Imperial Blood',
          rule: 'Each time this hostile ends their activation, remove 3 wounds counter from the acting hostile.',
        },
      ],
      behaviours: [
        {
          roll: '1-2',
          title: 'Summon Imperial Guard',
          rule: 'Each hostile in the acting hostile group makes an **Advance** action. Then, Deploy any slain Crypt Ghouls from this hostile group as reinforcements, or add 1 available Crypt Ghoul to this hostile group and deploy it as reinforcements, if there are no slain Crypt Ghouls in this hostile group.',
        },
        {
          roll: '3-5',
          title: 'Advance',
        },
        {
          roll: '6-9',
          title: 'Terrifying Power',
          rule: 'The acting hostile makes an **Assault** action. Remove 1 wound from the acting hostile for every damage it inflicts upon its target during that action.',
        },
        {
          roll: '10-12',
          title: 'Ferocious Hunger',
          rule: 'Each other visible *Flesh-Eater* hostile one the battlefield makes a **Charge** action. If there are no other visible *Flesh-Eater* hostiles, treat this as a result of **Terrifying Power**.',
        },
      ],
    },
    empowered: {
      stats: {
        move: 6,
        run: 9,
        wounds: 12,
        defence: 'none',
      },
      weapons: [
        {
          name: 'Gory Talons and Fangs',
          type: 'melee',
          dice1: 'd12',
          dice2: 'd12',
          damages: {
            base: 3,
            critical: 5,
          },
        },
      ],
      special: [
        {
          name: 'Supreme Ghoul King',
          rule: 'Increase the Damage values of all other *Flesh-Eater* hostiles weapon actions by +0/+1 while this hostile is on the battlefield',
        },
        {
          name: 'Imperial Blood',
          rule: 'Each time this hostile ends their activation, remove 2 wounds counter from the acting hostile.',
        },
      ],
      behaviours: [
        {
          roll: '1-3',
          title: 'Summon Imperial Guard',
          rule: 'Each hostile in the acting hostile group makes an **Advance** action. Then, Deploy any slain Crypt Ghouls from this hostile group as reinforcements and add 1 available Crypt Ghoul to this hostile group and deploy it as reinforcements.',
        },
        {
          roll: '4',
          title: 'Advance',
        },
        {
          roll: '5-9',
          title: 'Terrifying Power',
          rule: 'The acting hostile makes an **Assault** action. Remove 2 wound from the acting hostile for every damage it inflicts upon its target during that action.',
        },
        {
          roll: '10-12',
          title: 'Ferocious Hunger',
          rule: 'Each other visible *Flesh-Eater* hostile one the battlefield makes a **Charge** action. If there are no other visible *Flesh-Eater* hostiles, treat this as a result of **Terrifying Power**.',
        },
      ],
    },
  },
];

const defaultVillain = {
  picture: {
    offsetY: 100,
    offsetX: -50,
    zoom: 1,
    small_offsetY: 200,
    small_offsetX: -35,
    small_zoom: 4,
  },
  size: 'large',
  tags: [],
  normal: {
    stats: {
      move: 3,
      run: 4,
    },
    weapons: [],
    notes: [],
    special: [],
    behaviours: [],
  },
  empowered: {
    stats: {},
    weapons: [],
    notes: [],
    special: [],
    behaviours: [],
  },
  user: {},
};

export { defaultVillain };
