/**
 * Enterprise Security, Compliance & Governance Platform Test Suite
 * @module modules/security/tests/security.test
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  EncryptionVaultEngine,
  CompliancePrivacyEngine,
  ThreatZeroTrustEngine,
  SecurityAuditLoggerEngine,
} from '../index';

test('Enterprise Security, Compliance & Governance Platform', async (t) => {
  const vault = new EncryptionVaultEngine();
  const privacy = new CompliancePrivacyEngine();
  const zeroTrust = new ThreatZeroTrustEngine();
  const audit = new SecurityAuditLoggerEngine();

  await t.test('Encrypts and decrypts sensitive field data using AES-256-GCM envelope encryption', () => {
    const plaintext = 'Secret-Tax-ID-22AAAAA0000A1Z5';
    const envelope = vault.encryptField(plaintext);

    assert.ok(envelope.ciphertext.length > 0);
    assert.ok(envelope.iv.length > 0);
    assert.ok(envelope.authTag.length > 0);

    const decrypted = vault.decryptField(envelope);
    assert.equal(decrypted, plaintext);
  });

  await t.test('Executes GDPR Article 17 Right To Be Forgotten anonymization & Article 15 Data Export', () => {
    const rawUser = { email: 'shivam@example.com', firstName: 'Shivam', phone: '9876543210' };

    const anonymized = privacy.anonymizeUserData(rawUser);
    assert.equal(anonymized.email, 'anonymized@deleted.local');
    assert.equal(anonymized.firstName, 'ANONYMIZED');

    const exportRecord = privacy.exportUserData('cust_shivam_213', rawUser);
    assert.equal(exportRecord.customerId, 'cust_shivam_213');
    assert.equal(exportRecord.data.profile.email, 'shivam@example.com');
  });

  await t.test('Evaluates threat risk score and triggers Adaptive MFA challenge on suspicious logins', () => {
    const riskEval = zeroTrust.evaluateAccessRisk('192.168.1.1', 'Mozilla/5.0', 5, 'NORMAL_GEO');
    assert.equal(riskEval.riskScore, 0.6);
    assert.equal(riskEval.requireAdaptiveMfa, true);
    assert.equal(riskEval.action, 'CHALLENGE_MFA');
  });

  await t.test('Records security audit events and verifies SHA-256 hash chain log integrity', () => {
    audit.recordSecurityEvent('user_admin_01', 'IAM_ROLE_UPDATE', 'role_store_admin');
    audit.recordSecurityEvent('user_admin_01', 'API_KEY_REVOKE', 'key_live_9901');

    const isIntact = audit.verifyChainIntegrity();
    assert.equal(isIntact, true);
  });
});
