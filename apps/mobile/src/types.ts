/**
 * SynoCommerce Enterprise Mobile Application Types & Screen Routes
 * @module apps/mobile/src/types
 */

export type ScreenRoute =
  | 'SPLASH'
  | 'ONBOARDING'
  | 'LOGIN'
  | 'OTP_LOGIN'
  | 'REGISTER'
  | 'FORGOT_PASSWORD'
  | 'HOME'
  | 'CATEGORY'
  | 'SEARCH'
  | 'AI_SEARCH'
  | 'PRODUCT_LISTING'
  | 'PRODUCT_DETAILS'
  | 'WISHLIST'
  | 'CART'
  | 'CHECKOUT'
  | 'PAYMENTS'
  | 'ORDER_SUCCESS'
  | 'ORDERS'
  | 'ORDER_DETAILS'
  | 'RETURNS'
  | 'PROFILE'
  | 'ADDRESSES'
  | 'NOTIFICATIONS'
  | 'COUPONS'
  | 'WALLET'
  | 'REVIEWS'
  | 'SETTINGS'
  | 'HELP_CENTER'
  | 'CHAT_SUPPORT'
  | 'ABOUT'
  | 'PRIVACY'
  | 'TERMS';

export interface MobileAppState {
  currentScreen: ScreenRoute;
  theme: 'DARK' | 'LIGHT';
  locale: 'en' | 'hi';
  isBiometricEnabled: boolean;
  offlineQueueCount: number;
}
