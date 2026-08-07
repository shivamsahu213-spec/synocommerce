import { prisma } from '../../../database/prisma';
import { InvoiceStatus, Invoice } from '@prisma/client';
import { NotFoundError } from '../../../common/errors';

export class InvoiceService {
  /**
   * Generate or retrieve invoice metadata snapshot for an order.
   */
  async generateInvoice(orderId: string, tenantId: string): Promise<Invoice> {
    const existing = await prisma.invoice.findUnique({
      where: { orderId },
    });

    if (existing) {
      return existing;
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) {
      throw new NotFoundError(`Order '${orderId}' not found`);
    }

    const invoiceNumber = `INV-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;

    const billingAddressSnapshot = (order.billingAddress as any) || (order.shippingAddress as any) || {};
    const shippingAddressSnapshot = (order.shippingAddress as any) || {};
    const taxBreakdown = {
      taxAmount: Number(order.taxAmount),
      subtotal: Number(order.subtotal),
      totalAmount: Number(order.totalAmount),
    };

    return prisma.invoice.create({
      data: {
        orderId: order.id,
        tenantId,
        invoiceNumber,
        status: InvoiceStatus.ISSUED,
        billingAddressSnapshot,
        shippingAddressSnapshot,
        taxBreakdown,
        issuedAt: new Date(),
      },
    });
  }

  async getInvoiceByOrderId(orderId: string): Promise<Invoice | null> {
    return prisma.invoice.findUnique({
      where: { orderId },
      include: { order: true },
    });
  }
}

export const invoiceService = new InvoiceService();
