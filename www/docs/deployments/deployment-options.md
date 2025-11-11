---
id: deployment-options
title: Private deployment options
sidebar_label: Deployment options
---

A private deployment of Vectara is designed to work with your existing 
infrastructure choices, offering flexible deployment models to match your 
organization's specific requirements.

## Deployment models

### Traditional on-premises

Run Vectara in your data center. Air-gapped supported.

- Physical servers or VMs
- No internet required after initial setup
- Your hardware, your rules

### Private cloud (VPC)

Deploy in your existing cloud account:

- **AWS**: EKS or self-managed Kubernetes in your VPC
- **GCP**: Private GKE clusters with your security policies
- **Azure**: AKS with your network controls
- **Other**: Various Kubernetes distributions supported

## What you need

### Kubernetes

Container-based deployment on your cluster:

- Enterprise distributions supported
- Managed services: EKS, GKE, AKS
- Standard Kubernetes environments

### Storage

- **Block storage**: Your existing CSI driver
- **Object storage**: Any S3-compatible API (MinIO, Ceph, actual S3)

### Observability

Standard metrics and logging:

- Prometheus-compatible metrics
- Log export via Fluentbit
- OpenTelemetry trace support

### GPU acceleration (optional)

NVIDIA GPU support available:

- Accelerated embedding generation
- Improved reranking performance
- MIG partitioning compatible

## How we deploy

### Infrastructure as Code

Everything deploys via Terraform or Helm:

- Version-controlled configurations
- Your Git, your process
- Test in staging, promote to prod
- Rollback is just `git revert`

### Updates on your schedule

- Regular version releases provided
- Customer-controlled upgrade timing
- Canary deployment support
- No forced updates

### Model flexibility

Choose your LLMs based on your requirements:

- **Use ours**: Vectara-optimized models included
- **Bring yours**: Connect GPT-4, Claude, Gemini, or Llama
- **Mix and match**: Different models for different use cases
- **Air-gapped**: Local models only, no external calls

### Integration ready

Compatible with existing infrastructure:

- **Auth**: OIDC/SAML via your IdP
- **APIs**: Standard REST API
- **CI/CD**: ArgoCD, Flux, Jenkins compatible
- **Backups**: Velero-compatible
