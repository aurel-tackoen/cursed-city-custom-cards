import { defineStore } from 'pinia';
import { useAuthStore } from './auth-store';

export const useHeroesStore = defineStore('heroes', {
  state: () => ({
    UserHeroes: [],
    Heroes: [],
  }),
  actions: {
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
    async fetchHeroes() {
      const response = await fetch('/.netlify/functions/heroes-find', {
        method: 'POST',
        body: JSON.stringify({}),
      });
      const heroes = await response.json();
      this.Heroes = heroes;
    },
  },
});
