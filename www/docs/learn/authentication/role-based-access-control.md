---
id: role-based-access-control
title: Configure Administration Permissions (RBAC)
sidebar_label: Configure Administration Permissions (RBAC)
---

import {Config} from '@site/docs/definitions.md';

Vectara Administrators can configure permissions for three key areas using 
Role-Based Access Control (RBAC):

- **Account**: Manage users, API keys, and account-wide settings, with full control 
  including account deletion (Owner role).
- **Billing**: View and edit billing activity, restricted to financial tasks (Billing 
  Admin role).
- **Corpora**: Control access to specific corpora for querying, indexing, or full 
  administration (Query, Index, Administrator roles).

This guide helps Admins and Developers assign precise roles to authenticated 
entities, whether human users or Client Apps—scoped to accounts or corpora, 
ensuring secure and efficient access management.

Authorization in Vectara defines what actions an authenticated entity (a user 
or app client verified by a JWT token) can perform through **permissions** (for 
example, querying a corpus, resetting its contents). These permissions are 
grouped into **roles**, assigned through the Vectara Console. Entities without 
explicit roles may still access operations through **default permissions**, a 
feature Admins can configure.

### Best practices

- ✅ Use the principle of least privilege: assign only needed roles
- ✅ Review role assignments when rotating keys or changing team structure
- ✅ Separate roles for production vs. development corpora
- ❌ Do not give Admin roles to Client Apps unless essential

### Prerequisites

- Admin access to Vectara Console
- A corpus already created
- Email address of the user or App Client ID for the OAuth client

## Account administration workflow

This workflow focuses on managing account-wide settings, users, and corpora, 
tasks typically handled by Admins configuring the platform.

```
+------------------------------------------+
| Vectara Console (Admin)                  |
| +--------------------------------------+ |
| | 1. Navigate to Billing               | |
| +--------------------------------------+ |
|         |                                |
|         v                                |
| +--------------------------------------+ |
| | 2. View usage data                   | |
| +--------------------------------------+ |
|         |                                |
|         v                                |
| +--------------------------------------+ |
| | 3. Navigate to Team                  | |
| +--------------------------------------+ |
| | - Invite team member                 | |
| |   - Email                            | |
| |   - Username                         | |
| |   - Description                      | |
| |   - Roles                            | |
| |     - Account Admin                  | |
| |     - Corpus Admin                   | |
| |     - Billing Admin                  | |
| |   - Send invitation                  | |
| +------------------------------------+ | |
|         |                         |
|         v                         |
| +-------------------------------+ |
| | 4. Go to Corpus Page         | |
| +--------------------------------------+ |
| | - Manage corpora                     | |
| +-------------------------------+ |
| +-------------------------------+ |
| | 3. Send invitation         | |
| | (Account-Wide Access)         | |
| +-------------------------------+ |
+-----------------------------------+
```

### Account-level roles

Account-level roles grant broad control across the entire account, ideal for 
administrative oversight without direct data access.

- **Owner**: Assigned to the account creator, often an Admin. Grants all 
  permissions, including account deletion, user management, and corpus creation.
- **Account Admin**: Manages all actions except billing (users, API keys, 
  corpora), suitable for Admins overseeing operations.
- **Billing Admin**: Views and edits billing activity only, a specialized role 
  for financial tasks.

**Assign account-level roles**

1. Navigate to Team.
2. Add a user by email and select role.
3. Navigate to Authorization.
4. Create and manage API keys and App clients.

**Use case**: An Admin assigns an Account Admin role to a team member to 
manage all corpora without billing access.

:::note
Account-level roles do not provide document-level access. Use corpus-level 
roles for data interactions.
:::

## Corpus management workflow

This workflow centers on controlling access to specific corpora, enabling 
Developers to query, index, or administer data securely.

