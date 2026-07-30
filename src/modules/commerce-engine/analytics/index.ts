/**
 * Analytics Engine Module
 * @module modules/commerce-engine/analytics
 */

export interface MetricEntry {
  readonly metricName: string;
  readonly value: number;
  readonly timestamp: Date;
}

export class CommerceAnalyticsEngine {
  private readonly _metrics: MetricEntry[] = [];

  public trackMetric(name: string, value: number): void {
    this._metrics.push({ metricName: name, value, timestamp: new Date() });
  }

  public getMetrics(): readonly MetricEntry[] {
    return this._metrics;
  }
}
