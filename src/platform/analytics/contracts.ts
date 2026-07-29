export interface AnalyticsEvent<TPayload = Record<string, unknown>> {
  name: string;
  payload: TPayload;
}

export interface AnalyticsTracker {
  track<TPayload = Record<string, unknown>>(event: AnalyticsEvent<TPayload>): void;
}
