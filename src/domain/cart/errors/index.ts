import { DomainError } from '../..';

export class CartError extends DomainError {
  constructor(message: string, code: string = 'CART_ERROR') {
    super(message, code);
  }
}

export class CartExpiredError extends CartError {
  constructor(cartId: string) {
    super(`Cart '${cartId}' has expired`, 'CART_EXPIRED');
  }
}
