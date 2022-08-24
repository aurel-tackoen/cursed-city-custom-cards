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
        class="inline-flex items-center border-t-2 border-transparent pt-4 pl-4 pr-4 text-sm text-slate-500 hover:border-slate-300 hover:text-slate-700"
        :disabled="params.skip === 0"
      >
        Previous
      </button>
      {{ params.skip }}
    </div>
    <div class="hidden md:-mt-px md:flex">
      <a
        href="#"
        class="inline-flex items-center border-t-2 border-red-500 px-4 pt-4 text-sm text-red-600"
        aria-current="page"
      >
        1
      </a>
      <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300" -->
      <a
        href="#"
        class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm text-slate-500 hover:border-slate-300 hover:text-slate-700"
      >
        2
      </a>
      <a
        href="#"
        class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm text-slate-500 hover:border-slate-300 hover:text-slate-700"
      >
        3
      </a>
      <span
        class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm text-slate-500"
      >
        ...
      </span>
      <a
        href="#"
        class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm text-slate-500 hover:border-slate-300 hover:text-slate-700"
      >
        8
      </a>
      <a
        href="#"
        class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm text-slate-500 hover:border-slate-300 hover:text-slate-700"
      >
        9
      </a>
      <a
        href="#"
        class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm text-slate-500 hover:border-slate-300 hover:text-slate-700"
      >
        10
      </a>
    </div>
    <div class="-mt-px flex w-0 flex-1 justify-end">
      <button
        @click="params.skip = params.skip + params.limit"
        class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm text-slate-500 hover:border-slate-300 hover:text-slate-700"
        :disabled="params.skip >= params.count - params.limit"
      >
        Next
      </button>
    </div>
  </nav>
</template>
