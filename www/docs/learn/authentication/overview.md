---
id: auth-overview
title: Authentication and Authorization
sidebar_label: Authentication and Authorization
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import vars from '@site/static/variables.json';


Vectara has robust authentication and authorization methods in place to secure 
your data and operations. We provide a structured authentication and 
authorization model to control access to its platform and data. This section 
outlines the various levels of authentication and authorization, including 
capabilities, limitations, and potential improvements. It also provides  
structured tables for quick reference to help answer key questions for 
internal discussions.

* [Authentication methods in Vectara](/docs/learn/authentication/auth-overview#authentication-methods-in-vectara)
* [Authorization levels in Vectara](/docs/learn/authentication/auth-overview#authorization-levels-in-vectara)


## Authentication methods in Vectara

Vectara employs a role-based access control (RBAC) model primarily at the 
account and corpus levels. The following table provides a structured breakdown 
of authorization capabilities with API key types and their usage.


| API Key Type       | Key Prefix | Allowed Operations                                                 | Access Scope                            | Intended Use                                              |
|--------------------|------------|--------------------------------------------------------------------|------------------------------------------|------------------------------------------------------------|
| **Personal API Key**  | `zut_...`  | Some limitations such as not deleting your account or creating users | Account-wide (inherits user’s permissions) | Administrative tasks, prototyping, full access across corpora |
| **Query API Key**      | `zqt_...`  | Read-only search operations                                        | Corpus-specific                          | Front-end applications, public-facing query requests       |
| **Index API Key**      | `zwt_...`  | Read and write (indexing and querying)                             | Corpus-specific                          | Server-side indexing and querying                          |
| **OAuth 2.0 Token**    | (JWT token)| Defined by roles granted to OAuth client                           | Account or corpus scope                  | Secure production authentication, third-party integrations |

## Choosing between personal, query, or index API keys, or OAuth 2.0

Vectara supports two primary authentication mechanisms: [API keys](/docs/learn/authentication/api-key-management) and 
[OAuth 2.0 tokens](/docs/learn/authentication/oauth-2). Choosing the right option depends on your application access 
needs and security requirements.

### API keys

You pass one of the following API key types in the `x-api-key` header:

* **Personal API keys:** Inherit the permissions of the user who created them. 
  These keys have account-wide access that you should treat like passwords. 
  Use with caution, especially in production environments.
* **Query API keys:** Grant read-only access to a specific corpus. Ideal for 
  public-facing or front-end query operations.
* **Index API keys:** Allow both read and write access (indexing and querying) 
  within a specific corpus. Best suited for server-side indexing workflows.

:::caution
Query and Index API keys are scoped to individual corpora and 
cannot access others unless explicitly configured. Always apply the principle 
of least privilege—create separate keys for each use case to reduce risk.
:::

### OAuth 2.0

OAuth 2.0 provides fine-grained, role-based access control with built-in token 
expiration and lifecycle management. This makes it a more secure and scalable 
choice for production systems and third-party integrations.

:::tip
We recommend that you use OAuth 2.0 wherever possible in production. It offers 
better security, auditability, and access management compared to long-lived 
API keys.
:::

## Authorization levels in Vectara

Authorizations in <Config v="names.product"/> include roles at the account and 
corpus levels. Account features also differ from roles and are generally tied 
to the account tier. For more details about <Config v="names.product"/>'s authorization/permissions 
model, see the [RBAC authorization](/docs/learn/authentication/role-based-access-control) page.


| Authorization level               | What it controls                                                    | Supported roles and mechanisms                                            | How it works                                                                                  | Limitations                                                                                      |
|----------------------------------|---------------------------------------------------------------------|---------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| **Account-level** (application-level) | High-level admin and management actions across corpora              | Vectara Account Roles (Owner, Admin, Billing, etc.)                        | Grants full admin access across corpora and user management                                    | None. Fully supported. No access to specific document contents.                                 |
| **Corpus-level** (primary authorization layer) | Which users, API keys, or apps can query, index, or administer a corpus | Corpus Roles: Query (QRY), Index (IDX), Admin (ADM)                        | API keys and OAuth tokens are assigned access per corpus. No cross-corpus access unless explicitly granted. | Fully supported. Primary method for data segmentation.                                           |
| **Document-level** (per-user data isolation within corpus) | Ensures users only see their documents within a shared corpus      | No direct document-level roles                                             | Use metadata filters at query time (e.g., `metadata_filter: "user_id = X"`)                   | Workaround required. Not an enforced security model. Users with Query access could bypass filters if misused. |
| **Field-level** (granular document access) | Control over specific fields in a document                         | No built-in field-level roles                                              | Entire document contents are visible to anyone with Query (QRY) access to the corpus.         | Not supported natively. Workaround: store sensitive fields in a separate restricted corpus, or use metadata filters during queries. |
| **Multi-tenant** (per-customer access control) | Enforcing isolation for different customers                         | Segmentation per corpus (recommended)                                     | Assign each customer their own corpus, and grant API keys per corpus.                         | Requires corpus management. Alternative (filters) offers weaker security.                        |

