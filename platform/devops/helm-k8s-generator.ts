/**
 * Production Helm Charts & Kubernetes Manifest Generator Engine
 * @module platform/devops/helm-k8s-generator
 */

import { HelmManifestSpec } from './types';

export class HelmK8sGeneratorEngine {
  public generateHelmValuesSpec(spec: HelmManifestSpec): Record<string, any> {
    return {
      replicaCount: spec.replicas,
      image: {
        repository: spec.imageRepository,
        tag: spec.imageTag,
        pullPolicy: 'IfNotPresent',
      },
      ingress: {
        enabled: true,
        className: 'nginx',
        hosts: [{ host: spec.ingressHost, paths: [{ path: '/', pathType: 'Prefix' }] }],
        tls: [{ secretName: `${spec.chartName}-tls`, hosts: [spec.ingressHost] }],
      },
      autoscaling: {
        enabled: true,
        minReplicas: spec.replicas,
        maxReplicas: spec.replicas * 5,
        targetCPUUtilizationPercentage: 75,
      },
    };
  }

  public generateKubernetesDeploymentYaml(spec: HelmManifestSpec): string {
    return `apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${spec.chartName}
  namespace: synocommerce
spec:
  replicas: ${spec.replicas}
  selector:
    matchLabels:
      app: ${spec.chartName}
  template:
    metadata:
      labels:
        app: ${spec.chartName}
    spec:
      containers:
      - name: ${spec.chartName}
        image: ${spec.imageRepository}:${spec.imageTag}
        ports:
        - containerPort: 3000
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 10
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 15
          periodSeconds: 20
`;
  }
}
