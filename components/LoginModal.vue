<script setup lang="ts">
// const { data } = await useSiteInfo();
</script>

<template>
  <div class="min-w-60 px-2 py-4 rounded bg-zinc-200 space-y-2">
    <h1 class="text-xl text-center">
      Login Please
    </h1>
    <div class="w-full bg-zinc-800 text-zinc-50 px-2 py-2 rounded-md text-center cursor-pointer hover:bg-zinc-700 transition-all">
      <nuxt-link href="/oauth/github" external>
        <div class="w-fit flex items-center gap-2 mx-auto">
          <icon-github class="w-4 h-4 fill-zinc-50" />
          Github
        </div>
      </nuxt-link>
    </div>
  </div>
</template>
