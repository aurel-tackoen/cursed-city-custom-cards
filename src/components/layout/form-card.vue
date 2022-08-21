<script setup>
  defineProps({
    title: String,
  });
</script>
<template>
  <div class="rounded border border-gray-100 shadow-sm">
    <div
      class="mb-3 border-b border-gray-100 bg-gray-50 px-5 py-3 text-lg font-semibold"
    >
      {{ title }}:
    </div>
    <div class="space-y-3 px-5 pb-3">
      <slot></slot>
    </div>
  </div>
</template>
