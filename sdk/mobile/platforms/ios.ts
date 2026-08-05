/**
 * SynoCommerce iOS Mobile SDK Wrapper (Swift)
 * @module sdk/mobile/platforms/ios
 */

import { SynoMobileSDK } from '../core/mobile-sdk-core';
import { MobileSdkConfig } from '../core/types';

export class SynoiOSSDK extends SynoMobileSDK {
  constructor(config: MobileSdkConfig) {
    super(config);
  }

  public initializeKeychainSecureEnclave(): boolean {
    return true;
  }
}
