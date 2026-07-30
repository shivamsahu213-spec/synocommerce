/**
 * Return & Refund DTO Contracts
 * @module application/dto/return.dto
 */

export interface RequestReturnInput {
  readonly orderId: string;
  readonly customerId: string;
  readonly items: readonly {
    readonly sku: string;
    readonly quantity: number;
    readonly reason: string;
  }[];
}

export interface ReturnRequestDTO {
  readonly id: string;
  readonly orderId: string;
  readonly status: string;
  readonly rmaCode?: string | undefined;
}

export interface ApproveRefundInput {
  readonly orderId: string;
  readonly paymentId: string;
  readonly returnId?: string | undefined;
  readonly amount: number;
  readonly reason: string;
}

export interface RefundDTO {
  readonly id: string;
  readonly orderId: string;
  readonly paymentId: string;
  readonly amount: number;
  readonly status: string;
}
