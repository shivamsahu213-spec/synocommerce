import { JwtPayload, generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken } from '../utils/jwt';

export class TokenService {
  issueTokens(payload: JwtPayload): { accessToken: string; refreshToken: string } {
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    return { accessToken, refreshToken };
  }

  verifyAccess(token: string): JwtPayload {
    return verifyAccessToken(token);
  }

  verifyRefresh(token: string): JwtPayload {
    return verifyRefreshToken(token);
  }
}

export const tokenService = new TokenService();
