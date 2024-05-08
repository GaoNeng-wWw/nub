<template>
  <transition appear>
    <slot />
  </transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 200ms ease-in-out;
}
.v-enter-from,
.v-leave-to{
  opacity: 0;
}
</style>
