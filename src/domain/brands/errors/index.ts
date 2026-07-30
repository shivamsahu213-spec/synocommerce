import { DomainError } from '../..';

export class BrandError extends DomainError {
  constructor(message: string, code: string = 'BRAND_ERROR') {
    super(message, code);
  }
}

export class BrandNotFoundError extends BrandError {
  constructor(id: string) {
    super(`Brand not found: '${id}'`, 'BRAND_NOT_FOUND');
  }
}
