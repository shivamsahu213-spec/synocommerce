/**
 * Infrastructure HTTP Transport Client Adapter
 * @module infrastructure/http
 */

export interface HttpClientOptions {
  readonly baseUrl?: string | undefined;
  readonly headers?: Record<string, string> | undefined;
  readonly timeoutMs?: number | undefined;
}

export interface IHttpClient {
  get<T>(url: string, headers?: Record<string, string>): Promise<T>;
  post<T>(url: string, body: unknown, headers?: Record<string, string>): Promise<T>;
}

export class FetchHttpClientAdapter implements IHttpClient {
  public async get<T>(url: string, headers?: Record<string, string>): Promise<T> {
    const init: RequestInit = headers !== undefined ? { method: 'GET', headers } : { method: 'GET' };
    const res = await fetch(url, init);
    return res.json() as Promise<T>;
  }

  public async post<T>(url: string, body: unknown, headers?: Record<string, string>): Promise<T> {
    const init: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(headers || {}) },
      body: JSON.stringify(body),
    };
    const res = await fetch(url, init);
    return res.json() as Promise<T>;
  }
}
