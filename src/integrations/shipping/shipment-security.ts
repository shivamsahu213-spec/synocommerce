/**
 * Shipping Security, Replay Defense & Resilience Engine
 * @module src/integrations/shipping/shipment-security
 */

import crypto from 'node:crypto';

import { ShippingCarrierType } from './types';

export class ShipmentSecurityEngine {
  private static readonly MAX_TIMESTAMP_DELTA_SECONDS = 300;
  private static readonly processedWebhookEvents = new Set<string>();
  private static readonly circuitBreakers = new Map<ShippingCarrierType, { failures: number; isOpen: boolean }>();

  public static timingSafeCompare(a: string, b: string): boolean {
    const bufferA = Buffer.from(a, 'utf-8');
    const bufferB = Buffer.from(b, 'utf-8');
    if (bufferA.length !== bufferB.length) return false;
    return crypto.timingSafeEqual(bufferA, bufferB);
  }

  public static verifyTimestampFreshness(timestampInSeconds: number): boolean {
    const currentSeconds = Math.floor(Date.now() / 1000);
    return Math.abs(currentSeconds - timestampInSeconds) <= ShipmentSecurityEngine.MAX_TIMESTAMP_DELTA_SECONDS;
  }

  public static isDuplicateWebhook(eventId: string): boolean {
    if (ShipmentSecurityEngine.processedWebhookEvents.has(eventId)) return true;
    ShipmentSecurityEngine.processedWebhookEvents.add(eventId);
    return false;
  }

  public static resetSecurityCache(): void {
    ShipmentSecurityEngine.processedWebhookEvents.clear();
    ShipmentSecurityEngine.circuitBreakers.clear();
  }

  public static checkCircuitBreaker(carrier: ShippingCarrierType): void {
    const breaker = ShipmentSecurityEngine.circuitBreakers.get(carrier);
    if (breaker?.isOpen) {
      throw new Error(`CIRCUIT_BREAKER_OPEN: Carrier ${carrier} API is temporarily disabled.`);
    }
  }

  public static recordFailure(carrier: ShippingCarrierType): void {
    const breaker = ShipmentSecurityEngine.circuitBreakers.get(carrier) || { failures: 0, isOpen: false };
    breaker.failures += 1;
    if (breaker.failures >= 5) {
      breaker.isOpen = true;
    }
    ShipmentSecurityEngine.circuitBreakers.set(carrier, breaker);
  }

  public static async executeWithRetry<T>(
    carrier: ShippingCarrierType,
    operation: () => Promise<T>,
    maxRetries: number = 3
  ): Promise<T> {
    ShipmentSecurityEngine.checkCircuitBreaker(carrier);

    let delay = 100;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (err) {
        ShipmentSecurityEngine.recordFailure(carrier);
        if (attempt === maxRetries) throw err;
        await new Promise((res) => setTimeout(res, delay));
        delay *= 2;
      }
    }
    throw new Error('RETRY_MAX_EXCEEDED');
  }
}
