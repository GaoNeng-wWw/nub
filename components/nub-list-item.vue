<script setup lang="ts">
const props = defineProps<{
  title: string
  date: number
  tags: string[]
}>();

const { title, date, tags } = toRefs(props);

const humanDate = computed(() => {
  const dateObj = new Date(date.value);
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  return [dateObj.getFullYear(), `${month > 10 ? month : `0${month}`}`, `${day > 10 ? date : `0${day}`}`]
})
</script>

<template>
  <div class="flex w-full rounded hover:bg-zinc-200 transition cursor-pointer gap-4 p-2">
    <div class="w-full shrink truncate">
      <h1 class="text-lg truncate text-zinc-800">
        {{ title }}
      </h1>
      <div class="text-sm text-zinc-700 flex items-end gap-2 flex-wrap py-0.5">
        <div>
          <span>{{ humanDate }}</span>
        </div>
        <template v-for="(tag, idx) of tags" :key="idx">
          <div class="h-full px-2 py-0.5 bg-blue-500 text-white rounded">
            # {{ tag }}
          </div>
        </template>
      </div>
    </div>
    <svg class="w-6 h-6 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.1384 3C21.4146 3 21.6385 3.22386 21.6385 3.5C21.6385 3.58701 21.6157 3.67252 21.5725 3.74807L18 10L21.5725 16.2519C21.7095 16.4917 21.6262 16.7971 21.3865 16.9341C21.3109 16.9773 21.2254 17 21.1384 17H4V22H2V3H21.1384ZM18.5536 5H4V15H18.5536L15.6965 10L18.5536 5Z" />
    </svg>
  </div>
</template>
