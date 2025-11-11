---
id: deploy-and-scale
title: Deploy and scale
sidebar_label: Deploy and scale
---

Deploy Vectara securely and scale your AI applications with enterprise-grade features. This section covers authentication, authorization, deployment options, and operational capabilities for production environments.

## Security and Access Control

### Security and Data Privacy

- **[Security and Data Privacy](/docs/security/data-privacy/overview)** - Encryption, data isolation, and compliance certifications

### Authentication

Secure your API access with API keys or OAuth 2.0:

- **[Authentication Methods and Authorization Levels](/docs/security/authentication/overview)** - Overview of authentication options
- **[Choose Authentication Method](/docs/security/authentication/choose-auth-method)** - API keys vs OAuth 2.0
- **[API Key Management](/docs/security/authentication/api-key-management)** - Create and manage API keys
- **[OAuth 2.0](/docs/security/authentication/oauth)** - Set up OAuth for production apps
- **[API Authentication Examples](/docs/deploy-and-scale/authentication/api-authentication-examples)** - Code samples

### Authorization

Control access to your Vectara resources:

- **[Enterprise Access Patterns](/docs/security/authorization/vectara-personas-and-access-patterns)** - Common access control scenarios
- **[Role-Based Access Control](/docs/security/authorization/role-based-access-control)** - Assign permissions by role (RBAC)
- **[Attribute-Based Access Control](/docs/security/authorization/attribute-based-access-control)** - Fine-grained permissions (ABAC)
- **[Multi-Tenant Corpus Isolation](/docs/security/authorization/multi-tenant-corpus-isolation)** - Separate data by tenant
- **[Combine Access Control with Application Filters](/docs/security/authorization/combine-access-control-with-app-filters)** - Layer filters for security

### Resource Addressing

- **[Resource Addressing](/docs/api-reference/api-concepts/resource-addressing)** - How to reference corpora, documents, and resources

## Deployment Options

- **[Private Deployment](/docs/deployments)** - Deploy on-premises (air-gapped), in your VPC, or in a dedicated cloud environment for complete data sovereignty

## Operations and Monitoring

- **[Observability and Evaluation](/docs/learn/query-observability)** - Track performance, monitor usage, and evaluate response quality
- **[Bring Your Own LLM](/docs/search-and-retrieval/bring-your-own-llm)** - Use your own large language model for generation

---

## Common Deployment Paths

### For Development and Testing

1. **[Sign up for a trial](/docs/vectara-trial)** - 30-day SaaS trial with full features
2. **[Create API keys](/docs/security/authentication/api-key-management)** - Quick authentication for development
3. **[Build your first app](/docs/developer-quickstart)** - Get started in 5 minutes

### For Production (SaaS)

1. **[Switch to OAuth 2.0](/docs/security/authentication/oauth)** - More secure than API keys
2. **[Configure RBAC](/docs/security/authorization/role-based-access-control)** - Control team access
3. **[Enable monitoring](/docs/learn/query-observability)** - Track performance and usage
4. **[Review security settings](/docs/security/data-privacy/overview)** - Ensure compliance

### For Production (Private Deployment)

1. **[Evaluate deployment options](/docs/deployments/deployment-options)** - Choose on-prem, VPC, or dedicated cloud
2. **[Start evaluation process](/docs/deployments/onprem-evaluation-process)** - Work with Vectara team
3. **[Configure SSO](/docs/deployments/guides/vectara-okta-oidc)** - Integrate with your identity provider
4. **[Deploy and migrate](/docs/deployments/private-deployment-overview)** - Move to production

---

## Security and Compliance

Vectara is built for enterprise security requirements:

- **SOC 2 Type II certified** - Independently audited security controls
- **HIPAA compliant** - Healthcare data protection
- **Zero training on customer data** - Your data stays private
- **Encryption at rest and in transit** - AES-256 and TLS 1.2+
- **Fine-grained access control** - RBAC and ABAC support
- **Audit logging** - Complete activity trails
- **Multi-tenant isolation** - Secure data separation

**Need air-gapped deployment?** Vectara supports fully disconnected on-premises installations for organizations with the highest security requirements.

---

## Next Steps

- **New to Vectara?** Start with the [Developer Quickstart](/docs/developer-quickstart)
- **Planning production deployment?** Review [Private Deployment options](/docs/deployments)
- **Need help?** Contact us at [sales@vectara.com](mailto:sales@vectara.com) or join our [Discord community](https://discord.gg/vectara)
