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
  <div
    class="border-2 border-dashed border-red-700 rounded bg-red-100 py-2 px-4 text-red-700"
  >
    {{ errors.length }}
    {{ errors }}
  </div>
</template>
