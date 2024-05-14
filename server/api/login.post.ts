export const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
})
export default defineEventHandler(async (ctx) => {
  const { success, data, error } = await readValidatedBody(ctx, body => LoginSchema.safeParse(body));
  if (!success) {
    throw createError({ statusCode: 400, message: error.issues[0].message })
  }
  const { username, password } = data;
  const _pwd = usePassword(password);
  const db = useDatabase();
  const userInfo = await db.user.findFirst({
    where: {
      username,
      password: _pwd,
    },
    select: {
      id: true,
      is_admin: true,
    },
  })
  if (!userInfo) {
    throw createError({
      statusCode: 404,
      message: '用户名或密码错误',
    })
  }
  const jwt = useJWT({ id: userInfo.id });
  await storeJWT(jwt, userInfo.id);
  setCookie(ctx, 'token', jwt, { httpOnly: true })
  return { token: jwt }
})
