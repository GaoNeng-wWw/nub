import { env } from 'node:process';
import { PrismaClient } from '@prisma/client';
import { Redis } from 'ioredis';

let client: PrismaClient | null = null;
let redis: Redis | null = null;

export const useDatabase = () => {
  if (!client) {
    client = new PrismaClient();
  }
  return client;
};

export const useRedis = () => {
  if (!redis) {
    if (!env.NUB_KV_URL) {
      throw new Error('Redis url should not to be undefined');
    }
    redis = new Redis(env.NUB_KV_URL, {
      tls: {
        rejectUnauthorized: false,
      },
    });
  }
  return redis;
};
