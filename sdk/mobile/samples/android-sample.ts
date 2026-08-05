/**
 * Android Sample Application (Kotlin) using SynoCommerce Android SDK
 * @module sdk/mobile/samples/android-sample
 */

import { SynoAndroidSDK } from '../platforms/android';

export async function runAndroidSampleApp(): Promise<void> {
  const sdk = new SynoAndroidSDK({
    apiKey: 'syno_m_live_api_key_88192',
    storeId: 'store_bhilai_01',
    enableOfflineCache: true,
  });

  const guestAuth = await sdk.loginGuest();
  console.log('[Android Kotlin Sample] Authenticated guest token:', guestAuth.accessToken);

  const cart = await sdk.addToCart('prod_triphala', 'Kalyan Triphala Juice 1L', 2, 12.5);
  console.log('[Android Kotlin Sample] Cart total USD:', cart.totalUsd);
}
