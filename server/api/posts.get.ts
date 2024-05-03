const GetPostParams = z.object({
  page: z.number()
    .gt(1, { message: 'size不应该小于1' })
    .default(1),
  size: z.number()
    .gt(0, { message: 'page不应该小于0' })
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
  const { getSiteInfo } = useSiteInfo();
  const { postTotal } = await getSiteInfo();
  const posts = await db.post.findMany({
    skip: page * size,
    take: size,
    where: {
      publish: true,
    },
    select: {
      Content: false,
    },
  })
  const pages = Math.ceil(postTotal / size)
  return {
    pages,
    posts,
  }
})
