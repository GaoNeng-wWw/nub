import type { Tag } from '@prisma/client';
import type { H3Error } from 'h3';

interface Post {
  title: string
  content: string
  tags: { id: number }[]
  publish: boolean
}

export const usePost = () => {
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
  return { addPost }
}
