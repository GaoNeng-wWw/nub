import { env } from 'node:process';

const OAUTH_REDIRECT_BASEURL = `https://github.com/login/oauth/authorize`;

export default defineEventHandler(async (ctx) => {
  const query = getQuery(ctx)
  setCookie(ctx, 'back', query.back?.toString?.() ?? '/');
  const url = new URL(OAUTH_REDIRECT_BASEURL);
  const client_id = env.client_id
  const redirect_url = env.redirect_url;
  url.searchParams.append('client_id', client_id);
  url.searchParams.append('redirect_url', `${redirect_url}`)
  await sendRedirect(ctx, url.toString(), 302);
})
