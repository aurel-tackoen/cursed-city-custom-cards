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
  function getPages() {
    return [
      ...Array(
        Number((params.value.count / params.value.limit).toFixed(0))
      ).keys(),
    ];
  }
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
      <button
        v-for="(page, index) in getPages()"
        :key="index"
        class="pagination-number"
        :class="{
          active: page * params.limit == params.skip,
        }"
      >
        {{ page + 1 }}
      </button>
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
