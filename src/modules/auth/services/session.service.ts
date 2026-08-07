import { authRepository, AuthRepository } from '../repositories/auth.repository';
import { passwordService } from './password.service';
import { Session, RefreshToken } from '@prisma/client';

export interface CreateSessionParams {
  userId: string;
  tenantId?: string | null | undefined;
  ipAddress?: string | null | undefined;
  userAgent?: string | null | undefined;
  deviceInfo?: Record<string, any> | null | undefined;
  expiresInDays?: number | undefined;
}

export class SessionService {
  constructor(private repo: AuthRepository = authRepository) {}

  async createSession(params: CreateSessionParams): Promise<{ session: Session; refreshTokenPlain: string }> {
    const expiresInDays = params.expiresInDays || 30;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expiresInDays);

    const refreshTokenPlain = passwordService.generateRandomToken(40);
    const refreshTokenHash = passwordService.hashRandomToken(refreshTokenPlain);

    const session = await this.repo.createSession({
      user: { connect: { id: params.userId } },
      tenantId: params.tenantId || null,
      ipAddress: params.ipAddress || null,
      userAgent: params.userAgent || null,
      deviceInfo: (params.deviceInfo as any) ?? null,
      expiresAt,
      refreshTokenHash,
    });

    // Also persist in RefreshToken model
    await this.repo.createRefreshToken({
      user: { connect: { id: params.userId } },
      session: { connect: { id: session.id } },
      tokenHash: refreshTokenHash,
      expiresAt,
    });

    return { session, refreshTokenPlain };
  }

  async validateRefreshToken(plainToken: string): Promise<{ session: Session; refreshTokenRecord: RefreshToken; userId: string } | null> {
    const tokenHash = passwordService.hashRandomToken(plainToken);
    const tokenRecord = await this.repo.findRefreshTokenByHash(tokenHash);

    if (!tokenRecord) {
      return null;
    }

    if (tokenRecord.expiresAt < new Date() || tokenRecord.revokedAt) {
      return null;
    }

    const session = await this.repo.findSessionById(tokenRecord.sessionId);
    if (!session || (session.expiresAt && session.expiresAt < new Date()) || session.revokedAt) {
      return null;
    }

    return {
      session,
      refreshTokenRecord: tokenRecord,
      userId: tokenRecord.userId,
    };
  }

  async revokeSession(sessionId: string): Promise<void> {
    await this.repo.deleteSession(sessionId);
  }

  async revokeAllUserSessions(userId: string): Promise<void> {
    await this.repo.deleteAllUserSessions(userId);
    await this.repo.revokeAllUserRefreshTokens(userId);
    await this.repo.incrementTokenVersion(userId);
  }
}

export const sessionService = new SessionService();
