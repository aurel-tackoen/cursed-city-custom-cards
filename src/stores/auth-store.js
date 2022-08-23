import netlifyIdentity from 'netlify-identity-widget';
import { defineStore } from 'pinia';
import { useHeroesStore } from '@/stores/heroes-store.js';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    User: {
      authenticated: false,
    },
    netlifyIdentity: {},
  }),
  actions: {
    async refresh() {
      await this.netlifyIdentity.currentUser().jwt(true);
      const response = netlifyIdentity.currentUser();
      this.setUser(response);
    },
    async login(action) {
      netlifyIdentity.open(action);
      netlifyIdentity.on(action, (response) => {
        this.setUser(response);
        netlifyIdentity.close();
      });
    },
    logout() {
      this.User = {
        authenticated: false,
      };
      netlifyIdentity.logout();
    },
    init() {
      netlifyIdentity.init();
      const response = netlifyIdentity.currentUser();
      if (response) {
        this.netlifyIdentity = netlifyIdentity;
        this.setUser(response);
      }
    },
    setUser(response) {
      const heroesStore = useHeroesStore();
      const user = {
        authenticated: true,
        username: response.user_metadata.full_name,
        email: response.email,
        access_token: response.token.access_token,
        expires_at: response.token.expires_at,
        refresh_token: response.token.refresh_token,
        token_type: response.token.token_type,
      };
      this.User = user;
      heroesStore.fetchUserHeroes();
    },
  },
});
