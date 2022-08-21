<script setup>
  defineProps({
    errors: {
      type: Array,
      default() {
        return [];
      },
    },
  });
</script>
<template>
  <div v-if="errors.length > 0">
    <div class="alert-container">
      <div v-for="error in errors" :key="error.path">
        <span class="font-bold capitalize"> {{ error.name }}: </span>
        <span class="first-letter:uppercase">{{ error.message }}</span>
      </div>
    </div>
  </div>
</template>
