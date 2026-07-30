/**
 * Infrastructure Analytics Adapter
 *
 * Implements IAnalyticsPort.
 *
 * @module infrastructure/analytics/analytics-adapter
 */

import { IAnalyticsPort } from '../../application/ports';

export class SegmentAnalyticsAdapter implements IAnalyticsPort {
  public async trackEvent(eventName: string, properties: Record<string, unknown>): Promise<void> {}
}
