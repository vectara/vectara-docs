---
id: fuzzy-metadata-search
title: Fuzzy Metadata Search
sidebar_label: Fuzzy Metadata Search
---

import CodePanel from '@site/src/theme/CodePanel';

Metadata is rarely uniform across different document sources. Titles,
categories, and headings can vary and change over time. When users only know 
part of a value, strict equality filters miss relevant items.

Fuzzy Metadata Search combines exact pre‑filtering with fuzzy, weighted 
matching across specific metadata fields. First, narrow the candidate set 
precisely, such as by status, region, or date. Then, rank what remains using 
field‑aware *fuzzy matching* so users find what they *mean*, and not just what 
they *type*.

* Supports **document-level** and **part-level** metadata searches.
* Returns relevance‑scored results with pagination (`limit`, `offset`, `total_count`).
* Lets you weight fields (`title^2.0`, `category^1.0`) to tune ranking.
* Works alongside existing metadata filters for access control and faceted narrowing.

:::tip
Use `document` level metadata when you want unique documents. Use `part` level 
metadata when you need to surface matching sections within documents.
:::

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


## Filter syntax

`metadata_filter` uses Vectara’s metadata filter expression syntax. Prefix every field with its scope: `doc.` (document-level) or `part.` (part-level).


## Supported operators

* Arithmetic: `+ - * / %`
* Comparisons: `&lt; &lt;= > >= = == != &lt;>`
* Null tests: `IS NULL`, `IS NOT NULL`
* Membership: `IN (...)`
* Logical: `NOT`, `AND`, `OR`


## Examples

* `doc.status = 'Active'`
* `doc.pageCount > 10`
* `doc.publish_date >= '2024-01-01'`
* `doc.category IN ('contract', 'policy')`
* `doc.status = 'Active' AND part.clause_type = 'Liability'`

The filter language does **not** support SQL `LIKE`. Use fuzzy `queries` to handle approximate text.



### Weighted multi‑field search

<CodePanel snippets={[{language: "json", code: `{
   "queries": [
     { "field": "title",    "query": "nda",       "weight": 2.0 },
     { "field": "category", "query": "agreement", "weight": 1.0 }
   ],
   "limit": 20
}`
}]} title="Weighted multi‑field search" layout="stacked" />

### Exact filtering plus fuzzy ranking

<CodePanel snippets={[{language: "json", code: `{
   "queries": [ { "field": "title", "query": "master services" } ],
   "metadata_filter": "doc.status = 'Active' AND doc.region = 'EMEA'",
   "limit": 10
}`
}]} title="Exact filtering plus fuzzy ranking" layout="stacked" />



### Part‑level search

<CodePanel snippets={[{language: "json", code: `{
   "level": "part",
   "queries": [ { "field": "heading", "query": "termination" } ],
   "metadata_filter": "part.section = 'Terms'",
   "limit": 5
}`
}]} title="Part‑level search" layout="stacked" />

