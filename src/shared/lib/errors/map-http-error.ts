import { createAppError } from '@shared/lib/errors/create-app-error';
import type { AppError } from '@types/error';

export function mapHttpError(statusCode: number, details?: Record<string, unknown>): AppError {
  if (statusCode === 401) {
    return createAppError({
      code: 'auth_error',
      message: 'Authentication is required.',
      retryable: false,
      statusCode,
      details
    });
  }

  if (statusCode === 403) {
    return createAppError({
      code: 'forbidden',
      message: 'You do not have permission to access this resource.',
      retryable: false,
      statusCode,
      details
    });
  }

  if (statusCode === 404) {
    return createAppError({
      code: 'not_found',
      message: 'The requested resource could not be found.',
      retryable: false,
      statusCode,
      details
    });
  }

  if (statusCode >= 500) {
    return createAppError({
      code: 'server_error',
      message: 'An upstream server error occurred.',
      retryable: true,
      statusCode,
      details
    });
  }

  return createAppError({
    code: 'api_error',
    message: 'The request could not be completed.',
    retryable: false,
    statusCode,
    details
  });
}
