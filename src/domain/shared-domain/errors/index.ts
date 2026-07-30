/**
 * Shared Domain Errors
 * @module domain/shared-domain/errors
 */

export class DomainError extends Error {
  public readonly code: string;
  public readonly timestamp: Date;

  constructor(message: string, code: string = 'DOMAIN_ERROR') {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.timestamp = new Date();
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class InvalidValueObjectError extends DomainError {
  constructor(message: string) {
    super(message, 'INVALID_VALUE_OBJECT');
  }
}

export class DomainInvariantError extends DomainError {
  constructor(message: string) {
    super(message, 'DOMAIN_INVARIANT_VIOLATION');
  }
}
