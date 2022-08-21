import { defineStore } from 'pinia';
import { useAuthStore } from '@/stores/auth-store';
import { heroesValidation, heroesErrors } from '@/schemas/heroes-schema.js';

export const useHeroesStore = defineStore('heroes', {
  state: () => ({
    Hero: {},
    HeroErrors: [],
    Heroes: [],
    UserHeroes: [],
  }),
  actions: {
    async createHero(data) {
      try {
        this.HeroErrors = [];
        await heroesValidation(data);
        const response = await fetch('/.netlify/functions/heroes-create', {
          method: 'POST',
          body: JSON.stringify(data),
        });
        if (response.status === 200) {
          const hero = await response.json();
          this.Hero = hero.value;
        }
        if (response.status === 500) {
          const errors = await response.json();
          throw errors;
        }
      } catch (errors) {
        const validationErrors = heroesErrors(errors);
        this.HeroErrors = validationErrors;
        console.log(validationErrors);
      }
    },
    async updateHero() {
      try {
        const response = await fetch('/.netlify/functions/heroes-update', {
          method: 'POST',
          body: JSON.stringify(this.Hero),
        });
        const hero = await response.json();
        this.Hero = hero.value;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchHero(id) {
      try {
        const response = await fetch('/.netlify/functions/heroes-findone', {
          method: 'POST',
          body: JSON.stringify({
            _id: id,
          }),
        });
        const hero = await response.json();
        this.Hero = hero;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchHeroes() {
      try {
        const response = await fetch('/.netlify/functions/heroes-find', {
          method: 'POST',
          body: JSON.stringify({}),
        });
        const heroes = await response.json();
        this.Heroes = heroes;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchUserHeroes() {
      try {
        const authStore = useAuthStore();
        const response = await fetch('/.netlify/functions/heroes-find', {
          method: 'POST',
          body: JSON.stringify({
            params: { 'user.email': authStore.User.email },
          }),
        });
        const heroes = await response.json();
        this.UserHeroes = heroes;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
