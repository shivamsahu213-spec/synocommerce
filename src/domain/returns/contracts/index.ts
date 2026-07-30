/**
 * Returns Domain Contracts
 *
 * @module domain/returns/contracts
 */

import { SKU } from '../..';
import { OrderIdentifier } from '../../orders/value-objects';
import {
  ReturnIdentifier,
  ReturnReason,
  ReturnStatus,
  ReturnAuthorization,
} from '../value-objects';

/** Line item within a return request. */
export interface IReturnItem {
  readonly itemId: string;
  readonly sku: SKU;
  readonly quantity: number;
  readonly reason: ReturnReason;
}

/** Aggregate root contract for the returns bounded context. */
export interface IReturnRequest {
  readonly id: ReturnIdentifier;
  readonly orderId: OrderIdentifier;
  readonly customerId: string;
  readonly status: ReturnStatus;
  readonly items: readonly IReturnItem[];
  readonly authorization?: ReturnAuthorization | undefined;
}
