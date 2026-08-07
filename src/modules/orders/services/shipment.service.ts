import { shipmentRepository, ShipmentRepository } from '../repositories/shipment.repository';
import { orderRepository, OrderRepository } from '../repositories/order.repository';
import { domainEventPublisher } from './event.service';
import { invalidateOrderCache } from '../utils/orderCache';
import { NotFoundError, ValidationError } from '../../../common/errors';
import { CreateShipmentDto } from '../dto/create-shipment.dto';
import { UpdateShipmentDto } from '../dto/update-shipment.dto';
import { ShipmentStatus, OrderStatus } from '@prisma/client';

export class ShipmentService {
  constructor(
    private repo: ShipmentRepository = shipmentRepository,
    private orderRepo: OrderRepository = orderRepository,
  ) {}

  async createShipment(tenantId: string, dto: CreateShipmentDto) {
    const order = await this.orderRepo.findOrderById(dto.orderId);
    if (!order) {
      throw new NotFoundError(`Order '${dto.orderId}' not found`);
    }

    if (order.tenantId !== tenantId) {
      throw new ValidationError('Tenant isolation mismatch');
    }

    const existing = await this.repo.findShipmentByOrderId(dto.orderId);
    if (existing) {
      throw new ValidationError(`Shipment for order '${dto.orderId}' already exists`);
    }

    const shipment = await this.repo.createShipment({
      orderId: dto.orderId,
      tenantId,
      carrier: dto.carrier,
      trackingNumber: dto.trackingNumber || null,
      labelUrl: dto.labelUrl || null,
      status: dto.status || ShipmentStatus.PENDING,
      estimatedDelivery: dto.estimatedDelivery ? new Date(dto.estimatedDelivery) : null,
      events: [
        {
          status: dto.status || ShipmentStatus.PENDING,
          description: 'Shipment created',
          timestamp: new Date().toISOString(),
        },
      ],
    });

    // Update order shipmentStatus & status
    await this.orderRepo.updateOrder(order.id, {
      shipmentStatus: dto.status || ShipmentStatus.PENDING,
      status: OrderStatus.PACKED,
    });

    await invalidateOrderCache(order.id, tenantId);

    return shipment;
  }

  async updateShipment(id: string, tenantId: string, dto: UpdateShipmentDto) {
    const shipment = await this.repo.findShipmentById(id);
    if (!shipment) {
      throw new NotFoundError(`Shipment '${id}' not found`);
    }

    if (shipment.tenantId !== tenantId) {
      throw new ValidationError('Tenant isolation mismatch');
    }

    const currentEvents = (shipment.events as any[]) || [];
    let updatedEvents = [...currentEvents];

    if (dto.events && Array.isArray(dto.events)) {
      updatedEvents = [...updatedEvents, ...dto.events];
    } else if (dto.status && dto.status !== shipment.status) {
      updatedEvents.push({
        status: dto.status,
        description: `Shipment status updated to ${dto.status}`,
        timestamp: new Date().toISOString(),
      });
    }

    const updateData: any = {
      carrier: dto.carrier !== undefined ? dto.carrier : shipment.carrier,
      trackingNumber: dto.trackingNumber !== undefined ? dto.trackingNumber : shipment.trackingNumber,
      labelUrl: dto.labelUrl !== undefined ? dto.labelUrl : shipment.labelUrl,
      status: dto.status !== undefined ? dto.status : shipment.status,
      estimatedDelivery: dto.estimatedDelivery ? new Date(dto.estimatedDelivery) : shipment.estimatedDelivery,
      events: updatedEvents,
    };

    if (dto.status === ShipmentStatus.SHIPPED && !shipment.shippedAt) {
      updateData.shippedAt = new Date();
    }
    if (dto.status === ShipmentStatus.DELIVERED && !shipment.deliveredAt) {
      updateData.deliveredAt = new Date();
    }

    const updated = await this.repo.updateShipment(id, updateData);

    // Sync status to Order
    const orderUpdate: any = {};
    if (dto.status) orderUpdate.shipmentStatus = dto.status;

    if (dto.status === ShipmentStatus.SHIPPED) {
      orderUpdate.status = OrderStatus.SHIPPED;
      orderUpdate.shippedAt = new Date();
      await domainEventPublisher.publish('OrderShipped', tenantId, shipment.orderId, {
        trackingNumber: updateData.trackingNumber,
        carrier: updateData.carrier,
      });
    } else if (dto.status === ShipmentStatus.DELIVERED) {
      orderUpdate.status = OrderStatus.DELIVERED;
      orderUpdate.deliveredAt = new Date();
      await domainEventPublisher.publish('OrderDelivered', tenantId, shipment.orderId, {
        deliveredAt: orderUpdate.deliveredAt,
      });
    }

    if (Object.keys(orderUpdate).length > 0) {
      await this.orderRepo.updateOrder(shipment.orderId, orderUpdate);
    }

    await invalidateOrderCache(shipment.orderId, tenantId);

    return updated;
  }

  async getShipmentById(id: string, tenantId: string) {
    const shipment = await this.repo.findShipmentById(id);
    if (!shipment || shipment.tenantId !== tenantId) {
      throw new NotFoundError(`Shipment '${id}' not found`);
    }
    return shipment;
  }

  async getShipmentByOrderId(orderId: string, tenantId: string) {
    const shipment = await this.repo.findShipmentByOrderId(orderId);
    if (!shipment || shipment.tenantId !== tenantId) {
      throw new NotFoundError(`Shipment for order '${orderId}' not found`);
    }
    return shipment;
  }
}

export const shipmentService = new ShipmentService();
