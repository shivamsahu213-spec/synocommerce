export interface TraceSpan {
  name: string;
  attributes?: Record<string, unknown>;
  end(): void;
}

export interface Tracer {
  startSpan(name: string, attributes?: Record<string, unknown>): TraceSpan;
}

export interface MetricsRecorder {
  increment(metric: string, value?: number, tags?: Record<string, string>): void;
  timing(metric: string, durationMs: number, tags?: Record<string, string>): void;
}
