import { DomainError } from '../..';

export class ProductError extends DomainError {
  constructor(message: string, code: string = 'PRODUCT_ERROR') {
    super(message, code);
  }
}

export class ProductNotFoundError extends ProductError {
  constructor(id: string) {
    super(`Product not found: '${id}'`, 'PRODUCT_NOT_FOUND');
  }
}

export class InvalidProductStateError extends ProductError {
  constructor(reason: string) {
    super(`Invalid product publication state transition: ${reason}`, 'INVALID_PRODUCT_STATE');
  }
}
