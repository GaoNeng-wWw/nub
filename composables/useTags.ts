export const useTags = () => {
  const { data, error, status } = useAsyncData<{ tags: { name: string, id: number, createAt: string, updateAt: string }[] }>('tags', () => $fetch('/api/tags'));
  const appendTag = (name: string) => {
    return new Promise<{ name: string, id: number, createAt: string, updateAt: string }>((resolve, reject) => {
      $fetch('/api/tags', {
        method: 'post',
        body: {
          name,
        },
        onResponseError({ response: { _data } }) {
          reject(_data);
        },
      })
        .then((tag) => {
          resolve(tag);
        })
    })
  }
  return {
    tags: data,
    error,
    status,
    appendTag,
  }
}
