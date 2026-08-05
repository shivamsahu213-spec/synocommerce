/**
 * Omnichannel Fulfillment Engine
 * @module src/integrations/shipping/fulfillment-engine
 */

import { FulfillmentType } from './types';

export interface FulfillmentOrder {
  fulfillmentId: string;
  orderId: string;
  type: FulfillmentType;
  pickupVerificationCode?: string | undefined;
  storeLocationId?: string | undefined;
  status: 'PENDING_PICKUP' | 'READY_FOR_PICKUP' | 'FULFILLED' | 'CANCELLED';
  createdAt: Date;
}

export class FulfillmentEngineProcessor {
  private fulfillments = new Map<string, FulfillmentOrder>();

  public createFulfillmentOrder(
    orderId: string,
    type: FulfillmentType,
    storeLocationId?: string
  ): FulfillmentOrder {
    const fulfillmentId = `ful_${type.toLowerCase()}_${Date.now()}`;
    const pickupVerificationCode =
      type === 'BOPIS' || type === 'CURBSIDE_PICKUP' || type === 'CLICK_AND_COLLECT'
        ? Math.floor(100000 + Math.random() * 900000).toString()
        : undefined;

    const order: FulfillmentOrder = {
      fulfillmentId,
      orderId,
      type,
      pickupVerificationCode,
      storeLocationId,
      status: type === 'BOPIS' || type === 'CURBSIDE_PICKUP' ? 'READY_FOR_PICKUP' : 'PENDING_PICKUP',
      createdAt: new Date(),
    };

    this.fulfillments.set(fulfillmentId, order);
    return order;
  }

  public completePickup(fulfillmentId: string, verificationCode: string): boolean {
    const order = this.fulfillments.get(fulfillmentId);
    if (!order) return false;
    if (order.pickupVerificationCode && order.pickupVerificationCode !== verificationCode) {
      throw new Error('INVALID_PICKUP_VERIFICATION_CODE');
    }

    order.status = 'FULFILLED';
    return true;
  }
}
