/**
 * Corporate Accounts, Credit Limit & Payment Terms Engine
 * @module modules/b2b/company-engine
 */

import { CompanyAccountRecord, B2bPaymentTerms } from './types';

export class B2bCompanyEngine {
  private readonly _companies = new Map<string, CompanyAccountRecord>();

  public createCompanyAccount(
    companyId: string,
    companyName: string,
    taxRegistrationNumber: string,
    creditLimitInr: number,
    paymentTerms: B2bPaymentTerms = 'NET_30'
  ): CompanyAccountRecord {
    const record: CompanyAccountRecord = {
      companyId,
      companyName,
      taxRegistrationNumber,
      creditLimitInr,
      outstandingBalanceInr: 0,
      paymentTerms,
      creditHold: false,
    };

    this._companies.set(companyId, record);
    return record;
  }

  public validateCreditAvailability(companyId: string, orderAmountInr: number): { isApproved: boolean; availableCreditInr: number } {
    const company = this._companies.get(companyId);
    if (!company) {
      throw new Error(`Company Account '${companyId}' not found`);
    }

    if (company.creditHold) {
      return { isApproved: false, availableCreditInr: 0 };
    }

    const availableCreditInr = company.creditLimitInr - company.outstandingBalanceInr;
    const isApproved = availableCreditInr >= orderAmountInr;

    return { isApproved, availableCreditInr };
  }
}
