import { prisma } from '../../../database/prisma';
import { pricingService, PricingService, PricingBreakdownSnapshot, LineItemPricingInput } from './pricing.service';
import { orderRepository, OrderRepository } from '../repositories/order.repository';
import { domainEventPublisher } from './event.service';
import { NotFoundError, ValidationError } from '../../../common/errors';
import { CheckoutDto } from '../dto/checkout.dto';
import { OrderStatus, Currency } from '@prisma/client';

export class CheckoutService {
  constructor(
    private pricingEng: PricingService = pricingService,
    private orderRepo: OrderRepository = orderRepository,
  ) {}

  async processCheckout(tenantId: string, storeId: string, dto: CheckoutDto, customerId?: string) {
    const lineItemInputs: LineItemPricingInput[] = [];

    for (const item of dto.items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
        include: { variants: true },
      });

      if (!product || !product.isActive || product.deletedAt) {
        throw new NotFoundError(`Product '${item.productId}' is not available or has been deleted`);
      }

      let variant: any | null = null;
      let unitPrice = Number(product.price);
      let title = product.name;
      let sku = product.sku;

      if (item.variantId) {
        variant = product.variants.find((v) => v.id === item.variantId);
        if (!variant || !variant.isActive || variant.deletedAt) {
          throw new NotFoundError(`Variant '${item.variantId}' is not available`);
        }
        if (variant.price) unitPrice = Number(variant.price);
        if (variant.sku) sku = variant.sku;
        title = `${product.name} - ${variant.color || ''} ${variant.size || ''}`.trim();
      }

      lineItemInputs.push({
        productId: product.id,
        variantId: variant?.id,
        title,
        sku,
        quantity: item.quantity,
        unitPrice,
        productMetadata: {
          brandId: product.brandId,
          barcode: variant?.barcode || product.barcode,
          currency: product.currency,
        },
      });
    }

    const pricingParams: any = {
      tenantId,
      storeId,
      items: lineItemInputs,
      shippingAddress: {
        country: dto.shippingAddress.country,
        ...(dto.shippingAddress.region ? { region: dto.shippingAddress.region } : {}),
      },
    };
    if (dto.couponCode) pricingParams.couponCode = dto.couponCode;
    if (customerId) pricingParams.customerId = customerId;

    const pricing: PricingBreakdownSnapshot = await this.pricingEng.calculatePricing(pricingParams);

    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randStr = Math.floor(1000 + Math.random() * 9000).toString();
    const orderNumber = `ORD-${dateStr}-${randStr}`;

    const orderData: any = {
      orderNumber,
      tenantId,
      storeId,
      customerId: customerId || null,
      customerEmail: dto.customerEmail || null,
      customerPhone: dto.customerPhone || null,
      status: OrderStatus.DRAFT,
      currency: (dto.currency as Currency) || Currency.USD,
      subtotal: pricing.subtotal,
      discountAmount: pricing.discountAmount,
      shippingAmount: pricing.shippingAmount,
      taxAmount: pricing.taxAmount,
      totalAmount: pricing.totalAmount,
      couponCode: pricing.couponCode || null,
      couponId: pricing.couponId || null,
      shippingAddress: dto.shippingAddress,
      billingAddress: dto.billingAddress || dto.shippingAddress,
      items: {
        create: pricing.lineItems.map((li) => ({
          productId: li.productId,
          variantId: li.variantId || null,
          title: li.title,
          sku: li.sku || null,
          quantity: li.quantity,
          unitPrice: li.unitPrice,
          discountAmount: li.discountAmount,
          taxAmount: li.taxAmount,
          totalPrice: li.totalPrice,
          productMetadata: li.productMetadata || null,
        })),
      },
    };

    const draftOrder = await this.orderRepo.createOrder(orderData);

    await domainEventPublisher.publish('OrderCreated', tenantId, draftOrder.id, {
      orderNumber: draftOrder.orderNumber,
      totalAmount: draftOrder.totalAmount,
      customerId,
    });

    return {
      order: draftOrder,
      pricing,
    };
  }
}

export const checkoutService = new CheckoutService();
