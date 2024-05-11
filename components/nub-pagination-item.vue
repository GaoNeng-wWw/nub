<script lang="ts" setup>
const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  disabledHover: {
    type: Boolean,
    default: false,
  },
});
const { active, disabledHover } = toRefs(props);
</script>

<template>
  <div
    class="
    px-2 bg-zinc-200
    data-[active=true]:bg-blue-500 data-[active=true]:text-white flex items-center rounded-md cursor-pointer
    data-[disabled-hover=false]:hover:bg-blue-500 data-[disabled-hover=false]:hover:text-white transition-all

    "
    :data-active="active"
    :data-disabled-hover="disabledHover"
  >
    <slot />
  </div>
</template>
