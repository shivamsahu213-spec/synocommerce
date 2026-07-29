export type AppConfig = {
  name: string;
  company: string;
  defaultLocale: string;
  supportedLocales: string[];
  defaultCurrency: string;
  supportedCurrencies: string[];
  features: Record<string, boolean>;
};
