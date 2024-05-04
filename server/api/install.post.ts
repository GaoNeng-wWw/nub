import { env } from 'node:process';
import { useLogger } from '@nuxt/kit';
import { storeJWT } from '../utils/useJWT';

const InstallSchema = z.object({
  siteName: z.string({ required_error: '必须设置一个站点名称' }),
  avatarUrl: z.string().optional(),
  username: z.string(),
  password: z.string(),
})
export default defineEventHandler(async (ctx) => {
  const logger = useLogger('Install')
  logger.info('Start Install');
  const body = await readBody(ctx);
  const { success, error, data } = InstallSchema.safeParse(body);
  logger.info('Parse body')
  if (!success) {
    logger.warn('Body invalide');
    return createError({
      statusCode: 400,
      message: error.errors[0].message,
    })
  }
  const { siteName, avatarUrl, username, password } = data;
  const { isInstall, installSite } = useSite()
  if (await isInstall()) {
    logger.warn('Site is installed')
    return true;
  }
  const installState = installSite({
    siteName,
    avatarUrl,
    postTotal: 0,
    userTotal: 0,
  })
    .then(() => true)
    .catch((reason) => {
      logger.error(reason);
      return false;
    })
  if (!await installState) {
    return createError({
      status: 500,
      message: '未知错误, 请查看日志',
    })
  }
  const db = useDatabase();
  const _password = usePassword(password)
  const { id } = await db.user.create({
    data: {
      username,
      password: _password,
      profile: {
        create: {
          name: username,
        },
      },
      comment: {
        create: [],
      },
    },
  })
  const jwt = useJWT({ id });
  return await storeJWT(jwt, id);
})
