/**
 * Fulfillment Domain Aggregate
 *
 * FulfillmentAggregate is the consistency boundary for warehouse fulfillment
 * lifecycle transitions. Emits immutable domain events on every successful state change.
 *
 * @module domain/fulfillment/aggregates
 */

import { AggregateRoot } from '../..';
import { OrderIdentifier } from '../../orders/value-objects';
import { IFulfillmentOrder } from '../contracts';
import {
  FulfillmentIdentifier,
  FulfillmentStatus,
  WarehouseAssignment,
  AllocationResult,
} from '../value-objects';
import {
  AllocationFailedError,
  InvalidFulfillmentStateError,
} from '../errors';
import {
  FulfillmentStartedEvent,
  ItemsAllocatedEvent,
  ItemsPackedEvent,
  ItemsShippedEvent,
  FulfillmentCompletedEvent,
} from '../events';

export class FulfillmentAggregate
  extends AggregateRoot<FulfillmentIdentifier>
  implements IFulfillmentOrder
{
  private _status: FulfillmentStatus;
  private _assignments: WarehouseAssignment[];

  constructor(
    id: FulfillmentIdentifier,
    public readonly orderId: OrderIdentifier,
    assignments: readonly WarehouseAssignment[] = [],
    public readonly customerId?: string | undefined
  ) {
    super(id);
    this._status = 'CREATED';
    this._assignments = [...assignments];
  }

  public get status(): FulfillmentStatus {
    return this._status;
  }

  public get assignments(): readonly WarehouseAssignment[] {
    return [...this._assignments];
  }

  public start(): void {
    if (this._status !== 'CREATED' && this._status !== 'ALLOCATED') {
      throw new InvalidFulfillmentStateError(
        `Cannot start fulfillment in status '${this._status}'`
      );
    }
    this._status = 'PICKING';
    this.addDomainEvent(
      new FulfillmentStartedEvent(this.id.value, this.orderId.value)
    );
  }

  public allocate(result: AllocationResult): void {
    if (this._status !== 'CREATED' && this._status !== 'PICKING') {
      throw new InvalidFulfillmentStateError(
        `Cannot allocate in status '${this._status}'`
      );
    }
    if (!result.isFullyAllocated) {
      throw new AllocationFailedError('Partial allocation is not permitted');
    }
    if (result.assignments.length === 0) {
      throw new AllocationFailedError('No warehouse assignments produced');
    }
    this._assignments = [...result.assignments];
    this._status = 'ALLOCATED';
    this.addDomainEvent(
      new ItemsAllocatedEvent(this.id.value, result.assignments.length)
    );
  }

  public markPacked(): void {
    if (this._status !== 'ALLOCATED' && this._status !== 'PICKING') {
      throw new InvalidFulfillmentStateError(
        `Cannot mark packed from status '${this._status}'`
      );
    }
    this._status = 'PACKED';
    this.addDomainEvent(new ItemsPackedEvent(this.id.value));
  }

  public markShipped(): void {
    if (this._status !== 'PACKED') {
      throw new InvalidFulfillmentStateError(
        `Cannot mark shipped from status '${this._status}'`
      );
    }
    this._status = 'SHIPPED';
    this.addDomainEvent(new ItemsShippedEvent(this.id.value));
  }

  public complete(): void {
    if (this._status !== 'SHIPPED') {
      throw new InvalidFulfillmentStateError(
        `Cannot complete fulfillment in status '${this._status}'`
      );
    }
    this._status = 'COMPLETED';
    this.addDomainEvent(new FulfillmentCompletedEvent(this.id.value));
  }
}
