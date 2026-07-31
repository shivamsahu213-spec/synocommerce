/**
 * Kalyan Ayurvedic Branding & Values Configuration
 * @module stores/kalyan-ayurvedic/branding/brand.config
 */

export interface ValueProp {
  readonly title: string;
  readonly description: string;
  readonly iconName: string;
}

export const KALYAN_BRAND_CONFIG = {
  brandName: 'Kalyan Ayurvedic',
  establishedYear: 1984,
  origin: 'Bhilai, Chhattisgarh',
  certifications: ['AYUSH Ministry Certified', '100% Organic ISO 9001', 'Cruelty-Free', 'GMP Certified'],
  valuePropositions: [
    { title: '100% Pure Organic Herbs', description: 'Sourced from pristine botanical reserves across India.', iconName: 'Leaf' },
    { title: 'Vaidya Formulated', description: 'Crafted according to classical Charaka Samhita manuscripts.', iconName: 'Award' },
    { title: 'Ayush Ministry Certified', description: 'Meets strictest quality and safety standards.', iconName: 'ShieldCheck' },
    { title: 'Ethical & Cruelty-Free', description: 'Zero artificial preservatives, parabens, or synthetic fragrance.', iconName: 'Heart' },
  ] as readonly ValueProp[],
};
