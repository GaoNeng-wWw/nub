import { env } from 'node:process';

const InstallSchema = z.object({
  userName: z.string({ required_error: '管理员用户名必须存在' }),
  password: z.string({ required_error: '密码必须存在' }),
  siteName: z.string({ required_error: '必须设置一个站点名称' }),
  avatarUrl: z.string().optional(),
  client_id: z.string().min(1).default(env.client_id ?? ''),
  redirect_url: z.string().min(1).default(env.redirect_url ?? ''),
  client_secret: z.string().min(1).default(env.client_secret ?? ''),
})

export default defineEventHandler(async (ctx) => {
  const body = await readBody(ctx);
  const { success, error, data } = InstallSchema.safeParse(body);
  if (!success) {
    return createError({
      statusCode: 400,
      message: error.errors[0].message,
    })
  }
  const { userName, password, siteName, avatarUrl, client_id, redirect_url, client_secret } = data;
  const { isInstall, installSite } = useSite()
  if (await isInstall()) {
    return true;
  }
  return installSite({
    userName,
    password,
    siteName,
    avatarUrl,
    client_id,
    redirect_url,
    postTotal: 0,
    client_secret,
  })
    .then(() => true);
})
