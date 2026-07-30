# Checkout Bounded Context

## Overview
The `checkout` bounded context manages step-by-step order creation sessions, shipping and billing selection, tax calculations, validation rules, and checkout completion events.

## Core Components
- **CheckoutSessionAggregate**: Manages checkout state machine (Information -> Shipping -> Billing -> Review -> Completed).
- **ICheckoutService**: Domain service orchestrating cart conversion and order generation.
