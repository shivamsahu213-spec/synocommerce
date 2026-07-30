/**
 * Application Integration Event Base Contract
 *
 * Cross-system asynchronous event contract published to message brokers.
 * Distinct from internal domain events.
 *
 * @module application/events/integration-event.interface
 */

export interface IIntegrationEvent {
  readonly eventId: string;
  readonly occurredOn: Date;
  readonly eventName: string;
  readonly correlationId?: string | undefined;
  readonly tenantId?: string | undefined;
}
