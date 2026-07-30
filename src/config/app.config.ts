import type { AppConfig } from '@/types/app';

export const appConfig: AppConfig = {
  name: 'SynoCommerce',
  company: 'SynoStack Technologies',
  defaultLocale: 'en',
  supportedLocales: ['en', 'hi', 'ar'],
  defaultCurrency: 'INR',
  supportedCurrencies: ['INR', 'USD', 'AED'],
  features: {
    b2b: true,
    wishlist: true,
    reviews: true,
    subscriptions: false,
    marketplace: false,
    multiVendor: false
  }
};
