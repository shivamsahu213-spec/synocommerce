export const commerceConfig = {
  seo: {
    defaultRobots: 'index,follow'
  },
  analytics: {
    providers: ['google-analytics', 'cloudflare-web-analytics']
  },
  payments: {
    defaultProvider: 'manual',
    supportedProviders: ['razorpay', 'stripe', 'paypal', 'manual']
  },
  shipping: {
    defaultProvider: 'manual',
    supportedProviders: ['shiprocket', 'delhivery', 'manual']
  },
  search: {
    provider: 'api'
  }
} as const;
