import { defineStore, storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth-store';
import { validate, getErrors } from '@/schemas/heroes-schema.js';
import DOMPurify from 'isomorphic-dompurify';

async function sanitize(hero) {
  const options = { ALLOWED_TAGS: [] };
  hero?.normal?.notes.map((note) => {
    note.rule = DOMPurify.sanitize(note.rule, options);
  });
  hero?.empowered?.notes.map((note) => {
    note.rule = DOMPurify.sanitize(note.rule, options);
  });
  hero?.normal?.special.map((special) => {
    special.rule = DOMPurify.sanitize(special.rule, options);
  });
  hero?.empowered?.special.map((special) => {
    special.rule = DOMPurify.sanitize(special.rule, options);
  });
  return hero;
}

export const useHeroesStore = defineStore('heroes', {
  state: () => ({
    Villain: null,
    VillainErrors: [],
    Villains: [],
    VillainsParams: {
      loading: false,
      skip: 0,
      limit: 10,
      count: null,
      sort: {
        date: -1,
      },
    },
    UserVillains: [],
    UserVillainsParams: {
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
    async createVillain(data) {
      const authStore = useAuthStore();
      const { User } = storeToRefs(authStore);
      try {
        this.VillainErrors = [];
        await authStore.refresh();
        const item = await validate(data);
        const response = await fetch('/.netlify/functions/Villains-create', {
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
        this.VillainErrors = validationErrors;
        return false;
      }
    },
    async updateVillain() {
      try {
        const authStore = useAuthStore();
        await authStore.refresh();
        const { User } = storeToRefs(authStore);
        this.VillainErrors = [];
        const item = await validate(this.Villain);
        const sanitized = await sanitize(this.Villain);
        console.log(sanitized);
        const response = await fetch('/.netlify/functions/Villains-update', {
          headers: {
            Authorization: `Bearer ${User.value.access_token}`,
          },
          method: 'POST',
          body: JSON.stringify(item),
        });
        if (response.status === 200) {
          const villain = await response.json();
          this.Villain = villain.value;
          return true;
        }
        if (response.status === 500) {
          const errors = await response.json();
          throw errors;
        }
      } catch (errors) {
        console.log(errors);
        const validationErrors = getErrors(errors);
        this.VillainErrors = validationErrors;
        return false;
      }
    },
    async fetchVillain(id) {
      try {
        const response = await fetch('/.netlify/functions/heroes-findone', {
          method: 'POST',
          body: JSON.stringify({
            _id: id,
          }),
        });
        if (response.status === 200) {
          const villain = await response.json();
          this.Villain = villain;
          return villain;
        }
        if (response.status === 500) {
          const errors = await response.json();
          throw errors;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async fetchVillains() {
      this.VillainsParams.loading = true;
      try {
        const response = await fetch('/.netlify/functions/Villains-find', {
          method: 'POST',
          body: JSON.stringify({
            query: {},
            params: this.VillainsParams,
          }),
        });
        if (response.status === 200) {
          const data = await response.json();
          this.Villains = data.items;
          this.VillainsParams.count = data.count;
          this.VillainsParams.loading = false;
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
    async fetchUserVillains() {
      this.UserVillainsParams.loading = true;
      try {
        const authStore = useAuthStore();
        await authStore.refresh();
        const { User } = storeToRefs(authStore);
        const response = await fetch('/.netlify/functions/Villains-find', {
          headers: {
            Authorization: `Bearer ${User.value.access_token}`,
          },
          method: 'POST',
          body: JSON.stringify({
            query: { 'user.email': User.value.email },
            params: this.UserVillainsParams,
          }),
        });
        if (response.status === 200) {
          const data = await response.json();
          this.UserVillains = data.items;
          this.UserVillainsParams.count = data.count;
          this.UserVillainsParams.loading = false;
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
    async removeVillain(id) {
      try {
        const authStore = useAuthStore();
        await authStore.refresh();
        const { User } = storeToRefs(authStore);
        const villain = await this.fetchVillain(id);
        const response = await fetch('/.netlify/functions/Villains-remove', {
          headers: {
            Authorization: `Bearer ${User.value.access_token}`,
          },
          method: 'POST',
          body: JSON.stringify({
            _id: id,
            villain,
          }),
        });
        if (response.status === 200) {
          this.Villain = null;
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
