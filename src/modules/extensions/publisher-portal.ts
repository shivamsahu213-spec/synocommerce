/**
 * Developer Console & Publisher Portal
 * @module src/modules/extensions/publisher-portal
 */

import { PublisherAppSubmission } from './types';
import { PluginSigningEngine } from './plugin-signing';

export class PublisherPortalProcessor {
  private signingEngine = new PluginSigningEngine();

  public submitApp(submission: PublisherAppSubmission): { submissionId: string; status: 'APPROVED' | 'REJECTED' } {
    const validSig = this.signingEngine.verifyPackageSignature(submission.pkg);
    if (!validSig) {
      return { submissionId: `sub_${Date.now()}`, status: 'REJECTED' };
    }

    return {
      submissionId: `sub_${Date.now()}`,
      status: 'APPROVED',
    };
  }
}
