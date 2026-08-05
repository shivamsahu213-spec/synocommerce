/**
 * React Native & Expo Sample Application using SynoCommerce React Native SDK
 * @module sdk/mobile/samples/react-native-sample
 */

import { SynoReactNativeSDK } from '../platforms/react-native';

export async function runReactNativeSampleApp(): Promise<void> {
  const sdk = new SynoReactNativeSDK({
    apiKey: 'syno_m_live_api_key_88192',
    storeId: 'store_bhilai_01',
    enableOfflineCache: true,
  });

  const guestAuth = await sdk.loginGuest();
  console.log('[React Native Sample] Authenticated guest token:', guestAuth.accessToken);
}
