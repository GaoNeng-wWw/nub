const DeletePostSchema = z.object({
  id: z.string(),
});
export default defineEventHandler(async (ctx) => {
  const { data, success, error } = await getValidatedQuery(ctx, data => DeletePostSchema.safeParse(data));
  if (!success) {
    throw createError({
      statusCode: 400,
      message: error.issues[0].message,
    })
  }
  const { id: rawId } = data;
  const id = Number.parseInt(rawId);
  if (
    Number.isNaN(id)
  ) {
    throw createError({
      statusCode: 400,
      message: `${rawId} 必须为数字`,
    })
  }
  const db = useDatabase();
  const post = await db.post.findFirst({
    where: {
      id,
    },
  });
  if (!post) {
    throw createError({
      statusCode: 404,
      message: '文章不存在',
    });
  }
  await db.post.delete({
    where: {
      id,
    },
  })
  const site = useSite();
  const siteInfo = await site.getSiteInfo();
  await site.patchSiteInfo('postTotal', Math.max(0, siteInfo.postTotal - 1))
})
