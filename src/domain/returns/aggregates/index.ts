/**
 * Returns Domain Aggregate
 *
 * ReturnAggregate is the consistency boundary for RMA lifecycle transitions.
 * Emits immutable domain events on every successful state change.
 *
 * @module domain/returns/aggregates
 */

import { AggregateRoot } from '../..';
import { OrderIdentifier } from '../../orders/value-objects';
import { IReturnRequest, IReturnItem } from '../contracts';
import {
  ReturnIdentifier,
  ReturnStatus,
  ReturnAuthorization,
} from '../value-objects';
import {
  ReturnApprovalFailedError,
  ReturnRejectionFailedError,
  ReturnReceiveFailedError,
  ReturnCompletionFailedError,
} from '../errors';
import {
  ReturnRequestedEvent,
  ReturnApprovedEvent,
  ReturnRejectedEvent,
  ItemsReceivedEvent,
  ReturnCompletedEvent,
} from '../events';

export class ReturnAggregate
  extends AggregateRoot<ReturnIdentifier>
  implements IReturnRequest
{
  private _status: ReturnStatus;
  private _items: IReturnItem[];
  private _authorization?: ReturnAuthorization;

  constructor(
    id: ReturnIdentifier,
    public readonly orderId: OrderIdentifier,
    public readonly customerId: string,
    items: readonly IReturnItem[] = []
  ) {
    super(id);
    this._status = 'REQUESTED';
    this._items = [...items];
    this.addDomainEvent(
      new ReturnRequestedEvent(id.value, orderId.value)
    );
  }

  public get status(): ReturnStatus {
    return this._status;
  }

  public get items(): readonly IReturnItem[] {
    return [...this._items];
  }

  public get authorization(): ReturnAuthorization | undefined {
    return this._authorization;
  }

  public approve(authorization: ReturnAuthorization): void {
    if (this._status !== 'REQUESTED') {
      throw new ReturnApprovalFailedError(
        `Cannot approve return in status '${this._status}'`
      );
    }
    if (this._items.length === 0) {
      throw new ReturnApprovalFailedError('Cannot approve a return with no items');
    }
    this._authorization = authorization;
    this._status = 'APPROVED';
    this.addDomainEvent(
      new ReturnApprovedEvent(this.id.value, authorization.rmaNumber)
    );
  }

  public reject(reason: string): void {
    if (this._status !== 'REQUESTED') {
      throw new ReturnRejectionFailedError(
        `Cannot reject return in status '${this._status}'`
      );
    }
    this._status = 'REJECTED';
    this.addDomainEvent(new ReturnRejectedEvent(this.id.value, reason));
  }

  public markItemsReceived(): void {
    if (this._status !== 'APPROVED') {
      throw new ReturnReceiveFailedError(
        'Can only receive items for an approved return'
      );
    }
    this._status = 'ITEMS_RECEIVED';
    this.addDomainEvent(new ItemsReceivedEvent(this.id.value));
  }

  public complete(): void {
    if (this._status !== 'ITEMS_RECEIVED') {
      throw new ReturnCompletionFailedError(
        'Can only complete a return after items are received'
      );
    }
    this._status = 'COMPLETED';
    this.addDomainEvent(new ReturnCompletedEvent(this.id.value));
  }
}
