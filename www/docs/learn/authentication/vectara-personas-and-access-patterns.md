---
id: personas-and-access-patterns
title: Enterprise Access Patterns
sidebar_label: Enterprise Access Patterns
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {vars} from '@site/static/variables.json';
import CodePanel from '@site/src/theme/CodePanel';

Understanding **who** interacts with Vectara, and **how** they interact with it, 
is essential for implementing secure, efficient authentication and 
authorization strategies. This guide introduces key organizational roles, maps 
their access patterns across Vectara, and offers recommendations tailored for 
**enterprise deployments**.

By aligning access needs with Vectara’s architecture, you can confidently 
choose authentication methods, assign permissions, and enforce clear access 
boundaries.

## Why access patterns matter for authentication and authorization

Different organizational roles require **different access levels**:
* A developer testing queries in a sandbox **should not** have the same privileges 
  as an administrator managing user roles.
* A client app serving end users should use **scoped credentials**, not broad 
  admin keys.

Missteps like exposing a personal API key or granting broad access across corpora 
can compromise security or operational stability.

This section helps you **match organizational role** to the right authentication 
method and authorization scope.

```
   +- -- -- -- -- -- -- -- -- -- -- -- -- -- -+ 
   |              Vectara Users               |
   |  +-----------------+  +----------------+ |
   |  |      Admin      |  | Developer      | | 
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
   |      Manage Account     QueryService/    |
   |         |               IndexService     |
   |         |                  |             |
   |         v                  v             |
   |    +---------------------------+         |
   |    |   Vectara Platform        |         | 
   |    |   (Identities & Corpora)  |         |
   |    |  - Account owners         |         |
   |    |  - Admins                 |         |
   |    |  - Team Members (Devs)    |         |
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
   |  | - Create corpora      |               |
   |  |   (Admin only)        |               |
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

## Who uses Vectara and how

The following table maps common organizational roles to Vectara access patterns, 
showing where each role operates (platform, application, or external layer) 
and their authentication/authorization scope.

| Organizational role     | Tasks                                      | Primary Access Layer | How They Authenticate                          | Best Practices                                      | Common Mistakes to Avoid                     |
|--------------|-------------------------------------------|----------------------|------------------------------------------------|----------------------------------------------------|---------------------------------------------|
| **Admin**    | Manages and monitors system config, user access, corpora access, uptime | Console and Admin API | SSO (Google, SAML/OIDC), OAuth 2.0 and MFA, Personal API Key (`zut_`) | Enforce MFA, rotate keys regularly <br/><br/>Limit corpus access with RBAC | Using admin key in client-side apps <br/><br/>Reusing keys in production |
| **Developer** | Builds apps and integrations, ingests data, tests APIs, tunes queries | Console and API      | SSO (Google, soon SAML/OIDC), Personal API Key (`zut_`), QueryService/IndexService API Keys (`zqt_`, `zwt_`), OAuth 2.0 | Start with read-only QueryService API keys (`zqt_`) for safe querying <br/><br/>Use separate corpora per environment, scope keys tightly, secure secrets, use training corpora for tests | Sharing keys across corpora <br/><br/>Accessing production corpora with broad keys <br/><br/>Reusing dev keys in production |
| **End User** | Uses apps (RAG, search, chatbots)         | Client App Only      | SSO to app to Metadata filters with app logic (ABAC) | Apply ABAC filters <br/><br/>Validate identity in app        | Allowing direct Vectara access or unfiltered queries |

## Access scope and trust boundaries

Each organizational role interacts with the platform at a different layer of 
access, bounded by trust and responsibility:

* **Vectara Platform Layer:** Includes the Vectara Console and direct API access, 
  where Admins manage account-level settings and corpora, and Developers 
  (including Dev Team Leads and ML Engineers) have scoped access to query or 
  index specific corpora.
* **Client Application Layer:** Connects Vectara to end users through applications, 
  which authenticate through API Keys or OAuth to perform tasks like querying 
  corpora or serving filtered results.
* **External IdP Layer:** Exists outside Vectara, where Application End Users 
  authenticate to client apps (such as through SSO/IdP) and interact with filtered 
  data through app-mediated queries and UI.

## Group management for scalable access

For teams with multiple users, Vectara supports scalable access control by 
assigning roles to invited team members and scoping API keys for specific 
tasks. While Vectara’s native user management focuses on individual role 
assignments, enterprise customers may integrate with external directory 
services separately to manage groups, mapping them to Vectara’s roles or API 
key permissions. This enables account owners to efficiently control access for 
developers, admins, and other team members.

### Set up groups
1. **Invite Team Members**: Use the Vectara Console to invite users, assigning one 
  of three roles:
   - **Account Admin**: Manages account settings, users, and all corpora.
   - **Corpus Admin**: Manages specific corpora, including creating, querying, and 
  indexing.
   - **Billing Admin**: Handles billing and subscription tasks.
2. **Scope API Keys**: Assign QueryService (`zqt_`) or IndexService (`zwt_`) API keys to developers 
   for corpus-specific access, simulating group-like permissions without native group 
   creation.
3. **Custom Group Integration**: For enterprise setups, integrate with LDAP or SSO 
   providers to map external groups (“Developers,” “HR Admins”) to Vectara 
   roles or API keys.
4. **Whitelisting (Enterprise)**: Pre-approve account IDs for automated user 
  onboarding in custom setups, streamlining access for large teams.

### Best practices
- Start developers with read-only QueryService API keys (`zqt_`) for safe corpus 
  querying, aligning with the principle of least privilege.
- Assign Account Admin or Corpus Admin roles only to trusted users managing the 
  workspace or specific corpora.
- Use standardized naming conventions (e.g., `Vectara_<ID>_developer`) in your 
  directory service to map groups to Vectara roles or keys.
- Regularly audit invited users and API keys in the Vectara Console to ensure 
  authorized access.
- Secure API keys as secrets, especially for IndexService (`zwt_`) or Personal (`zut_`) 
  keys used by developers or admins.

**Example**:
- Invite a developer as a Corpus Admin to manage an HR corpus, granting them 
  an IndexService API key (`zwt_`) for querying and indexing.
- For a team of developers, issue multiple QueryService API keys (`zqt_`) scoped to the 
  same corpus, effectively creating a “developer group”.
- If integration with LDAP, map an external group `Developers_HR` to Corpus 
  Admin roles for the HR corpus, automating access via SSO.

## Data authorization levels

Data in Vectara corpora can be restricted to specific permission levels. These 
levels ensure that developers and end users access only authorized data, such 
as private documents or team-specific records. Permissions are typically 
enforced using metadata filters or dedicated corpora.

**Permission Levels**:
- **Private**: Visible only to the uploader, identified by metadata like 
- `user_id = 'user1'`.
- **Public (domain-specific)**: Accessible to all users in a domain, such as an 
  HR or legal team (`department = 'HR'`).
- **Subgroup-specific**: Restricted to smaller groups within a domain, such as 
  HR managers (`team = 'HR_managers'`).

### Set up data authorization
1. During indexing, tag documents with metadata to define permissions, such 
  as `access_level`, `user_id`, and `team`.
2. At query time, apply metadata filters, such as `metadata_filter: "access_level = 'private' AND user_id = 'user1'"`
   to enforce access.
3. Alternatively, use dedicated corpora for strict isolation. For example, an 
  HR corpus for HR data only.

### Best practices
- Validate metadata during indexing to ensure accurate permissions.
- Test filters in a sandbox corpus before deploying to production.
- Use Attribute-Based Access Control (ABAC) for flexible permission management.
- Restrict public (domain-specific) uploads to trusted users to prevent data 
  pollution.

**Example**:

<CodePanel
  snippets={[
    { language: "json", code:
`{
  "document_id": "hr_doc_001",
  "metadata": {
    "access_level": "subgroup",
    "team": "HR_managers",
    "user_id": "user1"
   },
  "content": "Employee contract..."
}`
}
  ]}
  title="Code Example"
  layout="stacked"
/>