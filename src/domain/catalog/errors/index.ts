import { DomainError } from '../..';

export class CatalogError extends DomainError {
  constructor(message: string, code: string = 'CATALOG_ERROR') {
    super(message, code);
  }
}

export class CatalogItemNotFoundError extends CatalogError {
  constructor(identifier: string) {
    super(`Catalog item not found: '${identifier}'`, 'CATALOG_ITEM_NOT_FOUND');
  }
}
