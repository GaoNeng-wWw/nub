<script setup lang="ts">
import mermaid from 'mermaid';
import { MdEditor, MdPreview } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const content = ref('');
const md = useNuxtApp().$md();
const html = computed(() => md.render(content.value));
mermaid.initialize({ startOnLoad: false });
const renderGraph = useDebounceFn(async () => {
  await mermaid.run()
}, 1300)
</script>

<template>
  <div class="w-full h-full">
    <div class="w-full flex">
      <!--  -->
    </div>
    <div class="w-full h-full grid grid-cols-2">
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
