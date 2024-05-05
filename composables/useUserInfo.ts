export const useUserInfo = async (
  logged: Ref<boolean>,
) => {
  if (!logged.value) {
    return { data: null, pending: false, error: false };
  }
  const { data, pending, error } = await useFetch('/api/user-info', { server: false });
  return { data, pending, error }
}
