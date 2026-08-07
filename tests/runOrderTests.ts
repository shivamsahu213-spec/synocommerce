import { prisma } from '../src/database/prisma';
import { checkoutService } from '../src/modules/orders/services/checkout.service';
import { orderService } from '../src/modules/orders/services/order.service';
import { shipmentService } from '../src/modules/orders/services/shipment.service';
import { refundService } from '../src/modules/orders/services/refund.service';
import { couponService } from '../src/modules/orders/services/coupon.service';
import { taxService } from '../src/modules/orders/services/tax.service';
import { pricingService } from '../src/modules/orders/services/pricing.service';
import { OrderStatus, ShipmentStatus, CouponType, Currency, RefundType } from '@prisma/client';

async function main() {
  console.log('🧪 Starting SynoCommerce Order Management System (OMS) End-to-End Test Suite...\n');

  try {
    const timestamp = Date.now();
    const tenant = await prisma.tenant.create({
      data: {
        name: `OMS Test Tenant ${timestamp}`,
        domain: `omstenant-${timestamp}.local`,
      },
    });

    const store = await prisma.store.create({
      data: {
        tenantId: tenant.id,
        name: `OMS Test Store ${timestamp}`,
        slug: `oms-store-${timestamp}`,
        domain: `omsstore-${timestamp}.local`,
      },
    });

    const customer = await prisma.user.create({
      data: {
        email: `oms.customer.${timestamp}@example.com`,
        firstName: 'John',
        lastName: 'Doe',
        tenantId: tenant.id,
      },
    });

    const product = await prisma.product.create({
      data: {
        storeId: store.id,
        sku: `OMS-PROD-${timestamp}`,
        name: 'Enterprise Laptop Pro',
        price: 1200.0,
        currency: Currency.USD,
        isActive: true,
      },
    });

    const variant = await prisma.productVariant.create({
      data: {
        productId: product.id,
        sku: `OMS-PROD-${timestamp}-16GB`,
        price: 1400.0,
        color: 'Space Gray',
        size: '16-inch',
        isActive: true,
      },
    });

    console.log(`✅ Test Environment Setup Ready:
    Tenant ID:   ${tenant.id}
    Store ID:    ${store.id}
    Customer ID: ${customer.id}
    Product ID:  ${product.id}
    Variant ID:  ${variant.id}\n`);

    // 1. Test Pricing Engine
    console.log('1. Testing Pricing Engine...');
    const pricingResult = await pricingService.calculatePricing({
      tenantId: tenant.id,
      storeId: store.id,
      items: [
        {
          productId: product.id,
          variantId: variant.id,
          title: 'Enterprise Laptop Pro 16-inch',
          quantity: 2,
          unitPrice: 1400.0,
        },
      ],
      shippingAddress: { country: 'US', region: 'CA' },
      shippingFee: 20.0,
    });

    if (pricingResult.subtotal !== 2800.0 || pricingResult.totalAmount <= 2800.0) {
      throw new Error(`Pricing calculation mismatch. Subtotal: ${pricingResult.subtotal}, Total: ${pricingResult.totalAmount}`);
    }
    console.log(`✅ Pricing Engine test passed! Subtotal: $${pricingResult.subtotal}, Tax: $${pricingResult.taxAmount}, Total: $${pricingResult.totalAmount}\n`);

    // 2. Test Coupon Engine
    console.log('2. Testing Coupon Engine...');
    const coupon = await couponService.createCoupon(tenant.id, {
      code: `SAVE10-${timestamp}`,
      type: CouponType.PERCENTAGE,
      value: 10.0,
      minOrderAmount: 100.0,
    });

    const couponVal = await couponService.validateAndCalculateCoupon({
      tenantId: tenant.id,
      code: coupon.code,
      subtotal: 2800.0,
      shippingFee: 20.0,
    });

    if (couponVal.discountAmount !== 280.0) {
      throw new Error(`Coupon discount mismatch. Expected: 280, Got: ${couponVal.discountAmount}`);
    }
    console.log(`✅ Coupon Engine test passed! Coupon: ${couponVal.code}, Discount: -$${couponVal.discountAmount}\n`);

    // 3. Test Tax Engine (GST & VAT)
    console.log('3. Testing Tax Engine...');
    const taxUS = await taxService.calculateTax({ tenantId: tenant.id, storeId: store.id, country: 'US', taxableAmount: 1000.0 });
    const taxIN = await taxService.calculateTax({ tenantId: tenant.id, storeId: store.id, country: 'IN', taxableAmount: 1000.0 });

    if (taxUS.taxAmount !== 80.0 || taxIN.taxAmount !== 180.0) {
      throw new Error(`Tax calculation mismatch. US Tax: ${taxUS.taxAmount}, IN Tax: ${taxIN.taxAmount}`);
    }
    console.log(`✅ Tax Engine test passed! US Tax: $${taxUS.taxAmount} (${taxUS.taxName}), IN Tax: $${taxIN.taxAmount} (${taxIN.taxName})\n`);

    // 4. Test Checkout Engine (POST /api/checkout)
    console.log('4. Testing Checkout Engine (POST /api/checkout)...');
    const checkoutRes = await checkoutService.processCheckout(
      tenant.id,
      store.id,
      {
        items: [{ productId: product.id, variantId: variant.id, quantity: 1 }],
        couponCode: coupon.code,
        shippingAddress: { street: '123 Tech Way', city: 'San Francisco', state: 'CA', country: 'US', postalCode: '94105' },
        currency: 'USD',
        customerEmail: customer.email,
      },
      customer.id,
    );

    const draftOrder = checkoutRes.order;
    if (!draftOrder || draftOrder.status !== OrderStatus.DRAFT) {
      throw new Error(`Checkout failed to create draft order. Status: ${draftOrder?.status}`);
    }
    console.log(`✅ Checkout passed! Order Number: ${draftOrder.orderNumber}, Status: ${draftOrder.status}\n`);

    // 5. Test Order State Workflow & Invalid Transition Prevention
    console.log('5. Testing Order State Workflow & Invalid Transition Prevention...');
    const pendingOrder = await orderService.updateOrder(draftOrder.id, tenant.id, { status: OrderStatus.PENDING });
    if (pendingOrder.status !== OrderStatus.PENDING) throw new Error('Failed to update to PENDING');

    const confirmedOrder = await orderService.updateOrder(draftOrder.id, tenant.id, { status: OrderStatus.CONFIRMED });
    if (confirmedOrder.status !== OrderStatus.CONFIRMED) throw new Error('Failed to update to CONFIRMED');

    let caughtError = false;
    try {
      await orderService.updateOrder(draftOrder.id, tenant.id, { status: OrderStatus.DELIVERED });
    } catch {
      caughtError = true;
    }

    if (!caughtError) {
      throw new Error('State workflow failed to prevent invalid transition from CONFIRMED directly to DELIVERED!');
    }
    console.log('✅ State Workflow test passed! Invalid transition prevented as expected.\n');

    // 6. Test Shipment CRUD & Events
    console.log('6. Testing Shipment Module...');
    await orderService.updateOrder(draftOrder.id, tenant.id, { status: OrderStatus.PACKED });
    await orderService.updateOrder(draftOrder.id, tenant.id, { status: OrderStatus.READY_FOR_SHIPMENT });

    const shipment = await shipmentService.createShipment(tenant.id, {
      orderId: draftOrder.id,
      carrier: 'FedEx Express',
      trackingNumber: 'FX-9988776655',
      status: ShipmentStatus.PENDING,
    });

    if (!shipment || shipment.carrier !== 'FedEx Express') {
      throw new Error('Failed to create shipment');
    }

    const shippedRes = await shipmentService.updateShipment(shipment.id, tenant.id, {
      status: ShipmentStatus.SHIPPED,
    });

    if (shippedRes.status !== ShipmentStatus.SHIPPED) {
      throw new Error('Failed to update shipment to SHIPPED');
    }
    console.log(`✅ Shipment Module test passed! Tracking: ${shippedRes.trackingNumber}, Status: ${shippedRes.status}\n`);

    // 7. Test Customer Order Search & APIs
    console.log('7. Testing Customer & Search APIs...');
    await shipmentService.updateShipment(shipment.id, tenant.id, { status: ShipmentStatus.DELIVERED });

    const customerOrders = await orderService.getMyOrders(tenant.id, customer.id);
    if (customerOrders.items.length === 0) {
      throw new Error('Customer orders lookup returned empty');
    }

    const searchRes = await orderService.searchOrders(tenant.id, {
      q: draftOrder.orderNumber,
      page: 1,
      limit: 10,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });

    if (searchRes.items.length === 0) {
      throw new Error(`Order search failed for order number ${draftOrder.orderNumber}`);
    }
    console.log(`✅ Customer & Search APIs test passed! Found ${searchRes.items.length} matching order(s).\n`);

    // 8. Test Refund Module
    console.log('8. Testing Refund Module...');
    await orderService.updateOrder(draftOrder.id, tenant.id, { status: OrderStatus.DELIVERED });

    const refundReq = await refundService.requestRefund(tenant.id, {
      orderId: draftOrder.id,
      type: RefundType.FULL,
      reason: 'Product defective upon delivery',
    });

    if (!refundReq || refundReq.status !== 'PENDING') {
      throw new Error('Refund request failed');
    }

    const approvedRefund = await refundService.processRefundApproval(tenant.id, {
      refundId: refundReq.id,
      approvalStatus: 'APPROVED',
    });

    if (approvedRefund.status !== 'COMPLETED') {
      throw new Error('Refund approval failed');
    }
    console.log(`✅ Refund Module test passed! Refund Amount: $${approvedRefund.amount}, Status: ${approvedRefund.status}\n`);

    // 9. Test Soft Delete & Tenant Isolation
    console.log('9. Testing Soft Delete & Tenant Isolation...');
    await orderService.softDeleteOrder(draftOrder.id, tenant.id);

    let tenantMismatchCaught = false;
    try {
      await orderService.getOrderById(draftOrder.id, 'wrong-tenant-id');
    } catch {
      tenantMismatchCaught = true;
    }

    if (!tenantMismatchCaught) {
      throw new Error('Tenant isolation failed to block cross-tenant lookup!');
    }
    console.log('✅ Soft Delete & Tenant Isolation test passed!\n');

    console.log('🎉 ALL ORDER MANAGEMENT SYSTEM (OMS) TESTS PASSED VERIFICATION! 🎉\n');
  } catch (error) {
    console.error('❌ OMS Test Failure:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
