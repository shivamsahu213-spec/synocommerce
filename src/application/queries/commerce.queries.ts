/**
 * Application Business Queries
 * @module application/queries/commerce.queries
 */

import {
  CartDTO,
  CategoryDTO,
  CheckoutSessionDTO,
  CustomerDTO,
  InvoiceDTO,
  OrderDTO,
  PaymentDTO,
  ProductDTO,
  SearchProductsInput,
  ShipmentDTO,
} from '../dto';
import { QueryOptions } from '../types';
import { IQuery } from './query.interface';

export class GetProductQuery implements IQuery<ProductDTO | undefined> {
  public readonly queryName = 'GetProductQuery';
  constructor(public readonly productId: string, public readonly options?: QueryOptions | undefined) {}
}

export class SearchProductsQuery implements IQuery<readonly ProductDTO[]> {
  public readonly queryName = 'SearchProductsQuery';
  constructor(public readonly input: SearchProductsInput, public readonly options?: QueryOptions | undefined) {}
}

export class GetCategoryQuery implements IQuery<CategoryDTO | undefined> {
  public readonly queryName = 'GetCategoryQuery';
  constructor(public readonly categoryId: string, public readonly options?: QueryOptions | undefined) {}
}

export class GetCartQuery implements IQuery<CartDTO | undefined> {
  public readonly queryName = 'GetCartQuery';
  constructor(public readonly cartId: string, public readonly options?: QueryOptions | undefined) {}
}

export class GetCheckoutQuery implements IQuery<CheckoutSessionDTO | undefined> {
  public readonly queryName = 'GetCheckoutQuery';
  constructor(public readonly checkoutId: string, public readonly options?: QueryOptions | undefined) {}
}

export class GetOrderQuery implements IQuery<OrderDTO | undefined> {
  public readonly queryName = 'GetOrderQuery';
  constructor(public readonly orderId: string, public readonly options?: QueryOptions | undefined) {}
}

export class GetCustomerQuery implements IQuery<CustomerDTO | undefined> {
  public readonly queryName = 'GetCustomerQuery';
  constructor(public readonly customerId: string, public readonly options?: QueryOptions | undefined) {}
}

export class GetShipmentQuery implements IQuery<ShipmentDTO | undefined> {
  public readonly queryName = 'GetShipmentQuery';
  constructor(public readonly shipmentId: string, public readonly options?: QueryOptions | undefined) {}
}

export class GetInvoiceQuery implements IQuery<InvoiceDTO | undefined> {
  public readonly queryName = 'GetInvoiceQuery';
  constructor(public readonly invoiceId: string, public readonly options?: QueryOptions | undefined) {}
}

export class GetPaymentQuery implements IQuery<PaymentDTO | undefined> {
  public readonly queryName = 'GetPaymentQuery';
  constructor(public readonly paymentId: string, public readonly options?: QueryOptions | undefined) {}
}
