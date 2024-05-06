<script lang="ts" setup></script>

<template>
  <div class="w-full h-full flex flex-col">
    <slot name="header" />
    <slot />
    <slot name="footer" />
  </div>
</template>

<style scoped></style>
