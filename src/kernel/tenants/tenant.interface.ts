/**
 * Tenant Architecture Contracts
 * @module kernel/tenants/tenant.interface
 */

export interface ITenantContext {
  readonly tenantId: string;
  readonly name: string;
  readonly defaultLocale: string;
  readonly defaultCurrency: string;
  readonly timezone: string;
  readonly isEnabled: boolean;
}

export interface ITenantRegistry {
  registerTenant(tenant: ITenantContext): void;
  getTenant(tenantId: string): ITenantContext | undefined;
  getAllTenants(): readonly ITenantContext[];
}
