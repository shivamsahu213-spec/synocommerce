/**
 * Delivery Layer Bootstrapper
 * @module delivery/bootstrap
 */

import { IRouterAdapter } from '../routing';

export interface IDeliveryBootstrapper {
  bootstrap(router: IRouterAdapter): Promise<void>;
}
