import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

export const isAdminPath = (path: string) => path.startsWith('/admin');
const isLogin = (path: string) => path.startsWith('/admin/login');

export default defineEventHandler(async (ctx) => {
  if (!isAdminPath(ctx.node.req.url?.toString() ?? '/') || isLogin(ctx.node.req.url?.toString() ?? '')) {
    return;
  }
  const rawToken = getCookie(ctx, 'token');
  if (!rawToken) {
    sendRedirect(ctx, '/admin/login')
    return;
  }
  const token = rawToken.toLocaleLowerCase().includes('Bearer') ? rawToken.split(' ')[1] : rawToken;
  if (!token.startsWith('gh')) {
    try {
      veirfyJWT(token)
    } catch (error) {
      if ('expiredAt' in (error as unknown as Error)) {
        sendRedirect(ctx, '/admin/login');
        return;
      }
      setCookie(ctx, 'token', '');
      sendRedirect(ctx, '/admin/login')
      return;
    }
  }
  if (!await verifyJWTAtRedis(token)) {
    setCookie(ctx, 'token', '');
    sendRedirect(ctx, '/admin/login')
  }
})
