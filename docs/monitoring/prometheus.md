# Prometheus Metrics Integration

## Overview

SynoCommerce exposes an OpenTelemetry-compatible `/metrics` endpoint formatted for Prometheus metric scraping.

---

## Configuration

Set environment variables in `.env.production`:

```env
PROMETHEUS_METRICS_PATH=/metrics
```

---

## Metric Format Example

```text
syno_http_requests_total{method="POST",status="200"} 1050
syno_checkout_duration_seconds{flow="cart_to_order"} 0.24
```
