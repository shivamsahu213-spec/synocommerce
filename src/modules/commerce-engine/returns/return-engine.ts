/**
 * Return & RMA Engine Module
 * @module modules/commerce-engine/returns/return-engine
 */

import crypto from 'node:crypto';
import { PaymentEngine } from '../payments';

export type ReturnStatus = 'REQUESTED' | 'APPROVED' | 'RECEIVED' | 'INSPECTED' | 'REFUNDED' | 'REJECTED';

export interface ReturnRequest {
  readonly rmaNumber: string;
  readonly orderId: string;
  readonly sku: string;
  readonly quantity: number;
  readonly reason: string;
  status: ReturnStatus;
  refundAmount?: number | undefined;
}

export class ReturnEngine {
  private readonly _returns = new Map<string, ReturnRequest>();

  constructor(private readonly _paymentEngine: PaymentEngine) {}

  public requestReturn(orderId: string, sku: string, quantity: number, reason: string): ReturnRequest {
    const rmaNumber = `RMA-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    const req: ReturnRequest = {
      rmaNumber,
      orderId,
      sku,
      quantity,
      reason,
      status: 'REQUESTED',
    };
    this._returns.set(rmaNumber, req);
    return req;
  }

  public async approveAndRefund(rmaNumber: string, refundAmount: number, transactionId: string): Promise<ReturnRequest> {
    const req = this._returns.get(rmaNumber);
    if (!req) {
      throw new Error(`RMA '${rmaNumber}' not found`);
    }

    req.status = 'APPROVED';
    await this._paymentEngine.refundPayment(transactionId, refundAmount);
    req.refundAmount = refundAmount;
    req.status = 'REFUNDED';

    return req;
  }
}
