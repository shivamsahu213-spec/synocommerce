/**
 * IAM Session Service
 * @module modules/iam/application/services/session.service
 */

import { AuditLogEntity } from '../../domain/entities';
import { IAuditLogRepository,ISessionRepository } from '../../domain/repositories';
import { SessionIdentifier,UserIdentifier } from '../../domain/value-objects';
import { SessionResponseDto } from '../dto';

export class SessionService {
  private readonly _sessionRepo: ISessionRepository;
  private readonly _auditRepo: IAuditLogRepository;

  constructor(sessionRepo: ISessionRepository, auditRepo: IAuditLogRepository) {
    this._sessionRepo = sessionRepo;
    this._auditRepo = auditRepo;
  }

  public async getUserSessions(userIdStr: string, currentToken?: string): Promise<readonly SessionResponseDto[]> {
    const sessions = await this._sessionRepo.findByUserId(new UserIdentifier(userIdStr));
    return sessions
      .filter((s) => s.isValid)
      .map((s) => ({
        id: s.id.value,
        userId: s.userId.value,
        ipAddress: s.deviceInfo.ipAddress,
        userAgent: s.deviceInfo.userAgent,
        lastActivityAt: s.lastActivityAt,
        expiresAt: s.expiresAt,
        isCurrent: currentToken ? s.token === currentToken : false,
      }));
  }

  public async revokeSession(sessionIdStr: string): Promise<void> {
    const session = await this._sessionRepo.findById(new SessionIdentifier(sessionIdStr));
    if (session) {
      session.revoke();
      await this._sessionRepo.save(session);
      await this._auditRepo.save(new AuditLogEntity('SESSION_REVOKED', session.userId.value, undefined, { sessionId: sessionIdStr }));
    }
  }

  public async validateToken(token: string): Promise<{ isValid: boolean; userId?: string | undefined }> {
    const session = await this._sessionRepo.findByToken(token);
    if (!session || !session.isValid) {
      return { isValid: false };
    }

    session.touch();
    await this._sessionRepo.save(session);
    return { isValid: true, userId: session.userId.value };
  }
}
