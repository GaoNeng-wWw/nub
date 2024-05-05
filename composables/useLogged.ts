export const useLogged = () => useState('logged', () => Boolean(useCookie('token').value));
