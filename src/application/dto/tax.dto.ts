/**
 * Tax & Invoice DTO Contracts
 * @module application/dto/tax.dto
 */

export interface CalculateTaxInput {
  readonly countryCode: string;
  readonly stateCode?: string | undefined;
  readonly postalCode?: string | undefined;
  readonly items: readonly {
    readonly sku: string;
    readonly amount: number;
    readonly categoryCode: string;
  }[];
}

export interface TaxCalculationDTO {
  readonly totalTax: number;
  readonly breakdowns: readonly {
    readonly jurisdiction: string;
    readonly rate: number;
    readonly amount: number;
  }[];
}

export interface GenerateInvoiceInput {
  readonly orderId: string;
}

export interface InvoiceDTO {
  readonly id: string;
  readonly invoiceNumber: string;
  readonly orderId: string;
  readonly status: string;
  readonly grandTotal: number;
  readonly issuedAt: Date;
}
