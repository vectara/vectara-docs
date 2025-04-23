---
id: personas-and-access-patterns
title: Vectara Personas and Access Patterns
sidebar_label: Vectara Personas and Access Patterns
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';


#### Who Uses Vectara and How
| Persona   | Role                                      | Primary Access Layer | Auth & Authz Scope                     | PII Access? |
|-----------|-------------------------------------------|----------------------|----------------------------------------|-------------|
| **Admin** | Manages system config, user access, uptime| Console and Admin API| SSO (e.g., Google), OAuth 2.0; full RBAC | No          |
| **Developer** | Builds integrations, tests APIs       | Console and API      | SSO, API Keys (zut_, zqt_, zwt_); scoped RBAC | Test data |
| **End User** | Uses apps (e.g., search, chatbots)     | Client App Only      | SSO/IdP → App (ABAC); no direct access | Yes         |

*Streams*: Admins configure and monitor; Developers design corpora, ingest data, tune queries, or integrate UIs; End Users query via apps.

#### Access Scope and Trust Boundaries
[Update diagram to match landing page, adjust callouts: Admin [Manage], Developer [Query/Index], Client App [Serve], End User [View]]










Understanding who uses Vectara—and how they interact with it—is essential for 
implementing secure, efficient authentication and authorization strategies. 
This section introduces the key personas, maps their access patterns across 
our platform, and clarifies their roles and responsibilities. By aligning personas with Vectara’s architecture, it lays the groundwork for choosing authentication methods, assigning permissions, and enforcing access boundaries.

## Why personas matter for authentication and authorization

Different personas require distinct access levels. A developer testing queries 
in a sandbox should not wield the same privileges as an administrator managing 
user roles or a production app serving end users. Missteps, like using an admin 
API key in a client app, or granting broad corpus access to a test environment, 
can compromise security or stability. This section helps you match personas to 
the right tools and scopes, ensuring a robust security model.

## Who uses Vectara and how

The following table maps common enterprise roles to Vectara access patterns, 
showing where each persona operates (platform, application, or external layer) 
and their authentication/authorization scope. Title variations help align 
internal roles with Vectara’s model.

| Persona   | Role                                      | Primary Access Layer | Auth & Authz Scope                     | PII Access? |
|-----------|-------------------------------------------|----------------------|----------------------------------------|-------------|
| **Admin** | Manages system config, user access, uptime| Console and Admin API| SSO (e.g., Google), OAuth 2.0; full RBAC | No          |
| **Developer** | Builds integrations, tests APIs       | Console and API      | SSO, API Keys (zut_, zqt_, zwt_); scoped RBAC | Test data |
| **End User** | Uses apps (e.g., search, chatbots)     | Client App Only      | SSO/IdP → App (ABAC); no direct access | Yes         |


## Access scope and trust boundaries

Each persona interacts with the platform at a different layer of access, 
bounded by trust and responsibility:

* **Vectara Platform Layer:** Includes the Vectara Console and direct API access, 
  where Platform Admins manage account-level settings and corpora, and Developers 
  (including Dev Team Leads and ML Engineers) have scoped access to query or 
  index specific corpora.
* **Client Application Layer:** Connects Vectara to end users through applications, 
  which authenticate via API Keys or OAuth to perform tasks like querying 
  corpora or serving filtered results.
* **External IdP Layer:** Exists outside Vectara, where Application End Users 
  authenticate to client apps (such as via SSO/IdP) and interact with filtered 
  data through app-mediated queries and UI.

```
   +- -- -- -- -- -- -- -- -- -- -- -- -- -- -+ 
   | Vectara Users                            |
   |  +-----------------+  +----------------+ |
   |  |      Admin      |  | Developer      | | 
   |  |                 |  | Dev Team Lead  | |
   |  |                 |  | ML Engineer    | |
   |  |                 |  |                | |
   |  | Auth: SSO/SAML  |  | Auth: SSO/SAML | |
   |  | Access: Account |  | Access: Corpus | |
   |  |                 |  | (scoped)       | |
   |  | - Create corpora|  | - Query corpora| |
   |  | - Assign roles  |  | - Index docs   | |
   |  | - Config system |  | - Test APIs    | |
   |  | - Monitor usage |  | - View metadata| |
   |  |                 |  |                | |
   |  +----------------+   +----------------+ |
   |         |                  |             |
   |      Manage Account     Query/Index      |
   |         |                  |             |
   |         v                  v             |
   |    +---------------------------+         |
   |    |   Vectara Platform        |         | 
   |    |   (Identities & Corpora)  |         |
   |    |  - Account owners         |         |
   |    |  - Admins                 |         |
   |    |                           |         |
   |    +---------------------------+         |
   |                  ^                       |
   |                  |                       |
   |              API Requests                |
   |                  |                       |
   |  +-----------------------+               |
   |  | Client App            |               | 
   |  | Auth: API Keys/OAuth  |               |
   |  | Access: Corpus        |               |
   |  | - Query corpora       |               |
   |  | - Index docs          |               |
   |  | - Serve results       |               |
   |  | - Create corpora (Admin only)         |
   |  |                       |               |
   |  +-----------------------+               |
   |                                          |
   +- -- -- -- -- -- -- -- -- -- -- -- -- -- -+
           |
           | End User Authentication
           | End User Access Control
           v
   +------------------+
   | Application      |
   | End User         |
   |                  | 
   | Auth: SSO/IdP    |
   | Access: ABAC     |
   | - Submit queries |
   | - View results   |
   | - Use app UI     |
   |                  |
   +------------------+
   ```

## Typical Authentication Paths per Persona

The following table outlines how each persona authenticates, best practices to 
follow, and pitfalls to avoid.

| Persona              | How They Authenticate                          | Best Practices                                      | Common Mistakes to Avoid                     |
|----------------------|------------------------------------------------|----------------------------------------------------|---------------------------------------------|
| **Platform Admin**   | OAuth 2.0 + MFA, Personal API Key (zut_)       | Enforce MFA, rotate keys, limit corpus access with RBAC | Using admin key in client-side apps         |
| **Dev Team Lead**    | Personal API Key (zut_), OAuth 2.0             | Use separate corpora per env, scope dev keys tightly | Reusing dev keys in production              |
| **App Developer**    | Query/Index API Keys (zqt_, zwt_), OAuth 2.0   | Separate keys for query/index, secure secrets       | Sharing keys across corpora                 |
| **ML Engineer**      | API Keys (zqt_, zwt_), OAuth 2.0 (optional)    | Use training corpora, avoid broad-scope keys        | Accessing prod corpora with broad keys      |
| **End User**         | SSO to app → Metadata filters via app logic    | Apply ABAC filters, validate identity in app        | Allowing direct Vectara access or unfiltered queries |


