<script setup>
  const props = defineProps({
    status: String,
    villain: {
      type: Object,
      required: true,
    },
    errors: {
      type: Array,
      default() {
        return [];
      },
    },
  });
  console.log(props);
</script>
<template>
  {{ villain }}
</template>
