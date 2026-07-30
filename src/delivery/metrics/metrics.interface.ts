/**
 * Delivery Layer Metrics & Delivery Event Contracts
 * @module delivery/metrics/metrics.interface
 */

export interface IDeliveryEvent {
  readonly eventId: string;
  readonly type:
    | 'REQUEST_RECEIVED'
    | 'REQUEST_COMPLETED'
    | 'REQUEST_FAILED'
    | 'WEBHOOK_DELIVERED'
    | 'WEBHOOK_FAILED'
    | 'WORKER_COMPLETED'
    | 'WORKER_FAILED';
  readonly timestamp: Date;
  readonly correlationId: string;
  readonly metadata?: Record<string, unknown> | undefined;
}

export interface IDeliveryMetricsCollector {
  recordRequest(method: string, path: string, statusCode: number, durationMs: number): void;
  recordWebhookDelivery(targetUrl: string, isSuccess: boolean, durationMs: number): void;
  recordWorkerJob(jobName: string, isSuccess: boolean, durationMs: number): void;
}
