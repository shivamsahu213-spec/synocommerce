/**
 * Domain Layer Root Exports - Sprint 1, Sprint 2 & Sprint 3 Bounded Contexts
 * @module domain
 */

// Sprint 1 Domain Layer
export * from './shared-domain';
export * from './catalog';
export * from './categories';
export * from './brands';
export * from './products';
export * from './pricing';

// Sprint 2 Commerce Transaction Domain Layer
export * from './inventory';
export * from './cart';
export * from './checkout';
export * from './orders';
export * from './customers';
export * from './addresses';

// Sprint 3 Financial & Fulfillment Domain Layer
export * from './payments';
export * from './shipping';
export * from './fulfillment';
export * from './tax';
export * from './returns';
export * from './refunds';
export * from './invoicing';
