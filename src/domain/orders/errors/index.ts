import { DomainError } from '../..';

export class OrderError extends DomainError {
  constructor(message: string, code: string = 'ORDER_ERROR') {
    super(message, code);
  }
}

export class OrderNotFoundError extends OrderError {
  constructor(identifier: string) {
    super(`Order not found: '${identifier}'`, 'ORDER_NOT_FOUND');
  }
}

export class InvalidOrderStateTransitionError extends OrderError {
  constructor(fromState: string, toState: string) {
    super(`Cannot transition order state from ${fromState} to ${toState}`, 'INVALID_ORDER_STATE_TRANSITION');
  }
}
