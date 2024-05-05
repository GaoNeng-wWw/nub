import type { Tag } from '@prisma/client';
import type { H3Error } from 'h3';

export const usePost = () => {
  const dateString = () => {
    const date = new Date();
    return [
      date.getFullYear(),
      String(date.getMonth()).padStart(2, '0'),
      String(date.getDate()).padStart(2, '0'),
      String(date.getHours()).padStart(2, '0'),
      String(date.getMinutes()).padStart(2, '0'),
      String(date.getSeconds()).padStart(2, '0'),
    ].join('/')
  }
  const getMemeTitle = () => {
    return `开始于${dateString()}的杰作`;
  }
  const addPost = (title: string = getMemeTitle()) => {
    const data = ref<null | { id: number, title: string }>(null);
    const error = ref<boolean>(false);
    const reason = ref<H3Error | null>(null);
    const status = ref<'pending' | 'error' | 'success'>('pending');
    $fetch('/api/post', {
      method: 'post',
      body: {
        title,
        content: '',
        tags: [],
      },
    })
      .then((res) => {
        data.value = res;
        status.value = 'success';
      })
      .catch((errReason) => {
        error.value = true;
        reason.value = errReason;
        status.value = 'error'
      })
    return { data, error, status }
  }
  return { addPost }
}
