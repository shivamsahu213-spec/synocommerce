export interface DomainEvent<TPayload = unknown> {
  name: string;
  occurredAt: string;
  payload: TPayload;
  metadata?: Record<string, unknown>;
}

export type EventHandler<TEvent extends DomainEvent = DomainEvent> = (
  event: TEvent
) => Promise<void> | void;

export type EventMap = Record<string, DomainEvent>;
