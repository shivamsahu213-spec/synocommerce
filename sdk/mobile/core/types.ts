/**
 * Enterprise Mobile SDK Platform Types
 * @module sdk/mobile/core/types
 */

export type MobilePlatform = 'ANDROID' | 'IOS' | 'FLUTTER' | 'REACT_NATIVE' | 'EXPO';

export interface MobileSdkConfig {
  apiKey: string;
  storeId: string;
  baseUrl?: string | undefined;
  enableOfflineCache?: boolean | undefined;
  certificatePinningHashes?: string[] | undefined;
}

export interface MobileAuthToken {
  accessToken: string;
  refreshToken: string;
  expiresInSeconds: number;
  isGuest: boolean;
  customerId?: string | undefined;
}

export interface MobileCartItem {
  productId: string;
  variantId?: string | undefined;
  name: string;
  quantity: number;
  priceUsd: number;
}

export interface MobileCart {
  cartId: string;
  items: MobileCartItem[];
  subtotalUsd: number;
  taxUsd: number;
  totalUsd: number;
}

export interface OfflineQueueItem {
  id: string;
  action: 'ADD_TO_CART' | 'PLACE_ORDER' | 'UPDATE_PROFILE';
  payload: any;
  timestamp: number;
  retryCount: number;
}

export interface MobileAnalyticsEvent {
  eventName: 'SCREEN_VIEW' | 'ADD_TO_CART' | 'CHECKOUT_START' | 'PURCHASE_SUCCESS';
  properties: Record<string, any>;
  timestamp: Date;
}
