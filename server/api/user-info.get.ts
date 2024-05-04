import { Octokit } from '@octokit/core';

export default defineEventHandler(async (ctx) => {
  const token = getCookie(ctx, 'token');
  if (!token) {
    return { data: null, status: 401 }
  }
  const octokit = new Octokit({ auth: token });
  const userInfo = await octokit.request('GET /user');
  return {
    data: userInfo.data,
    status: userInfo.status,
  };
})
