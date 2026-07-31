/**
 * Enterprise B2B Commerce Platform Test Suite
 * @module modules/b2b/tests/b2b.test
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  B2bCompanyEngine,
  B2bContractPricingEngine,
  RfqNegotiationEngine,
  PurchaseOrderEngine,
} from '../index';

test('Enterprise B2B Commerce Platform', async (t) => {
  const companyEngine = new B2bCompanyEngine();
  const pricingEngine = new B2bContractPricingEngine();
  const rfqEngine = new RfqNegotiationEngine();
  const poEngine = new PurchaseOrderEngine();

  await t.test('Creates corporate account with Net 30 terms and validates credit limit', () => {
    const company = companyEngine.createCompanyAccount('comp_apollo_hospitals', 'Apollo Hospitals', '22AAAAA0000A1Z5', 500000, 'NET_30');
    assert.equal(company.paymentTerms, 'NET_30');
    assert.equal(company.creditLimitInr, 500000);

    const creditCheck = companyEngine.validateCreditAvailability('comp_apollo_hospitals', 150000);
    assert.equal(creditCheck.isApproved, true);
    assert.equal(creditCheck.availableCreditInr, 500000);
  });

  await t.test('Overrides standard list price with negotiated B2B contract pricing', () => {
    pricingEngine.setContractPrice('comp_apollo_hospitals', 'KAL-VITAL-003', 1200, 10); // ₹1,200 vs ₹1,500 list price

    const effectivePriceContract = pricingEngine.resolveEffectivePrice('comp_apollo_hospitals', 'KAL-VITAL-003', 15, 1500);
    assert.equal(effectivePriceContract, 1200);

    const effectivePriceList = pricingEngine.resolveEffectivePrice('comp_apollo_hospitals', 'KAL-VITAL-003', 5, 1500);
    assert.equal(effectivePriceList, 1500); // Quantity below threshold
  });

  await t.test('Executes Request For Quote (RFQ) negotiation workflow', () => {
    const rfq = rfqEngine.submitRfq('comp_apollo_hospitals', 'procurement@apollo.com', 'KAL-HAIR-001', 500, 400); // target ₹400
    assert.equal(rfq.status, 'SUBMITTED');

    const counter = rfqEngine.submitSupplierCounterOffer(rfq.rfqId, 420); // counter ₹420
    assert.equal(counter.status, 'COUNTER_OFFERED');
    assert.equal(counter.offeredPriceInr, 420);

    const accepted = rfqEngine.acceptRfqQuote(rfq.rfqId);
    assert.equal(accepted.status, 'ACCEPTED');
  });

  await t.test('Creates Purchase Order (PO) and approves procurement request', () => {
    const po = poEngine.createPurchaseOrder('comp_apollo_hospitals', 'PO-APOLLO-2026-009', 210000);
    assert.equal(po.status, 'PENDING_APPROVAL');

    const approved = poEngine.approvePurchaseOrder(po.poId);
    assert.equal(approved.status, 'APPROVED');
  });
});
