/**
 * Enterprise DevOps, CI/CD & Release Engineering Platform Test Suite
 * @module platform/devops/tests/devops.test
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DevOpsEngineProcessor,
  HelmK8sGeneratorEngine,
  SbomGeneratorEngine,
} from '../index';

test('Enterprise DevOps, CI/CD & Release Engineering Platform', async (t) => {
  const devops = new DevOpsEngineProcessor();
  const helmK8s = new HelmK8sGeneratorEngine();
  const sbom = new SbomGeneratorEngine();

  await t.test('Evaluates quality gates and rejects pipeline if typecheck or tests fail', () => {
    const passedGate = devops.evaluateQualityGates(true, 100, 0);
    assert.equal(passedGate.passed, true);

    const failedGate = devops.evaluateQualityGates(false, 100, 0);
    assert.equal(failedGate.passed, false);
  });

  await t.test('Triggers Blue-Green GA release pipeline with automated changelog', () => {
    const gates = devops.evaluateQualityGates(true, 100, 0);
    const pipe = devops.triggerReleasePipeline('1.0.0-rc1', 'GA', 'BLUE_GREEN', gates);

    assert.equal(pipe.status, 'DEPLOYED');
    assert.equal(pipe.version, '1.0.0-rc1');
    assert.ok(pipe.changelog.length > 0);
  });

  await t.test('Generates production Helm values spec & Kubernetes Deployment YAML manifest', () => {
    const spec = {
      chartName: 'synocommerce-api',
      version: '1.0.0-rc1',
      replicas: 3,
      imageRepository: 'ghcr.io/synostack/synocommerce',
      imageTag: 'v1.0.0-rc1',
      ingressHost: 'api.synocommerce.com',
    };

    const helmValues = helmK8s.generateHelmValuesSpec(spec);
    assert.equal(helmValues.replicaCount, 3);
    assert.equal(helmValues.ingress.hosts[0].host, 'api.synocommerce.com');

    const k8sYaml = helmK8s.generateKubernetesDeploymentYaml(spec);
    assert.ok(k8sYaml.includes('kind: Deployment'));
    assert.ok(k8sYaml.includes('image: ghcr.io/synostack/synocommerce:v1.0.0-rc1'));
  });

  await t.test('Generates SPDX-2.3 Software Bill of Materials (SBOM) and SHA-256 artifact signature', () => {
    const sbomRecord = sbom.generateSpdxSbom('synocommerce', '1.0.0-rc1', 42);
    assert.equal(sbomRecord.format, 'SPDX-2.3');
    assert.ok(sbomRecord.artifactSha256.length === 64);
  });

  await t.test('Executes automated pipeline rollback on deployment failure', () => {
    const gates = devops.evaluateQualityGates(true, 100, 0);
    const pipe = devops.triggerReleasePipeline('1.0.0-rc1', 'GA', 'BLUE_GREEN', gates);

    const rolledBack = devops.rollbackPipeline(pipe.pipelineId);
    assert.equal(rolledBack.status, 'ROLLED_BACK');
  });
});
