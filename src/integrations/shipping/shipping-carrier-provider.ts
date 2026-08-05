/**
 * Multi-Carrier Shipping Provider Integration Adapter
 * @module src/integrations/shipping/shipping-carrier-provider
 */

import crypto from 'node:crypto';
import {
  CreateShipmentRequest,
  ShipmentResult,
  ShippingCarrierType,
  ShippingRateRequest,
  ShippingRateResult,
  WebhookShipmentPayload,
} from './types';
import { ShipmentSecurityEngine } from './shipment-security';

export class ShippingCarrierProvider {
  private webhookSecrets = new Map<ShippingCarrierType, string>();

  constructor() {
    this.webhookSecrets.set('SHIPROCKET', process.env['SHIPROCKET_WEBHOOK_SECRET'] || 'sr_secret_key');
    this.webhookSecrets.set('DELHIVERY', process.env['DELHIVERY_WEBHOOK_SECRET'] || 'delhivery_secret_key');
    this.webhookSecrets.set('FEDEX', process.env['FEDEX_SECRET_KEY'] || 'fedex_secret_key');
    this.webhookSecrets.set('UPS', process.env['UPS_CLIENT_SECRET'] || 'ups_secret_key');
    this.webhookSecrets.set('DHL', process.env['DHL_API_SECRET'] || 'dhl_secret_key');
    this.webhookSecrets.set('BLUEDART', process.env['BLUEDART_LICENSE_KEY'] || 'bluedart_secret_key');
    this.webhookSecrets.set('DTDC', process.env['DTDC_API_KEY'] || 'dtdc_secret_key');
    this.webhookSecrets.set('INDIA_POST', process.env['INDIA_POST_API_KEY'] || 'indiapost_secret_key');
  }

  public async getCarrierRates(req: ShippingRateRequest): Promise<ShippingRateResult[]> {
    const carriers: ShippingCarrierType[] = [
      'SHIPROCKET',
      'DELHIVERY',
      'FEDEX',
      'UPS',
      'DHL',
      'BLUEDART',
      'DTDC',
      'INDIA_POST',
    ];

    return carriers.map((carrier) => {
      const baseRate = req.isInternational ? 45.0 : 5.0;
      const weightFactor = req.weightKg * 1.5;
      const codSurcharge = req.paymentMode === 'COD' ? 2.5 : 0.0;
      const rateUsd = Number((baseRate + weightFactor + codSurcharge).toFixed(2));

      return {
        carrier,
        rateUsd,
        estimatedDeliveryDays: req.isInternational ? 5 : 2,
        serviceName: `${carrier} Express Priority`,
      };
    });
  }

  public async createShipment(req: CreateShipmentRequest): Promise<ShipmentResult> {
    return ShipmentSecurityEngine.executeWithRetry(req.carrier, async () => {
      const randomHex = crypto.randomBytes(6).toString('hex').toUpperCase();
      const awbNumber = `AWB_${req.carrier}_${randomHex}`;
      const shipmentId = `SHP_${req.orderId}_${randomHex}`;

      return {
        shipmentId,
        awbNumber,
        carrier: req.carrier,
        status: 'MANIFESTED',
        labelUrl: `https://cdn.synocommerce.com/labels/${awbNumber}.pdf`,
        manifestUrl: `https://cdn.synocommerce.com/manifests/MANIFEST_${shipmentId}.pdf`,
        estimatedDeliveryDate: new Date(Date.now() + 86400000 * 3),
        pickupScheduledAt: new Date(Date.now() + 86400000 * 1),
      };
    });
  }

  public async cancelShipment(carrier: ShippingCarrierType, awbNumber: string): Promise<{ success: boolean; awbNumber: string }> {
    return {
      success: true,
      awbNumber,
    };
  }

  public verifyWebhookSignature(payload: WebhookShipmentPayload): { valid: boolean; isDuplicate: boolean; error?: string } {
    if (!ShipmentSecurityEngine.verifyTimestampFreshness(payload.timestamp)) {
      return { valid: false, isDuplicate: false, error: 'WEBHOOK_TIMESTAMP_EXPIRED' };
    }

    const secret = this.webhookSecrets.get(payload.carrier) || 'default_shipping_secret';
    const signedText = `${payload.eventId}:${payload.carrier}:${payload.awbNumber}:${payload.timestamp}`;
    const expectedSig = crypto.createHmac('sha256', secret).update(signedText).digest('hex');

    const isValid = ShipmentSecurityEngine.timingSafeCompare(expectedSig, payload.signature);
    if (!isValid) {
      return { valid: false, isDuplicate: false, error: 'INVALID_WEBHOOK_SIGNATURE' };
    }

    const isDuplicate = ShipmentSecurityEngine.isDuplicateWebhook(payload.eventId);
    return { valid: true, isDuplicate };
  }
}
