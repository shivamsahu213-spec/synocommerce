/**
 * Kalyan Ayurvedic SEO Meta Tags & Schema.org JSON-LD Config
 * @module stores/kalyan-ayurvedic/seo/meta.config
 */

export const KALYAN_SEO_CONFIG = {
  defaultTitle: 'Kalyan Ayurvedic - Authentic Herbal Products & Oils from Bhilai',
  titleTemplate: '%s | Kalyan Ayurvedic',
  defaultDescription: 'Buy authentic 100% organic Ayurvedic oils, hair vitalizers, skincare Kumkumadi Tailam, and immunity boosters crafted in Bhilai.',
  canonicalUrl: 'https://kalyanayurvedic.com',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Kalyan Ayurvedic',
    title: 'Kalyan Ayurvedic - Luxury Organic Herbal Care',
    description: 'Ancient Ayurvedic wisdom crafted with pure organic botanicals.',
  },
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: 'Kalyan Ayurvedic',
    telephone: '+91 788 234 5678',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kalyan Ayurvedic Bhavan, Sector 6',
      addressLocality: 'Bhilai',
      addressRegion: 'Chhattisgarh',
      postalCode: '490006',
      addressCountry: 'IN',
    },
  },
};
