/**
 * Infrastructure Telemetry, Monitoring & Health Adapters
 * @module infrastructure/telemetry
 */

export interface ITelemetryAdapter {
  recordMetric(name: string, value: number, tags?: Record<string, string>): void;
  startSpan(spanName: string): { end(): void };
}

export class OpenTelemetryAdapter implements ITelemetryAdapter {
  public recordMetric(name: string, value: number, tags?: Record<string, string>): void {}
  public startSpan(spanName: string): { end(): void } {
    return { end: () => {} };
  }
}
