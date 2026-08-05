/**
 * iOS Sample Application (Swift) using SynoCommerce iOS SDK
 * @module sdk/mobile/samples/ios-sample
 */

import { SynoiOSSDK } from '../platforms/ios';

export async function runIosSampleApp(): Promise<void> {
  const sdk = new SynoiOSSDK({
    apiKey: 'syno_m_live_api_key_88192',
    storeId: 'store_bhilai_01',
    enableOfflineCache: true,
  });

  const guestAuth = await sdk.loginGuest();
  console.log('[iOS Swift Sample] Authenticated guest token:', guestAuth.accessToken);
}
