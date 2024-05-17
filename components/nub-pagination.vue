<script lang="ts" setup>
const props = defineProps(paginationProps);
const emits = defineEmits<{
  pageChange: [number]
}>()
const { jump, nextMore, prevMore, renderEl, current, showNextMore, showPrevMore } = usePagination(toRefs(props));
watch(current, () => {
  emits('pageChange', current.value);
})
</script>

<template>
  <div class="w-full flex gap-2 h-8">
    <nub-pagination-item
      :active="current === 1"
      @click="() => jump(1)"
    >
      1
    </nub-pagination-item>
    <nub-pagination-item v-if="showPrevMore" disabled-hover @click="() => prevMore()">
      ...
    </nub-pagination-item>
    <template v-for="item of renderEl" :key="item">
      <nub-pagination-item :active="current === item" @click="() => jump(item)">
        {{ item }}
      </nub-pagination-item>
    </template>
    <nub-pagination-item v-if="showNextMore" disabled-hover @click="() => nextMore()">
      ...
    </nub-pagination-item>
    <nub-pagination-item
      v-if="!renderEl.includes(props.pageTotal)"
      :active="current === props.pageTotal"
      @click="() => jump(props.pageTotal)"
    >
      {{ props.pageTotal }}
    </nub-pagination-item>
  </div>
</template>