```
+-----------------------------------+
| Vectara Console (Admin/Developer) |
| +-------------------------------+ |
| | 1. Go to Corpus Page         | |
| | (Corpus A)                   | |
| +-------------------------------+ |
|         |                         |
|         v                         |
| +-------------------------------+ |
| | 2. Open Access Control tab    | |
| +-------------------------------+ |
|         |                         |
|         v                         |
| +-------------------------------+ |
| | 3. Grant User Access          | |
| | - Select  a user:             | |
| |   - Query:  Read-Only         | |
| |   - Index:  Write+Query       | |
| |   - Query and Index           | |
| |   - Admin: Inherit control    | | 
| +-------------------------------+ |
|         |                         |
|         v                         |
| +-------------------------------+ |
| | 4. Grant access               | |
| | (Corpus-specific Access)      | |
| +-------------------------------+ |
+-----------------------------------+
```

### Corpus-level roles

Corpus-level roles are scoped to individual corpora, assigned from the 
**Access control** tab on the Corpus page.

![Edit user](/img/corpus_auth.png)

- **Query (QRY)**: Permits read-only searches—ideal for Developers or End Users 
 through Client Apps accessing data.
- **Indexing (IDX)**: Allows adding data and querying—used by Developers indexing content.
- **Administrator (ADM)**: Grants full control (query, index, reset, delete, manage permissions)—reserved for Admins managing a corpus.

**Default Roles**: A corpus can set Query or Indexing as default, granting access to any authenticated account user. For example, an Admin might set Query as default to allow all users to search a public corpus.

**Assign corpus-level roles**:
1. Go to Corpora in the Vectara Console.
2. Open the **Access control**  tab.
3. Click **Grant user access**.
4. Select a user and permissions.
5. Save to apply the role to the corpus.

**Use Case**: A Developer assigns query permissions to a user  
for read-only access to a customer support corpus.

:::note
Each corpus requires separate user assignment. No automatic cross-corpus access 
unless explicitly granted.
:::

## How account access differs from role access

Account features, unlike roles, apply account-wide and are tied to your account 
tier, often configured by Admins:
1. Custom dimensions
2. Maximum corpora per query
3. Score retrieval. Whether or not downstream systems have access to the raw
   answer score. Advanced applications can utilize this information for
   thresholding, and for incorporation into downstream machine-learning systems.
4. Encoder swapping. Whether the indexing and querying encoders be swapped to
   support semantic similarity matching in addition to question-answer matching.
5. Textless. Defines whether corpora be built without storing the indexed text.
   Although all textual content is encrypted with per-corpus keys, this option
   may appeal when an even higher level of security is desired. Enabling this
   can potentially reduce the quality of search.
6. User rate limit. Whether per-user rate limits can be defined.
7. Corpus rate limit. Whether per-corpus rate limits can be defined.
8. Corpus encryption key. Whether every corpus uses a separate encryption key
   for maximum security. Currently this feature is enabled for all accounts and
   cannot be disabled.
9. Customer managed encryption key. Whether the account may use a customer
   managed master encryption key. This is an advanced feature that gives the
   customer total control over their data. By revoking access to the master
   key, the account will become inaccessible within minutes to the entire
   platform.
10. Document metadata. Specifies whether document level metadata may be stored
   while indexing. This is currently enabled for all accounts.
11. Document part metadata. Specifies whether part level metadata may be stored
   while indexing. This is currently enabled for all accounts.

## Example scenarios

| **Scenario**                      | **Assigned Role** | **Scope**        |
|-----------------------------------|-------------------|------------------|
| Frontend search app (read-only)   | QRY               | Specific corpus  |
| Backend service indexing data     | IDX               | Specific corpus  |
| Admin user managing all corpora   | Owner             | Account-wide     |
| OAuth client with query rights    | QRY               | One or more corpora |

## Common issues and solutions

| **Symptom**                    | **Cause**                            | **Solution**                                 |
|--------------------------------|---------------------------------------|----------------------------------------------|
| 403 Forbidden (API key)        | Missing corpus role assignment        | Assign QRY or IDX—Admins check               |
| OAuth token returns empty data | App client lacks Query permission     | Assign QRY to app client—Developers note     |
| Index fails with QRY role      | Wrong role assigned                   | Switch to IDX or Admin—Developers adjust     |
