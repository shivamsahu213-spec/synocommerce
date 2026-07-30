/**
 * Shipping Engine Module
 * @module modules/commerce-engine/shipping/shipping-engine
 */

export interface ShippingMethod {
  readonly id: string;
  readonly carrier: 'FEDEX' | 'UPS' | 'DHL' | 'STANDARD';
  readonly name: string;
  readonly baseRate: number;
  readonly estimatedDays: number;
}

export interface ShippingCalculation {
  readonly methodId: string;
  readonly carrier: string;
  readonly name: string;
  readonly cost: number;
  readonly estimatedDeliveryDate: Date;
}

export class ShippingEngine {
  private readonly _methods: ShippingMethod[] = [
    { id: 'ship_std', carrier: 'STANDARD', name: 'Standard Ground Shipping', baseRate: 9.99, estimatedDays: 5 },
    { id: 'ship_exp', carrier: 'FEDEX', name: 'FedEx Express (2-Day)', baseRate: 24.99, estimatedDays: 2 },
    { id: 'ship_dhl', carrier: 'DHL', name: 'DHL Next-Day Air', baseRate: 49.99, estimatedDays: 1 },
  ];

  public getAvailableMethods(subtotal: number, isFreeShipping = false): readonly ShippingCalculation[] {
    return this._methods.map((method) => {
      const cost = isFreeShipping && method.carrier === 'STANDARD' ? 0 : method.baseRate;
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + method.estimatedDays);

      return {
        methodId: method.id,
        carrier: method.carrier,
        name: method.name,
        cost,
        estimatedDeliveryDate: deliveryDate,
      };
    });
  }
}
