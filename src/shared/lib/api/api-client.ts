import { getAppRuntimeConfig } from '@config/runtime.config';
import { createAppError, mapHttpError } from '@shared/lib/errors';

type RequestOptions = RequestInit & {
  query?: Record<string, string | number | boolean | undefined>;
};

function buildUrl(path: string, query?: RequestOptions['query']) {
  const runtime = getAppRuntimeConfig();
  const baseUrl = runtime.apiBaseUrl.endsWith('/') ? runtime.apiBaseUrl : `${runtime.apiBaseUrl}/`;
  const url = new URL(path, baseUrl);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return url.toString();
}

export async function apiClient<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const runtime = getAppRuntimeConfig();
  const response = await fetch(buildUrl(path, options.query), {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-Brand-Code': runtime.brandCode,
      ...(options.headers ?? {})
    },
    cache: 'no-store'
  }).catch((error: unknown) => {
    throw createAppError({
      code: 'network_error',
      message: 'Network request failed.',
      retryable: true,
      details: {
        cause: error instanceof Error ? error.message : 'unknown'
      }
    });
  });

  if (!response.ok) {
    throw mapHttpError(response.status, {
      path,
      method: options.method ?? 'GET'
    });
  }

  return response.json() as Promise<T>;
}
