---
id: combine-access-control-with-app-filters
title: Combine Access Control with Application Filters
sidebar_label: Combine Access Control with Application Filters
---

import {Config} from '@site/docs/definitions.md';

It might be tempting to let users construct their own filters, but this can 
expose data if the access control logic is not included. Or worse, you did not 
add access filters at all.

Your application likely supports end-user filtering (such as by category, 
project, tags), while also needing strict access control (ABAC). Vectara lets 
you combine both methods in a single metadata filter—enforcing security and 
relevance in one shot.

This guide teaches how to combine ABAC rules with user-specific filters, so 
users only see data they’re authorized to access *and* relevant to their 
search context.

## Best Practices

| ✅ Do This                                | 🚫 Avoid This                                  |
|------------------------------------------|------------------------------------------------|
| Build filters server-side                | Letting users inject raw filters               |
| Combine ABAC and functional logic         | Using only project/category filters            |
| Sanitize inputs and escape special chars | Copy-pasting ABAC logic per query              |


## Typical scenario

Consider the following scenario:

**User:** Mary  
**Context:** `project = "orientation"`  
**Access rights:** `owner = mary` or `group = history`

## ABAC filter only

`(doc.owner in ("mary", "global")) OR ("history" IN doc.groups)`

## Application filter only

`doc.project = "orientation"`

:::caution
Without ABAC, this could expose orientation docs to any user.
:::

## Safe combined filter usage

`((doc.owner in ("mary", "global")) OR ("history" IN doc.groups)) AND (doc.project = "orientation")`

This combination ensures Mary only sees docs she can access *within* the 
selected project.

---

## Implement this combination of access control with application filters

1. Index documents with all metadata
    ```json
    "metadataJson": {
    "owner": "mary",
    "groups": ["history"],
    "roles": ["dean"],
    "project": "orientation",
    "tags": ["safety", "onboarding"]
    }
    ```
2. Construct filters server-side where your backend should:
- Lookup user roles, groups, and ID
- Build the ABAC clause
- Append user-selected filters (such as `project`)  
3. Use this python example:
    ```python
    abac = f'(doc.owner in ("{user_id}", "global")) OR ({group_expr})'
    final_filter = f'({abac}) AND (doc.project = "{user_project}")'
    ```
## Advanced Example

`((doc.owner in ("mary", "global")) OR ("history" IN doc.groups AND (doc.roles is null OR "dean" IN doc.roles))) AND (doc.project = "orientation") AND ("safety" IN doc.tags)`

