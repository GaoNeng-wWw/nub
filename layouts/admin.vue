<script lang="ts" setup></script>

<template>
  <div class="w-full h-full flex">
    <div class="w-40 h-full shrink-0 grow-0">
      <slot name="side" />
    </div>
    <div class="h-full shrink grow">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
