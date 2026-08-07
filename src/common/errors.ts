// src/common/errors.ts
/**
 * Base application error class.
 */
export abstract class AppError extends Error {
  public readonly statusCode: number;
  public override readonly name: string;
  constructor(message: string, statusCode: number, name?: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = name ?? this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Database related errors.
 */
export class DatabaseError extends AppError {
  constructor(message: string) {
    super(message, 500, 'DatabaseError');
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404, 'NotFoundError');
  }
}

export class DuplicateError extends AppError {
  constructor(message: string) {
    super(message, 409, 'DuplicateError');
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400, 'ValidationError');
  }
}

export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 400, 'BadRequestError');
  }
}

export class ConcurrencyError extends AppError {
  constructor(message: string) {
    super(message, 409, 'ConcurrencyError');
  }
}

export class TransactionError extends AppError {
  constructor(message: string) {
    super(message, 500, 'TransactionError');
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401, 'UnauthorizedError');
  }
}

export class AuthenticationError extends AppError {
  constructor(message = 'Authentication failed') {
    super(message, 401, 'AuthenticationError');
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Access forbidden') {
    super(message, 403, 'ForbiddenError');
  }
}
