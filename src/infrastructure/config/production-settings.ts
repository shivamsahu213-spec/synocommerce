/**
 * Production Services Configuration & Settings Manager
 * @module infrastructure/config/production-settings
 */

export interface ProductionServicesConfig {
  databaseUrl: string;
  redisUrl: string;
  razorpayKeyId: string;
  razorpayKeySecret: string;
  stripeSecretKey: string;
  stripeWebhookSecret: string;
  shiprocketEmail: string;
  shiprocketPassword?: string | undefined;
  resendApiKey: string;
  cloudinaryCloudName: string;
  meilisearchHost: string;
  meilisearchMasterKey: string;
}

export class ProductionSettingsManager {
  public static getServicesConfig(): ProductionServicesConfig {
    return {
      databaseUrl: process.env.DATABASE_URL ?? 'postgresql://syno_user:syno_password@localhost:5432/synocommerce?schema=public',
      redisUrl: process.env.REDIS_URL ?? 'redis://localhost:6379',
      razorpayKeyId: process.env.RAZORPAY_KEY_ID ?? 'rzp_live_syno_kalyan_2026',
      razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET ?? 'syno_razorpay_live_secret_key',
      stripeSecretKey: process.env.STRIPE_SECRET_KEY ?? 'sk_live_syno_kalyan_2026',
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? 'whsec_syno_kalyan_webhook_secret',
      shiprocketEmail: process.env.SHIPROCKET_EMAIL ?? 'logistics@kalyanayurvedic.com',
      shiprocketPassword: process.env.SHIPROCKET_PASSWORD ?? 'ShiprocketSecurePass2026!',
      resendApiKey: process.env.RESEND_API_KEY ?? 're_syno_kalyan_resend_api_key_2026',
      cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME ?? 'kalyan-ayurvedic-assets',
      meilisearchHost: process.env.MEILISEARCH_HOST ?? 'http://localhost:7700',
      meilisearchMasterKey: process.env.MEILISEARCH_MASTER_KEY ?? 'syno_meili_master_key_2026',
    };
  }
}
