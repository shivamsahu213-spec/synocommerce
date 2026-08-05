/**
 * Real-Time Event Stream Processor Engine
 * @module src/modules/data-platform/stream-processor
 */

import { DataPlatformEvent } from './types';

export class StreamProcessorEngine {
  public filterStream(events: DataPlatformEvent[], predicate: (e: DataPlatformEvent) => boolean): DataPlatformEvent[] {
    return events.filter(predicate);
  }

  public windowAggregate(events: DataPlatformEvent[], windowSizeMs: number): { windowStart: Date; count: number; totalAmount: number }[] {
    const buckets = new Map<number, { count: number; totalAmount: number }>();

    for (const evt of events) {
      const windowKey = Math.floor(evt.timestamp.getTime() / windowSizeMs) * windowSizeMs;
      const existing = buckets.get(windowKey) || { count: 0, totalAmount: 0 };
      existing.count += 1;
      existing.totalAmount += evt.payload?.amount || 0;
      buckets.set(windowKey, existing);
    }

    return Array.from(buckets.entries()).map(([windowStartMs, val]) => ({
      windowStart: new Date(windowStartMs),
      count: val.count,
      totalAmount: val.totalAmount,
    }));
  }

  public enrichEvent(event: DataPlatformEvent, enrichmentData: Record<string, any>): DataPlatformEvent {
    return {
      ...event,
      payload: {
        ...event.payload,
        ...enrichmentData,
      },
    };
  }
}
