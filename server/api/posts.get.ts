const GetPostParams = z.object({
  page: z.coerce.number(),
  size: z.number()
    .gte(0, { message: 'page不应该小于0' })
    .default(10),
})

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { success, data, error } = GetPostParams.safeParse(query)
  if (!success) {
    throw createError({
      statusCode: 400,
      message: error.errors[0].message,
    })
  }
  const { page, size } = data;
  const db = useDatabase();
  const { getSiteInfo } = useSite()
  const { postTotal } = await getSiteInfo();
  const posts = await db.post.findMany({
    skip: (page - 1) * size,
    take: size,
    where: {
      publish: true,
    },
    select: {
      id: true,
      title: true,
      createAt: true,
      updateAt: true,
      publish: true,
      Tag: true,
      Content: false,
    },
  })
  const pages = Math.ceil(postTotal / size)
  return {
    pages,
    posts,
  }
})
