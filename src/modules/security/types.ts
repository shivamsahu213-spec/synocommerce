/**
 * Enterprise Security, Compliance & Governance Type Definitions
 * @module modules/security/types
 */

export type ThreatEventType = 'CREDENTIAL_STUFFING' | 'IMPOSSIBLE_TRAVEL' | 'BOT_ABUSE' | 'ACCOUNT_TAKEOVER';
export type ComplianceStandard = 'GDPR' | 'CCPA' | 'SOC2' | 'HIPAA' | 'PCI_DSS';

export interface EncryptedDataEnvelope {
  ciphertext: string;
  iv: string;
  authTag: string;
  keyVersion: number;
}

export interface PrivacyExportRecord {
  customerId: string;
  exportedAt: Date;
  data: Record<string, any>;
}

export interface ThreatRiskResult {
  riskScore: number; // 0.0 to 1.0
  flaggedThreats: ThreatEventType[];
  requireAdaptiveMfa: boolean;
  action: 'ALLOW' | 'CHALLENGE_MFA' | 'BLOCK';
}

export interface SecurityAuditEvent {
  eventId: string;
  actorId: string;
  eventType: string;
  resourceId: string;
  previousHash: string;
  hash: string;
  timestamp: Date;
}
