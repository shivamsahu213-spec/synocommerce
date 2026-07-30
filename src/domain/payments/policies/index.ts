/**
 * Payments Domain Policies
 *
 * @module domain/payments/policies
 */

import { IDomainPolicy } from '../..';
import { PaymentAggregate } from '../aggregates';
import { FraudCheck } from '../value-objects';

export interface IPaymentPolicy extends IDomainPolicy<PaymentAggregate> {
  canProcess(payment: PaymentAggregate): boolean;
  canCapture(payment: PaymentAggregate): boolean;
  canVoid(payment: PaymentAggregate): boolean;
  canRefund(payment: PaymentAggregate): boolean;
}

export interface IFraudPolicy extends IDomainPolicy<PaymentAggregate> {
  evaluateRisk(payment: PaymentAggregate): FraudCheck;
}

export interface IRetryPolicy extends IDomainPolicy<PaymentAggregate> {
  shouldRetry(payment: PaymentAggregate, attemptCount: number): boolean;
  nextDelayMs(attemptCount: number): number;
}
