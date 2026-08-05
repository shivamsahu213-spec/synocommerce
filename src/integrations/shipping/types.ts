/**
 * Enterprise Multi-Carrier Shipping & Omnichannel Fulfillment Types
 * @module src/integrations/shipping/types
 */

export type ShippingCarrierType =
  | 'SHIPROCKET'
  | 'DELHIVERY'
  | 'FEDEX'
  | 'UPS'
  | 'DHL'
  | 'BLUEDART'
  | 'DTDC'
  | 'INDIA_POST';

export type PaymentMode = 'PREPAID' | 'COD';

export type FulfillmentType =
  | 'SHIP_FROM_STORE'
  | 'BOPIS'
  | 'CURBSIDE_PICKUP'
  | 'CLICK_AND_COLLECT'
  | 'DROP_SHIPPING'
  | 'MARKETPLACE_FULFILLMENT';

export type ShipmentStatus =
  | 'MANIFESTED'
  | 'PICKUP_SCHEDULED'
  | 'IN_TRANSIT'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'FAILED_DELIVERY'
  | 'NDR'
  | 'RTO'
  | 'CANCELLED';

export interface ShippingAddress {
  name: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isInternational?: boolean | undefined;
}

export interface ShippingRateRequest {
  originPincode: string;
  destinationPincode: string;
  weightKg: number;
  lengthCm?: number | undefined;
  widthCm?: number | undefined;
  heightCm?: number | undefined;
  paymentMode: PaymentMode;
  codAmountUsd?: number | undefined;
  declaredValueUsd: number;
  isInternational?: boolean | undefined;
}

export interface ShippingRateResult {
  carrier: ShippingCarrierType;
  rateUsd: number;
  estimatedDeliveryDays: number;
  serviceName: string;
}

export interface CreateShipmentRequest {
  orderId: string;
  carrier: ShippingCarrierType;
  pickupAddress: ShippingAddress;
  deliveryAddress: ShippingAddress;
  items: { sku: string; name: string; quantity: number; priceUsd: number }[];
  totalWeightKg: number;
  paymentMode: PaymentMode;
  codAmountUsd?: number | undefined;
  isMultiPackage?: boolean | undefined;
  packagesCount?: number | undefined;
  insuranceRequired?: boolean | undefined;
  fulfillmentType?: FulfillmentType | undefined;
}

export interface ShipmentResult {
  shipmentId: string;
  awbNumber: string;
  carrier: ShippingCarrierType;
  status: ShipmentStatus;
  labelUrl: string;
  manifestUrl: string;
  estimatedDeliveryDate: Date;
  pickupScheduledAt: Date;
}

export interface TrackingEvent {
  status: ShipmentStatus;
  location: string;
  description: string;
  timestamp: Date;
}

export interface TrackingTimelineResult {
  awbNumber: string;
  carrier: ShippingCarrierType;
  currentStatus: ShipmentStatus;
  origin: string;
  destination: string;
  estimatedDeliveryDate: Date;
  events: TrackingEvent[];
  ndrReason?: string | undefined;
  rtoStatus?: string | undefined;
}

export interface WarehouseLocation {
  warehouseId: string;
  name: string;
  pincode: string;
  city: string;
  state: string;
  country: string;
  priority: number;
  availableCapacity: number;
  isHolidayToday?: boolean | undefined;
  slaHours: number;
}

export interface WebhookShipmentPayload {
  eventId: string;
  carrier: ShippingCarrierType;
  awbNumber: string;
  event: 'DELIVERY_CONFIRMED' | 'DELIVERY_FAILED' | 'NDR_RAISED' | 'RTO_INITIATED';
  timestamp: number;
  location: string;
  reason?: string | undefined;
  signature: string;
}
