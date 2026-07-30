/**
 * RPC Delivery Architecture Contracts
 * @module delivery/rpc
 */

import { DeliveryRequest, DeliveryResponse } from '../contracts';

export interface IRpcServiceContract {
  readonly serviceName: string;
  handleRpcCall(methodName: string, request: DeliveryRequest): Promise<DeliveryResponse>;
}
