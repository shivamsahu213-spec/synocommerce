/**
 * Security Audit Log Entity
 * @module modules/iam/domain/entities/audit-log.entity
 */

import crypto from 'node:crypto';

export type SecurityEventType =
  | 'USER_LOGIN_SUCCESS'
  | 'USER_LOGIN_FAILED'
  | 'USER_LOGOUT'
  | 'USER_REGISTERED'
  | 'PASSWORD_CHANGED'
  | 'MFA_ENABLED'
  | 'MFA_DISABLED'
  | 'SESSION_REVOKED'
  | 'API_KEY_CREATED'
  | 'API_KEY_REVOKED';

export class AuditLogEntity {
  public readonly id: string;
  public readonly timestamp: Date;
  public readonly eventType: SecurityEventType;
  public readonly userId?: string | undefined;
  public readonly ipAddress?: string | undefined;
  public readonly details?: Record<string, unknown> | undefined;

  constructor(
    eventType: SecurityEventType,
    userId?: string,
    ipAddress?: string,
    details?: Record<string, unknown>
  ) {
    this.id = crypto.randomUUID();
    this.timestamp = new Date();
    this.eventType = eventType;
    this.userId = userId;
    this.ipAddress = ipAddress;
    this.details = details;
  }
}
