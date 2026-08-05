/**
 * Mobile Navigation Matrix & Deep Link Router
 * @module apps/mobile/src/navigation/app-navigator
 */

import { ScreenRoute } from '../types';

export class AppNavigator {
  private currentScreen: ScreenRoute = 'SPLASH';
  private navigationHistory: ScreenRoute[] = [];

  public navigate(screen: ScreenRoute): ScreenRoute {
    this.navigationHistory.push(this.currentScreen);
    this.currentScreen = screen;
    return this.currentScreen;
  }

  public handleDeepLink(url: string): ScreenRoute {
    // Handle deep links like syno://product/101 or syno://orders/ORD-9912
    if (url.includes('/product/')) return this.navigate('PRODUCT_DETAILS');
    if (url.includes('/orders/')) return this.navigate('ORDER_DETAILS');
    if (url.includes('/checkout')) return this.navigate('CHECKOUT');
    return this.navigate('HOME');
  }

  public getCurrentScreen(): ScreenRoute {
    return this.currentScreen;
  }
}
