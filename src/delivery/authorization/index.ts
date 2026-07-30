/**
 * Delivery Authorization Contracts
 * @module delivery/authorization
 */

import { IDeliveryContext } from '../contracts';

export interface IDeliveryAuthorizer {
  authorizeRequest(context: IDeliveryContext, requiredPermission: string): Promise<boolean>;
}
