import { CheckoutSessionAggregate } from '../aggregates';

export interface ICheckoutService {
  createSession(cartId: string, customerId?: string): Promise<CheckoutSessionAggregate>;
  placeOrder(sessionId: string): Promise<string>;
}
