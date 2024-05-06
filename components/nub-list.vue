<script setup lang="ts">
const props = defineProps<{
  data: { title: string, date: number, tags: string[] }[]
}>();
const { data } = toRefs(props);
</script>

<template>
  <div class="w-full h-fit flex flex-col gap-2">
    <template v-for="(item, idx) of data" :key="idx">
      <nub-list-item
        :title="item.title"
        :date="item.date"
        :tags="item.tags"
      />
    </template>
  </div>
</template>
