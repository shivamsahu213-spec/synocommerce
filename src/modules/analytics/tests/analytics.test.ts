/**
 * Enterprise Commerce Intelligence & Analytics Platform Test Suite
 * @module src/modules/analytics/tests/analytics.test
 */

import assert from 'node:assert/strict';
import test from 'node:test';

import {
  AnalyticsEngineProcessor,
  AttributionEngineProcessor,
  CohortAnalysisEngine,
  Customer360EngineProcessor,
  DashboardEngineProcessor,
  ForecastEngineProcessor,
  ReportBuilderEngine,
} from '../index';

test('Enterprise Commerce Intelligence & Analytics Platform', async (t) => {
  const analytics = new AnalyticsEngineProcessor();
  const dashboard = new DashboardEngineProcessor();
  const cohort = new CohortAnalysisEngine();
  const attribution = new AttributionEngineProcessor();
  const forecast = new ForecastEngineProcessor();
  const customer360 = new Customer360EngineProcessor();
  const reportBuilder = new ReportBuilderEngine();

  await t.test('Tracks analytics events and computes 15 Executive KPIs', () => {
    analytics.trackEvent({
      eventId: 'evt_1',
      eventType: 'CHECKOUT_STARTED',
      timestamp: new Date(),
      customerId: 'cust_101',
      payload: {},
      context: { country: 'IN', device: 'Mobile' },
    });

    analytics.trackEvent({
      eventId: 'evt_2',
      eventType: 'CHECKOUT_COMPLETED',
      timestamp: new Date(),
      customerId: 'cust_101',
      payload: { amount: 250.0, category: 'Ayurveda', sku: 'SKU-001' },
      context: { country: 'IN', device: 'Mobile', channel: 'Organic' },
    });

    analytics.trackEvent({
      eventId: 'evt_3',
      eventType: 'CHECKOUT_COMPLETED',
      timestamp: new Date(),
      customerId: 'cust_101',
      payload: { amount: 150.0, category: 'Ayurveda', sku: 'SKU-002' },
      context: { country: 'IN', device: 'Mobile', channel: 'Organic' },
    });

    const kpis = analytics.computeExecutiveKpis();
    assert.equal(kpis.totalRevenue, 400.0);
    assert.equal(kpis.totalOrders, 2);
    assert.equal(kpis.averageOrderValue, 200.0);
    assert.ok(kpis.conversionRate > 0);
    assert.ok(kpis.repeatPurchaseRate === 100);
    assert.equal(kpis.customerAcquisitionCost, 45.0);
    assert.equal(kpis.returnOnAdSpend, 4.2);
  });

  await t.test('Computes Revenue Breakdown across dimensions (Country, Channel, Category)', () => {
    const byCountry = analytics.getRevenueByDimension('country');
    assert.ok(byCountry.some((b) => b.key === 'IN' && b.revenue === 400.0));

    const byCategory = analytics.getRevenueByDimension('category');
    assert.ok(byCategory.some((b) => b.key === 'Ayurveda' && b.revenue === 400.0));
  });

  await t.test('Generates CEO, CMO, CTO, WAREHOUSE, and FINANCE Executive Dashboards', () => {
    const ceoDash = dashboard.generateExecutiveDashboard('CEO');
    assert.equal(ceoDash.dashboardType, 'CEO');
    assert.ok(ceoDash.widgets.length >= 3);

    const cmoDash = dashboard.generateExecutiveDashboard('CMO');
    assert.equal(cmoDash.dashboardType, 'CMO');

    const ctoDash = dashboard.generateExecutiveDashboard('CTO');
    assert.equal(ctoDash.dashboardType, 'CTO');
  });

  await t.test('Generates Monthly Cohort Retention and LTV data', () => {
    const cData = cohort.generateMonthlyCohort('2026-01', 500);
    assert.equal(cData.initialCustomers, 500);
    assert.equal(cData.retentionByPeriod[0], 100);
    assert.ok(cData.lifetimeValue > 0);
  });

  await t.test('Computes Marketing Attribution across models (First Touch, Position Based)', () => {
    const ftRes = attribution.computeAttribution('cmp_google', 'Google Search', 'FIRST_TOUCH', 500.0);
    assert.equal(ftRes.attributedRevenue, 500.0);

    const pbRes = attribution.computeAttribution('cmp_fb', 'FB Ads', 'POSITION_BASED', 500.0);
    assert.equal(pbRes.attributedRevenue, 200.0);
  });

  await t.test('Generates 30-day and 90-day AI Sales & Demand Forecast with seasonality', () => {
    const fc30 = forecast.generateForecast(30, 100000);
    assert.equal(fc30.horizonDays, 30);
    assert.ok(fc30.projectedRevenue > 100000);
    assert.ok(fc30.seasonalityMultiplier === 1.22);
  });

  await t.test('Builds Unified Customer 360 Profile and Timeline', () => {
    const profile = customer360.buildCustomerProfile('cust_101', 'Shivam Sahu', 'shivam@example.com');
    assert.equal(profile.customerId, 'cust_101');
    assert.equal(profile.totalOrders, 6);
    assert.ok(profile.timeline.length > 0);
  });

  await t.test('Executes Dynamic Report Builder filtering and exports CSV / JSON', () => {
    const rawData = [
      { orderId: 'ORD-1', amount: 150, status: 'COMPLETED' },
      { orderId: 'ORD-2', amount: 450, status: 'COMPLETED' },
      { orderId: 'ORD-3', amount: 50, status: 'CANCELLED' },
    ];

    const report = reportBuilder.generateReport(
      {
        reportName: 'Completed High Value Orders',
        filters: [{ field: 'status', operator: 'EQUALS', value: 'COMPLETED' }],
      },
      rawData
    );

    assert.equal(report.length, 2);

    const csvExport = reportBuilder.exportReport('Completed Orders', 'CSV', report);
    assert.equal(csvExport.format, 'CSV');
    assert.ok(csvExport.content.includes('ORD-1,150,COMPLETED'));

    const jsonExport = reportBuilder.exportReport('Completed Orders', 'JSON', report);
    assert.equal(jsonExport.format, 'JSON');
    assert.ok(jsonExport.content.includes('"orderId": "ORD-1"'));
  });
});
