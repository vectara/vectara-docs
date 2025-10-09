---
id: multi-tenant-corpus-isolation
title: Isolate Tenants with Corpora
sidebar_label: Isolate Tenants with Corpora
---


import CodePanel from '@site/src/theme/CodePanel';

Without isolation, a compromised key could lead to unauthorized access across 
tenants. Relying on metadata filters in a shared corpus risks errors, such as 
misconfigured filters exposing sensitive data, and complicates auditing due to 
complex filter logic and lack of clear access boundaries.

Vectara enables you to create completely isolated corpora—making it an ideal 
platform for multi-tenant applications. Each tenant can have their own secure 
data container (corpus), API keys scoped only to that corpus, and complete 
separation from other customers.

This guide walks you through isolating tenants at the corpus level for strong 
security, predictable access patterns, and simplified troubleshooting.

## Corpus isolation benefits

| **Benefit**                        | **Why It Matters**                                              |
|------------------------------------|------------------------------------------------------------------|
| Hard security boundary             | API keys are only valid for specific corpora                    |
| No need for metadata filters       | Access enforcement is at the platform level                    |
| Tenant self-service readiness      | Easier to automate onboarding and offboarding                  |
| Per-tenant usage & monitoring    | Enables per-corpus usage tracking                              |

## Best practices

- ✅ Automate corpus creation and key generation during onboarding
- ✅ Rotate keys per tenant on schedule or revocation
- ✅ Log all usage per corpus for traceability
- ❌ Avoid sharing corpora across tenants unless absolutely necessary

## Prerequisites

- Admin access to create corpora and API keys
- A tenant onboarding workflow or script
- App logic that maps each user to their assigned corpus/key

## Configure tenant isolation per corpus

1. Create a corpus for each tenant and use a predictable naming convention 
   like `tenant_<id>_docs`.
    <CodePanel snippets={[{language: "json", code: `{
      "name": "Tenant: Acme Inc",
      "corpus_key": "acme_docs"
    }`
    }]} title="Naming Convention Example" layout="stacked" />

2. Generate scoped API Keys. Store the secret safely in your application 
   backend or secrets manager.
    <CodePanel snippets={[{language: "json", code: `{
      "api_key_role": "serving_and_indexing",
      "corpus_keys": ["acme_docs"]
    }`
    }]} title="Scoped API Key Example" layout="stacked" />

3. Use the key and corpus in requests:
    <CodePanel snippets={[{language: "json", code: `{
      "x-api-key": "zwt_abc123",
      "query": [{
          "search": {
          "corpora": [{ "corpus_key": "acme_docs" }],
          "limit": 10
          }
      }]
    }`
    }]} title="Scoped API Key Example" layout="stacked" />

Any request using a key tied only to `acme_docs` cannot access other corpora.

---

## Common use case mapping

| **Scenario**                    | **Recommended setup**              |
|----------------------------------|------------------------------------|
| Self-contained customer app     | Per-corpus API keys                |
| Dedicated user dashboards       | App backend maps user → corpus     |
| Customer data use   | One corpus = one usage unit      |

## When not to use corpus isolation

| **Scenario**                                      | **Consider this alternative**                     |
|------------------------------------------------|-------------------------------------------|
| You have 10,000+ low-security tenants          | Shared corpus and ABAC filters              |
| You want to allow dynamic role-based sharing   | ABAC and app logic                          |
| You must allow inter-tenant document sharing   | Metadata filters and group-based ABAC       |
