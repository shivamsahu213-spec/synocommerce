/**
 * Framework-Agnostic Router Adapter Contract
 * @module delivery/routing/router.interface
 */

import { IRestRouteGroup } from '../rest';

export interface IRouterAdapter {
  registerRouteGroup(group: IRestRouteGroup): void;
  getRoutes(): readonly IRestRouteGroup[];
}
