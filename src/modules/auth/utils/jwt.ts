import jwt, { Secret, SignOptions } from 'jsonwebtoken';

export interface JwtPayload {
  userId: string;
  tenantId?: string | null;
  roleIds: string[];
  permissions: string[];
  tokenVersion: number;
  sessionId: string;
}

const ACCESS_TOKEN_SECRET: Secret = process.env.JWT_ACCESS_SECRET || 'default_jwt_access_secret_synocommerce_enterprise_2026';
const REFRESH_TOKEN_SECRET: Secret = process.env.JWT_REFRESH_SECRET || 'default_jwt_refresh_secret_synocommerce_enterprise_2026';

const ACCESS_TOKEN_EXPIRES_IN = (process.env.JWT_ACCESS_EXPIRES || '15m') as jwt.SignOptions['expiresIn'];
const REFRESH_TOKEN_EXPIRES_IN = (process.env.JWT_REFRESH_EXPIRES || '30d') as jwt.SignOptions['expiresIn'];

export function generateAccessToken(payload: JwtPayload): string {
  const options: SignOptions = {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  };
  return jwt.sign({ ...payload }, ACCESS_TOKEN_SECRET, options);
}

export function generateRefreshToken(payload: JwtPayload): string {
  const options: SignOptions = {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  };
  return jwt.sign({ ...payload }, REFRESH_TOKEN_SECRET, options);
}

export function verifyAccessToken(token: string): JwtPayload {
  return jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload;
}

export function verifyRefreshToken(token: string): JwtPayload {
  return jwt.verify(token, REFRESH_TOKEN_SECRET) as JwtPayload;
}
