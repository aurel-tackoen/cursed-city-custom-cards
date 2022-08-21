import { defineStore, storeToRefs } from 'pinia';
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
      const authStore = useAuthStore();
      const { User } = storeToRefs(authStore);
      try {
        this.HeroErrors = [];
        const item = await heroesValidation(data);
        const response = await fetch('/.netlify/functions/heroes-create', {
          headers: {
            Authorization: `Bearer ${User.value.access_token}`,
          },
          method: 'POST',
          body: JSON.stringify(item),
        });
        if (response.status === 200) {
          const result = await response.json();
          return { _id: result.insertedId };
        }
        if (response.status === 500) {
          const errors = await response.json();
          throw errors;
        }
      } catch (errors) {
        console.log(errors);
        const validationErrors = heroesErrors(errors);
        this.HeroErrors = validationErrors;
        return false;
      }
    },
    async updateHero() {
      try {
        const authStore = useAuthStore();
        const { User } = storeToRefs(authStore);
        this.HeroErrors = [];
        const item = await heroesValidation(this.Hero);
        const response = await fetch('/.netlify/functions/heroes-update', {
          headers: {
            Authorization: `Bearer ${User.value.access_token}`,
          },
          method: 'POST',
          body: JSON.stringify(item),
        });
        console.log(response);
        if (response.status === 200) {
          const hero = await response.json();
          this.Hero = hero.value;
          return true;
        }
        if (response.status === 500) {
          const errors = await response.json();
          throw errors;
        }
      } catch (errors) {
        console.log(errors);
        const validationErrors = heroesErrors(errors);
        this.HeroErrors = validationErrors;
        return false;
      }
    },
    async fetchHero(id) {
      try {
        this.HeroErrors = [];
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
        const { User } = storeToRefs(authStore);
        const response = await fetch('/.netlify/functions/heroes-find', {
          headers: {
            Authorization: `Bearer ${User.value.access_token}`,
          },
          method: 'POST',
          body: JSON.stringify({
            params: { 'user.email': User.value.email },
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
