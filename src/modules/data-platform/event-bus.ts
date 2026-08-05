/**
 * Enterprise Partitioned Event Bus & Message Queue
 * @module src/modules/data-platform/event-bus
 */

import { ConsumerGroup, DataPlatformEvent } from './types';

export class EventBusProcessor {
  private topicsMap = new Map<string, DataPlatformEvent[]>();
  private consumerGroups = new Map<string, ConsumerGroup>();
  private dlqEvents: DataPlatformEvent[] = [];

  public publish(topic: string, event: Omit<DataPlatformEvent, 'offset' | 'partition'>): DataPlatformEvent {
    const existing = this.topicsMap.get(topic) || [];
    const partition = 0;
    const offset = existing.length;

    const fullEvent: DataPlatformEvent = {
      ...event,
      topic,
      partition,
      offset,
    };

    existing.push(fullEvent);
    this.topicsMap.set(topic, existing);
    return fullEvent;
  }

  public subscribe(groupId: string, topic: string, handler: (event: DataPlatformEvent) => void): void {
    const events = this.topicsMap.get(topic) || [];
    const group = this.consumerGroups.get(groupId) || { groupId, topic, currentOffset: 0 };

    for (let i = group.currentOffset; i < events.length; i++) {
      const evt = events[i];
      if (evt) {
        try {
          handler(evt);
          group.currentOffset = i + 1;
        } catch (err) {
          this.dlqEvents.push(evt);
        }
      }
    }

    this.consumerGroups.set(groupId, group);
  }

  public replayEvents(topic: string, fromOffset: number = 0): DataPlatformEvent[] {
    const events = this.topicsMap.get(topic) || [];
    return events.filter((e) => e.offset >= fromOffset);
  }

  public getDlqEvents(): DataPlatformEvent[] {
    return this.dlqEvents;
  }
}
