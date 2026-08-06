/**
 * Infrastructure Shipping Carrier Adapters
 *
 * Carrier-isolated adapters implementing IShippingPort for FedEx, UPS, DHL, Shippo, and EasyPost.
 *
 * @module infrastructure/shipping/shipping-adapters
 */

import { CreateShipmentInput, ShipmentDTO } from '../../application/dto';
import { IShippingPort } from '../../application/ports';
import { Result } from '../../application/results';

export abstract class BaseShippingAdapter implements IShippingPort {
  public abstract readonly carrierCode: string;

  public abstract createShipment(input: CreateShipmentInput): Promise<Result<ShipmentDTO>>;
  public abstract generateLabel(shipmentId: string): Promise<Result<{ labelUrl: string; trackingNumber: string }>>;
}

export class FedExShippingAdapter extends BaseShippingAdapter {
  public readonly carrierCode = 'FEDEX';

  public async createShipment(input: CreateShipmentInput): Promise<Result<ShipmentDTO>> {
    return Result.ok<ShipmentDTO>({
      id: `shp_fedex_${crypto.randomUUID()}`,
      orderId: input.orderId,
      carrierId: 'fedex',
      status: 'CREATED',
    });
  }

  public async generateLabel(shipmentId: string): Promise<Result<{ labelUrl: string; trackingNumber: string }>> {
    return Result.ok({
      labelUrl: `https://labels.fedex.com/${shipmentId}.pdf`,
      trackingNumber: `FDX${Math.floor(Math.random() * 1000000000)}`,
    });
  }
}

export class UPSShippingAdapter extends BaseShippingAdapter {
  public readonly carrierCode = 'UPS';
  public async createShipment(input: CreateShipmentInput): Promise<Result<ShipmentDTO>> { return Result.ok<ShipmentDTO>({ id: `shp_ups_${crypto.randomUUID()}`, orderId: input.orderId, carrierId: 'ups', status: 'CREATED' }); }
  public async generateLabel(shipmentId: string): Promise<Result<{ labelUrl: string; trackingNumber: string }>> { return Result.ok({ labelUrl: `https://labels.ups.com/${shipmentId}.pdf`, trackingNumber: `1Z9999999999999999` }); }
}

export class DHLShippingAdapter extends BaseShippingAdapter {
  public readonly carrierCode = 'DHL';
  public async createShipment(input: CreateShipmentInput): Promise<Result<ShipmentDTO>> { return Result.ok<ShipmentDTO>({ id: `shp_dhl_${crypto.randomUUID()}`, orderId: input.orderId, carrierId: 'dhl', status: 'CREATED' }); }
  public async generateLabel(shipmentId: string): Promise<Result<{ labelUrl: string; trackingNumber: string }>> { return Result.ok({ labelUrl: `https://labels.dhl.com/${shipmentId}.pdf`, trackingNumber: `DHL9999999` }); }
}

export class ShippoShippingAdapter extends BaseShippingAdapter {
  public readonly carrierCode = 'SHIPPO';
  public async createShipment(input: CreateShipmentInput): Promise<Result<ShipmentDTO>> { return Result.ok<ShipmentDTO>({ id: `shp_shippo_${crypto.randomUUID()}`, orderId: input.orderId, carrierId: 'shippo', status: 'CREATED' }); }
  public async generateLabel(shipmentId: string): Promise<Result<{ labelUrl: string; trackingNumber: string }>> { return Result.ok({ labelUrl: `https://labels.goshippo.com/${shipmentId}.pdf`, trackingNumber: `SHIPPO12345` }); }
}

export class EasyPostShippingAdapter extends BaseShippingAdapter {
  public readonly carrierCode = 'EASYPOST';
  public async createShipment(input: CreateShipmentInput): Promise<Result<ShipmentDTO>> { return Result.ok<ShipmentDTO>({ id: `shp_easypost_${crypto.randomUUID()}`, orderId: input.orderId, carrierId: 'easypost', status: 'CREATED' }); }
  public async generateLabel(shipmentId: string): Promise<Result<{ labelUrl: string; trackingNumber: string }>> { return Result.ok({ labelUrl: `https://labels.easypost.com/${shipmentId}.pdf`, trackingNumber: `EZ1234567890` }); }
}

export class ShippingCarrierFactory {
  public static getAdapter(carrierId: string): IShippingPort {
    switch (carrierId.toLowerCase()) {
      case 'ups': return new UPSShippingAdapter();
      case 'dhl': return new DHLShippingAdapter();
      case 'shippo': return new ShippoShippingAdapter();
      case 'easypost': return new EasyPostShippingAdapter();
      case 'fedex':
      default:
        return new FedExShippingAdapter();
    }
  }
}
