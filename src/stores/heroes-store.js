import { defineStore, storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth-store';
import { heroesValidation, heroesErrors } from '@/schemas/heroes-schema.js';

export const useHeroesStore = defineStore('heroes', {
  state: () => ({
    Hero: null,
    HeroErrors: [],
    Heroes: [],
    HeroesParams: {
      skip: 0,
      limit: 2,
      count: null,
      sort: {
        date: -1,
      },
    },
    UserHeroes: [],
    UserHeroesParams: {
      skip: 0,
      limit: 2,
      count: null,
      sort: {
        date: -1,
      },
    },
  }),
  actions: {
    async createHero(data) {
      const authStore = useAuthStore();
      const { User } = storeToRefs(authStore);
      try {
        this.HeroErrors = [];
        await authStore.refresh();
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
        await authStore.refresh();
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
        const response = await fetch('/.netlify/functions/heroes-findone', {
          method: 'POST',
          body: JSON.stringify({
            _id: id,
          }),
        });
        if (response.status === 200) {
          const hero = await response.json();
          this.Hero = hero;
          return hero;
        }
        if (response.status === 500) {
          const errors = await response.json();
          throw errors;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async fetchHeroes() {
      try {
        const response = await fetch('/.netlify/functions/heroes-find', {
          method: 'POST',
          body: JSON.stringify({
            query: {},
            params: this.HeroesParams,
          }),
        });
        if (response.status === 200) {
          const data = await response.json();
          this.Heroes = data.items;
          this.HeroesParams.count = data.count;
          return true;
        }
        if (response.status === 500) {
          const errors = await response.json();
          throw errors;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async fetchUserHeroes() {
      try {
        const authStore = useAuthStore();
        await authStore.refresh();
        const { User } = storeToRefs(authStore);
        console.log(this.UserHeroesParams);
        const response = await fetch('/.netlify/functions/heroes-find', {
          headers: {
            Authorization: `Bearer ${User.value.access_token}`,
          },
          method: 'POST',
          body: JSON.stringify({
            query: { 'user.email': User.value.email },
            params: this.UserHeroesParams,
          }),
        });
        if (response.status === 200) {
          const data = await response.json();
          this.UserHeroes = data.items;
          this.UserHeroesParams.count = data.count;
          return true;
        }
        if (response.status === 500) {
          const errors = await response.json();
          throw errors;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async removeHero(id) {
      try {
        const authStore = useAuthStore();
        await authStore.refresh();
        const { User } = storeToRefs(authStore);
        const hero = await this.fetchHero(id);
        const response = await fetch('/.netlify/functions/heroes-remove', {
          headers: {
            Authorization: `Bearer ${User.value.access_token}`,
          },
          method: 'POST',
          body: JSON.stringify({
            _id: id,
            hero,
          }),
        });
        if (response.status === 200) {
          this.Hero = null;
          return true;
        }
        if (response.status === 500) {
          const errors = await response.json();
          throw errors;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
