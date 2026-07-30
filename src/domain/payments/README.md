# Payments Bounded Context

## Overview

The `payments` bounded context provides a vendor-neutral, provider-agnostic financial
transaction engine. It models payment intents, authorizations, captures, voids,
settlements, fraud checks, payment attempts, and receipts.

## Core Principles

- **Vendor Neutral**: Supports Stripe, PayPal, Adyen, Klarna, B2B invoicing, wire
  transfers, and custom gateways without leaking third-party SDKs into the domain.
- **Identifier-Only Coupling**: References order and customer identities by identifier
  value only — never embeds foreign aggregates.
- **Event-Driven Lifecycle**: State transitions emit immutable domain events.

## Core Components

| Kind | Name |
|------|------|
| Aggregate | `PaymentAggregate` |
| Value Objects | `PaymentIdentifier`, `TransactionIdentifier`, `PaymentToken`, `FraudCheck`, `PaymentReceipt` |
| Ports | `IPaymentGateway`, `IPaymentOrchestrator`, `IPaymentAuthorizationService`, `IPaymentValidationService`, `IPaymentReconciliationService` |
| Policies | `IPaymentPolicy`, `IFraudPolicy`, `IRetryPolicy` |
| Specifications | `PaymentAllowed`, `PaymentCapturable`, `PaymentRefundable`, `PaymentRetryAllowed` |
