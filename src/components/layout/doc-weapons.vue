<script setup>
  import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
</script>
<template>
  <Popover>
    <PopoverButton>
      <fa-icon
        class="fa-fw text-slate-500 hover:text-red-700"
        :icon="['fas', 'swords']"
        title="Help"
      />
    </PopoverButton>
    <PopoverPanel class="absolute z-10 -mt-8 w-96 -translate-x-96">
      <div
        class="y overflow-hidden rounded-lg border bg-white p-4 text-left shadow-lg"
      >
        If you want to add note to a weapon, first create the weapon, then the
        note in the corresponding panel. After that you'll be able so select the
        note in the weapon panel.
      </div>
    </PopoverPanel>
  </Popover>
</template>
