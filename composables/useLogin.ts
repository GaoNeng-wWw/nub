import type { H3Error } from 'h3';

export const useLogin = () => {
  return (schema: { [x: string]: string }) => {
    return $fetch('/api/login', { method: 'post', body: schema })
  }
}
