import netlifyIdentity from 'netlify-identity-widget';
netlifyIdentity.init();

function triggerNetlifyIdentityAction(action) {
  if (action == 'login' || action == 'signup') {
    netlifyIdentity.open(action);
    netlifyIdentity.on(action, (user) => {
      this.currentUser = {
        username: user.user_metadata.full_name,
        email: user.email,
        access_token: user.token.access_token,
        expires_at: user.token.expires_at,
        refresh_token: user.token.refresh_token,
        token_type: user.token.token_type,
      };
      this.updateUser({
        currentUser: this.currentUser,
      });
      netlifyIdentity.close();
    });
  } else if (action == 'logout') {
    this.currentUser = null;
    this.updateUser({
      currentUser: this.currentUser,
    });
    netlifyIdentity.logout();
    this.$router.push({ name: 'Home' });
  }
}

export { triggerNetlifyIdentityAction };
