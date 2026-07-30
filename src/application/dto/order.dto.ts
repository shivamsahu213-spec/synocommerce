/**
 * Order DTO Contracts
 * @module application/dto/order.dto
 */

export interface PlaceOrderInput {
  readonly checkoutId: string;
  readonly paymentToken?: string | undefined;
}

export interface OrderItemDTO {
  readonly itemId: string;
  readonly sku: string;
  readonly title: string;
  readonly quantity: number;
  readonly unitPrice: number;
  readonly subtotal: number;
}

export interface OrderDTO {
  readonly id: string;
  readonly orderNumber: string;
  readonly customerId: string;
  readonly currency: string;
  readonly status: string;
  readonly paymentStatus: string;
  readonly fulfillmentStatus: string;
  readonly items: readonly OrderItemDTO[];
  readonly subtotal: number;
  readonly taxTotal: number;
  readonly shippingTotal: number;
  readonly grandTotal: number;
  readonly createdAt: Date;
}
