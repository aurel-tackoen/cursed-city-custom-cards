<script setup>
  console.log('list-pagination');
  import { computed } from 'vue';
  const props = defineProps({
    params: {
      type: Object,
      required: true,
    },
  });
  const emit = defineEmits(['update:params']);
  const params = computed({
    get: () => props.params,
    set: (value) => emit('update:params', value),
  });
  console.log(params);
</script>
<template>
  <nav
    class="flex items-center justify-between border-t border-slate-200 px-4 pb-4 sm:px-0"
  >
    <div class="-mt-px flex w-0 flex-1">
      <button
        @click="params.skip = params.skip - params.limit"
        class="pagination-number"
        :disabled="params.skip === 0"
      >
        Previous
      </button>
    </div>
    <div class="hidden md:-mt-px md:flex">
      <a href="#" class="pagination-number active" aria-current="page"> 1 </a>
      <a href="#" class="pagination-number"> 2 </a>
      <a href="#" class="pagination-number"> 3 </a>
      <span href="#" class="pagination-number"> ... </span>
      <a href="#" class="pagination-number"> 8 </a>
      <a href="#" class="pagination-number"> 9 </a>
      <a href="#" class="pagination-number"> 10 </a>
    </div>
    <div class="-mt-px flex w-0 flex-1 justify-end">
      <button
        @click="params.skip = params.skip + params.limit"
        class="pagination-number"
        :disabled="params.skip >= params.count - params.limit"
      >
        Next
      </button>
    </div>
  </nav>
</template>
