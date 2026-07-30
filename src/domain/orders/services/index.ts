import { OrderAggregate } from '../aggregates';

export interface IOrderService {
  cancelOrder(orderId: string, reason: string): Promise<void>;
  processRefund(orderId: string, amount: number): Promise<void>;
}
