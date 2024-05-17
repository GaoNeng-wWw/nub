import { useSiteInfo } from '~/composables/useSiteInfo';

const CreatePostSchema = z.object({
  title: z.string().min(1, '标题不能为空'),
  content: z.string().min(1, '正文不能为空'),
  tags: z.array(z.object({
    id: z.number(),
  })).min(1, '至少要有一个标签'),
  publish: z.boolean().default(true),
})

export default defineEventHandler(async (ctx) => {
  const body = await readBody(ctx);
  const { success, error, data } = CreatePostSchema.safeParse(body)
  if (!success) {
    throw createError({
      statusCode: 400,
      message: error.issues[0].message,
    })
  }
  const db = useDatabase();
  const post = await db.post.findFirst({
    where: {
      title: data.title,
    },
  })
  if (post) {
    throw createError({
      status: 400,
      message: '文章已存在',
      fatal: false,
    })
  }
  const newPost = await db.post.create({
    data: {
      title: data.title,
      Content: data.content,
      Tag: {
        connect: [...data.tags],
      },
      publish: data.publish,
    },
    select: {
      id: true,
      title: true,
    },
  })
  const site = useSite();
  const siteInfo = await site.getSiteInfo();
  await site.patchSiteInfo('postTotal', Number.parseInt(siteInfo.postTotal.toString()) + 1)
  return newPost;
})
