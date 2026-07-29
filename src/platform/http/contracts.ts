export interface HttpHeaders {
  get(name: string): string | null;
  set(name: string, value: string): void;
}

export interface HttpRequestContext {
  method: string;
  url: string;
  headers: HttpHeaders;
  body?: unknown;
  ipAddress?: string;
}

export interface HttpResponse<TBody = unknown> {
  status: number;
  headers?: Record<string, string>;
  body?: TBody;
}
