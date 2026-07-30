/**
 * Delivery Middleware Contracts
 *
 * Framework-agnostic middleware contracts for Fastify, Express, Hono, NestJS, etc.
 *
 * @module delivery/middleware/middleware.interface
 */

import { DeliveryRequest, DeliveryResponse } from '../contracts';

export interface NextMiddlewareDelegate {
  (): Promise<DeliveryResponse>;
}

export interface IDeliveryMiddleware {
  readonly middlewareName: string;
  readonly priority: number;
  handle(request: DeliveryRequest, next: NextMiddlewareDelegate): Promise<DeliveryResponse>;
}

export interface IAuthenticationMiddleware extends IDeliveryMiddleware {}
export interface IAuthorizationMiddleware extends IDeliveryMiddleware {}
export interface ILocalizationMiddleware extends IDeliveryMiddleware {}
export interface ITenantResolutionMiddleware extends IDeliveryMiddleware {}
export interface ICorrelationIdMiddleware extends IDeliveryMiddleware {}
export interface IRequestLoggingMiddleware extends IDeliveryMiddleware {}
export interface IRateLimitingMiddleware extends IDeliveryMiddleware {}
export interface ICompressionMiddleware extends IDeliveryMiddleware {}
export interface ICachingMiddleware extends IDeliveryMiddleware {}
export interface ISecurityHeadersMiddleware extends IDeliveryMiddleware {}
