---
id: role-based-access-control
title: Assign Roles to Users and Clients (RBAC)
sidebar_label: Assign Roles to Users and Clients (RBAC)
---


Developers often forget to assign roles after creating corpora or API clients, 
resulting in blocked access or overly broad permissions. This guide helps you 
assign precise access to the right identities—whether human users or 
programmatic clients—using roles scoped to each corpus.

Authorization refers to the role-based access control policies in <Config v="names.product"/> that define
what actions an authenticated entity may perform. In this system, **permissions** are 
specific actions, like running a query against a specific corpus, or resetting
its contents. These permissions are grouped together into **roles**, and
authenticated entites may be assigned one or more roles.

In this context, an **authenticated entity** refers to a user or an app client 
able to attest its identity by presenting a valid JWT token. Even entities that 
lack explicit roles may still be able to perform operations on the platform 
through the use of **default permissions**.

## Best Practices

- ✅ Use least privilege: assign only needed roles
- ✅ Review role assignments when rotating keys or changing team structure
- ✅ Separate roles for production vs development corpora
- ❌ Do not give Admin role to clients unless absolutely necessary

## Roles in Vectara

| **Scope**       | **Role**        | **Access Level**                                                          |
|------------------|------------------|----------------------------------------------------------------------------|
| Account-level    | Owner             | Full admin rights across account                                          |
| Account-level    | Account Admin     | All actions except billing                                                |
| Corpus-level     | Query (QRY)       | Read-only access to search documents                                      |
| Corpus-level     | Indexing (IDX)    | Write access to index content (includes query access)                     |
| Corpus-level     | Administrator     | Full control over corpus: query, index, reset, delete, manage permissions |

:::note
Each corpus has its own role assignments—you must grant access per corpus.
:::


## Prerequisites

- Admin access to Vectara Console
- A corpus already created
- Email address of the user or App Client ID for the OAuth client

### Account-level roles

- **Owner** is initially granted to whoever created the account. It grants
  all the permissions of the admin roles, below, as well as the ability to
  delete the account.
- **Account Administrators** can perform all actions on a account, except
  managing billing activity. These actions include managing users, API keys,
  managing corpora etc.
- **Corpus Administrators** can perform all corpus related actions within the
  account. This includes authorizing user roles on an account, deleting a corpus,
  creating corpora, and transferring ownership of a corpus.
- **Billing Administrators** can view and edit account billing activity.

### Corpus-level roles

Users can also be authorized to perform various actions per corpus. You can 
assign roles in the Authorization tab on the Corpus page.

![Edit user](/img/corpus_auth.png)

- The **Query** role (QRY) allows querying the corpus.
- The **Indexing** role (IDX) allows data to be added to the corpus.
- The **Administrator** role (ADM) allows query and indexing the corpus, but
  also resetting it, deleting it, adding and removing user access, and
  transferring its ownership.

A corpus may also specifying querying or indexing as **default roles**. A default
role is a role that is granted to any authenticated user in the account. For
example, if you want any authenticated user to be able to run queries on the
corpus, you would add the query role as default. 

## How account features differ from roles

Account features differ from roles in that they are enforced for the entire
account and are generally tied to account tier. These features include:

1. Custom dimensions. Whether custom dimensions may be defined for corpora.
2. Maximum corpora per query.
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

| **Use Case**                      | **Assigned Role** | **Scope**        |
|-----------------------------------|-------------------|------------------|
| Frontend search app (read only)   | QRY               | Specific corpus  |
| Backend service indexing data     | IDX               | Specific corpus  |
| Admin user managing all corpora   | Owner             | Account-wide     |
| OAuth client with query rights    | QRY               | One or more corpora |

---

## Common issues

| **Symptom**                    | **Cause**                            | **Solution**                                 |
|--------------------------------|---------------------------------------|----------------------------------------------|
| 403 Forbidden (API key)        | Missing corpus role assignment        | Assign QRY or IDX to key’s corpus            |
| OAuth token returns empty data | App client lacks Query permission     | Assign QRY to app client in corpus           |
| Index fails with QRY role      | Wrong role assigned                   | Switch to IDX or Admin                       |



