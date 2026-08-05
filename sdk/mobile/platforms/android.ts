/**
 * SynoCommerce Android Mobile SDK Wrapper (Kotlin / Java)
 * @module sdk/mobile/platforms/android
 */

import { SynoMobileSDK } from '../core/mobile-sdk-core';
import { MobileSdkConfig } from '../core/types';

export class SynoAndroidSDK extends SynoMobileSDK {
  constructor(config: MobileSdkConfig) {
    super(config);
  }

  public initializeAndroidKeystore(): boolean {
    return true;
  }
}
