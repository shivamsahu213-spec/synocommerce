/**
 * Flutter Sample Application (Dart) using SynoCommerce Flutter SDK
 * @module sdk/mobile/samples/flutter-sample
 */

import { SynoFlutterSDK } from '../platforms/flutter';

export async function runFlutterSampleApp(): Promise<void> {
  const sdk = new SynoFlutterSDK({
    apiKey: 'syno_m_live_api_key_88192',
    storeId: 'store_bhilai_01',
    enableOfflineCache: true,
  });

  const guestAuth = await sdk.loginGuest();
  console.log('[Flutter Dart Sample] Authenticated guest token:', guestAuth.accessToken);
}
