import type { Tag } from '@prisma/client';
import type { H3Error } from 'h3';
import { isEmpty } from 'ramda';

interface Post {
  title: string
  content: string
  tags: { id: number }[]
  publish: boolean
}

export const usePost = () => {
  const title = ref('');
  const content = ref('');
  const tags = ref<{ id: number, name: string, createAt: string, updateAt: string }[]>([])
  const isPatch = ref(false);
  const dateString = () => {
    const date = new Date();
    return [
      [
        date.getFullYear(),
        String(date.getMonth()).padStart(2, '0'),
        String(date.getDate()).padStart(2, '0'),
      ].join('/'),
      [
        String(date.getHours()).padStart(2, '0'),
        String(date.getMinutes()).padStart(2, '0'),
        String(date.getSeconds()).padStart(2, '0'),
      ].join(':'),
    ].join(' ')
  }
  const getMemeTitle = () => {
    return `开始于${dateString()}的杰作`;
  }
  const addPost = (post: Post = {
    content: '',
    title: getMemeTitle(),
    tags: [],
    publish: true,
  }) => {
    const { data, error, status, reason } = useReturn();
    const { title, content, tags, publish } = post;
    const _title = ref(title);
    if (!title) {
      _title.value = getMemeTitle();
    }
    $fetch('/api/post', {
      method: 'post',
      body: {
        title,
        content,
        tags,
        publish,
      },
      onResponseError({ response }) {
        error.value = true;
        status.value = 'error'
        reason.value = response._data;
      },
    })
      .then((res) => {
        data.value = res;
        status.value = 'success';
      })
      .catch(() => {})

    return {
      data,
      error,
      status,
      reason,
    }
  }
  const deletePost = (id: number) => {
    const { data, error, status, reason } = useReturn();
    $fetch('/api/post', {
      method: 'delete',
      onResponseError({ response: { _data } }) {
        reason.value = _data.message;
        status.value = 'error';
        error.value = true;
      },
      query: {
        id,
      },
    })
      .then(() => {
        status.value = 'success';
      });
    return {
      data,
      error,
      status,
      reason,
    }
  }
  const fetchPost = async (id?: string) => {
    if (id && !Number.isNaN(Number.parseInt(id))) {
      isPatch.value = true;
    }
    const { data, error, status } = await useAsyncData(`post-${id}`, () => $fetch('/api/post', { query: { id }, method: 'get' }));
    watch(data, () => {
      if (!data.value) {
        isPatch.value = false;
        return;
      }
      title.value = data.value.title;
      content.value = data.value.Content
      tags.value = data.value.Tag as unknown as { id: number, name: string, createAt: string, updateAt: string }[]
    }, { immediate: true })
    return { data, error, status, title, content, tags };
  }
  const patchPost = (
    post: Exclude<Partial<Post> & { id: string }, 'tag' | 'content'> & { Tag: { id: number }[], Content: string },
  ) => {
    if (isEmpty(post)) {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      $fetch('/api/post', {
        method: 'patch',
        body: { ...post },
        onResponseError({ response: { _data } }) {
          reject(_data)
        },
      })
        .then(() => resolve(true))
    })
  }
  return { addPost, getMemeTitle, deletePost, fetchPost, patchPost, title, content, isPatch, tags }
}
