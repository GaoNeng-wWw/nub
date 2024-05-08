const CreateTagSchema = z.object({
  name: z.string(),
})
export default defineEventHandler(async (ctx) => {
  const { success, data, error } = await readValidatedBody(ctx, body => CreateTagSchema.safeParse(body))
  if (!success) {
    throw createError({
      statusCode: 400,
      message: error.issues[0].message,
    })
  }
  const { name } = data;
  const db = useDatabase();
  let tag = await db.tag.findFirst({
    where: {
      name,
    },
  })
  if (tag) {
    throw createError({
      status: 400,
      message: '标签存在',
    })
  }
  tag = await db.tag.create({
    data: {
      name: name.trim(),
    },
  })
  return tag
})
