---
id: choose-auth-method
title: Choose the Right Authentication Method
sidebar_label: Choose the Right Authentication Method
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

Vectara supports two main methods for authenticating API requests: [**API keys**](/docs/learn/authentication/api-key-management) 
and [**OAuth 2.0 tokens**](/docs/learn/authentication/oauth-2). Choosing the right one depends on where and how your 
application or team interacts with Vectara’s APIs, whether you are a Developer 
prototyping or a Platform Admin securing operations.

Query and Index API keys are scoped to individual corpora and cannot access 
others unless explicitly configured, perfect for App Developers building 
targeted apps. Always apply the principle of least privilege—create separate 
keys for each use case to reduce risk, a key practice for Platform Admins 
managing access. 

:::tip 
We recommend that you use OAuth 2.0 wherever possible in production. It offers 
better security, auditability, and access management compared to long-lived 
API keys.
:::

This guide helps you select the best method based on:

- Your architecture (frontend, backend, serverless)
- Your security needs (short-lived vs long-lived credentials)
- Your use case (querying, indexing, or admin tasks)

## Authenticaion method comparison table

| Feature / Need                             | Use API Keys                   | Use OAuth 2.0                     |
|-------------------------------------------|--------------------------------|-----------------------------------|
| Simplest setup for prototyping            | ✅ Yes                         | ❌ Not ideal                      |
| Works in browser/client-side code         | ✅ (Query key only)            | ❌ Not supported directly         |
| Requires read-only access only            | ✅ Query API Key               | ✅ Use role-scoped token          |
| Requires read/write/indexing              | ✅ Index API Key               | ✅ Use indexing role in OAuth     |
| Backend server access (secure)            | ✅ (Server key)                | ✅ Preferred                      |
| Rotating credentials automatically        | ❌ Manual rotation             | ✅ Built-in token expiration      |
| Fine-grained access scopes                | ⚠️ Corpus-level only           | ✅ Role-based per corpus/account  |
| Ideal for public integrations             | ❌ Use carefully               | ✅ Token-based control preferred  |
| Safe for long-term use in production      | ⚠️ Rotate keys manually        | ✅ Expiring tokens = safer        |

---

## Authentication methods by use case

### Prototyping or admin tasks

> **Use:** Personal API Key  
> **Why:** Inherits your user account’s permissions and works across all 
accessible corpora.

**Example:** A Platform Admin creating corpora or a Developer testing ingestion 
in development.

```bash
x-api-key: zut_1234...
```

:::danger
Never use Personal API keys in production. They have broad access and should 
be treated like passwords. Platform Admins must avoid this risk in live 
systems.
:::

### Public-facing query interface

> **Use:** Query API Key  
> **Why:** Read-only and scoped to specific corpora — safe for front-end embedding.

**Example:** An App Developer adding search to a marketing website or help center.

```bash
x-api-key: zqt_abcd...
```

Ideal for usage in web or mobile apps when security is scoped and no indexing 
is required. This is great for Application End Users’ query needs.

### Secure indexing and backend workloads

> **Use:** Index API Key  
> **Why:** Enables document ingestion and querying. Use in secure backend services.

**Example:** An ML Engineer optimizing RAG by indexing data from an internal CMS.

```bash
x-api-key: zwt_5678...
```
Do not expose index keys to browser-based clients — treat them as secrets, 
a rule App Developers must follow.

### Production-grade security and role control

> **Use:** OAuth 2.0 (JWT Token)  
> **Why:**: Scoped, expiring tokens managed by app clients. Best for services 
and third-party apps.

**Example:** A Dev Team Lead deploying a microservice querying corpora based 
on user roles.

```bash
Authorization: Bearer eyJhbGciOi...
```
Use OAuth to:

* Limit access by role (query/index/admin)
* Automatically expire and rotate tokens
* Enforce strong isolation between clients
* Build integrations that follow security best practices

## Authentication method decision guide

| **You need to…**                                | **Use this**            | **Why it works**                                                                 |
|--------------------------------------------------|--------------------------|----------------------------------------------------------------------------------|
| Explore the API or prototype                    | **Personal API Key**     | Grants full access to your account's corpora; easy to use during development.   |
| Build a public search UI                        | **Query API Key**        | Read-only access scoped to one or more corpora; safe to expose in frontend apps.|
| Index documents securely from a backend         | **Index API Key**        | Allows both indexing and querying; must be kept secure in back-end environments.|
| Control client roles in production              | **OAuth 2.0 Token**      | Assigns fine-grained roles and scopes; ideal for service-to-service access.     |
| Automate token rotation                         | **OAuth 2.0 Token**      | Tokens expire and regenerate automatically; avoids long-lived credential risk.  |
| Prevent accidental key leaks                    | **OAuth 2.0 Token**      | JWTs are short-lived and harder to misuse; easier to detect and revoke.         |


## What’s Next?

* Create and Use API Keys
* Authenticate with OAuth 2.0
* Assign Roles to Users and Clients

