---
id: fuzzy-metadata
title: Metadata Query API Definition
sidebar_label: Metadata Query API Definition
---

import CodePanel from '@site/src/theme/CodePanel';

When metadata is inconsistent across sources, exact filters alone force users 
to guess the right value. Let’s look at the example of “MSA”. Is it “Master 
Services Agreement” or “Master Service Agreement?”. Using exact filters alone 
forces users to guess the correct value. The Metadata Query API enables you to 
keep precision where you need it and flexibility where you do not need exact matches.

1. Apply an exact `metadata_filter`
2. Perform fuzzy, weighted matching across selected metadata fields to rank results by intent.

This API supports both **document-level** and **part-level** metadata. Use it 
to power legal ops, support, and compliance workflows where titles, 
categories, or headings often vary and users expect relevant results despite 
typos or naming drift.

## Metadata Query request and response details

To complete a fuzzy search, send a `POST` request to 
`/v2/corpora/:corpus_key/metadata_query`, where `corpus_key` specifies the 
unique identifier for the corpus.

Fuzzy search requires the following parameters:

* `level:` Specify `document` (unique documents) or `part` (section-level results).  
**Default:** document
* `queries`: One or more field-specific fuzzy queries.
    * `field`: Metadata field **without** the `doc.` or`part.` prefix; must be a **TEXT filter attribute**.
    * `query`: Text to match approximately.
    * `weight`: Increases the influence of a field on ranking.  
  **Default:** 1.0
* `metadata_filter`:  Exact filter applied **before** fuzzy matching. This uses Vectara filter syntax with `doc.` / `part.` scoping.
* `Limit`: The maximum number of results.  
**Default:** 10  
**Range:** 1-100
* `offset` *(integer, optional, default <code>0</code>)* — Pagination start.  
**Default:** 0 

## Example request (document level)

<CodePanel snippets={[{language: "json", code: `{
   "level": "document",
   "queries": [
     { "field": "title",    "query": "lease agreement", "weight": 2.0 },
     { "field": "category", "query": "contract",        "weight": 1.0 }
   ],
   "metadata_filter": "doc.status = 'Active'",
   "limit": 10,
}`
}]} title="Document-Level Request" layout="stacked" />

## Response details

The response contains a documents object with results ordered by descending relevance. Each item has:
    * `doc_id`: Document ID.
    * `score`:  Relevance score.
    * `metadata`:  Returned metadata for the match.
* `total_count`: Total matches across all pages.

## Example document level response

<CodePanel snippets={[{language: "json", code: `{
   "documents": [
     {
       "doc_id": "document123",
       "score": 0.92,
       "metadata": {
         "title": "Master Lease Agreement (2024)",
         "category": "contract",
         "status": "Active"
       }
     }
  ],
  "total_count": 42
}`
}]} title="Document-Level Request" layout="stacked" />

## Error responses

* `400 Bad Request`: Invalid request (missing `queries`), unknown field, or field not eligible for fuzzy search.
* `400 Bad Request`: Invalid `metadata_filter` (unknown field or type mismatch).
* `403 Forbidden`: Token lacks permission to query metadata for this corpus.
* `404 Not Found`: `corpus_key` does not exist.
