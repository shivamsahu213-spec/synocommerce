/**
 * RFC 7807 Problem Details Contract
 *
 * Standardized error structure for application layer HTTP / API bridges.
 *
 * @module application/results/problem-details
 */

export interface ProblemDetails {
  readonly type: string;
  readonly title: string;
  readonly status: number;
  readonly detail: string;
  readonly instance: string;
  readonly extensions?: Record<string, unknown>;
}
