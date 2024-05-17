<script lang="ts" setup>
const props = defineProps<{
  index: {
    id: string
    label: string
  }[]
  data: any[]
  border: boolean
  loading: boolean
  emptyText?: string
}>();
const { index, data, border, loading, emptyText } = toRefs(props);
const slots = useSlots();
</script>

<template>
  <div>
    <table
      class="w-full overflow-hidden rounded-md relative"
    >
      <colgroup v-if="data.length">
        <col v-for="item of index" :key="item.id" style="width:100px">
      </colgroup>
      <thead class="w-full">
        <tr>
          <td
            v-for="(item, idx) of index"
            :key="item.id"
            class="py-2 font-medium border-b border-solid border-zinc-300 text-zinc-600 px-2"
            :class="{
              'first:border-l first:border-r last:border-r': border,
              'border-t border-r': border && idx >= 0 && idx < index.length,
            }"
          >
            {{ item.label }}
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(tableData, idx) of data" :key="idx" class="p-2 hover:bg-zinc-200/50 px-2 transition cursor-pointer">
          <template v-for="({ id }, indexIdx) of index" :key="id">
            <td
              class="border-b border-solid border-zinc-200 py-1 text-zinc-600" :class="{
                'first:border-l first:border-r last:border-r': border,
                'border-r': border && indexIdx > 0 && indexIdx < index.length,
              }"
            >
              <div v-if="!slots[id]" :key="id" class="px-2">
                {{ tableData[id] }}
              </div>
              <div v-else :key="`${id}-slot`" class="px-2">
                <component :is="slots[id]" :idx="idx" :data="tableData" />
              </div>
            </td>
          </template>
        </tr>
      </tbody>
      <nub-fade>
        <nub-loading v-if="loading" />
      </nub-fade>
    </table>
    <div v-if="!loading && !data.length" class="w-full py-10 flex flex-col items-center justify-center border border-zinc-300 border-t-0 text-zinc-600">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
      </svg>
      <p>{{ emptyText ?? '暂无数据' }}</p>
    </div>
  </div>
</template>
