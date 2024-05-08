<script lang="ts" setup>
const props = defineProps({
  showClose: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits<{
  clickClose: [MouseEvent]
}>()
const { showClose } = toRefs(props);
</script>

<template>
  <div
    class="group min-h-7 px-2 py-1 bg-blue-600 text-white rounded text-sm flex items-center justify-center gap-0.5"
    :class="{
      'cursor-pointer': showClose,
    }"
  >
    <slot />
    <nub-fade>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-5 h-5"
        @click="(e) => { emits('clickClose', e) }"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </nub-fade>
  </div>
</template>
