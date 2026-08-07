import { AggregateRoot } from '../..';
import { ICheckoutSession } from '../contracts';
import { CheckoutStatus } from '../types';
import {
  BillingSelection,
  CheckoutSessionIdentifier,
  CheckoutStep,
  CheckoutTaxEstimate,
  PaymentSelection,
  ShippingSelection,
} from '../value-objects';

export class CheckoutSessionAggregate extends AggregateRoot<CheckoutSessionIdentifier> implements ICheckoutSession {
  private _step: CheckoutStep;
  private _status: CheckoutStatus;
  private _shippingSelection?: ShippingSelection;
  private _billingSelection?: BillingSelection;
  private _paymentSelection?: PaymentSelection;
  private _taxCalculation?: CheckoutTaxEstimate;

  constructor(
    id: CheckoutSessionIdentifier,
    public readonly cartId: string,
    public readonly customerId?: string
  ) {
    super(id);
    this._step = 'INFORMATION';
    this._status = 'IN_PROGRESS';
  }

  public get step(): CheckoutStep { return this._step; }
  public get status(): CheckoutStatus { return this._status; }
  public get shippingSelection(): ShippingSelection | undefined { return this._shippingSelection; }
  public get billingSelection(): BillingSelection | undefined { return this._billingSelection; }
  public get paymentSelection(): PaymentSelection | undefined { return this._paymentSelection; }
  public get taxCalculation(): CheckoutTaxEstimate | undefined { return this._taxCalculation; }

  public setShippingSelection(selection: ShippingSelection): void {
    this._shippingSelection = selection;
    this._step = 'SHIPPING';
  }

  public setBillingSelection(selection: BillingSelection): void {
    this._billingSelection = selection;
    this._step = 'BILLING';
  }

  public setPaymentSelection(selection: PaymentSelection): void {
    this._paymentSelection = selection;
    this._step = 'PAYMENT';
  }

  public completeCheckout(): void {
    this._step = 'COMPLETED';
    this._status = 'COMPLETED';
  }
}
