/**
 * Refunds Domain Policies
 *
 * @module domain/refunds/policies
 */

import { IDomainPolicy } from '../..';
import { RefundAggregate } from '../aggregates';

export interface IRefundPolicy extends IDomainPolicy<RefundAggregate> {
  canRefund(refund: RefundAggregate): boolean;
  canApprove(refund: RefundAggregate): boolean;
  canProcess(refund: RefundAggregate): boolean;
}
