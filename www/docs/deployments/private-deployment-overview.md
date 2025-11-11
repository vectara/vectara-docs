---
id: private-deployment-overview
title: Private deployment overview
sidebar_label: Overview
---

A Vectara private deployment provides the same platform capabilities within your infrastructure, designed for organizations with specific data residency or security requirements.

**Why private deployment?**

* **Data stays put**: Processing takes place where your information resides. No 
  outside API calls (unless you want them), no uploads.
* **Compliance-ready**: For secret contexts, you create air-gapped systems. 
  HIPAA, SOC 2, and FedRAMP controls are all handled by your own methods.

## Agentic AI platform capabilities

- Multilingual semantic search capabilities
- Advanced RAG with accuracy controls
- AI Agents framework with tool integration
- Enterprise-grade performance

## Deploy anywhere

- **On-premises**: Traditional data center deployments
- **Cloud VPC**: Major cloud providers supported
- **Air-gapped**: Isolated network environments
- **Kubernetes**: Container-based deployment

## Technical deployment

Infrastructure as code deployment:

1. **Terraform/Helm packages** - Deploy like any other K8s app
2. **Your models or ours** - Connect OpenAI, Anthropic, Google, or use included models
3. **Standard integrations** - OIDC auth, Prometheus metrics, S3 storage

## Why engineers choose private deployment

- **Control the stack**: Your K8s, your monitoring, your backups
- **Model flexibility**: Use GPT-4 for chat, Llama for summaries, whatever works
- **No black boxes**: See the metrics, logs, and traces
- **Updates when ready**: Deploy updates on your schedule

