/**
 * Immutable Event Store & Event Sourcing Engine
 * @module src/modules/data-platform/event-store
 */

import { DataPlatformEvent, EventSnapshot } from './types';

export class EventStoreProcessor {
  private eventStream = new Map<string, DataPlatformEvent[]>();
  private snapshots = new Map<string, EventSnapshot>();

  public appendEvent(event: DataPlatformEvent): void {
    const existing = this.eventStream.get(event.aggregateId) || [];
    existing.push(event);
    this.eventStream.set(event.aggregateId, existing);
  }

  public replayAggregate<T = any>(aggregateId: string, reducer: (state: T, event: DataPlatformEvent) => T, initialState: T): T {
    const snapshot = this.snapshots.get(aggregateId);
    let state = snapshot ? (snapshot.state as T) : initialState;
    const startVersion = snapshot ? snapshot.version + 1 : 1;

    const events = this.eventStream.get(aggregateId) || [];
    const relevantEvents = events.filter((e) => e.version >= startVersion);

    for (const evt of relevantEvents) {
      state = reducer(state, evt);
    }

    return state;
  }

  public saveSnapshot<T = any>(aggregateId: string, version: number, state: T): EventSnapshot<T> {
    const snapshot: EventSnapshot<T> = {
      aggregateId,
      version,
      snapshotAt: new Date(),
      state,
    };
    this.snapshots.set(aggregateId, snapshot);
    return snapshot;
  }
}
