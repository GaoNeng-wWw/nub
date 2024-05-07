export const useTags = () => {
  const { data, error, status } = useAsyncData('tags', () => $fetch('/api/tags'));

  return {
    tags: data,
    error,
    status,
  }
}
