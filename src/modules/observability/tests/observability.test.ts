/**
 * Enterprise Observability & SRE Platform Test Suite
 * @module modules/observability/tests/observability.test
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  OpenTelemetryTracerEngine,
  PrometheusMetricsEngine,
  StructuredLoggerEngine,
  IncidentAlertingEngine,
} from '../index';

test('Enterprise Observability & SRE Platform', async (t) => {
  const tracer = new OpenTelemetryTracerEngine();
  const metrics = new PrometheusMetricsEngine();
  const logger = new StructuredLoggerEngine();
  const alerting = new IncidentAlertingEngine();

  await t.test('Starts OpenTelemetry trace and records child spans with duration', () => {
    const { traceId, rootSpanId } = tracer.startTrace('CheckoutFlow', { tenantId: 'tenant_bhilai' });
    assert.ok(traceId.startsWith('trc_'));

    const childSpan = tracer.recordSpan(traceId, 'AuthorizeStripePayment', 45.2, rootSpanId, { gateway: 'stripe' });
    assert.equal(childSpan.parentSpanId, rootSpanId);

    const spans = tracer.getTraceSpans(traceId);
    assert.equal(spans.length, 2);
  });

  await t.test('Records Prometheus metrics points and exports Prometheus format text', () => {
    metrics.recordMetric('syno_orders_total', 'COUNTER', 1, { storeId: 'kalyan_ayurvedic' });
    const text = metrics.exportPrometheusMetricsText();
    assert.ok(text.includes('syno_orders_total{storeId="kalyan_ayurvedic"} 1'));
  });

  await t.test('Masks sensitive PII data (passwords, tokens, credit card numbers) in JSON logs', () => {
    const log = logger.log('INFO', 'trc_1001', 'User Login Attempt', {
      userEmail: 'user@example.com',
      userPassword: 'SecretPassword123!',
      creditCardNumber: '4111111111114242',
    });

    assert.equal(log.context.userPassword, '[REDACTED_SECRET]');
    assert.equal(log.context.creditCardNumber, 'xxxx-xxxx-xxxx-4242');
    assert.equal(log.context.userEmail, 'user@example.com');
  });

  await t.test('Evaluates SLO violation rules and declares/resolves SEV1 Incident', () => {
    const sloEval = alerting.evaluateSloRule(2500, 6.2); // > 2000ms latency, > 5% errors
    assert.equal(sloEval.isViolated, true);
    assert.equal(sloEval.recommendedSeverity, 'SEV1_CRITICAL');

    const inc = alerting.declareIncident('High API Latency & Error Rate In Bhilai Node', 'SEV1_CRITICAL');
    assert.equal(inc.status, 'INVESTIGATING');

    const resolved = alerting.resolveIncident(inc.incidentId);
    assert.equal(resolved.status, 'RESOLVED');
  });
});
