export default defineEventHandler(async () => {
  const db = useDatabase();
  const tags = await db.tag.findMany({});
  return { tags }
})
