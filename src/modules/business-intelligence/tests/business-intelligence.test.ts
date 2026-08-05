/**
 * Enterprise Business Intelligence Platform Test Suite
 * @module src/modules/business-intelligence/tests/business-intelligence.test
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { SynoBusinessIntelligenceEngine } from '../bi-engine';

test('Enterprise Business Intelligence Platform Engine', async (t) => {
  const engine = new SynoBusinessIntelligenceEngine();

  await t.test('Calculates executive KPIs (MRR, ARR, LTV, CAC, Gross Margin)', () => {
    const kpis = engine.calculateKpis();
    assert.equal(kpis.length, 7);

    const mrr = kpis.find((k) => k.key === 'mrr');
    assert.equal(mrr?.value, 48920.0);
    assert.equal(mrr?.growthPercentage, 12.4);

    const ltvCac = kpis.find((k) => k.key === 'ltv_cac_ratio');
    assert.equal(ltvCac?.value, 9.33);
  });

  await t.test('Generates 30-day AI Demand Forecast trend points', () => {
    const forecast = engine.generateDemandForecast(30);
    assert.equal(forecast.length, 30);
    assert.ok(forecast[0]!.forecastedUsd > 0);
    assert.ok(forecast[0]!.lowerConfidenceUsd < forecast[0]!.forecastedUsd);
  });

  await t.test('Detects statistical anomalies in metric data points', () => {
    const dataPoints = [100, 105, 98, 102, 550, 101]; // 550 is anomaly
    const anomalies = engine.detectAnomalies(dataPoints);
    assert.equal(anomalies.length, 1);
    assert.equal(anomalies[0]!.severity, 'HIGH');
  });

  await t.test('Builds Executive CEO Overview Dashboard layout', () => {
    const dash = engine.buildExecutiveDashboard();
    assert.equal(dash.role, 'EXECUTIVE');
    assert.equal(dash.widgets.length, 2);
  });

  await t.test('Exports report dataset into CSV format', () => {
    const sampleData = [
      { date: '2026-08-01', revenue: 1500, orders: 42 },
      { date: '2026-08-02', revenue: 1800, orders: 51 },
    ];
    const csv = engine.exportReportCsv(sampleData);
    assert.ok(csv.startsWith('date,revenue,orders'));
    assert.ok(csv.includes('2026-08-01,1500,42'));
  });

  await t.test('Schedules email report execution', () => {
    const sched = engine.scheduleEmailReport('rep_monthly_exec', 'ceo@kalyanlab.com', '0 8 1 * *');
    assert.equal(sched.scheduled, true);
    assert.equal(sched.reportId, 'rep_monthly_exec');
  });
});
