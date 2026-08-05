/**
 * Enterprise DevOps, CI/CD & Release Engineering Type Definitions
 * @module platform/devops/types
 */

export type DeploymentStrategy = 'BLUE_GREEN' | 'CANARY' | 'ROLLING';
export type ReleaseType = 'GA' | 'RC' | 'HOTFIX';

export interface QualityGateResult {
  passed: boolean;
  typeCheckClean: boolean;
  testPassRatePercentage: number;
  coveragePercentage: number;
  securityVulnerabilitiesCount: number;
}

export interface DevOpsPipelineRecord {
  pipelineId: string;
  version: string;
  releaseType: ReleaseType;
  strategy: DeploymentStrategy;
  status: 'PENDING' | 'RUNNING' | 'DEPLOYED' | 'ROLLED_BACK';
  qualityGates: QualityGateResult;
  changelog: string[];
  createdAt: Date;
}

export interface HelmManifestSpec {
  chartName: string;
  version: string;
  replicas: number;
  imageRepository: string;
  imageTag: string;
  ingressHost: string;
}

export interface SbomRecord {
  sbomId: string;
  format: 'SPDX-2.3' | 'CYCLONEDX-1.5';
  packageName: string;
  version: string;
  dependenciesCount: number;
  artifactSha256: string;
  generatedAt: Date;
}
