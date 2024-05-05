import { env } from 'node:process';
import jwt from 'jsonwebtoken';
import type { Algorithm } from 'jsonwebtoken';

export const useJWT = (content: Record<string, any>) => {
  return jwt.sign(content, env.JWT_SECRET, {
    algorithm: env.JWT_ALGORITHM as Algorithm,
    expiresIn: env.JWT_EXPIRE,
  })
}

export const storeJWT = (token: string, id: string) => {
  const redis = useRedis();
  const ms = Number.parseInt(env.JWT_EXPIRE)
  const s = Number.parseInt(`${ms / 1000}`);
  return redis.setex(`TOKEN:${token}`, s, id)
}

export const veirfyJWT = (token: string) => {
  return jwt.verify(token, env.JWT_SECRET, {
    algorithms: [env.JWT_ALGORITHM] as Algorithm[],
  })
}

export const verifyJWTAtRedis = async (token: string) => {
  const redis = useRedis();
  return Boolean(await redis.exists(`TOKEN:${token}`));
}

export const getIdByToken = (token: string) => {
  const redis = useRedis();
  return redis.get(`TOKEN:${token}`);
}
