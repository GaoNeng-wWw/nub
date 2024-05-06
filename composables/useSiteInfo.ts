export const useSiteInfo = async () => {
  const { data, error, pending } = await useFetch('/api/site-info')
  return {
    data,
    pending,
  }
}
