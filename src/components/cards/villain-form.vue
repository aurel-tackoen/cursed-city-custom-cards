<script setup>
  import { computed, toRaw } from 'vue';
  import { v4 as uuidv4 } from 'uuid';
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
  const emit = defineEmits(['update:villain']);
  const villain = computed({
    get: () => props.villain,
    set: (value) => emit('update:villain', value),
  });
  async function remove(target, index) {
    if (confirm('Are you sure you want to delete this?') == true) {
      villain.value[props.status][target].splice(index, 1);
    }
  }
  const defaultWeapon = {
    name: '',
    type: 'melee',
    dices: '',
    damages: {
      base: 1,
      critical: 1,
    },
    notes: [],
  };
  const defaultNotes = {
    name: '',
    rule: '',
  };
  const defaultSpecial = {
    name: '',
    rule: '',
  };
  const defaultBehaviour = {
    name: '',
    rule: '',
  };
  function getError(path) {
    return props?.errors.find((e) => e.path === path);
  }
  function copy(item) {
    return structuredClone(toRaw(item));
  }
  function clone(item) {
    if (confirm('Are you sure you want to copy this?') == true) {
      return structuredClone(toRaw(item));
    }
  }
</script>
<template>
  {{ villain }}
</template>
