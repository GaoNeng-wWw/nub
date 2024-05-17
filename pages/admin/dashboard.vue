<template>
  <nuxt-layout name="admin">
    <template #side>
      <div class="w-40 bg-slate-200 h-full">
        <ul class="w-full h-full p-4 space-y-4">
          <nuxt-link to="/admin/dashboard" class="block rounded p-2" exact-active-class="bg-slate-300">
            <li>
              首页
            </li>
          </nuxt-link>
          <nuxt-link to="/admin/dashboard/posts" class="block rounded p-2" exact-active-class="bg-slate-300">
            <li>
              文章
            </li>
          </nuxt-link>
        </ul>
      </div>
    </template>
    <div class="grow h-full shrink min-w-0 break-words">
      <nuxt-page keepalive transition />
    </div>
  </nuxt-layout>
</template>
