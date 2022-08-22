<script setup>
  defineProps({
    title: String,
  });
</script>
<template>
  <div class="rounded border border-slate-100 shadow-sm">
    <div
      class="border-b border-slate-100 bg-gradient-to-t from-slate-50 to-white px-5 py-3"
    >
      <span class="text-lg font-semibold text-slate-600"> {{ title }}: </span>
    </div>
    <div class="space-y-3 bg-white px-5 py-3">
      <slot></slot>
    </div>
  </div>
</template>
