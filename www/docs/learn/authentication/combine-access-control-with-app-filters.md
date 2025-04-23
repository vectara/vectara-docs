---
id: combine-access-control-with-app-filters
title: Combine Access Control with Application Filters
sidebar_label: Combine Access Control with Application Filters
---

import {Config} from '@site/docs/definitions.md';

In most applications, you need to control both who can access specific data 
and how that data is filtered based on user input like categories, tags, or 
projects.

Vectara supports a flexible metadata filtering system that lets you combine 
attribute-based access control (ABAC) with user-selected filters in a single 
query. This ensures users see only what they are authorized to access and what 
is relevant to their current task.

## Why combine filters?

If you rely only on end-user filters without enforcing access rules, your 
application could expose sensitive data to unauthorized users. However, if you 
apply access rules but ignore application context, you may return irrelevant 
results.

Combining both ABAC and functional filters ensures secure, relevant, and 
personalized access to data.

## Best practices

| ✅ Things to do                          | 🚫 Things to avoid                             |
|------------------------------------------|------------------------------------------------|
| Build filters server-side                | Letting users inject raw filters               |
| Combine ABAC and content-specific logic         | Using only project and category filters  |
| Sanitize inputs and escape special characters | Duplicating ABAC logic across endpoints    |


## Example scenario

Suppose an application serves documents filtered by project, and users must 
only see content based on ownership or group membership.

**User:** user1  
**User-selected context::** `project = "orientation"`  
**Access rights:** The owner is user1 or member of `history`

## ABAC filter only

`(doc.owner in ("user1", "global")) OR ("history" IN doc.groups)`

This limits access but ignores the user's functional context (project 
selection).

## Functional filter only

`doc.project = "orientation"`

This matches project metadata, but without access control, it risks exposing 
documents to unauthorized users.

:::caution
Without ABAC, functional filters could expose sensitive content to the wrong 
users.
:::

## Combined filter (safe pattern)

`((doc.owner in ("user1", "global")) OR ("history" IN doc.groups)) AND (doc.project = "orientation")`

This combination ensures that `user1` only sees docs they can access *within* 
the selected project.

---

## Implement this combination of access control with application filters

1. Index documents with all metadata
    ```json
    "metadataJson": {
    "owner": "user1",
    "groups": ["history"],
    "roles": ["dean"],
    "project": "orientation",
    "tags": ["safety", "onboarding"]
    }
    ```
2. Construct filters server-side in your backen:
   * Retrieve user attributes (ID, groups, roles)
   * Build the ABAC clause
   * Append user-selected filters (such as `project`)  
3. Use this python filter example:
    ```python
    abac = f'(doc.owner in ("{user_id}", "global")) OR ({group_expr})'
    final_filter = f'({abac}) AND (doc.project = "{user_project}")'
    ```  
    This logic should live in your backend API and not exposed to clients or 
    end users.

## Advanced Example

`((doc.owner in ("user1", "global")) OR ("history" IN doc.groups AND (doc.roles is null OR "dean" IN doc.roles))) AND (doc.project = "orientation") AND ("safety" IN doc.tags)`

This advanced example combines ABAC rules, project scoping, and tag-based 
filtering in one secure filter expression. 

* user1 owns the document or it is public (global)
* OR user1 has group/role rights to it
* AND the document is part of the “orientation” project
* AND the document is tagged with “safety”

Let's break down the filter in more detail:

`((doc.owner in ("user1", "global"))`

`user1` can always see the documents that they own and `user1` can also see `global` documents (visible to all users)

`OR ("history" IN doc.groups AND (doc.roles is null OR "dean" IN doc.roles)))`

However, if `user1` is also part of the `history` group, they must either:
* Access a document that has no role restriction
* Be a `dean` to access role-restricted documents.

Up to this point, `user1` only sees documents where they are entitled based on 
ownership, group membership, and optional role constraints. Next, we have the 
application filter:

`AND (doc.project = "orientation")`

This application-specific filter ensures only documents tied to the `orientation` 
project are returned, likely based on the user’s current view or selection in 
the app.

`AND ("safety" IN doc.tags)`

Finally, only return documents tagged with `safety`. This could reflect a 
checkbox or category selected by the user.


