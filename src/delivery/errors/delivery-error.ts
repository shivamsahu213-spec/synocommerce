/**
 * Delivery Layer Error Hierarchy
 *
 * Distinct from Application and Domain errors. Represents HTTP/protocol-level delivery failures.
 *
 * @module delivery/errors/delivery-error
 */

export abstract class DeliveryError extends Error {
  public readonly timestamp: Date;

  constructor(
    public readonly statusCode: number,
    public readonly errorCode: string,
    message: string,
    public readonly details?: Record<string, unknown> | undefined
  ) {
    super(message);
    this.name = this.constructor.name;
    this.timestamp = new Date();
  }
}

export class BadRequestError extends DeliveryError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(400, 'BAD_REQUEST', message, details);
  }
}

export class UnauthorizedError extends DeliveryError {
  constructor(message = 'Authentication required') {
    super(401, 'UNAUTHORIZED', message);
  }
}

export class ForbiddenError extends DeliveryError {
  constructor(message = 'Access forbidden') {
    super(403, 'FORBIDDEN', message);
  }
}

export class NotFoundError extends DeliveryError {
  constructor(resourceName: string, resourceId: string) {
    super(404, 'NOT_FOUND', `${resourceName} '${resourceId}' was not found`);
  }
}

export class RateLimitExceededError extends DeliveryError {
  constructor(public readonly retryAfterSeconds: number) {
    super(429, 'RATE_LIMIT_EXCEEDED', `Rate limit exceeded. Retry after ${retryAfterSeconds} seconds.`);
  }
}

export class VersionNotSupportedError extends DeliveryError {
  constructor(version: string) {
    super(400, 'VERSION_NOT_SUPPORTED', `API Version '${version}' is not supported.`);
  }
}
