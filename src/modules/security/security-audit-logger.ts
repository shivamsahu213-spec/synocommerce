/**
 * Immutable SHA-256 Hash Chain Security Audit Logger
 * @module modules/security/security-audit-logger
 */

import crypto from 'node:crypto';
import { SecurityAuditEvent } from './types';

export class SecurityAuditLoggerEngine {
  private readonly _auditChain: SecurityAuditEvent[] = [];
  private _lastHash = '0000000000000000000000000000000000000000000000000000000000000000';

  public recordSecurityEvent(actorId: string, eventType: string, resourceId: string): SecurityAuditEvent {
    const eventId = `sec_evt_${Date.now()}`;
    const timestamp = new Date();
    const previousHash = this._lastHash;

    const dataToHash = `${eventId}:${actorId}:${eventType}:${resourceId}:${previousHash}:${timestamp.toISOString()}`;
    const hash = crypto.createHash('sha256').update(dataToHash).digest('hex');

    const eventRecord: SecurityAuditEvent = {
      eventId,
      actorId,
      eventType,
      resourceId,
      previousHash,
      hash,
      timestamp,
    };

    this._auditChain.push(eventRecord);
    this._lastHash = hash;

    return eventRecord;
  }

  public verifyChainIntegrity(): boolean {
    let currentPrevHash = '0000000000000000000000000000000000000000000000000000000000000000';

    for (const evt of this._auditChain) {
      if (evt.previousHash !== currentPrevHash) {
        return false;
      }
      const dataToHash = `${evt.eventId}:${evt.actorId}:${evt.eventType}:${evt.resourceId}:${evt.previousHash}:${evt.timestamp.toISOString()}`;
      const computedHash = crypto.createHash('sha256').update(dataToHash).digest('hex');
      if (computedHash !== evt.hash) {
        return false;
      }
      currentPrevHash = evt.hash;
    }

    return true;
  }
}
