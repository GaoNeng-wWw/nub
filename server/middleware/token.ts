import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

export default defineEventHandler(async (ctx) => {
  const rawToken = getCookie(ctx, 'token');
  if (!rawToken) {
    throw createError({
      statusCode: 401,
      message: '未登录',
    })
  }
  const token = rawToken.toLocaleLowerCase().includes('Bearer') ? rawToken.split(' ')[1] : rawToken;
  if (!token.startsWith('gh')) {
    try {
      veirfyJWT(token)
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw createError({
          statusCode: 401,
          message: 'token已过期',
        })
      }
      throw createError({
        statusCode: 401,
        message: '非法token',
      })
    }
  }
  if (!await verifyJWTAtRedis(token)) {
    throw createError({
      statusCode: 401,
      message: 'token已过期',
    })
  }
})
