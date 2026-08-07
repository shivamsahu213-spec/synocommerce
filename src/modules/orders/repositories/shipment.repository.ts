import { BaseRepository } from '../../../database/repository/base.repository';
import { Shipment, Prisma } from '@prisma/client';

export class ShipmentRepository extends BaseRepository<Shipment> {
  protected model = 'shipment' as const;

  async createShipment(data: any): Promise<any> {
    return this.client.shipment.create({
      data,
      include: {
        order: true,
      },
    });
  }

  async findShipmentById(id: string): Promise<any | null> {
    return this.client.shipment.findUnique({
      where: { id },
      include: { order: true },
    });
  }

  async findShipmentByOrderId(orderId: string): Promise<any | null> {
    return this.client.shipment.findUnique({
      where: { orderId },
      include: { order: true },
    });
  }

  async updateShipment(id: string, data: any): Promise<any> {
    return this.client.shipment.update({
      where: { id },
      data,
      include: { order: true },
    });
  }
}

export const shipmentRepository = new ShipmentRepository();
