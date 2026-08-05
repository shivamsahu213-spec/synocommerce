/**
 * Enterprise Desktop POS Register Controller
 * @module apps/desktop-pos/src/core/register-controller
 */

import { PosHardwareManager } from '../hardware/hardware-manager';
import { PosOfflineSyncEngine } from '../offline/pos-offline-sync';
import {
  PosLineItem,
  PosPaymentMethod,
  PosTransaction,
  RegisterSession,
  XZReportData,
} from '../types';

export class PosRegisterController {
  public hardwareManager: PosHardwareManager;
  public offlineSync: PosOfflineSyncEngine;
  private activeSession: RegisterSession | null = null;
  private transactions: PosTransaction[] = [];

  constructor() {
    this.hardwareManager = new PosHardwareManager();
    this.offlineSync = new PosOfflineSyncEngine();
  }

  public openRegisterSession(registerId: string, cashierName: string, openingFloatUsd: number): RegisterSession {
    this.activeSession = {
      sessionId: `pos_sess_${Date.now()}`,
      registerId,
      cashierName,
      openingFloatUsd,
      totalSalesUsd: 0,
      transactionCount: 0,
      status: 'OPEN',
      openedAt: new Date(),
    };
    this.hardwareManager.kickCashDrawer();
    return this.activeSession;
  }

  public processCheckout(
    items: PosLineItem[],
    paymentSplit: { method: PosPaymentMethod; amountUsd: number }[],
    tenderedCashUsd: number = 0
  ): PosTransaction {
    if (!this.activeSession || this.activeSession.status !== 'OPEN') {
      throw new Error('POS_REGISTER_CLOSED');
    }

    const totalAmountUsd = items.reduce((acc, i) => acc + i.subtotalUsd, 0);
    const totalPaidUsd = paymentSplit.reduce((acc, p) => acc + p.amountUsd, 0);
    const changeDueUsd = Math.max(0, tenderedCashUsd - totalAmountUsd);

    if (totalPaidUsd < totalAmountUsd) {
      throw new Error('INSUFFICIENT_PAYMENT_AMOUNT');
    }

    const tx: PosTransaction = {
      transactionId: `TX_${Date.now()}_${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      registerId: this.activeSession.registerId,
      cashierId: this.activeSession.cashierName,
      storeId: 'store_bhilai_01',
      items,
      paymentSplit,
      totalAmountUsd,
      changeDueUsd,
      timestamp: new Date(),
      status: 'COMPLETED',
    };

    this.transactions.push(tx);
    this.activeSession.totalSalesUsd += totalAmountUsd;
    this.activeSession.transactionCount += 1;

    // Trigger hardware peripherals
    if (paymentSplit.some((p) => p.method === 'CASH')) {
      this.hardwareManager.kickCashDrawer();
    }
    this.hardwareManager.printReceipt(tx);
    this.hardwareManager.updateCustomerDisplay('THANK YOU!', `TOTAL: $${totalAmountUsd.toFixed(2)}`);

    return tx;
  }

  public generateXZReport(type: 'X_REPORT' | 'Z_REPORT'): XZReportData {
    if (!this.activeSession) throw new Error('NO_ACTIVE_POS_SESSION');

    const totalCash = this.transactions
      .flatMap((t) => t.paymentSplit)
      .filter((p) => p.method === 'CASH')
      .reduce((acc, p) => acc + p.amountUsd, 0);

    const totalCard = this.transactions
      .flatMap((t) => t.paymentSplit)
      .filter((p) => p.method === 'CARD' || p.method === 'RAZORPAY' || p.method === 'STRIPE')
      .reduce((acc, p) => acc + p.amountUsd, 0);

    const totalUpi = this.transactions
      .flatMap((t) => t.paymentSplit)
      .filter((p) => p.method === 'UPI')
      .reduce((acc, p) => acc + p.amountUsd, 0);

    const grandTotal = this.activeSession.totalSalesUsd;

    if (type === 'Z_REPORT') {
      this.activeSession.status = 'CLOSED';
      this.activeSession.closedAt = new Date();
    }

    return {
      reportType: type,
      registerId: this.activeSession.registerId,
      generatedAt: new Date(),
      totalCashSalesUsd: totalCash,
      totalCardSalesUsd: totalCard,
      totalUpiSalesUsd: totalUpi,
      totalTaxCollectedUsd: Number((grandTotal * 0.08).toFixed(2)),
      grandTotalSalesUsd: grandTotal,
    };
  }

  public authorizeManagerApproval(pin: string): boolean {
    return pin === '9912'; // Manager PIN authorization override
  }

  public getActiveSession(): RegisterSession | null {
    return this.activeSession;
  }
}
