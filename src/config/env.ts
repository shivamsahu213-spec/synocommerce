import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_APP_NAME: z.string().min(1),
  NEXT_PUBLIC_APP_ENV: z.enum(['local', 'development', 'staging', 'production']).catch('local'),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_DEFAULT_LOCALE: z.string().min(2),
  NEXT_PUBLIC_DEFAULT_CURRENCY: z.string().length(3),
  NEXT_PUBLIC_BRAND_CODE: z.string().min(1),
  NEXT_PUBLIC_THEME_CODE: z.string().min(1),
  API_BASE_URL: z.string().url(),
  ASSET_BASE_URL: z.string().url(),
  SENTRY_DSN: z.string().optional().default(''),
  NEXT_PUBLIC_GA_ID: z.string().optional().default(''),
  NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN: z.string().optional().default('')
});

export const env = envSchema.parse({
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME ?? 'SynoCommerce',
  NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV ?? 'local',
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  NEXT_PUBLIC_DEFAULT_LOCALE: process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? 'en',
  NEXT_PUBLIC_DEFAULT_CURRENCY: process.env.NEXT_PUBLIC_DEFAULT_CURRENCY ?? 'INR',
  NEXT_PUBLIC_BRAND_CODE: process.env.NEXT_PUBLIC_BRAND_CODE ?? 'default',
  NEXT_PUBLIC_THEME_CODE: process.env.NEXT_PUBLIC_THEME_CODE ?? 'core',
  API_BASE_URL: process.env.API_BASE_URL ?? 'http://localhost:8000/api',
  ASSET_BASE_URL: process.env.ASSET_BASE_URL ?? 'http://localhost:3000',
  SENTRY_DSN: process.env.SENTRY_DSN,
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN: process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN
});
