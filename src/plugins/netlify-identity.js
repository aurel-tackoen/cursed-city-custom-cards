import { ref } from 'vue';
import netlifyIdentity from 'netlify-identity-widget';

netlifyIdentity.init();

function setUser(netlifyUser) {
  const user = {
    username: netlifyUser.user_metadata.full_name,
    email: netlifyUser.email,
    access_token: netlifyUser.token.access_token,
    expires_at: netlifyUser.token.expires_at,
    refresh_token: netlifyUser.token.refresh_token,
    token_type: netlifyUser.token.token_type,
  };
  return user;
}

function userAuth() {
  const currentUser = netlifyIdentity.currentUser();
  const User = ref(currentUser ? setUser(currentUser) : {});
  function userAuthAction(action) {
    if (action == 'login' || action == 'signup') {
      netlifyIdentity.open(action);
      netlifyIdentity.on(action, (netlifyUser) => {
        User.value = setUser(netlifyUser);
        netlifyIdentity.close();
      });
    } else if (action == 'logout') {
      User.value = {};
      netlifyIdentity.logout();
    }
  }
  return {
    userAuthAction,
    User,
  };
}

export { userAuth };
