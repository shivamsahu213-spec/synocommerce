/**
 * Domain Layer Root Exports - Sprint 1, Sprint 2 & Sprint 3 Bounded Contexts
 * @module domain
 */

// Sprint 1 Domain Layer
export * from './brands';
export * from './catalog';
export * from './categories';
export * from './pricing';
export * from './products';
export * from './shared-domain';

// Sprint 2 Commerce Transaction Domain Layer
export * from './addresses';
export * from './cart';
export * from './checkout';
export * from './customers';
export * from './inventory';
export * from './orders';

// Sprint 3 Financial & Fulfillment Domain Layer
export * from './fulfillment';
export * from './invoicing';
export * from './payments';
export * from './refunds';
export * from './returns';
export * from './shipping';
export * from './tax';
