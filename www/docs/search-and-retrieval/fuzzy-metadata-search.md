---
id: fuzzy-metadata-search
title: Fuzzy matching
sidebar_label: Fuzzy matching
---

import CodePanel from '@site/src/theme/CodePanel';

The tech preview of Fuzzy Metadata Search combines exact filtering with 
approximate matching. This approach is useful because metadata can have 
inconsistencies in typos in titles, categories, or keywords. To try this 
fuzzy metadata search, see the [API Reference](/docs/rest-api/query-metadata).

Fuzzy search operates in two main steps:
1. **Exact filtering:** A `metadata_filter` is first applied to narrow results 
   based on attributes like `doc.status = 'Active'`.
2. **Fuzzy matching:** On the remaining documents, fuzzy matching 
   handles common typos and missing characters automatically. These results 
   are then ranked based on relevance score that you can tune using field 
   weighting. This means you can give `title` a higher weight than `category`.

The final result is a ranked list that helps users find what they _mean_, even 
if they did not type the metadata value exactly. 

:::tip
Use `document` level metadata when you want unique documents. Use `part` level 
metadata when you need to surface matching sections within documents.
:::

:::caution
Because the fuzzy metadata search feature is a tech preview, it can potentially 
have breaking changes.
:::

## Common uses
* Finding the correct "Service Level Agreement" even if you type "Servce 
  Levl Agrement."
* Searching for "software license" returns both "software license" and 
  "software licensing" documents.
* Searching for product IDs or SKUs that are prone to errors lets users 
  still retrieve a part by ID despite a missing digit.

## Field weighting strategy

Adjust field weights to control search relevance:
- Higher weights (`2.0`-`3.0`): Critical fields like title or primary
  identifier
- Medium weights (`1.0`-`1.5`): Important supporting fields
- Lower weights (`0.5`-`1.0`): Additional context fields

### Example weighting strategy

<CodePanel
  title="Strategic field weighting"
  snippets={[
    {
      language: 'json',
      code: `{
  "queries": [
    {
      "field": "title",
      "query": "software license",
      "weight": 3.0  // Most important
    },
    {
      "field": "vendor",
      "query": "google",
      "weight": 2.0  // Very important
    },
    {
      "field": "category",
      "query": "technology",
      "weight": 1.0  // Standard importance
    },
    {
      "field": "tags",
      "query": "enterprise",
      "weight": 0.5  // Supporting context
    }
  ]
}`
    }]}  
  layout="stacked"
/>

## Example request (document level)

<CodePanel snippets={[{language: "json", code: `{
  "level": "document",
  "queries": [
    { "field": "title",    "query": "lease agreement", "weight": 2.0 },
    { "field": "category", "query": "contract",        "weight": 1.0 }
  ],
  "metadata_filter": "doc.status = 'Active'",
  "limit": 10,
  "offset": 0
}`
}]} title="Document-Level Request" layout="stacked" />


### Example response

<CodePanel snippets={[{language: "json", code: `{
  "documents": [
    {
      "doc_id": "document123",
      "score": 0.92,
      "metadata": {
        "title": "Master Lease Agreement (2025)",
        "category": "contract",
        "status": "Active"
      }
    }
  ],
  "total_count": 42
}`
}]} title="Document-Level Response" layout="stacked" />


