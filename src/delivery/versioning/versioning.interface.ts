/**
 * API Versioning Strategy Contracts
 *
 * Supports URI versioning, Header versioning, Content Negotiation, and Deprecation policies.
 *
 * @module delivery/versioning/versioning.interface
 */

import { DeliveryRequest } from '../contracts';

export type VersioningScheme = 'URI' | 'HEADER' | 'CONTENT_NEGOTIATION';

export interface ApiVersion {
  readonly version: string;
  readonly isDeprecated: boolean;
  readonly sunsetDate?: Date | undefined;
  readonly deprecationNotice?: string | undefined;
}

export interface IApiVersionResolver {
  readonly scheme: VersioningScheme;
  resolveVersion(request: DeliveryRequest): string;
}

export interface IDeprecationPolicyEvaluator {
  evaluateDeprecation(version: ApiVersion): {
    readonly isDeprecated: boolean;
    readonly headers: Record<string, string>;
  };
}
