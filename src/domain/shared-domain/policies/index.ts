/**
 * Shared Domain Base Policy Interface
 * @module domain/shared-domain/policies
 */

export interface IDomainPolicy<TTarget = unknown> {
  isApplicable(target: TTarget): boolean;
}
