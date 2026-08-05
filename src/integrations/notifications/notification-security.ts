/**
 * Notification Security, HMAC Verification & Replay Protection Engine
 * @module src/integrations/notifications/notification-security
 */

import crypto from 'node:crypto';

export class NotificationSecurityEngine {
  private static readonly MAX_TIMESTAMP_DELTA_SECONDS = 300;
  private static readonly processedEventIds = new Set<string>();

  public static timingSafeCompare(a: string, b: string): boolean {
    const bufferA = Buffer.from(a, 'utf-8');
    const bufferB = Buffer.from(b, 'utf-8');
    if (bufferA.length !== bufferB.length) return false;
    return crypto.timingSafeEqual(bufferA, bufferB);
  }

  public static verifyTimestampFreshness(timestampInSeconds: number): boolean {
    const currentSeconds = Math.floor(Date.now() / 1000);
    return Math.abs(currentSeconds - timestampInSeconds) <= NotificationSecurityEngine.MAX_TIMESTAMP_DELTA_SECONDS;
  }

  public static isDuplicateEvent(eventId: string): boolean {
    if (NotificationSecurityEngine.processedEventIds.has(eventId)) return true;
    NotificationSecurityEngine.processedEventIds.add(eventId);
    return false;
  }

  public static resetCache(): void {
    NotificationSecurityEngine.processedEventIds.clear();
  }

  public static verifyWebhookSignature(
    rawPayload: string,
    signature: string,
    secret: string
  ): boolean {
    const expectedSig = crypto.createHmac('sha256', secret).update(rawPayload).digest('hex');
    return NotificationSecurityEngine.timingSafeCompare(expectedSig, signature);
  }
}
