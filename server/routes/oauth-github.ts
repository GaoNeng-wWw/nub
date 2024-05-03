import { env } from 'node:process';

const OAUTH_REDIRECT_BASEURL = `https://github.com/login/oauth/authorize`;

export default defineEventHandler(async (ctx) => {
  const url = new URL(OAUTH_REDIRECT_BASEURL);
  const { getSiteInfo } = useSite();
  const { client_id, redirect_url } = await getSiteInfo();
  url.searchParams.append('client_id', client_id || env.client_id!);
  url.searchParams.append('redirect_url', redirect_url || env.redirect_url!)
  await sendRedirect(ctx, url.toString(), 302);
})
