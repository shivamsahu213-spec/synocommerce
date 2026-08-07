/**
 * Enterprise Application Service Interfaces
 *
 * Facades orchestrating CQRS commands, queries, and use cases per business module.
 *
 * @module application/services/application-services.interface
 */

import {
  AddItemToCartInput,
  ApproveRefundInput,
  AuthorizePaymentInput,
  CalculateTaxInput,
  CapturePaymentInput,
  CartDTO,
  CategoryDTO,
  CheckoutSessionDTO,
  CreateShipmentInput,
  CustomerDTO,
  GenerateInvoiceInput,
  InvoiceDTO,
  MergeCartInput,
  OrderDTO,
  PaymentDTO,
  PlaceOrderInput,
  ProductDTO,
  RefundDTO,
  RemoveItemFromCartInput,
  RequestReturnInput,
  ReturnRequestDTO,
  SearchProductsInput,
  ShipmentDTO,
  StartCheckoutInput,
  TaxCalculationDTO,
} from '../dto';
import { Result } from '../results';

export interface ICartApplicationService {
  createCart(currency: string, customerId?: string): Promise<Result<CartDTO>>;
  addItem(input: AddItemToCartInput): Promise<Result<CartDTO>>;
  removeItem(input: RemoveItemFromCartInput): Promise<Result<CartDTO>>;
  mergeCart(input: MergeCartInput): Promise<Result<CartDTO>>;
  getCart(cartId: string): Promise<Result<CartDTO | undefined>>;
}

export interface ICheckoutApplicationService {
  startCheckout(input: StartCheckoutInput): Promise<Result<CheckoutSessionDTO>>;
  validateCheckout(checkoutId: string): Promise<Result<boolean>>;
  getCheckout(checkoutId: string): Promise<Result<CheckoutSessionDTO | undefined>>;
}

export interface IOrderApplicationService {
  placeOrder(input: PlaceOrderInput): Promise<Result<OrderDTO>>;
  getOrder(orderId: string): Promise<Result<OrderDTO | undefined>>;
  cancelOrder(orderId: string, reason?: string): Promise<Result<void>>;
}

export interface IPaymentApplicationService {
  authorizePayment(input: AuthorizePaymentInput): Promise<Result<PaymentDTO>>;
  capturePayment(input: CapturePaymentInput): Promise<Result<PaymentDTO>>;
  getPayment(paymentId: string): Promise<Result<PaymentDTO | undefined>>;
}

export interface IShipmentApplicationService {
  createShipment(input: CreateShipmentInput): Promise<Result<ShipmentDTO>>;
  getShipment(shipmentId: string): Promise<Result<ShipmentDTO | undefined>>;
}

export interface ICustomerApplicationService {
  getCustomer(customerId: string): Promise<Result<CustomerDTO | undefined>>;
}

export interface ICatalogApplicationService {
  getProduct(productId: string): Promise<Result<ProductDTO | undefined>>;
  searchProducts(input: SearchProductsInput): Promise<Result<readonly ProductDTO[]>>;
  getCategory(categoryId: string): Promise<Result<CategoryDTO | undefined>>;
}

export interface IPricingApplicationService {
  calculateTax(input: CalculateTaxInput): Promise<Result<TaxCalculationDTO>>;
}

export interface IInventoryApplicationService {
  reserveInventory(orderId: string, items: readonly { sku: string; qty: number }[]): Promise<Result<void>>;
}

export interface IReturnApplicationService {
  requestReturn(input: RequestReturnInput): Promise<Result<ReturnRequestDTO>>;
}

export interface IRefundApplicationService {
  approveRefund(input: ApproveRefundInput): Promise<Result<RefundDTO>>;
}

export interface IInvoicingApplicationService {
  generateInvoice(input: GenerateInvoiceInput): Promise<Result<InvoiceDTO>>;
  getInvoice(invoiceId: string): Promise<Result<InvoiceDTO | undefined>>;
}
