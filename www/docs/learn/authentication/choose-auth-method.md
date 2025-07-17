---
id: choose-auth-method
title: Choose the Right Authentication Method
sidebar_label: Choose the Right Authentication Method
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import vars from '@site/static/variables.json';

import CodePanel from '@site/src/theme/CodePanel';


Vectara supports two main methods for authenticating API requests: [**API keys**](/docs/learn/authentication/api-key-management) 
and [**OAuth 2.0 tokens**](/docs/learn/authentication/oauth-2). Choosing the right one depends on where and how your 
application or team interacts with Vectara’s APIs, whether you are a Developer 
prototyping or a Platform Admin securing operations.

:::tip 
We recommend that you use OAuth 2.0 to authenticate API requests in 
production. It offers better security, auditability, and access management 
compared to API keys.
:::

This guide helps you select the best method based on:

- Your architecture (frontend, backend, serverless)
- Your security needs (short-lived vs long-lived credentials)
- Your use case (querying, indexing, or admin tasks)

## Authentication method selection

The following table compares API Keys and OAuth 2.0, highlighting key features 
and scenarios to guide your choice, whether you are a Developer experimenting 
with APIs or an Admin configuring secure access:

| Scenario                                       | Recommended Method                     | Why This Works                                                                 | Workflows                                                                 |
|-----------------------------------------------|---------------------------------------|--------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| Explore the API or prototype                  | ✅ Personal API Key (`zut_`)          | Simplest setup <br/><br/>Grants full account access across corpora for testing.         | A Developer tests ingestion in a sandbox; an Admin creates corpora for setup.   |
| Build a public search UI                      | ✅ Query API Key (`zqt_`)             | Read-only, corpus-scoped <br/><br/>Safe for frontend apps like web/mobile interfaces.   | An App Developer embeds search in a help center for End Users to browse FAQs.   |
| Index documents securely from a backend       | ✅ Index API Key (`zwt_`)             | Enables indexing and querying <br/><br/>Secure for backend services if protected.       | An ML Engineer indexes CMS data for RAG optimization in a secure environment.  |
| Control client roles in production            | ✅ OAuth 2.0 Token (JWT)              | Role-based, expiring tokens (30 min) <br/><br/>Ideal for service-to-service access.     | A Dev Team Lead deploys a microservice querying corpora with user-specific roles. |
| Automate token rotation                       | ✅ OAuth 2.0 Token (JWT)              | Built-in expiration reduces risk of long-lived credentials.                   | An Admin automates secure workflows for Client Apps.                           |
| Prevent accidental key leaks                  | ✅ OAuth 2.0 Token (JWT)              | Short-lived tokens are harder to misuse <br/><br/>Detectable by security tools.         | A Client App serves End Users with minimal exposure risk.                       |
| Access APIs beyond indexing/querying (e.g., admin tasks) | ✅ OAuth 2.0 Token (JWT)   | Supports broader permissions (such as corpus creation) with role-based control.  | An Admin manages API keys or corpora via secure tokens.                        |
| Secure backend server access                  | ✅ API Key (Server) or ✅ OAuth 2.0    | API keys work if secured <br/><br/>OAuth expiring tokens are safer for production.    | A Developer runs a backend service accessing corpora securely.                  |
| Use in browser/client-side code               | ✅ Query API Key (`zqt_`)             | Read-only, safe for public exposure <br/><br/>OAuth unsuitable for frontend.            | A Developer builds a public UI for End Users to query a help center.           |
| Fine-grained access scopes                    | ✅ OAuth 2.0 Token (JWT)<br/><br/>⚠️ API Keys: Corpus-level only       | OAuth offers role-based scoping per corpus/account for precise control.        | A Dev Team Lead sets precise access for a Client App; an Admin configures roles. |
| Safe for long-term production use             | ✅ OAuth 2.0 Token (JWT)<br/><br/>⚠️ API Keys: Use with care, rotate manually | OAuth expiring tokens are safer, reducing exposure risk.           | An Admin ensures long-term security for Client Apps; a Developer deploys safely. |

## Authentication methods by use case

### Prototyping or admin tasks

* **Use:** [Personal API Key](/docs/learn/authentication/api-key-management#personal-api-key) 
* **Why:** Inherits your user account’s permissions and works across all 
accessible corpora.
* **Example:** A Platform Admin creating corpora or a Developer testing ingestion 
in development.

:::danger
Never use Personal API keys in a production system. They have broad access and 
should be treated like passwords. Admins must avoid this risk in live systems.
:::

### Public-facing query interface

* **Use:** [Query API Key](/docs/learn/authentication/api-key-management#query-api-keys)
* **Why:** Read-only and scoped to specific corpora — safe for front-end embedding.
* **Example:** An App Developer adding search to a marketing website or help center.

Ideal for usage in web or mobile apps when security is scoped and no indexing 
is required.

### Secure indexing and backend workloads

* **Use:** [Index API Key](/docs/learn/authentication/api-key-management#index-api-keys)
* **Why:** Enables document ingestion and querying. Use in secure backend services.
* **Example:** An ML Engineer optimizing RAG by indexing data from an internal CMS.

Do not expose index keys to browser-based clients. Treat them as secrets.

### Production-grade security and role control

* **Use:** [OAuth 2.0 (JWT Token)](/docs/learn/authentication/oauth-2)
* **Why:** Scoped, expiring tokens managed by app clients. Best for services 
and third-party apps.
* **Example:** A Dev Team Lead deploying a microservice that queries corpora based 
on user roles.

Use OAuth to:

* Limit access by role (query/index/admin)
* Automatically expire and rotate tokens
* Enforce strong isolation between clients
* Build integrations that follow security best practices

## What’s Next?

* [Create and Use API Keys](/docs/learn/authentication/api-key-management)
* [Authenticate with OAuth 2.0](/docs/learn/authentication/oauth-2)
* [Set Up Account and Corpus Permissions (RBAC)](/docs/learn/authentication/role-based-access-control)
