/**
 * REST Route & Endpoint Contracts
 * @module delivery/rest/rest-route.interface
 */

import { IDeliveryMiddleware } from '../middleware';
import { HttpMethod } from '../types';

export interface IRestEndpoint {
  readonly path: string;
  readonly method: HttpMethod;
  readonly summary: string;
  readonly description?: string | undefined;
  readonly middlewares?: readonly IDeliveryMiddleware[] | undefined;
  readonly handlerName: string;
}

export interface IRestRouteGroup {
  readonly prefix: string;
  readonly tag: string;
  readonly endpoints: readonly IRestEndpoint[];
}
