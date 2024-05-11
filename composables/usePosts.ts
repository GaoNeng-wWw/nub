import type { Post } from '@prisma/client';
import type { SerializeObject } from 'nitropack';
import type { toast } from 'vue3-toastify';

interface UnSerializeObject {
  Tag: {
    id: number
    name: string
    createAt: Date
    updateAt: Date
  }[]
  id: number
  title: string
  createAt: Date
  updateAt: Date
  publish: boolean
}

export const usePosts = (
  $toast: typeof toast,
  initializedPage = 1,
) => {
  const loading = ref(false);
  const page = ref(initializedPage)
  const totalPages = ref(1);
  const nextPage = () => page.value += 1;
  const prevPage = () => page.value -= 1;
  const { data } = useAsyncData('posts', () => {
    return $fetch('/api/posts', { method: 'get', query: { page } });
  }, {
    watch: [page],
  });
  const posts = ref<SerializeObject<UnSerializeObject>[]>([]);
  watch(data, () => {
    posts.value = data.value?.posts ?? [];
    totalPages.value = data.value?.pages ?? 1;
  }, { immediate: true })
  const deletePost = (
    id: number,
    post: SerializeObject<UnSerializeObject>,
  ) => {
    const { deletePost: _deletePost } = usePost()
    loading.value = true;
    const postIdx = posts.value.indexOf(post);
    const { error, reason, status } = _deletePost(id)
    watchOnce(status, () => {
      loading.value = status.value === 'pending'
    }, { immediate: true });
    watchOnce(error, () => {
      if (error.value) {
        posts.value.splice(postIdx, 0, post)
        $toast.error(reason.value)
      }
    }, { immediate: true });
  }
  const patchPost = (id: number) => {
    const router = useRouter();
    router.replace(`/admin/dashboard/editor?id=${id}`);
  }
  const loadPage = (_page: number) => {
    page.value = _page;
  }
  return {
    posts,
    loading,
    page,
    totalPages,
    nextPage,
    prevPage,
    deletePost,
    patchPost,
    loadPage,
  }
}
