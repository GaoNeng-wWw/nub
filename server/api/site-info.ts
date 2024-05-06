export default defineEventHandler(() => {
  const { getSiteInfo } = useSite();
  return getSiteInfo();
})
