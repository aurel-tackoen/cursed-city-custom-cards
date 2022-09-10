<script setup>
  import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
</script>
<template>
  <Popover>
    <PopoverButton>
      <fa-icon
        class="fa-fw text-slate-300 hover:text-red-700"
        :icon="['fas', 'hat-wizard']"
        title="Help"
      />
    </PopoverButton>
    <PopoverPanel class="absolute z-10 -mt-8 w-96 -translate-x-96">
      <div
        class="y overflow-hidden rounded-lg border bg-white p-4 text-left shadow-lg"
      >
        You can use **<strong>bold</strong>** and *<em>italic</em>* in the rule
        text. You can also use [D6], or [D8], or [D12] to display a dice icon.
      </div>
    </PopoverPanel>
  </Popover>
</template>
