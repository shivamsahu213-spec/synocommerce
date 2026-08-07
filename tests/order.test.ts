import assert from 'assert';
import { checkoutService } from '../src/modules/orders/services/checkout.service';
import { orderService } from '../src/modules/orders/services/order.service';
import { shipmentService } from '../src/modules/orders/services/shipment.service';
import { refundService } from '../src/modules/orders/services/refund.service';
import { couponService } from '../src/modules/orders/services/coupon.service';
import { taxService } from '../src/modules/orders/services/tax.service';
import { pricingService } from '../src/modules/orders/services/pricing.service';

export function verifyExports() {
  assert.ok(checkoutService, 'checkoutService should be defined');
  assert.ok(orderService, 'orderService should be defined');
  assert.ok(shipmentService, 'shipmentService should be defined');
  assert.ok(refundService, 'refundService should be defined');
  assert.ok(couponService, 'couponService should be defined');
  assert.ok(taxService, 'taxService should be defined');
  assert.ok(pricingService, 'pricingService should be defined');
}
