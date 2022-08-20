import { defineStore } from 'pinia';
import netlifyIdentity from 'netlify-identity-widget';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    User: {},
  }),
  actions: {
    login(action) {
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
      if (response) this.setUser(response);
    },
    setUser(response) {
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
    },
  },
});
