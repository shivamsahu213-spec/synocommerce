/**
 * Application Layer Constants
 * @module application/constants
 */

export const PIPELINE_STAGES = {
  LOGGING: 'LoggingPipelineStage',
  METRICS: 'MetricsPipelineStage',
  IDEMPOTENCY: 'IdempotencyPipelineStage',
  CACHE: 'CachingPipelineStage',
  AUTHORIZATION: 'AuthorizationPipelineStage',
  VALIDATION: 'ValidationPipelineStage',
  RETRY: 'RetryPipelineStage',
  TRANSACTION: 'TransactionPipelineStage',
  AUDIT: 'AuditPipelineStage',
} as const;

export const EXECUTION_PRIORITIES = {
  LOW: 0,
  NORMAL: 10,
  HIGH: 20,
  CRITICAL: 30,
} as const;

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;
