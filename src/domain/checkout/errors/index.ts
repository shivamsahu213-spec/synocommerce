import { DomainError } from '../..';

export class CheckoutError extends DomainError {
  constructor(message: string, code: string = 'CHECKOUT_ERROR') {
    super(message, code);
  }
}

export class InvalidCheckoutStepError extends CheckoutError {
  constructor(reason: string) {
    super(`Checkout validation failed: ${reason}`, 'INVALID_CHECKOUT_STEP');
  }
}
