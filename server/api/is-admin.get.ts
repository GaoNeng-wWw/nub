export default defineEventHandler(async (ctx) => {
  const db = useDatabase();
  const token = getCookie(ctx, 'token');
  const id = await getIdByToken(token!);
  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'Token错误',
    })
  }
  const user = await db.user.findFirst({
    where: {
      id,
    },
    select: {
      is_admin: true,
    },
  })
  if (user === null) {
    throw createError({
      statusCode: 404,
      message: '用户不存在',
    })
  }
  return user;
})
