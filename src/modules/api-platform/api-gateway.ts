/**
 * Enterprise API Gateway, Rate Limiter & Auth Engine
 * @module modules/api-platform/api-gateway
 */

import { ApiKeyRecord, ApiScope } from './types';

export class ApiGatewayEngine {
  private readonly _keys = new Map<string, ApiKeyRecord>();
  private readonly _requestCounts = new Map<string, { count: number; windowStart: number }>();

  public createApiKey(clientId: string, scopes: ApiScope[] = ['read:catalog'], rateLimitReqPerMin = 100): ApiKeyRecord {
    const apiKey = `syno_live_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const record: ApiKeyRecord = {
      keyId: `key_${Date.now()}`,
      apiKey,
      secretHash: `hash_${apiKey}`,
      clientId,
      scopes,
      rateLimitReqPerMin,
      revoked: false,
      createdAt: new Date(),
    };

    this._keys.set(apiKey, record);
    return record;
  }

  public validateRequest(apiKey: string, requiredScope: ApiScope): { allowed: boolean; reason?: string } {
    const keyRecord = this._keys.get(apiKey);
    if (!keyRecord || keyRecord.revoked) {
      return { allowed: false, reason: 'Invalid or revoked API key' };
    }

    if (!keyRecord.scopes.includes(requiredScope) && !keyRecord.scopes.includes('admin:all')) {
      return { allowed: false, reason: `Missing required scope '${requiredScope}'` };
    }

    const now = Date.now();
    const tracker = this._requestCounts.get(apiKey) ?? { count: 0, windowStart: now };

    if (now - tracker.windowStart > 60000) {
      tracker.count = 1;
      tracker.windowStart = now;
    } else {
      tracker.count++;
    }

    this._requestCounts.set(apiKey, tracker);

    if (tracker.count > keyRecord.rateLimitReqPerMin) {
      return { allowed: false, reason: 'Rate limit exceeded' };
    }

    return { allowed: true };
  }
}
