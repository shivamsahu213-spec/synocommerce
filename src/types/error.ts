export type AppErrorCode =
  | 'api_error'
  | 'auth_error'
  | 'forbidden'
  | 'network_error'
  | 'not_found'
  | 'server_error'
  | 'unknown_error'
  | 'validation_error';

export type AppError = {
  code: AppErrorCode;
  message: string;
  statusCode?: number;
  retryable: boolean;
  details?: Record<string, unknown>;
};
