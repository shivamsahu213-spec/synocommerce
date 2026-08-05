/**
 * SynoCommerce Flutter Mobile SDK Wrapper (Dart)
 * @module sdk/mobile/platforms/flutter
 */

import { SynoMobileSDK } from '../core/mobile-sdk-core';
import { MobileSdkConfig } from '../core/types';

export class SynoFlutterSDK extends SynoMobileSDK {
  constructor(config: MobileSdkConfig) {
    super(config);
  }

  public initializePlatformChannel(): boolean {
    return true; // Flutter MethodChannel bridge initialization
  }
}
