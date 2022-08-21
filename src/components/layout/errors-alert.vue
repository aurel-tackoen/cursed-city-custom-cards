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
    class="rounded border-2 border-dashed border-red-700 bg-red-100 py-2 px-4 text-red-700"
  >
    {{ errors.length }}
    {{ errors }}
  </div>
</template>
