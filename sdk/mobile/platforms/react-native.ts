/**
 * SynoCommerce React Native & Expo Mobile SDK Wrapper
 * @module sdk/mobile/platforms/react-native
 */

import { SynoMobileSDK } from '../core/mobile-sdk-core';
import { MobileSdkConfig } from '../core/types';

export class SynoReactNativeSDK extends SynoMobileSDK {
  constructor(config: MobileSdkConfig) {
    super(config);
  }

  public initializeExpoSecureStore(): boolean {
    return true;
  }
}
