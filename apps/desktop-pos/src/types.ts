/**
 * Enterprise Desktop POS Types & Schemas
 * @module apps/desktop-pos/src/types
 */

export type PosPaymentMethod = 'CASH' | 'CARD' | 'UPI' | 'RAZORPAY' | 'STRIPE' | 'GIFT_CARD' | 'LOYALTY_POINTS';

export interface PosHardwareDevice {
  deviceId: string;
  name: string;
  type: 'THERMAL_PRINTER' | 'BARCODE_SCANNER' | 'CASH_DRAWER' | 'CUSTOMER_DISPLAY' | 'WEIGHT_SCALE';
  connection: 'USB' | 'BLUETOOTH' | 'RS232' | 'ETHERNET';
  status: 'CONNECTED' | 'DISCONNECTED' | 'ERROR';
}

export interface PosLineItem {
  sku: string;
  name: string;
  quantity: number;
  unitPriceUsd: number;
  discountUsd?: number | undefined;
  taxUsd: number;
  subtotalUsd: number;
}

export interface PosTransaction {
  transactionId: string;
  registerId: string;
  cashierId: string;
  storeId: string;
  items: PosLineItem[];
  paymentSplit: { method: PosPaymentMethod; amountUsd: number }[];
  totalAmountUsd: number;
  changeDueUsd: number;
  timestamp: Date;
  status: 'COMPLETED' | 'REFUNDED' | 'EXCHANGED';
}

export interface RegisterSession {
  sessionId: string;
  registerId: string;
  cashierName: string;
  openingFloatUsd: number;
  closingCashUsd?: number | undefined;
  totalSalesUsd: number;
  transactionCount: number;
  status: 'OPEN' | 'CLOSED';
  openedAt: Date;
  closedAt?: Date | undefined;
}

export interface XZReportData {
  reportType: 'X_REPORT' | 'Z_REPORT';
  registerId: string;
  generatedAt: Date;
  totalCashSalesUsd: number;
  totalCardSalesUsd: number;
  totalUpiSalesUsd: number;
  totalTaxCollectedUsd: number;
  grandTotalSalesUsd: number;
}
