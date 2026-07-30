/**
 * Controller Interfaces
 *
 * Exposes REST entry points for Application Services. Contains NO business rules or persistence logic.
 *
 * @module delivery/controllers/controller.interface
 */

import { DeliveryRequest, DeliveryResponse } from '../contracts';

export interface IController {
  readonly controllerName: string;
}

export interface ICartController extends IController {
  createCart(request: DeliveryRequest): Promise<DeliveryResponse>;
  addItem(request: DeliveryRequest): Promise<DeliveryResponse>;
  removeItem(request: DeliveryRequest): Promise<DeliveryResponse>;
  mergeCart(request: DeliveryRequest): Promise<DeliveryResponse>;
  getCart(request: DeliveryRequest): Promise<DeliveryResponse>;
}

export interface ICheckoutController extends IController {
  startCheckout(request: DeliveryRequest): Promise<DeliveryResponse>;
  validateCheckout(request: DeliveryRequest): Promise<DeliveryResponse>;
  getCheckout(request: DeliveryRequest): Promise<DeliveryResponse>;
}

export interface IOrderController extends IController {
  placeOrder(request: DeliveryRequest): Promise<DeliveryResponse>;
  getOrder(request: DeliveryRequest): Promise<DeliveryResponse>;
  cancelOrder(request: DeliveryRequest): Promise<DeliveryResponse>;
}

export interface IPaymentController extends IController {
  authorizePayment(request: DeliveryRequest): Promise<DeliveryResponse>;
  capturePayment(request: DeliveryRequest): Promise<DeliveryResponse>;
  getPayment(request: DeliveryRequest): Promise<DeliveryResponse>;
}

export interface IShipmentController extends IController {
  createShipment(request: DeliveryRequest): Promise<DeliveryResponse>;
  getShipment(request: DeliveryRequest): Promise<DeliveryResponse>;
}

export interface ICatalogController extends IController {
  getProduct(request: DeliveryRequest): Promise<DeliveryResponse>;
  searchProducts(request: DeliveryRequest): Promise<DeliveryResponse>;
  getCategory(request: DeliveryRequest): Promise<DeliveryResponse>;
}
