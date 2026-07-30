/**
 * Returns Domain Policies
 *
 * @module domain/returns/policies
 */

import { IDomainPolicy } from '../..';
import { ReturnAggregate } from '../aggregates';

export interface IReturnPolicy extends IDomainPolicy<ReturnAggregate> {
  canReturn(request: ReturnAggregate): boolean;
  canApprove(request: ReturnAggregate): boolean;
  canReceive(request: ReturnAggregate): boolean;
}
