/**
 * Monitoring Security, Webhook Validation & RBAC Engine
 * @module src/integrations/monitoring/monitoring-security
 */

import crypto from 'node:crypto';

export class MonitoringSecurityEngine {
  public static timingSafeCompare(a: string, b: string): boolean {
    const bufferA = Buffer.from(a, 'utf-8');
    const bufferB = Buffer.from(b, 'utf-8');
    if (bufferA.length !== bufferB.length) return false;
    return crypto.timingSafeEqual(bufferA, bufferB);
  }

  public static verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
    const expectedSig = crypto.createHmac('sha256', secret).update(payload).digest('hex');
    return MonitoringSecurityEngine.timingSafeCompare(expectedSig, signature);
  }

  public static authorizeUserRole(role: string, requiredRole: string = 'SRE_ADMIN'): boolean {
    if (role === 'SUPER_ADMIN' || role === requiredRole) {
      return true;
    }
    return false;
  }
}
