import { defineStore } from 'pinia';
import netlifyIdentity from 'netlify-identity-widget';
import { useHeroesStore } from '@/stores/heroes-store.js';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    User: {
      authenticated: false,
    },
    netlifyIdentity: null,
  }),
  actions: {
    init() {
      netlifyIdentity.init();
      const response = netlifyIdentity.currentUser();
      if (response) {
        this.setUser(netlifyIdentity);
      }
    },
    login(action) {
      netlifyIdentity.open(action);
      netlifyIdentity.on(action, async (response) => {
        this.setUser(netlifyIdentity);
        netlifyIdentity.close();
        await useHeroesStore().fetchUserHeroes();
      });
    },
    logout() {
      this.User = {
        authenticated: false,
      };
      this.netlifyIdentity = null;
      netlifyIdentity.logout();
    },
    async refresh() {
      await this.netlifyIdentity.currentUser().jwt(true);
      netlifyIdentity.currentUser();
      this.setUser(netlifyIdentity);
    },
    setUser(netlifyIdentity) {
      const currentUser = netlifyIdentity.currentUser();
      const user = {
        authenticated: true,
        username: currentUser.user_metadata.full_name,
        email: currentUser.email,
        access_token: currentUser.token.access_token,
        expires_at: currentUser.token.expires_at,
        refresh_token: currentUser.token.refresh_token,
        token_type: currentUser.token.token_type,
      };
      this.netlifyIdentity = netlifyIdentity;
      this.User = user;
    },
  },
});
