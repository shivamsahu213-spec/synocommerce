/**
 * Enterprise APM, Monitoring & Incident Platform Test Suite
 * @module src/integrations/tests/monitoring.test
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {
  HealthCheckerEngine,
  MetricsExporterEngine,
  IncidentManagerEngine,
  MonitoringSecurityEngine,
} from '../monitoring';

test('Enterprise APM, Monitoring & Incident Platform', async (t) => {
  const healthChecker = new HealthCheckerEngine();
  const metrics = new MetricsExporterEngine();
  const incidentManager = new IncidentManagerEngine();

  await t.test('Executes system health check across all 10 components', async () => {
    const results = await healthChecker.runFullSystemHealthCheck();
    assert.equal(results.length, 10);
    assert.ok(results.every((r) => r.status === 'HEALTHY'));
    assert.ok(results.some((r) => r.component === 'DATABASE'));
    assert.ok(results.some((r) => r.component === 'PAYMENTS'));
  });

  await t.test('Records custom metrics and exports Prometheus text format', () => {
    metrics.recordMetric('http_requests_total', 1050, 'counter', { method: 'POST', status: '200' });
    metrics.recordMetric('checkout_duration_seconds', 0.24, 'histogram', { flow: 'cart_to_order' });

    const prometheusText = metrics.exportPrometheusFormat();
    assert.ok(prometheusText.includes('syno_http_requests_total{method="POST",status="200"} 1050'));
    assert.ok(prometheusText.includes('syno_checkout_duration_seconds{flow="cart_to_order"} 0.24'));
  });

  await t.test('Manages incident lifecycle: Creation -> Ack -> Resolution & SLA calculation', async () => {
    const inc = incidentManager.createIncident(
      'Database Connection Pool Exhaustion',
      'SEV1_CRITICAL',
      ['DATABASE', 'PAYMENTS'],
      'High traffic spike during flash sale'
    );

    assert.ok(inc.incidentId.startsWith('inc_'));
    assert.equal(inc.status, 'OPEN');

    const ackSuccess = incidentManager.acknowledgeIncident(inc.incidentId, 'SRE Lead investigating pool size');
    assert.equal(ackSuccess, true);
    assert.equal(incidentManager.getIncident(inc.incidentId)?.status, 'ACKNOWLEDGED');

    const resSuccess = incidentManager.resolveIncident(inc.incidentId, 'Scaled connection pool to 100 connections');
    assert.equal(resSuccess, true);
    assert.equal(incidentManager.getIncident(inc.incidentId)?.status, 'RESOLVED');

    const sla = incidentManager.calculateSlaMetrics();
    assert.equal(sla.availabilityPercentage, 99.99);
    assert.equal(sla.isSloMet, true);
  });

  await t.test('Dispatches critical alerts to Slack, Email, and PagerDuty', async () => {
    const alertResult = await incidentManager.dispatchAlert({
      alertId: 'alt_99182',
      title: 'High CPU Usage Alert',
      severity: 'SEV2_HIGH',
      source: 'K8s Pod Metrics',
      channels: ['SLACK', 'PAGERDUTY', 'EMAIL'],
      message: 'Pod CPU exceeds 90% threshold for 5m',
      timestamp: new Date(),
    });

    assert.equal(alertResult.success, true);
    assert.equal(alertResult.channelsNotified.length, 3);
  });

  await t.test('Verifies HMAC webhook signatures and RBAC role authorizations', () => {
    const rawPayload = JSON.stringify({ event: 'alert_triggered' });
    const secret = 'monitoring_secret';
    const sig = crypto.createHmac('sha256', secret).update(rawPayload).digest('hex');

    const isValid = MonitoringSecurityEngine.verifyWebhookSignature(rawPayload, sig, secret);
    assert.equal(isValid, true);

    const isSreAuthorized = MonitoringSecurityEngine.authorizeUserRole('SRE_ADMIN', 'SRE_ADMIN');
    assert.equal(isSreAuthorized, true);

    const isCustomerDenied = MonitoringSecurityEngine.authorizeUserRole('CUSTOMER', 'SRE_ADMIN');
    assert.equal(isCustomerDenied, false);
  });
});
