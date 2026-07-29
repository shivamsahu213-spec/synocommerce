import type { BrandDefinition } from '@types/theme';

export const defaultBrand: BrandDefinition = {
  code: 'default',
  name: 'SynoCommerce Default',
  logo: {
    light: '/assets/brands/default/logo-light.svg',
    dark: '/assets/brands/default/logo-dark.svg',
    favicon: '/favicon.ico'
  },
  seo: {
    titleTemplate: '%s | SynoCommerce',
    defaultTitle: 'SynoCommerce',
    defaultDescription: 'Enterprise-grade reusable ecommerce platform.'
  },
  socialLinks: {
    instagram: '',
    facebook: '',
    linkedin: ''
  },
  analytics: {
    googleAnalyticsId: '',
    cloudflareAnalyticsToken: ''
  }
};
