/**
 * Background Worker Contracts
 *
 * Delivery layer entry points for asynchronous worker queues and event consumers.
 *
 * @module delivery/workers/worker.interface
 */

export interface IWorkerJob<TData = unknown> {
  readonly jobId: string;
  readonly jobName: string;
  readonly data: TData;
  readonly timestamp: Date;
  readonly attemptCount: number;
}

export interface IQueueWorker<TData = unknown> {
  readonly queueName: string;
  process(job: IWorkerJob<TData>): Promise<void>;
}

export interface IEventWorker<TEvent = unknown> {
  readonly eventName: string;
  consume(event: TEvent): Promise<void>;
}

export interface IEmailWorker extends IQueueWorker<{ to: string; subject: string; template: string; vars: Record<string, unknown> }> {}
export interface ISearchIndexingWorker extends IQueueWorker<{ indexName: string; documentId: string; data: Record<string, unknown> }> {}
export interface IAnalyticsProcessingWorker extends IQueueWorker<{ eventName: string; properties: Record<string, unknown> }> {}
export interface IMediaProcessingWorker extends IQueueWorker<{ fileUrl: string; operations: readonly string[] }> {}
export interface IRetryWorker extends IQueueWorker<{ originalJobId: string; retryReason: string }> {}
export interface IDlqWorker extends IQueueWorker<{ failedJobId: string; failureReason: string; payload: unknown }> {}
