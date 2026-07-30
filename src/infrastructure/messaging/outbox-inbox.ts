/**
 * Outbox & Inbox Messaging Patterns
 *
 * Implements reliable transaction outbox and idempotent inbox patterns.
 *
 * @module infrastructure/messaging/outbox-inbox
 */

export interface OutboxMessage {
  readonly id: string;
  readonly eventName: string;
  readonly payload: string;
  readonly occurredOn: Date;
  readonly processedAt?: Date | undefined;
  readonly error?: string | undefined;
  readonly retryCount: number;
}

export interface IOutboxRepository {
  save(message: OutboxMessage): Promise<void>;
  fetchUnprocessed(batchSize: number): Promise<readonly OutboxMessage[]>;
  markProcessed(id: string): Promise<void>;
  markFailed(id: string, error: string): Promise<void>;
}

export interface InboxMessage {
  readonly id: string;
  readonly messageId: string;
  readonly eventName: string;
  readonly payload: string;
  readonly receivedAt: Date;
  readonly processedAt?: Date | undefined;
}

export interface IInboxRepository {
  save(message: InboxMessage): Promise<void>;
  isProcessed(messageId: string): Promise<boolean>;
  markProcessed(messageId: string): Promise<void>;
}
