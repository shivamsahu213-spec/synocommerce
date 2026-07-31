/**
 * Kalyan Ayurvedic Luxury Theme Tokens & Styling Configuration
 * Inspired by Forest Essentials, Apple-level minimal UI, and Organic Luxury.
 *
 * @module stores/kalyan-ayurvedic/theme/theme.config
 */

export interface ThemeColorTokens {
  readonly forestGreen: string; // Primary Deep Brand Accent (#0D3B2E)
  readonly cream: string;       // Luxurious Warm Background (#FDFBF7)
  readonly matteGold: string;   // Premium Gold Highlight (#C5A059)
  readonly pureWhite: string;   // Clean Card Surface (#FFFFFF)
  readonly charcoalText: string;// Deep Legible Body Text (#1A2421)
}

export interface ThemeTypography {
  readonly serifFontFamily: string;
  readonly sansFontFamily: string;
}

export const KALYAN_THEME_CONFIG = {
  themeName: 'Luxury Ayurveda Minimal',
  colors: {
    forestGreen: '#0D3B2E',
    cream: '#FDFBF7',
    matteGold: '#C5A059',
    pureWhite: '#FFFFFF',
    charcoalText: '#1A2421',
  } as ThemeColorTokens,
  typography: {
    serifFontFamily: "'Playfair Display', 'Georgia', serif",
    sansFontFamily: "'Inter', system-ui, sans-serif",
  } as ThemeTypography,
  spacing: {
    borderRadius: '1.25rem', // 20px rounded luxury corners
    shadowLevel: '0 20px 40px -15px rgba(13, 59, 46, 0.08)',
  },
};
