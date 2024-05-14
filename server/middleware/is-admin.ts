export default defineEventHandler(async (ctx) => {
  const url = ctx.node.req.url?.toString() ?? '/';
  if (!isAdminPath(url)) {
    return;
  }
  const token = getCookie(ctx, 'token');
  if (!token) {
    setCookie(ctx, 'token', '');
    throw createError({
      statusCode: 401,
      data: {
        redirect: '/admin/login',
        reason: '未登录',
      },
    })
  }
  const id = await getIdByToken(token);
  if (!id) {
    setCookie(ctx, 'token', '');
    throw createError({
      status: 400,
      data: {
        redirect: '/admin/login',
        reason: '非法token',
      },
    })
  }
  const db = useDatabase();
  const { is_admin } = await db.user.findFirst({
    where: {
      id,
    },
    select: {
      is_admin: true,
    },
  }) ?? { is_admin: false }
  if (!is_admin) {
    setCookie(ctx, 'token', '');
    throw createError({
      status: 403,
      data: {
        redirect: '/',
        reason: '权限不足',
      },
    })
  }
})
