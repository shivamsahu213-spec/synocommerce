/**
 * Enterprise Visual CMS Test Suite
 * @module modules/cms/tests/cms.test
 */

import assert from 'node:assert/strict';
import test from 'node:test';

import {
  CmsBlockRegistry,
  CmsDocumentEngine,
  CmsStorefrontRenderer,
} from '../index';

test('Visual CMS & Page Builder Engine', async (t) => {
  const registry = new CmsBlockRegistry();
  const cms = new CmsDocumentEngine();
  const renderer = new CmsStorefrontRenderer();

  await t.test('Creates default block instances from registry schemas', () => {
    const heroBlock = registry.createDefaultInstance('HERO');
    assert.equal(heroBlock.type, 'HERO');
    assert.equal(heroBlock.props.headline, 'Timeless Ayurvedic Wisdom');
    assert.equal(heroBlock.isVisible, true);
  });

  await t.test('Orchestrates page document creation, block reordering, and publishing', () => {
    const doc = cms.createPage('page_home', '/', 'Home Page');
    assert.equal(doc.status, 'DRAFT');

    const hero = registry.createDefaultInstance('HERO');
    const doctor = registry.createDefaultInstance('DOCTOR_RECOMMENDATION');

    cms.addBlock('page_home', hero);
    cms.addBlock('page_home', doctor);
    assert.equal(doc.blocks.length, 2);

    cms.reorderBlocks('page_home', 0, 1);
    assert.equal(doc.blocks[0]?.type, 'DOCTOR_RECOMMENDATION');

    const published = cms.publishPage('page_home');
    assert.equal(published.status, 'PUBLISHED');
    assert.equal(published.version, 2);
  });

  await t.test('Renders published CMS document into storefront HTML blocks', () => {
    const doc = cms.createPage('page_landing', '/landing', 'Landing');
    const hero = registry.createDefaultInstance('HERO');
    cms.addBlock('page_landing', hero);

    const rendered = renderer.renderPage(doc);
    assert.equal(rendered.pageTitle, 'Landing');
    assert.equal(rendered.blocksHtml.length, 1);
    assert.ok(rendered.blocksHtml[0]?.htmlContent.includes('hero-headline'));
  });
});
