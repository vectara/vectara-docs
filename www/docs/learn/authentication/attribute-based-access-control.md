---
id: attribute-based-access-control
title: Apply Metadata Filters for Attribute-Based Access Control (ABAC)
sidebar_label: Apply Metadata Filters for Attribute-Based Access Control (ABAC)
---

import {Config} from '@site/docs/definitions.md';
import vars from '@site/static/variables.json';

import CodePanel from '@site/src/theme/CodePanel';


Vectara does not currently offer native field-level or document-level access 
control levels (ACLs). Without these controls, anyone with query access to a 
corpus can see all its content.

Vectara solves this problem with Attribute-Based Access Control (ABAC). ABAC 
enables you to attach metadata to documents and apply filters at query time. 
This lets your application define *who* can see *what*, based on dynamic rules.

This guide shows how to use metadata filters to implement fine-grained access 
control—ensuring each user sees only what you want to allow based on 
ownership, group, role, or other attributes.

## Attribute-based access control scenarios

| **Scenario**                                  | **Example Metadata Fields**              |
|-----------------------------------------------|------------------------------------------|
| Restrict access to user-specific data         | `user_id`, `account_id`                  |
| Limit visibility to specific teams or departments | `team`, `department`                  |
| Control access based on user privileges       | `access_level`, `role`                   |
| Filter by context or category                 | `category`, `project`, `tag`             |

## Prerequisites

- Metadata fields defined for your corpus—an Admin setup
- Documents indexed with access-relevant metadata—a Developer task
- Backend logic that maps user attributes (ID, team, role) to filters—typically 
  coded by Developers

## ABAC best practices

- ✅ Construct filters server-side using verified user attributes
- ✅ Use consistent metadata naming (e.g., `user_id`, `team`) across 
  corpora
- ❌ Never allow users to provide arbitrary filter expressions
- 🔒 Keep QueryService API keys private; expose only through secure APIs

## Configure attribute-based access control

1. Add metadata when indexing data.

    <CodePanel snippets={[{language: "json", code: `{
      "document": {
        "title": "Customer Report",
        "metadataJson": {
          "user_id": "user123",
          "team": ["sales", "executive"],
          "access_level": "manager",
          "category": "q2_metrics"
        }
      }
    }`}]} title="Metadata Example" layout="stacked" />

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

<CodePanel snippets={[{language: "json", code: `{
   "query": [{
     "query": "school policies",
     "search": {
       "corpora": [{ "corpus_key": "faculty_corpus" }],
       "metadata_filter": "((doc.owner in (\\"mary\\", \\"global\\")) OR (\\"history\\" IN doc.groups)) AND (doc.project = \\"orientation\\")",
       "limit": 10
     }
   }]
}`
}]} title="ABAC request Example" layout="stacked" />

## ABAC Limitations

| **Limitation**                | **Recommendation**                          |
|-------------------------------|----------------------------------------------|
| Filters are enforced per query, not at platform level | Rely on backend to inject correct filters |
| No per-document ACLs          | Use metadata and filters instead               |
| QueryService access gives full access | Scope keys narrowly and use ABAC consistently|
