import { isEmpty, omit } from 'ramda';

const PatchPost = z.object({
  id: z.string(z.number()),
  title: z.optional(z.string().min(1, '标题不能为空')),
  Content: z.optional(z.string().min(1, '正文不能为空')),
  Tag: z.optional(
    z.array(z.object({
      id: z.number(),
    })).min(1, '至少要有一个标签'),
  ),
})

export default defineEventHandler(async (ctx) => {
  const { success, error, data } = await readValidatedBody(ctx, data => PatchPost.safeParse(data));
  if (!success) {
    throw createError({
      status: 400,
      message: error.issues[0].message,
    })
  }
  const id = Number.parseInt(data.id);
  if (Number.isNaN(id)) {
    throw createError({
      status: 400,
      message: `id 应该为数字, 但收到的是 ${id}`,
    })
  }
  const postInfo = omit(['id'], data);
  if (isEmpty(postInfo)) {
    return;
  }
  const db = useDatabase();

  const post = await db.post.update({
    where: {
      id,
    },
    data: {
      ...postInfo,
      Content: postInfo.Content,
      Tag: {
        connect: [...postInfo.Tag ?? []],
      },
    },
  })
  return post;
})
