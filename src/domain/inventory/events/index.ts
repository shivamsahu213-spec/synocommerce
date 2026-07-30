import { BaseDomainEvent } from '../..';

export abstract class ImmutableDomainEvent extends BaseDomainEvent {
  public readonly version: number = 1;
  public readonly metadata: Record<string, unknown>;

  constructor(
    public readonly aggregateId: string,
    metadata: Record<string, unknown> = {}
  ) {
    super();
    this.metadata = Object.freeze({ ...metadata });
  }
}

export class InventoryReservedEvent extends ImmutableDomainEvent {
  public readonly eventName = 'inventory.reserved';
  constructor(
    aggregateId: string,
    public readonly sku: string,
    public readonly quantity: number,
    public readonly reservationId: string,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}

export class InventoryReleasedEvent extends ImmutableDomainEvent {
  public readonly eventName = 'inventory.released';
  constructor(
    aggregateId: string,
    public readonly reservationId: string,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}

export class InventoryAdjustedEvent extends ImmutableDomainEvent {
  public readonly eventName = 'inventory.adjusted';
  constructor(
    aggregateId: string,
    public readonly sku: string,
    public readonly deltaQuantity: number,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}

export class WarehouseCreatedEvent extends ImmutableDomainEvent {
  public readonly eventName = 'warehouse.created';
  constructor(
    aggregateId: string,
    public readonly code: string,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}

export class StockTransferredEvent extends ImmutableDomainEvent {
  public readonly eventName = 'stock.transferred';
  constructor(
    aggregateId: string,
    public readonly fromWarehouseId: string,
    public readonly toWarehouseId: string,
    public readonly sku: string,
    public readonly quantity: number,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}
