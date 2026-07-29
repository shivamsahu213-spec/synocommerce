export interface NetworkRequest {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  headers?: Record<string, string>;
  body?: unknown;
  timeoutMs?: number;
}

export interface NetworkResponse<TBody = unknown> {
  status: number;
  headers: Record<string, string>;
  body: TBody;
}

export interface NetworkClient {
  send<TBody = unknown>(request: NetworkRequest): Promise<NetworkResponse<TBody>>;
}
