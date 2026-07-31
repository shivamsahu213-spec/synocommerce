/**
 * Purchase Order (PO) & B2B Procurement Engine
 * @module modules/b2b/purchase-orders
 */

import { PurchaseOrderRecord } from './types';

export class PurchaseOrderEngine {
  private readonly _pos = new Map<string, PurchaseOrderRecord>();

  public createPurchaseOrder(companyId: string, poNumber: string, totalAmountInr: number, attachmentUrls: string[] = []): PurchaseOrderRecord {
    const poId = `po_${Date.now()}`;
    const record: PurchaseOrderRecord = {
      poId,
      poNumber,
      companyId,
      totalAmountInr,
      status: 'PENDING_APPROVAL',
      attachmentUrls,
      createdAt: new Date(),
    };

    this._pos.set(poId, record);
    return record;
  }

  public approvePurchaseOrder(poId: string): PurchaseOrderRecord {
    const po = this._pos.get(poId);
    if (!po) {
      throw new Error(`Purchase Order '${poId}' not found`);
    }

    po.status = 'APPROVED';
    return po;
  }
}
