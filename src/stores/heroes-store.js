import { defineStore } from 'pinia';
import { useAuthStore } from './auth-store';

export const useHeroesStore = defineStore('heroes', {
  state: () => ({
    Hero: {},
    Heroes: [],
    UserHeroes: [],
  }),
  actions: {
    async createHero(data) {
      console.log('createHero');
      const response = await await fetch('/.netlify/functions/heroes-create', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      const hero = await response.json();
      this.Hero = hero.value;
    },
    async updateHero() {
      const response = await fetch('/.netlify/functions/heroes-update', {
        method: 'POST',
        body: JSON.stringify(this.Hero),
      });
      const hero = await response.json();
      this.Hero = hero.value;
    },
    async fetchHero(id) {
      const response = await fetch('/.netlify/functions/heroes-findone', {
        method: 'POST',
        body: JSON.stringify({
          _id: id,
        }),
      });
      const hero = await response.json();
      this.Hero = hero;
    },
    async fetchHeroes() {
      const response = await fetch('/.netlify/functions/heroes-find', {
        method: 'POST',
        body: JSON.stringify({}),
      });
      const heroes = await response.json();
      this.Heroes = heroes;
    },
    async fetchUserHeroes() {
      const authStore = useAuthStore();
      const response = await fetch('/.netlify/functions/heroes-find', {
        method: 'POST',
        body: JSON.stringify({
          params: { 'user.email': authStore.User.email },
        }),
      });
      const heroes = await response.json();
      this.UserHeroes = heroes;
    },
  },
});
