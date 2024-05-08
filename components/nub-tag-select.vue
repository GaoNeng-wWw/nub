<script lang="ts" setup>
import { Button } from '@miraiui-org/vue-button';
import { TransitionCollapse } from '@miraiui-org/vue-transition-collapse';
import { vOnClickOutside } from '@vueuse/components';

const emits = defineEmits<{
  ok: [{ id: number, name: string, createAt: string, updateAt: string }[]]
  cancel: []
}>()

const { tags, appendTag } = useTags();
const tagData = ref<{ id: number, name: string, createAt: string, updateAt: string }[]>(tags.value?.tags ?? []);
const selectedTags = ref<{ id: number, name: string, createAt: string, updateAt: string }[]>([]);
const selectedTagsId = computed(() => selectedTags.value.map(t => t.id));
const visible = ref(false);
const currentTag = ref('');
const showShadowEl = computed(() => tagData.value.length === 0 && currentTag.value.length > 0)
const toast = useNuxtApp().$toast;
const removeSelectedTag = (id: number) => {
  selectedTags.value = selectedTags.value.filter(t => t.id !== id);
}
const selectTag = (id: number) => {
  const tag = tagData.value.filter(t => t.id === id)[0];
  if (!tag) {
    return;
  }
  if (selectedTagsId.value.includes(tag.id)) {
    removeSelectedTag(tag.id);
    return;
  }
  selectedTags.value.push(tag);
}
const pushTag = () => {
  if (!currentTag.value.length) {
    return;
  }
  if (tagData.value.length) {
    return;
  }
  tagData.value.push({ id: Math.random(), name: currentTag.value.trim(), createAt: '', updateAt: '' });
  selectedTags.value.push({ id: Math.random(), name: currentTag.value.trim(), createAt: '', updateAt: '' });
  appendTag(currentTag.value)
    .then((tag) => {
      const _tag = tagData.value.filter(t => t.name === tag.name)[0];
      const _selectedTag = selectedTags.value.filter(t => t.name === tag.name)[0];
      tagData.value.splice(
        tagData.value.indexOf(_tag),
        1,
        tag,
      )
      selectedTags.value.splice(tagData.value.indexOf(_selectedTag), 1, tag);
    })
    .catch(({ message }) => {
      toast.error(message);
    })
  currentTag.value = '';
}
const shadow = ref<null | HTMLElement>();
const width = ref(64);
/**
 * Search
 */
watch(currentTag, () => {
  tagData.value = tags.value?.tags.filter(tag => tag.name.startsWith(currentTag.value)) as { id: number, name: string, createAt: string, updateAt: string }[];
})
/**
 * Add
 */
watch(currentTag, () => {
  if (!currentTag.value) {
    width.value = 84;
  }
  width.value = Math.max((shadow.value?.offsetWidth ?? 0) + 16, 84);
})

const inputEl = ref<HTMLElement | null>();
</script>

<template>
  <div class="w-full relative *:select-none space-y-2">
    <h1 class="text-2xl">
      选择Tag
    </h1>
    <div
      v-on-click-outside="() => {
        visible = false;
      }" class="w-full box-border p-2 min-h-9 flex gap-2 rounded bg-zinc-200 items-center cursor-text"
    >
      <div
        class="shrink flex items-center gap-2 grow flex-wrap min-w-0"
        @click="() => {
          visible = !visible;
          inputEl?.focus?.()
        }"
      >
        <template v-for="tag of selectedTags" :key="tag.id ">
          <nub-tag
            class="shrink-0" show-close @click-close="(e) => {
              e.stopPropagation();
              removeSelectedTag(tag.id);
            }"
          >
            # {{ tag.name }}
          </nub-tag>
        </template>
        <teleport to="body">
          <span ref="shadow" class="fixed top-100 left-100 collapse">{{ currentTag }}</span>
        </teleport>
        <div class="relative h-full max-w-full grow">
          <input
            ref="inputEl"
            v-model.trim="currentTag"
            class="left-100 top-100 block max-w-full break-all px-2 box-border outline-none bg-transparent"
            :style="{
              width: `${width}px`,
            }"
            @keypress.enter="pushTag"
            @click.stop="() => visible = !visible"
            @blur.stop="pushTag"
          >
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 shrink-0 flex-auto grow-0 cursor-auto"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>
    </div>
    <TransitionCollapse>
      <div v-if="visible" class="w-full max-h-24 h-24 overflow-auto p-4 bg-zinc-100 absolute rounded-b-md">
        <ul class="space-y-2">
          <li
            v-for="tag of tagData" :key="tag.id"
            class="w-full py-1 transition hover:bg-zinc-200 rounded-md cursor-pointer"
            :class="{
              'bg-zinc-200': selectedTagsId.includes(tag.id),
            }"
            @click.stop="selectTag(tag.id)"
          >
            <span class="px-2">
              {{ tag.name }}
            </span>
          </li>
          <li
            v-if="showShadowEl"
            class="w-full py-1 transition bg-zinc-100 hover:bg-zinc-200 rounded-md cursor-pointer"
            @click="pushTag"
          >
            <span class="px-2">
              {{ currentTag }}
            </span>
          </li>
        </ul>
      </div>
    </TransitionCollapse>
    <div class="w-full flex gap-2 justify-end">
      <Button type="primary" @click.stop="() => emits('ok', selectedTags)">
        提交
      </Button>
      <Button @click.stop="() => emits('cancel')">
        取消
      </Button>
    </div>
  </div>
</template>
