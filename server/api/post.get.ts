export const GetPostSchema = z.object({
  id: z.string(),
})
export default defineEventHandler(async (ctx) => {
  const { success, data, error } = await getValidatedQuery(ctx, query => GetPostSchema.safeParse(query));
  if (!success) {
    throw createError({
      statusCode: 400,
      message: error.issues[0].message,
    })
  }
  const id = Number(data.id);
  if (Number.isNaN(id)) {
    throw createError({
      statusCode: 400,
      message: `id 应该为数字, 但收到了${data.id}`,
    })
  }
  const db = useDatabase();
  return await db.post.findUnique({
    where: {
      id,
    },
    select: {
      Tag: true,
      Content: true,
      title: true,
    },
  })
})
