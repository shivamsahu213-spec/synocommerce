/**
 * Kalyan Ayurvedic Store Configuration Test Suite
 * @module stores/kalyan-ayurvedic/tests/kalyan-store.test
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  KALYAN_STORE_CONFIG,
  KALYAN_THEME_CONFIG,
  KALYAN_BRAND_CONFIG,
  KALYAN_PRODUCTS,
  KALYAN_CATEGORIES,
  KALYAN_HEALTH_GOALS,
  KALYAN_HOMEPAGE_CMS,
  KALYAN_SEO_CONFIG,
} from '../index';

test('Kalyan Ayurvedic Store Configuration Integrity', async (t) => {
  await t.test('Verifies Bhilai store location & currency settings', () => {
    assert.equal(KALYAN_STORE_CONFIG.city, 'Bhilai');
    assert.equal(KALYAN_STORE_CONFIG.state, 'Chhattisgarh');
    assert.equal(KALYAN_STORE_CONFIG.currency, 'INR');
    assert.equal(KALYAN_STORE_CONFIG.currencySymbol, '₹');
  });

  await t.test('Verifies luxury theme color tokens and typography', () => {
    assert.equal(KALYAN_THEME_CONFIG.colors.forestGreen, '#0D3B2E');
    assert.equal(KALYAN_THEME_CONFIG.colors.cream, '#FDFBF7');
    assert.equal(KALYAN_THEME_CONFIG.colors.matteGold, '#C5A059');
    assert.ok(KALYAN_THEME_CONFIG.typography.serifFontFamily.includes('Playfair Display'));
  });

  await t.test('Verifies product catalog dataset & health goals', () => {
    assert.equal(KALYAN_PRODUCTS.length, 5);
    assert.equal(KALYAN_CATEGORIES.length, 5);
    assert.equal(KALYAN_HEALTH_GOALS.length, 5);

    const bhringraj = KALYAN_PRODUCTS.find((p) => p.sku === 'KAL-HAIR-001');
    assert.ok(bhringraj);
    assert.equal(bhringraj?.priceInr, 899);
    assert.ok(bhringraj?.keyIngredients.includes('Pure Bhringraj'));
  });

  await t.test('Verifies homepage CMS banner & Vaidya recommendation sections', () => {
    assert.ok(KALYAN_HOMEPAGE_CMS.hero.headline.includes('Ayurvedic Wisdom'));
    assert.ok(KALYAN_HOMEPAGE_CMS.doctorBanner.doctorName.includes('Vaidya Rajendra Sharma'));
    assert.equal(KALYAN_HOMEPAGE_CMS.testimonials.length, 2);
  });

  await t.test('Verifies SEO meta configuration & Schema.org JSON-LD', () => {
    assert.ok(KALYAN_SEO_CONFIG.defaultTitle.includes('Kalyan Ayurvedic'));
    assert.equal(KALYAN_SEO_CONFIG.structuredData.address.addressLocality, 'Bhilai');
  });
});
