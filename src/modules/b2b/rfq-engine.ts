/**
 * Request For Quote (RFQ) Negotiation Engine
 * @module modules/b2b/rfq-engine
 */

import { RfqRecord } from './types';

export class RfqNegotiationEngine {
  private readonly _rfqs = new Map<string, RfqRecord>();

  public submitRfq(companyId: string, requestedByEmail: string, sku: string, quantity: number, targetPriceInr: number): RfqRecord {
    const rfqId = `rfq_${Date.now()}`;
    const record: RfqRecord = {
      rfqId,
      companyId,
      requestedByEmail,
      sku,
      quantity,
      targetPriceInr,
      status: 'SUBMITTED',
      submittedAt: new Date(),
    };

    this._rfqs.set(rfqId, record);
    return record;
  }

  public submitSupplierCounterOffer(rfqId: string, offeredPriceInr: number): RfqRecord {
    const rfq = this._rfqs.get(rfqId);
    if (!rfq) {
      throw new Error(`RFQ '${rfqId}' not found`);
    }

    rfq.offeredPriceInr = offeredPriceInr;
    rfq.status = 'COUNTER_OFFERED';
    return rfq;
  }

  public acceptRfqQuote(rfqId: string): RfqRecord {
    const rfq = this._rfqs.get(rfqId);
    if (!rfq) {
      throw new Error(`RFQ '${rfqId}' not found`);
    }

    rfq.status = 'ACCEPTED';
    return rfq;
  }
}
