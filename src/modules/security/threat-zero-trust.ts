/**
 * Zero Trust Engine & Threat Risk Detection
 * @module modules/security/threat-zero-trust
 */

import { ThreatEventType,ThreatRiskResult } from './types';

export class ThreatZeroTrustEngine {
  public evaluateAccessRisk(loginIp: string, userAgent: string, failedAttemptsCount: number, geoCountry: string): ThreatRiskResult {
    const flaggedThreats: ThreatEventType[] = [];
    let riskScore = 0.0;

    if (failedAttemptsCount >= 5) {
      flaggedThreats.push('CREDENTIAL_STUFFING');
      riskScore += 0.6;
    }

    if (geoCountry === 'HIGH_RISK_GEO') {
      flaggedThreats.push('IMPOSSIBLE_TRAVEL');
      riskScore += 0.3;
    }

    let action: 'ALLOW' | 'CHALLENGE_MFA' | 'BLOCK' = 'ALLOW';
    if (riskScore >= 0.8) {
      action = 'BLOCK';
    } else if (riskScore >= 0.5) {
      action = 'CHALLENGE_MFA';
    }

    return {
      riskScore: Math.min(riskScore, 1.0),
      flaggedThreats,
      requireAdaptiveMfa: action === 'CHALLENGE_MFA',
      action,
    };
  }
}
