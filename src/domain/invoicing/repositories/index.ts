/**
 * Invoicing Domain Repository Contracts
 *
 * @module domain/invoicing/repositories
 */

import { IBaseRepository } from '../..';
import { OrderIdentifier } from '../../orders/value-objects';
import { InvoiceIdentifier, InvoiceNumber } from '../value-objects';
import { InvoiceAggregate } from '../aggregates';

export interface IInvoiceRepository
  extends IBaseRepository<InvoiceAggregate, InvoiceIdentifier>
{
  findByInvoiceNumber(number: InvoiceNumber): Promise<InvoiceAggregate | null>;
  findByOrderId(orderId: OrderIdentifier): Promise<InvoiceAggregate | null>;
}
