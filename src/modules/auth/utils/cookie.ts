import { Request, Response } from 'express';

const REFRESH_TOKEN_COOKIE_NAME = 'refreshToken';
const REFRESH_TOKEN_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export function setRefreshTokenCookie(res: Response, token: string): void {
  const isProduction = process.env.NODE_ENV === 'production' || process.env.APP_ENV === 'production';
  res.cookie(REFRESH_TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: REFRESH_TOKEN_MAX_AGE_MS,
    path: '/api/auth',
  });
}

export function clearRefreshTokenCookie(res: Response): void {
  const isProduction = process.env.NODE_ENV === 'production' || process.env.APP_ENV === 'production';
  res.clearCookie(REFRESH_TOKEN_COOKIE_NAME, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    path: '/api/auth',
  });
}

export function getRefreshTokenFromReq(req: Request): string | null {
  // Check cookies first
  if (req.cookies && req.cookies[REFRESH_TOKEN_COOKIE_NAME]) {
    return req.cookies[REFRESH_TOKEN_COOKIE_NAME];
  }
  // Fall back to request body
  if (req.body && req.body.refreshToken) {
    return req.body.refreshToken;
  }
  // Fall back to header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
}
