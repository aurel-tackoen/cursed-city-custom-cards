<script setup>
import { reactive } from 'vue';
import netlifyIdentity from 'netlify-identity-widget';
netlifyIdentity.init();
import heroes from '@/assets/data/heroes.js';

import generatePDF from '@/services/generate-pdf';

import HeroNav from '@/components/layout/hero-nav.vue';
import HeroNormalCard from '@/components/hero-normal-card.vue';
import HeroInspiredCard from '@/components/hero-inspired-card.vue';
import HeroNormalForm from '@/components/hero-normal-form.vue';
import HeroInspiredForm from '@/components/hero-inspired-form.vue';
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
const index = 1;
const hero = reactive(heroes[index]);
const tabs = reactive([
  { name: 'Path to Glory', current: true },
  { name: 'Inspired', current: false },
]);
</script>
<template>
  <p>
    <button @click="triggerNetlifyIdentityAction('login')">Log In</button>
    <button @click="triggerNetlifyIdentityAction('signup')">Sign Up</button>
    <button @click="triggerNetlifyIdentityAction('logout')">Log Out</button>
  </p>
  <HeroNormalCard
    v-if="tabs[0].current"
    v-model:hero="hero"
    class="hero-card-display mt-4"
  />
  <HeroInspiredCard
    v-if="tabs[1].current"
    v-model:hero="hero"
    class="hero-card-display mt-4"
  />
  <HeroNav v-model:tabs="tabs" class="mt-4" style="width: 915px" />
  <HeroNormalForm
    v-if="tabs[0].current"
    v-model:hero="hero"
    class="mt-4"
    style="width: 915px"
  />
  <HeroInspiredForm
    v-if="tabs[1].current"
    v-model:hero="hero"
    class="mt-4"
    style="width: 915px"
  />
  <div class="w-full flex items-center justify-center mt-4 mb-8">
    <button
      class="inline-flex items-center px-8 py-2 text-lg font-semibold text-red-700 border-2 border-red-700 shadow-sm rounded-md bg-white hover:bg-red-100"
      @click="generatePDF(hero)"
    >
      Generate PDF
    </button>
  </div>
</template>

<style scoped>
.hero-card-display {
  width: 233mm;
  height: 170mm;
  overflow: hidden;
}
@media print {
  .hero-card-display {
    transform: scale(0.64);
    overflow: visible;
  }
}
</style>
