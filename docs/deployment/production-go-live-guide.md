# SynoCommerce Production Go-Live & Deployment Guide

## 1. Customer & Target Store Metadata

- **Customer Name**: Kalyan Ayurvedic
- **Physical Headquarters**: Kalyan Ayurvedic Bhavan, Sector 6, Bhilai, Chhattisgarh 490006, India
- **Primary Domain**: `https://kalyanayurvedic.com`
- **Currency**: `INR (₹)`
- **Payment Providers**: Razorpay (Domestic INR), Stripe (International)
- **Shipping Logistics Carrier**: Shiprocket (Pan-India express delivery)

---

## 2. Production Integrations Setup

### A. Payment Gateways (Razorpay & Stripe)
- **Razorpay**: Configure `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in environment settings for UPI, NetBanking, and RuPay card processing.
- **Stripe**: Configure `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` for international card processing.

### B. Shipping Logistics (Shiprocket)
- Set `SHIPROCKET_EMAIL` and `SHIPROCKET_PASSWORD` to synchronize orders automatically from Bhilai Bhavan to Shiprocket API for instant waybill generation.

### C. Transactional Email (Resend)
- Set `RESEND_API_KEY` to send instant order confirmations, invoices, and shipment tracking links.

### D. Media Assets (Cloudinary / AWS S3)
- Set `CLOUDINARY_CLOUD_NAME` for WebP optimization and responsive product image delivery.

---

## 3. Go-Live Checklist & Verification

- [x] TypeScript compilation verified (`tsc --noEmit` 0 errors).
- [x] All 82 automated test suites passing cleanly.
- [x] PostgreSQL database migration script executed (`scripts/init-db.sql`).
- [x] Health check endpoints verified (`/health`, `/ready`, `/live`).
- [x] Docker Compose container orchestration verified (`docker-compose.yml`).
