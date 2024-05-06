<script lang="ts" setup>
const props = defineProps<{
  index: {
    id: string
    label: string
  }[]
  data: {
    [id: string]: any
  }[]
  border: boolean
}>();
const { index, data, border } = toRefs(props);
const slots = useSlots();
</script>

<template>
  <div
    :class="{
      // 'border border-zinc-300': border,
    }"
  >
    <table
      class="w-full overflow-hidden rounded-md"
    >
      <colgroup>
        <col v-for="item of index" :key="item.id" style="width:100px">
      </colgroup>
      <thead class="w-full">
        <tr>
          <td
            v-for="(item, idx) of index"
            :key="item.id"
            class="py-2 font-medium border-b border-solid border-zinc-200 text-zinc-600 px-2"
            :class="{
              'first:border-l first:border-r last:border-r': border,
              'border-t border-r': border && idx > 0 && idx < index.length,
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
              :rowspan="border ? 1 : 0"
              :colspan="border ? 1 : 0"
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
    </table>
  </div>
</template>
