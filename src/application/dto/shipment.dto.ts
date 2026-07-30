/**
 * Shipment DTO Contracts
 * @module application/dto/shipment.dto
 */

export interface CreateShipmentInput {
  readonly orderId: string;
  readonly carrierId: string;
  readonly packages: readonly {
    readonly weightKg: number;
    readonly skus: readonly string[];
  }[];
}

export interface TrackingDTO {
  readonly trackingNumber: string;
  readonly status: string;
  readonly carrierCode: string;
  readonly estimatedDelivery?: Date | undefined;
}

export interface ShipmentDTO {
  readonly id: string;
  readonly orderId: string;
  readonly carrierId: string;
  readonly status: string;
  readonly tracking?: TrackingDTO | undefined;
}
