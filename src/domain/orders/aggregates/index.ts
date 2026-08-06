import { AggregateRoot, Currency, Money } from '../..';
import { IOrder } from '../contracts';
import { OrderItemEntity } from '../entities';
import { InvalidOrderStateTransitionError } from '../errors';
import { OrderFulfillmentStatus,OrderPaymentStatus, OrderStatus } from '../types';
import { OrderIdentifier, OrderInvoice,OrderNumber, OrderPayment, OrderShipment, OrderTotals } from '../value-objects';

export class OrderAggregate extends AggregateRoot<OrderIdentifier> implements IOrder {
  private _status: OrderStatus;
  private _paymentStatus: OrderPaymentStatus;
  private _fulfillmentStatus: OrderFulfillmentStatus;
  private _items: OrderItemEntity[];
  private _totals: OrderTotals;
  private _payment?: OrderPayment;
  private _shipment?: OrderShipment;
  private _invoice?: OrderInvoice;

  constructor(
    id: OrderIdentifier,
    public readonly orderNumber: OrderNumber,
    public readonly customerId: string,
    public readonly currency: Currency,
    items: OrderItemEntity[],
    totals: OrderTotals
  ) {
    super(id);
    this._status = 'PENDING';
    this._paymentStatus = 'UNPAID';
    this._fulfillmentStatus = 'UNFULFILLED';
    this._items = [...items];
    this._totals = totals;
  }

  public get status(): OrderStatus { return this._status; }
  public get paymentStatus(): OrderPaymentStatus { return this._paymentStatus; }
  public get fulfillmentStatus(): OrderFulfillmentStatus { return this._fulfillmentStatus; }
  public get items(): readonly OrderItemEntity[] { return [...this._items]; }
  public get totals(): OrderTotals { return this._totals; }
  public get payment(): OrderPayment | undefined { return this._payment; }
  public get shipment(): OrderShipment | undefined { return this._shipment; }
  public get invoice(): OrderInvoice | undefined { return this._invoice; }

  public confirm(): void {
    if (this._status !== 'PENDING') {
      throw new InvalidOrderStateTransitionError(this._status, 'CONFIRMED');
    }
    this._status = 'CONFIRMED';
  }

  public cancel(reason?: string): void {
    if (this._status === 'SHIPPED' || this._status === 'DELIVERED') {
      throw new InvalidOrderStateTransitionError(this._status, 'CANCELLED');
    }
    this._status = 'CANCELLED';
  }

  public complete(): void {
    if (this._status !== 'SHIPPED' && this._status !== 'PROCESSING') {
      throw new InvalidOrderStateTransitionError(this._status, 'DELIVERED');
    }
    this._status = 'DELIVERED';
    this._fulfillmentStatus = 'FULFILLED';
  }
}
