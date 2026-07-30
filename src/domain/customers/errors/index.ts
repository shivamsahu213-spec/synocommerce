import { DomainError } from '../..';

export class CustomerError extends DomainError {
  constructor(message: string, code: string = 'CUSTOMER_ERROR') {
    super(message, code);
  }
}

export class CustomerNotFoundError extends CustomerError {
  constructor(identifier: string) {
    super(`Customer not found: '${identifier}'`, 'CUSTOMER_NOT_FOUND');
  }
}

export class CustomerSuspendedError extends CustomerError {
  constructor(id: string) {
    super(`Customer '${id}' is suspended`, 'CUSTOMER_SUSPENDED');
  }
}
