import type { DomainEvent, EventHandler, EventMap } from '@platform/events';

export interface EventBusMiddlewareContext<TEvent extends DomainEvent = DomainEvent> {
  event: TEvent;
  next(): Promise<void>;
}

export type EventBusMiddleware<TEvent extends DomainEvent = DomainEvent> = (
  context: EventBusMiddlewareContext<TEvent>
) => Promise<void>;

export interface EventSubscription {
  eventName: string;
  unsubscribe(): void;
}

export interface EventBus<TEvents extends EventMap = EventMap> {
  publish<TKey extends keyof TEvents>(event: TEvents[TKey]): Promise<void>;
  publishAsync<TKey extends keyof TEvents>(event: TEvents[TKey]): Promise<void>;
  subscribe<TKey extends keyof TEvents>(
    eventName: TKey,
    handler: EventHandler<TEvents[TKey]>
  ): EventSubscription;
  unsubscribe(subscription: EventSubscription): void;
  use(middleware: EventBusMiddleware): void;
}
