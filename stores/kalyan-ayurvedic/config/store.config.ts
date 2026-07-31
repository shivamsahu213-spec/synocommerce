/**
 * Kalyan Ayurvedic Store Configuration
 * @module stores/kalyan-ayurvedic/config/store.config
 */

export interface StoreMetadata {
  readonly storeId: string;
  readonly name: string;
  readonly tagline: string;
  readonly city: string;
  readonly state: string;
  readonly country: string;
  readonly currency: string;
  readonly currencySymbol: string;
  readonly locale: string;
  readonly supportEmail: string;
  readonly supportPhone: string;
  readonly address: string;
}

export const KALYAN_STORE_CONFIG: StoreMetadata = {
  storeId: 'store_kalyan_ayurvedic',
  name: 'Kalyan Ayurvedic',
  tagline: 'Authentic Ayurvedic Formulations for Mind, Body & Soul',
  city: 'Bhilai',
  state: 'Chhattisgarh',
  country: 'India',
  currency: 'INR',
  currencySymbol: '₹',
  locale: 'en-IN',
  supportEmail: 'care@kalyanayurvedic.com',
  supportPhone: '+91 788 234 5678',
  address: 'Kalyan Ayurvedic Bhavan, Sector 6, Bhilai, Chhattisgarh 490006, India',
};
