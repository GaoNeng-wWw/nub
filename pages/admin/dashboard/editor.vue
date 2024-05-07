<script setup lang="ts">
import { Button } from '@miraiui-org/vue-button';
import mermaid from 'mermaid';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const content = ref('');
const title = ref('');
const md = useNuxtApp().$md();
const html = computed(() => md.render(content.value));
mermaid.initialize({ startOnLoad: false });
const renderGraph = useDebounceFn(async () => {
  await mermaid.run()
}, 1300)
const { addPost } = usePost();
const toast = useNuxtApp().$toast;
const { tags, error } = useTags();
watch(tags, () => {
  console.log(tags.value)
}, { immediate: true })
const createPost = () => {
  const { status, error, reason } = addPost({ title: title.value, content: content.value, tags: [], publish: true })
  const stop = watch(status, () => {
    if (error.value) {
      toast.error(reason.value.message)
    }
    if (status.value === 'success') {
      toast.success('文章发布成功')
    }
    stop();
  })
}
</script>

<template>
  <div class="w-full h-full flex flex-col px-2">
    <div class="w-full flex justify-between py-2">
      <div class="flex gap-2 items-center">
        <nuxt-link to="/admin/dashboard/posts">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </nuxt-link>
        <input v-model="title" class="w-64 h-10 p-2 rounded-md outline-none bg-white">
      </div>
      <div class="flex gap-2">
        <Button type="primary" icon-only @click="createPost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 rotate-[180deg]">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
          </svg>
        </Button>
        <!-- TODO: Publish daft post -->
      </div>
    </div>
    <div class="w-full flex-auto grid grid-cols-2 min-h-0">
      <client-only>
        <MdEditor
          v-model="content"
          editor-id="admin"
          :preview="false"
          class="!h-full"
          @change="renderGraph"
        />
        <div class="prose py-8 px-2 !max-w-none overflow-scroll" v-html="html" />
      </client-only>
    </div>
    <nub-modal>
      <tag-modal />
    </nub-modal>
  </div>
</template>

<style>
.has-focused .line{
  filter: blur(2px);
  transition: filter .5s ease-in-out;
}
.has-focused .focused{
  filter: blur(0);
}
.has-focused:hover .line{
  filter: blur(0);
}
.has-highlighted .highlighted{
  margin: 0 -24px;
  padding: 0 24px;
  width: calc(100% + 40px);
  display: inline-block;
  background: theme(backgroundColor.zinc.200);
}
</style>
