<script lang="ts" setup>
const emits = defineEmits<{
  clickOutside: []
}>()
</script>

<template>
  <teleport to="body" disabled>
    <div class="w-screen h-screen fixed bg-black/20 z-40 top-0 left-0" @click="() => emits('clickOutside')" />
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
      <slot />
    </div>
  </teleport>
</template>
