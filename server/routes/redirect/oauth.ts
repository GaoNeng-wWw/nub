import { env } from 'node:process';
import { Octokit } from '@octokit/core';

export default defineEventHandler(async (ctx) => {
  const { code } = getQuery(ctx);
  const back = getCookie(ctx, 'back') ?? '/';
  if (!code) {
    await sendRedirect(ctx, back);
    return;
  }
  const accessToken = getCookie(ctx, 'token') ?? '';
  if (accessToken) {
    await sendRedirect(ctx, back);
    return;
  }
  const client_secret = env.client_secret;
  const client_id = env.client_id;
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
      if ('error' in res) {
        return createError({
          statusCode: 500,
          message: errorZH_CN[res.error],
        })
      }

      const { access_token, token_type } = res;
      setCookie(ctx, 'token', `${token_type} ${access_token}`)
      return `${token_type} ${access_token}`
    })
  const token = await tokenLike;
  if (typeof token !== 'string') {
    return;
  }
  const octokit = new Octokit({ auth: token });
  const idLike = octokit.request('GET /user')
    .then(({ data: { id } }) => id)
    .catch(reason => reason)
  if (typeof idLike === 'string') {
    createError(idLike);
    return;
  }
  const id = await idLike;
  const db = useDatabase();
  const user = await db.user.findUnique({
    where: {
      id,
    },
  })
  if (user) {
    return;
  }
  const userName = useRandomPassword(16);
  const password = useRandomPassword(32);
  await db.user.create({
    data: {
      id,
      username: userName,
      password,
      is_oauth: true,
    },
  })
})
