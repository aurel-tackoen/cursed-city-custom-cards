<script setup>
defineProps({
  title: String,
});
</script>
<template>
  <div class="shadow-sm rounded border border-gray-100 mb-4">
    <div
      class="text-lg font-semibold bg-gray-50 px-5 py-3 mb-3 border-b border-gray-100"
    >
      {{ title }}:
    </div>
    <div class="space-y-3 px-5 pb-3">
      <slot></slot>
    </div>
  </div>
</template>
