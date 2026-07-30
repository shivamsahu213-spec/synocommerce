import { DomainError } from '../..';

export class CategoryError extends DomainError {
  constructor(message: string, code: string = 'CATEGORY_ERROR') {
    super(message, code);
  }
}

export class CategoryNotFoundError extends CategoryError {
  constructor(id: string) {
    super(`Category not found: '${id}'`, 'CATEGORY_NOT_FOUND');
  }
}

export class InvalidCategoryParentError extends CategoryError {
  constructor(reason: string) {
    super(`Invalid category parent assignment: ${reason}`, 'INVALID_CATEGORY_PARENT');
  }
}
