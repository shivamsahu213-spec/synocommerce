/**
 * Fulfillment DTO Contracts
 * @module application/dto/fulfillment.dto
 */

export interface AllocateFulfillmentInput {
  readonly orderId: string;
}

export interface FulfillmentOrderDTO {
  readonly id: string;
  readonly orderId: string;
  readonly status: string;
  readonly assignments: readonly {
    readonly warehouseId: string;
    readonly itemsCount: number;
  }[];
}
