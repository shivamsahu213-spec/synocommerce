/**
 * Core SynoCommerce Mobile SDK Engine
 * @module sdk/mobile/core/mobile-sdk-core
 */

import crypto from 'node:crypto';
import {
  MobileAnalyticsEvent,
  MobileAuthToken,
  MobileCart,
  MobileSdkConfig,
} from './types';
import { MobileOfflineEngine } from '../offline/offline-engine';
import { MobileSdkSecurityEngine } from '../security/sdk-security';

export class SynoMobileSDK {
  private config: MobileSdkConfig;
  public offlineEngine: MobileOfflineEngine;
  public securityEngine: MobileSdkSecurityEngine;
  private currentCart: MobileCart;
  private analyticsEvents: MobileAnalyticsEvent[] = [];

  constructor(config: MobileSdkConfig) {
    this.config = config;
    this.offlineEngine = new MobileOfflineEngine();
    this.securityEngine = new MobileSdkSecurityEngine(config.certificatePinningHashes);
    this.currentCart = {
      cartId: `cart_${crypto.randomBytes(6).toString('hex')}`,
      items: [],
      subtotalUsd: 0,
      taxUsd: 0,
      totalUsd: 0,
    };
  }

  public async loginGuest(): Promise<MobileAuthToken> {
    return {
      accessToken: `m_guest_token_${crypto.randomBytes(8).toString('hex')}`,
      refreshToken: `m_guest_refresh_${crypto.randomBytes(8).toString('hex')}`,
      expiresInSeconds: 86400,
      isGuest: true,
    };
  }

  public async addToCart(productId: string, name: string, quantity: number, priceUsd: number): Promise<MobileCart> {
    const existing = this.currentCart.items.find((i) => i.productId === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.currentCart.items.push({ productId, name, quantity, priceUsd });
    }

    const subtotal = this.currentCart.items.reduce((acc, item) => acc + item.priceUsd * item.quantity, 0);
    this.currentCart.subtotalUsd = Number(subtotal.toFixed(2));
    this.currentCart.taxUsd = Number((subtotal * 0.08).toFixed(2));
    this.currentCart.totalUsd = Number((this.currentCart.subtotalUsd + this.currentCart.taxUsd).toFixed(2));

    this.trackEvent('ADD_TO_CART', { productId, quantity, priceUsd });
    return this.currentCart;
  }

  public trackEvent(eventName: MobileAnalyticsEvent['eventName'], properties: Record<string, any>): void {
    this.analyticsEvents.push({
      eventName,
      properties,
      timestamp: new Date(),
    });
  }

  public getCart(): MobileCart {
    return this.currentCart;
  }

  public getAnalyticsEvents(): MobileAnalyticsEvent[] {
    return this.analyticsEvents;
  }
}
