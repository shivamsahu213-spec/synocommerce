/**
 * Cart DTO Contracts
 * @module application/dto/cart.dto
 */

export interface AddItemToCartInput {
  readonly cartId?: string | undefined;
  readonly customerId?: string | undefined;
  readonly sku: string;
  readonly quantity: number;
  readonly currency: string;
}

export interface RemoveItemFromCartInput {
  readonly cartId: string;
  readonly itemId: string;
}

export interface MergeCartInput {
  readonly guestCartId: string;
  readonly customerCartId: string;
}

export interface CartItemDTO {
  readonly itemId: string;
  readonly sku: string;
  readonly title: string;
  readonly quantity: number;
  readonly unitPrice: number;
  readonly subtotal: number;
}

export interface CartDTO {
  readonly id: string;
  readonly currency: string;
  readonly cartType: string;
  readonly state: string;
  readonly customerId?: string | undefined;
  readonly items: readonly CartItemDTO[];
  readonly subtotal: number;
  readonly discountTotal: number;
  readonly taxTotal: number;
  readonly grandTotal: number;
}
