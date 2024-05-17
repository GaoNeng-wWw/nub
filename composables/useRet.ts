export const useReturn = <T>(data?: T, error?: boolean) => {
  const _data = ref(data ?? null);
  const _error = ref(error ?? false);
  const _reason = ref<null | H3Error>(null);
  const status = ref<'pending' | 'error' | 'success'>('pending');
  watch(_error, () => {
    if (_error.value) {
      status.value = 'error'
    } else {
      status.value = 'success';
    }
  })
  return {
    data: _data,
    error: _error,
    reason: _reason,
    status,
  }
}
