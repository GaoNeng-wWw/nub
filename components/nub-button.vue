<script lang="ts" setup>
import type { PropType } from 'vue';

const props = defineProps({
  full: {
    type: Boolean,
    default: false,
  },
  colors: {
    type: String as PropType<'primary' | 'default' | 'danger'>,
    default: 'primary',
  },
})
</script>

<template>
  <button
    class="w-fit px-4 text-center text-zinc-50 py-2 rounded-md transition" :class="
      [
        props.full ? 'w-full' : 'w-fit',
        {
          'hover:bg-blue-500 bg-blue-600': props.colors === 'primary',
          'hover:bg-zinc-200 bg-zinc-300': props.colors === 'default',
          'hover:bg-red-500 bg-red-600': props.colors === 'danger',
        },
      ]
    "
  >
    <slot />
  </button>
</template>
