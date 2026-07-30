/**
 * Multi-Store Architecture Contracts
 * @module kernel/stores/store.interface
 */

export interface IStoreContext {
  readonly storeId: string;
  readonly tenantId: string;
  readonly brandId: string;
  readonly code: string;
  readonly name: string;
  readonly domainName: string;
  readonly defaultLocale: string;
  readonly defaultCurrency: string;
  readonly supportedLocales: readonly string[];
  readonly supportedCurrencies: readonly string[];
  readonly timezone: string;
}

export interface IStoreRegistry {
  registerStore(store: IStoreContext): void;
  getStore(storeId: string): IStoreContext | undefined;
  getStoresByTenant(tenantId: string): readonly IStoreContext[];
}
