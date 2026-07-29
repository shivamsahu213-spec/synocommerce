import { env } from '@config/env';

export function getAppRuntimeConfig() {
  return {
    appName: env.NEXT_PUBLIC_APP_NAME,
    environment: env.NEXT_PUBLIC_APP_ENV,
    siteUrl: env.NEXT_PUBLIC_SITE_URL,
    defaultLocale: env.NEXT_PUBLIC_DEFAULT_LOCALE,
    defaultCurrency: env.NEXT_PUBLIC_DEFAULT_CURRENCY,
    brandCode: env.NEXT_PUBLIC_BRAND_CODE,
    themeCode: env.NEXT_PUBLIC_THEME_CODE,
    apiBaseUrl: env.API_BASE_URL,
    assetBaseUrl: env.ASSET_BASE_URL
  };
}
