interface SiteInfo {
  siteName: string
  postTotal: number
  avatarUrl?: string
  userTotal: number
}
const NS = 'siteinfo';
let cache: SiteInfo | null = null
export const useSite = () => {
  const redis = useRedis();
  const getSiteInfo = async () => {
    if (cache) {
      return cache;
    } else {
      const obj = await redis.hgetall(NS) as unknown as SiteInfo;
      cache = obj;
    }
    return cache;
  }
  const patchSiteInfo = <T extends keyof SiteInfo>(key: T, value: SiteInfo[T]) => {
    if (cache) {
      cache[key] = value;
    }
    return redis.hset(NS, { [key]: value })
  }
  const installSite = (siteConfig: SiteInfo) => {
    cache = siteConfig;
    return redis.hset(NS, siteConfig);
  }
  const isInstall = () => {
    if (cache) {
      return true;
    }
    return redis.exists(NS);
  }
  return {
    getSiteInfo,
    patchSiteInfo,
    installSite,
    isInstall,
  }
}
