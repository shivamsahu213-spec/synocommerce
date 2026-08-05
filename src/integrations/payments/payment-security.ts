/**
 * Payment Integration Security & Resilience Engine
 * @module src/integrations/payments/payment-security
 */

import crypto from 'node:crypto';

export class PaymentSecurityEngine {
  private static readonly MAX_TIMESTAMP_DELTA_SECONDS = 300; // 5 minutes window for replay prevention
  private static readonly processedWebhookEvents = new Set<string>();

  /**
   * Performs constant-time string comparison to prevent timing side-channel attacks.
   */
  public static timingSafeCompare(a: string, b: string): boolean {
    const bufferA = Buffer.from(a, 'utf-8');
    const bufferB = Buffer.from(b, 'utf-8');
    if (bufferA.length !== bufferB.length) {
      return false;
    }
    return crypto.timingSafeEqual(bufferA, bufferB);
  }

  /**
   * Verifies timestamp freshness to defend against replay attacks.
   */
  public static verifyTimestampFreshness(timestampInSeconds: number): boolean {
    const currentSeconds = Math.floor(Date.now() / 1000);
    const delta = Math.abs(currentSeconds - timestampInSeconds);
    return delta <= PaymentSecurityEngine.MAX_TIMESTAMP_DELTA_SECONDS;
  }

  /**
   * Tracks unique event IDs to prevent duplicate webhook delivery processing.
   */
  public static isDuplicateWebhookEvent(eventId: string): boolean {
    if (PaymentSecurityEngine.processedWebhookEvents.has(eventId)) {
      return true;
    }
    PaymentSecurityEngine.processedWebhookEvents.add(eventId);
    return false;
  }

  /**
   * Resets deduplication cache (useful for testing).
   */
  public static resetDeduplicationCache(): void {
    PaymentSecurityEngine.processedWebhookEvents.clear();
  }

  /**
   * Retries an async payment operation with exponential backoff.
   */
  public static async executeWithRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    initialDelayMs: number = 100
  ): Promise<T> {
    let lastError: any;
    let delay = initialDelayMs;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (err) {
        lastError = err;
        if (attempt === maxRetries) break;
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
      }
    }

    throw lastError || new Error('OPERATION_FAILED_AFTER_RETRIES');
  }
}
