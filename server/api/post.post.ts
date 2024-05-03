const CreatePostSchema = z.object({
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()),
})

export default defineEventHandler(async (ctx) => {
  const body = await readBody(ctx);
  const { success, error, data } = CreatePostSchema.safeParse(body)
  if (!success) {
    return createError({
      statusCode: 400,
      message: error.issues[0].message,
    })
  }
  const db = useDatabase();
  return await db.post.create({
    data: {
      title: data.title,
      Content: data.content,
      Tag: {
        create: data.tags.map((tag) => {
          return {
            name: tag,
          }
        }),
      },
    },
    select: {
      Content: false,
    },
  })
})
