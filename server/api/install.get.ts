export default defineEventHandler(async () => {
  const { isInstall } = useSite();
  return Boolean(await isInstall());
})
