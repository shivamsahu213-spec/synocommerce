export interface ConfigurationSection<TValue> {
  key: string;
  value: TValue;
}

export interface EnvironmentConfiguration {
  name: 'local' | 'development' | 'staging' | 'production';
  isEdgeEnabled: boolean;
}

export interface BrandConfiguration {
  code: string;
  name: string;
  domain?: string;
}

export interface ThemeConfiguration {
  code: string;
  tokenSet: string;
}

export interface LocaleConfiguration {
  defaultLocale: string;
  supportedLocales: string[];
}

export interface CurrencyConfiguration {
  defaultCurrency: string;
  supportedCurrencies: string[];
}

export interface ProviderConfiguration {
  payments: string[];
  shipping: string[];
  analytics: string[];
  notifications: string[];
  search: string[];
}

export interface SecurityConfiguration {
  cspEnabled: boolean;
  csrfEnabled: boolean;
  rateLimitingEnabled: boolean;
}

export interface PerformanceConfiguration {
  edgeEnabled: boolean;
  streamingEnabled: boolean;
  prefetchEnabled: boolean;
}

export interface SeoConfiguration {
  defaultTitle: string;
  robotsPolicy: string;
}

export interface AnalyticsConfiguration {
  providers: string[];
}

export interface StorageConfiguration {
  defaultDisk: string;
  supportedDisks: string[];
}

export interface MediaConfiguration {
  imagePresets: string[];
}

export interface CacheConfiguration {
  defaultStore: string;
  ttlSeconds: number;
}

export interface PlatformConfigurationShape {
  analytics: AnalyticsConfiguration;
  brand: BrandConfiguration;
  cache: CacheConfiguration;
  currency: CurrencyConfiguration;
  environment: EnvironmentConfiguration;
  locale: LocaleConfiguration;
  media: MediaConfiguration;
  performance: PerformanceConfiguration;
  providers: ProviderConfiguration;
  security: SecurityConfiguration;
  seo: SeoConfiguration;
  storage: StorageConfiguration;
  theme: ThemeConfiguration;
}

export interface ConfigurationRepository {
  get<TValue>(key: string): TValue;
  getOptional<TValue>(key: string): TValue | null;
  set<TValue>(section: ConfigurationSection<TValue>): void;
  snapshot(): PlatformConfigurationShape;
}
