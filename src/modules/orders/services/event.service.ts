import { logger } from '../../../common/logger';

export type DomainEventType =
  | 'OrderCreated'
  | 'OrderConfirmed'
  | 'OrderCancelled'
  | 'OrderShipped'
  | 'OrderDelivered'
  | 'RefundCreated';

export interface DomainEventPayload {
  eventType: DomainEventType;
  tenantId: string;
  orderId: string;
  timestamp: string;
  data: Record<string, any>;
}

export class DomainEventPublisher {
  /**
   * Placeholder domain event publisher.
   * Emits domain events to application logs and can be expanded to Kafka, RabbitMQ, AWS SNS/SQS.
   */
  async publish(eventType: DomainEventType, tenantId: string, orderId: string, data: Record<string, any> = {}): Promise<void> {
    const payload: DomainEventPayload = {
      eventType,
      tenantId,
      orderId,
      timestamp: new Date().toISOString(),
      data,
    };

    logger.info({ domainEvent: payload }, `[DomainEvent] ${eventType} published for Order ${orderId}`);
  }
}

export const domainEventPublisher = new DomainEventPublisher();
