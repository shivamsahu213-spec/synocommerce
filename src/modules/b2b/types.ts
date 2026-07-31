/**
 * Enterprise B2B Commerce Type Definitions
 * @module modules/b2b/types
 */

export type B2bPaymentTerms = 'DUE_ON_RECEIPT' | 'NET_15' | 'NET_30' | 'NET_45' | 'NET_60';
export type RfqStatus = 'SUBMITTED' | 'UNDER_REVIEW' | 'COUNTER_OFFERED' | 'ACCEPTED' | 'REJECTED';
export type PurchaseOrderStatus = 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED' | 'FULFILLED';

export interface CompanyAccountRecord {
  companyId: string;
  companyName: string;
  parentCompanyId?: string | undefined;
  taxRegistrationNumber: string;
  creditLimitInr: number;
  outstandingBalanceInr: number;
  paymentTerms: B2bPaymentTerms;
  creditHold: boolean;
}

export interface B2bContractPrice {
  companyId: string;
  sku: string;
  contractPriceInr: number;
  minQuantity: number;
}

export interface RfqRecord {
  rfqId: string;
  companyId: string;
  requestedByEmail: string;
  sku: string;
  quantity: number;
  targetPriceInr: number;
  offeredPriceInr?: number | undefined;
  status: RfqStatus;
  submittedAt: Date;
}

export interface PurchaseOrderRecord {
  poId: string;
  poNumber: string;
  companyId: string;
  totalAmountInr: number;
  status: PurchaseOrderStatus;
  attachmentUrls: string[];
  createdAt: Date;
}
