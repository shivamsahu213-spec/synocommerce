import { DomainError } from '../..';

export class InventoryError extends DomainError {
  constructor(message: string, code: string = 'INVENTORY_ERROR') {
    super(message, code);
  }
}

export class InsufficientStockError extends InventoryError {
  constructor(sku: string, requested: number, available: number) {
    super(`Insufficient stock for SKU ${sku}: requested ${requested}, available ${available}`, 'INSUFFICIENT_STOCK');
  }
}
