/**
 * Application Infrastructure Port Contracts
 *
 * Hexagonal architecture ports bridging Application Use Cases to Infrastructure adapters.
 *
 * @module application/ports/ports.interface
 */

import { AuthorizePaymentInput, CalculateTaxInput,CapturePaymentInput, CreateShipmentInput, PaymentDTO, ShipmentDTO, TaxCalculationDTO } from '../dto';
import { Result } from '../results';

export interface IPaymentPort {
  authorize(input: AuthorizePaymentInput): Promise<Result<PaymentDTO>>;
  capture(input: CapturePaymentInput): Promise<Result<PaymentDTO>>;
  refund(paymentId: string, amount: number, reason?: string): Promise<Result<void>>;
}

export interface IShippingPort {
  createShipment(input: CreateShipmentInput): Promise<Result<ShipmentDTO>>;
  generateLabel(shipmentId: string): Promise<Result<{ labelUrl: string; trackingNumber: string }>>;
}

export interface ITaxPort {
  calculateTax(input: CalculateTaxInput): Promise<Result<TaxCalculationDTO>>;
}

export interface INotificationPort {
  sendNotification(recipientId: string, templateId: string, payload: Record<string, unknown>): Promise<Result<void>>;
}

export interface IEmailPort {
  sendEmail(to: string, subject: string, templateName: string, variables: Record<string, unknown>): Promise<Result<void>>;
}

export interface ISMSPort {
  sendSMS(phoneNumber: string, message: string): Promise<Result<void>>;
}

export interface IAnalyticsPort {
  trackEvent(eventName: string, properties: Record<string, unknown>): Promise<void>;
}

export interface ISearchPort {
  indexDocument(indexName: string, documentId: string, document: Record<string, unknown>): Promise<void>;
  search<T>(indexName: string, query: string, filters?: Record<string, unknown>): Promise<readonly T[]>;
}

export interface IStoragePort {
  uploadFile(bucketName: string, filePath: string, content: Uint8Array): Promise<string>;
  getDownloadUrl(bucketName: string, filePath: string): Promise<string>;
}
