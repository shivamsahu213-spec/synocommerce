/**
 * Refunds Domain Repository Contracts
 *
 * @module domain/refunds/repositories
 */

import { IBaseRepository } from '../..';
import { OrderIdentifier } from '../../orders/value-objects';
import { PaymentIdentifier } from '../../payments/value-objects';
import { RefundAggregate } from '../aggregates';
import { RefundIdentifier } from '../value-objects';

export interface IRefundRepository
  extends IBaseRepository<RefundAggregate, RefundIdentifier>
{
  findByOrderId(orderId: OrderIdentifier): Promise<readonly RefundAggregate[]>;
  findByPaymentId(
    paymentId: PaymentIdentifier
  ): Promise<readonly RefundAggregate[]>;
}
