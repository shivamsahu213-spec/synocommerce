/**
 * Payments Domain Repository Contracts
 *
 * @module domain/payments/repositories
 */

import { IBaseRepository } from '../..';
import { OrderIdentifier } from '../../orders/value-objects';
import { PaymentIdentifier } from '../value-objects';
import { PaymentAggregate } from '../aggregates';

export interface IPaymentRepository extends IBaseRepository<PaymentAggregate, PaymentIdentifier> {
  findByOrderId(orderId: OrderIdentifier): Promise<PaymentAggregate | null>;
  findByProviderReference(providerReference: string): Promise<PaymentAggregate | null>;
}
