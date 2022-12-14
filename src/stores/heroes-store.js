import { defineStore, storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth-store';
import { validate, getErrors } from '@/schemas/heroes-schema.js';
import DOMPurify from 'isomorphic-dompurify';

async function sanitize(hero) {
  const options = { ALLOWED_TAGS: [] };
  hero?.normal?.notes.map((note) => {
    note.rule = DOMPurify.sanitize(note.rule, options);
  });
  hero?.inspired?.notes.map((note) => {
    note.rule = DOMPurify.sanitize(note.rule, options);
  });
  hero?.normal?.abilities.map((ability) => {
    ability.rule = DOMPurify.sanitize(ability.rule, options);
  });
  hero?.inspired?.abilities.map((ability) => {
    ability.rule = DOMPurify.sanitize(ability.rule, options);
  });
  if (hero.normal.path.rule) {
    hero.normal.path.rule = DOMPurify.sanitize(hero.normal.path.rule, options);
  }
  return hero;
}

export const useHeroesStore = defineStore('heroes', {
  state: () => ({
    Hero: null,
    HeroLoading: false,
    HeroErrors: [],
    Heroes: [],
    HeroesParams: {
      loading: false,
      skip: 0,
      limit: 10,
      count: null,
      sort: {
        date: -1,
      },
    },
    UserHeroes: [],
    UserHeroesParams: {
      loading: false,
      skip: 0,
      limit: 5,
      count: null,
      sort: {
        date: -1,
      },
    },
  }),
  actions: {
    setLoading(loading) {
      this.HeroLoading = loading;
    },
    async createHero(data) {
      const authStore = useAuthStore();
      const { User } = storeToRefs(authStore);
      try {
        this.HeroErrors = [];
        await authStore.refresh();
        const item = await validate(data);
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
        const validationErrors = getErrors(errors);
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
        const item = await validate(this.Hero);
        const sanitized = await sanitize(this.Hero);
        console.log(sanitized);
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
        const validationErrors = getErrors(errors);
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
      this.HeroesParams.loading = true;
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
          this.HeroesParams.loading = false;
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
      this.UserHeroesParams.loading = true;
      try {
        const authStore = useAuthStore();
        await authStore.refresh();
        const { User } = storeToRefs(authStore);
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
          this.UserHeroesParams.loading = false;
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
