/**
 * Payment & Order Infrastructure Repository Implementations
 *
 * Implements domain repository interfaces using persistence adapters.
 *
 * @module infrastructure/repositories/payment.repository
 */

import { FulfillmentAggregate, FulfillmentIdentifier, IFulfillmentRepository } from '../../domain/fulfillment';
import { OrderIdentifier } from '../../domain/orders';
import { IPaymentRepository,PaymentAggregate, PaymentIdentifier } from '../../domain/payments';
import { IShipmentRepository, ShipmentAggregate, ShipmentIdentifier, TrackingNumber } from '../../domain/shipping';

export class PaymentRepositoryAdapter implements IPaymentRepository {
  private readonly _store = new Map<string, PaymentAggregate>();

  public async findById(id: PaymentIdentifier): Promise<PaymentAggregate | null> {
    return this._store.get(id.value) ?? null;
  }

  public async findByOrderId(orderId: OrderIdentifier): Promise<PaymentAggregate | null> {
    return Array.from(this._store.values()).find((p) => p.orderId.equals(orderId)) ?? null;
  }

  public async findByProviderReference(providerReference: string): Promise<PaymentAggregate | null> {
    return Array.from(this._store.values()).find((p) => p.receipt?.providerReference === providerReference) ?? null;
  }

  public async findAll(params?: { page?: number; limit?: number }): Promise<{ items: readonly PaymentAggregate[]; total: number; page: number; limit: number; totalPages: number }> {
    const items = Array.from(this._store.values());
    const limit = (params?.limit ?? items.length) || 10;
    const page = params?.page ?? 1;
    return {
      items,
      total: items.length,
      page,
      limit,
      totalPages: Math.ceil(items.length / limit) || 1,
    };
  }

  public async save(payment: PaymentAggregate): Promise<void> {
    this._store.set(payment.id.value, payment);
  }

  public async delete(id: PaymentIdentifier): Promise<void> {
    this._store.delete(id.value);
  }
}

export class ShipmentRepositoryAdapter implements IShipmentRepository {
  private readonly _store = new Map<string, ShipmentAggregate>();

  public async findById(id: ShipmentIdentifier): Promise<ShipmentAggregate | null> {
    return this._store.get(id.value) ?? null;
  }

  public async findByOrderId(orderId: OrderIdentifier): Promise<readonly ShipmentAggregate[]> {
    return Array.from(this._store.values()).filter((s) => s.orderId.equals(orderId));
  }

  public async findByTrackingNumber(trackingNumber: TrackingNumber): Promise<ShipmentAggregate | null> {
    return Array.from(this._store.values()).find((s) => s.label?.trackingNumber.equals(trackingNumber)) ?? null;
  }

  public async findAll(params?: { page?: number; limit?: number }): Promise<{ items: readonly ShipmentAggregate[]; total: number; page: number; limit: number; totalPages: number }> {
    const items = Array.from(this._store.values());
    const limit = (params?.limit ?? items.length) || 10;
    const page = params?.page ?? 1;
    return {
      items,
      total: items.length,
      page,
      limit,
      totalPages: Math.ceil(items.length / limit) || 1,
    };
  }

  public async save(shipment: ShipmentAggregate): Promise<void> {
    this._store.set(shipment.id.value, shipment);
  }

  public async delete(id: ShipmentIdentifier): Promise<void> {
    this._store.delete(id.value);
  }
}

export class FulfillmentRepositoryAdapter implements IFulfillmentRepository {
  private readonly _store = new Map<string, FulfillmentAggregate>();

  public async findById(id: FulfillmentIdentifier): Promise<FulfillmentAggregate | null> {
    return this._store.get(id.value) ?? null;
  }

  public async findByOrderId(orderId: OrderIdentifier): Promise<FulfillmentAggregate | null> {
    return Array.from(this._store.values()).find((f) => f.orderId.equals(orderId)) ?? null;
  }

  public async findAll(params?: { page?: number; limit?: number }): Promise<{ items: readonly FulfillmentAggregate[]; total: number; page: number; limit: number; totalPages: number }> {
    const items = Array.from(this._store.values());
    const limit = (params?.limit ?? items.length) || 10;
    const page = params?.page ?? 1;
    return {
      items,
      total: items.length,
      page,
      limit,
      totalPages: Math.ceil(items.length / limit) || 1,
    };
  }

  public async save(fulfillment: FulfillmentAggregate): Promise<void> {
    this._store.set(fulfillment.id.value, fulfillment);
  }

  public async delete(id: FulfillmentIdentifier): Promise<void> {
    this._store.delete(id.value);
  }
}
