/**
 * Payments Domain Types
 *
 * @module domain/payments/types
 */

export type PaymentAction = 'AUTHORIZE' | 'CAPTURE' | 'VOID' | 'REFUND' | 'SETTLE';

export type PaymentCaptureMode = 'AUTH_CAPTURE' | 'SALE' | 'MANUAL';
