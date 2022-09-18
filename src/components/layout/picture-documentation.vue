<script setup>
  import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
</script>
<template>
  <Popover>
    <PopoverButton>
      <fa-icon
        class="fa-fw text-slate-500 hover:text-red-700"
        :icon="['fas', 'hat-wizard']"
        title="Help"
      />
    </PopoverButton>
    <PopoverPanel class="absolute z-10 -mt-8 w-96 -translate-x-96">
      <div
        class="y overflow-hidden rounded-lg border bg-white p-4 text-left shadow-lg"
      >
        You cannot upload pictures yet. You need to get a picture link (must be
        a direct link to a JPG or PNG file) and paste it in the text field.
      </div>
    </PopoverPanel>
  </Popover>
</template>
