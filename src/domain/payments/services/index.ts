/**
 * Payments Domain Services (Ports)
 *
 * Interface-only domain / application ports. Concrete adapters belong
 * in the infrastructure layer and must remain vendor-neutral at this boundary.
 *
 * @module domain/payments/services
 */

import { Money } from '../..';
import { PaymentAggregate } from '../aggregates';
import { IAuthorization, ICapture, ISettlement, IVoid } from '../contracts';

/**
 * Vendor-neutral payment gateway port.
 * Stripe / PayPal / Adyen / custom adapters implement this contract outside the domain.
 */
export interface IPaymentGateway {
  authorize(paymentId: string, amount: Money): Promise<IAuthorization>;
  capture(paymentId: string, amount: Money): Promise<ICapture>;
  void(paymentId: string): Promise<IVoid>;
  refund(paymentId: string, amount: Money): Promise<string>;
}

/** Orchestrates multi-step payment workflows across gateway + fraud + policies. */
export interface IPaymentOrchestrator {
  processPayment(payment: PaymentAggregate): Promise<boolean>;
}

/** Domain service responsible for authorization decisions. */
export interface IPaymentAuthorizationService {
  authorizePayment(payment: PaymentAggregate): Promise<IAuthorization>;
}

/** Validates payment method eligibility before initiation. */
export interface IPaymentValidationService {
  validatePaymentMethod(paymentMethodId: string): Promise<boolean>;
  validateAmount(amount: Money): Promise<boolean>;
}

/** Reconciles provider settlements against internal payment records. */
export interface IPaymentReconciliationService {
  reconcileSettlements(provider: string, date: Date): Promise<readonly ISettlement[]>;
}
