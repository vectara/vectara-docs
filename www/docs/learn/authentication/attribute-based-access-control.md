---
id: attribute-based-access-control
title: Apply Metadata Filters for Attribute-Based Access Control (ABAC)
sidebar_label: Apply Metadata Filters for Attribute-Based Access Control (ABAC)
---

import {Config} from '@site/docs/definitions.md';

Vectara does not support native field-level or document-level access control 
levels (ACLs). Developers may assume they can restrict access inside a corpus, 
but without filters, anyone with query access to that corpus can see all its 
content.

Attribute-Based Access Control (ABAC) enables you to 
attach metadata to documents and apply filters at query time. This lets your 
application define *who* can see *what*, based on dynamic rules.

This guide shows how to use metadata filters to simulate fine-grained access 
control—ensuring each user sees only what you want to allow based on 
ownership, group, role, or other attributes.


## ABAC use cases

| **Scenario**                                  | **Metadata Fields Used**              |
|-----------------------------------------------|----------------------------------------|
| Personal/private documents                    | `owner`                                |
| Group-shared documents                        | `groups`                               |
| Role-based access (e.g., "only professors")   | `roles`                                |
| Project- or tag-based filtering               | `project`, `tag`, etc.                 |

## Prerequisites

- Metadata fields defined for your corpus
- Documents indexed with access-relevant metadata
- Backend logic that knows the roles and groups of the current user

## ABAC best practices

- ✅ Construct filters in your backend using known user attributes
- ✅ Use `doc.owner`, `doc.groups`, and `doc.roles` consistently
- ❌ Never allow users to provide arbitrary filter expressions
- 🔒 Keep Query keys private; expose only through secure APIs

## Configure attribute-based access control

1. Add metadata when indexing data.
    ```json
    {
     "document": {
        "title": "Faculty Policies",
        "metadataJson": {
        "owner": "mary",
        "groups": ["faculty", "history"],
        "roles": ["professor"],
        "project": "orientation"
        }
     }
    }
    ```

    :::note
    Each metadata field must be declared in your corpus schema.
    :::

2. Construct the access filter.  
   Build a filter string that enforces access control where Mary can access 
   her own documents and anyone in the `history` group with role `professor` 
   can also access these documents

    `(doc.owner in ("mary", "global")) OR ("history" IN doc.groups AND (doc.roles is null OR "professor" IN doc.roles))`

3. Combine metadata with the application-specific filters.  
   You can layer filters for user access and functional context:

    `((doc.owner = "mary") OR ("history" IN doc.groups)) AND (doc.project = "orientation")`

This ensures access control remains enforced while supporting contextual filtering.

---

## Example ABAC request

```json
{
  "query": [{
    "query": "school policies",
    "search": {
      "corpora": [{ "corpus_key": "faculty_corpus" }],
      "metadata_filter": "((doc.owner in (\"mary\", \"global\")) OR (\"history\" IN doc.groups)) AND (doc.project = \"orientation\")",
      "limit": 10
    }
  }]
}
```

## ABAC Limitations

| **Limitation**                | **Recommendation**                          |
|-------------------------------|----------------------------------------------|
| Filters are not enforced at platform level | Rely on backend to inject correct filters |
| No per-document ACLs          | Use metadata + filters instead               |
| Query access gives full access | Scope keys narrowly and use ABAC consistently|

