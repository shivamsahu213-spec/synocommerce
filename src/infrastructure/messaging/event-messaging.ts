/**
 * Event Dispatcher, Dead Letter Queue & Replay Manager
 *
 * @module infrastructure/messaging/event-messaging
 */

import { IIntegrationEvent } from '../../application/events';

export class DeadLetterQueue {
  private readonly _dlq: { event: IIntegrationEvent; reason: string; timestamp: Date }[] = [];

  public push(event: IIntegrationEvent, reason: string): void {
    this._dlq.push({ event, reason, timestamp: new Date() });
  }

  public getMessages(): readonly { event: IIntegrationEvent; reason: string; timestamp: Date }[] {
    return [...this._dlq];
  }
}

export class EventReplayManager {
  private readonly _history: IIntegrationEvent[] = [];

  public record(event: IIntegrationEvent): void {
    this._history.push(event);
  }

  public async replayAll(handler: (event: IIntegrationEvent) => Promise<void>): Promise<void> {
    for (const event of this._history) {
      await handler(event);
    }
  }
}
