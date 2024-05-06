export const GetPostSchema = z.object({
  id: z.number().gt(0),
})
export default defineEventHandler(async (ctx) => {
  const { success, data, error } = await getValidatedQuery(ctx, query => GetPostSchema.safeParse(query));
  if (!success) {
    return createError({
      statusCode: 400,
      message: error.issues[0].message,
    })
  }
  const db = useDatabase();
  return db.post.findUnique({
    where: {
      id: data.id,
    },
  })
})
