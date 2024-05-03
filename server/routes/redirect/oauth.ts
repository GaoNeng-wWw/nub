import { env } from 'node:process';

export default defineEventHandler(async (ctx) => {
  const { code } = getQuery(ctx);
  const back = getCookie(ctx, 'back') ?? '/'
  if (!code) {
    await sendRedirect(ctx, back);
    return;
  }
  const { getSiteInfo } = useSite();
  const { client_id, client_secret } = await getSiteInfo();
  const { getToken } = useGithubOAuth();
  if (!(client_id ?? env.client_id) || !(client_secret ?? env.client_secret)) {
    await sendRedirect(ctx, back)
  }
  const tokenLike = getToken(
    code.toString(),
    client_id ?? env.client_id,
    client_secret ?? env.client_secret,
  )
    .then((res) => {
      const { access_token, token_type } = res;
      setCookie(ctx, 'token', `${token_type} ${access_token}`)
      return `${token_type} ${access_token}`
    })
    .catch((reason: { error: string }) => {
      return createError({
        statusCode: 400,
        message: reason.error,
      });
    })
  const token = await tokenLike;
  if (typeof token !== 'string') {
    return tokenLike;
  }
  // TODO: put id into user table
})
