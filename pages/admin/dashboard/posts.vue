<script setup lang=ts>
import { Button } from '@miraiui-org/vue-button'

const index = [
  {
    id: 'title',
    label: '标题',
  },
  {
    id: 'tags',
    label: '标签',
  },
  {
    id: 'actions',
    label: '操作',
  },
]

const router = useRouter();

const { $toast } = useNuxtApp();
const { posts, loading, deletePost, patchPost, totalPages, loadPage } = usePosts($toast);
</script>

<template>
  <div class="w-full h-full px-2 overflow-auto py-2">
    <div class="w-full py-2 flex justify-between items-center">
      <h1 class="text-2xl">
        文章管理
      </h1>
      <Button @click="() => router.replace('/admin/dashboard/editor')">
        新增文档
      </Button>
    </div>
    <nub-table :index="index" :data="posts" border :loading="loading">
      <template #tags="{ data }">
        <div class="w-full flex flex-wrap gap-2 flex-shrink grow-0">
          <template v-for="(tag, idx) of data.Tag" :key="idx">
            <nub-tag class="w-fit" :show-close="false">
              {{ tag.name }}
            </nub-tag>
          </template>
        </div>
      </template>
      <template #actions="{ data }">
        <div class="w-full flex gap-2">
          <Button type="primary" @click="() => patchPost(data.id)">
            修改
          </Button>
          <Button type="danger" @click="() => deletePost(data.id, data)">
            删除
          </Button>
        </div>
      </template>
    </nub-table>
    <nub-pagination v-if="totalPages > 1" :page-total="totalPages" class="mt-2" @page-change="loadPage" />
  </div>
</template>
