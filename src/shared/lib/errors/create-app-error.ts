import type { AppError, AppErrorCode } from '@/types/error';

type CreateAppErrorInput = {
  code: AppErrorCode;
  message: string;
  statusCode?: number;
  retryable?: boolean;
  details?: Record<string, unknown>;
};

export function createAppError(input: CreateAppErrorInput): AppError {
  return {
    code: input.code,
    message: input.message,
    retryable: input.retryable ?? false,
    ...(input.statusCode !== undefined ? { statusCode: input.statusCode } : {}),
    ...(input.details !== undefined ? { details: input.details } : {})
  };
}
