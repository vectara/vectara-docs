---
id: fuzzy-metadata
title: Metadata Query API Definition
sidebar_label: Metadata Query API Definition
---

import CodePanel from '@site/src/theme/CodePanel';

When metadata is inconsistent across sources, using only exact filters force users 
to guess the right value. Look at the example of “MSA”. Is it “Master 
Services Agreement” or “Master Service Agreement?”. What if a user spelled  
"employement" or "agrrement" incorrectly in a search?

The Metadata Query API enables intelligent searching across document 
metadata fields using fuzzy matching algorithms. This powerful feature allows 
users to find documents even when search terms contain typos, variations, or 
approximate matches. This is ideal for searching structured metadata like 
titles, categories, authors, or custom fields where exact matching may be too 
restrictive.

This API supports both **document-level** and **part-level** metadata. Use it 
to power legal ops, support, and compliance workflows where titles, 
categories, or headings often vary and users expect relevant results despite 
typos or naming drift.

## Use cases

- **Contract discovery**: Find agreements despite variations in naming
- **Author search**: Match documents by author with name variations
- **Category navigation**: Discover documents in related categories
- **Multi-field search**: Combine multiple metadata fields for comprehensive matching
- **Data quality**: Find documents with inconsistent metadata

## Metadata Query request and response details

To perform a fuzzy metadata search, send a `POST` request to 
`/v2/corpora/:corpus_key/metadata_query`, where `corpus_key` specifies the 
unique identifier for the corpus. Fuzzy search requires the following parameters:

* `level:` Specify `document` to returnunique documents or `part` for multiple parts 
  from the same document.  
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
* `offset`: The start value of the pagination. 
**Default:** 0 

The response contains a documents object with results ordered by relevance 
score with full metadata.
    * `doc_id`: Document ID.
    * `score`:  Relevance score.
    * `metadata`:  Returned metadata for the match.
* `total_count`: Total matches across all pages.

### Example request: Basic fuzzy search

<CodePanel
  title="Basic fuzzy search example"
  snippets={[
    {
      language: 'json',
      code: `POST /v2/corpora/legal_documents/metadata_query

{
  "level": "document",
  "queries": [
    {
      "field": "title",
      "query": "employement contract",  // Note the typo
      "weight": 2.0
    },
    {
      "field": "category", 
      "query": "agrrement",  // Fuzzy matching handles typos
      "weight": 1.0
    }
  ],
  "limit": 20
}`
    }]}  
  layout="stacked"
/>

### Example request: Fuzzy search with pre-filtering

<CodePanel
  title="Fuzzy search with metadata filter"
  snippets={[
    {
      language: 'json',
      code: `POST /v2/corpora/contracts/metadata_query

{
  "level": "document",
  "queries": [
    {
      "field": "title",
      "query": "lease agreement",
      "weight": 2.0
    },
    {
      "field": "client_name",
      "query": "Acme Corporaton",  // Fuzzy matching finds "Acme Corporation"
      "weight": 1.5
    }
  ],
  "metadata_filter": "doc.status = 'Active' AND doc.year >= 2023",
  "limit": 50,
  "offset": 0
}`
    }]}  
  layout="stacked"
/>

### Example Response

The response contains a documents object with results ordered by relevance 
score with full metadata.
    * `doc_id`: Document ID.
    * `score`:  Relevance score.
    * `metadata`:  Returned metadata array for the match.
* `total_count`: Total matches across all pages.

<CodePanel
  title="Example response"
  snippets={[
    {
      language: 'json',
      code: `{
  "documents": [
    {
      "doc_id": "doc_lease_001",
      "score": 0.95,
      "metadata": {
        "title": "Commercial Lease Agreement",
        "client_name": "Acme Corporation",
        "status": "Active",
        "year": 2024,
        "category": "Real Estate Agreement",
        "created_date": "2024-01-15",
        "parties": ["Acme Corporation", "Building Management LLC"],
        "value": 250000
      }
    },
    {
      "doc_id": "doc_lease_047",
      "score": 0.87,
      "metadata": {
        "title": "Office Lease Agreement - Downtown",
        "client_name": "Acme Corporation Subsidiary",
        "status": "Active", 
        "year": 2023,
        "category": "Commercial Agreement",
        "created_date": "2023-11-20",
        "parties": ["Acme Corporation Subsidiary", "Premier Properties"],
        "value": 180000
      }
    },
    {
      "doc_id": "doc_lease_092",
      "score": 0.82,
      "metadata": {
        "title": "Retail Space Leasing Agreement",
        "client_name": "Acme Corp International",
        "status": "Active",
        "year": 2024,
        "category": "Lease Agreement",
        "created_date": "2024-02-01",
        "parties": ["Acme Corp International", "Mall Holdings Inc"],
        "value": 150000
      }
    }
  ],
  "total_count": 42
}`
    }]}  
  layout="stacked"
/>


The API returns standard HTTP error codes with detailed error information:

| HTTP Code | Error Code | Description |
|-----------|------------|-------------|
| 400 | `invalid_request` | Malformed query or invalid field names |
| 400 | `invalid_metadata_filter` | Filter expression syntax error |
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for corpus |
| 404 | `corpus_not_found` | Specified corpus does not exist |
| 429 | `rate_limit_exceeded` | Request rate limit exceeded |


## How Fuzzy Matching Works

1. **Automatic Application**: Fuzzy matching is applied automatically to all field queries
2. **Typo Tolerance**: Handles common typos, character transpositions, and missing characters
3. **Weighted Scoring**: Field weights influence the final relevance score
4. **Two-Stage Process**:
   - First: Apply exact metadata_filter to narrow results
   - Second: Perform fuzzy matching on remaining documents

## Field weighting strategy

Adjust field weights to control search relevance:
- Higher weights (2.0-3.0): Critical fields like title or primary identifier
- Medium weights (1.0-1.5): Important supporting fields
- Lower weights (0.5-1.0): Additional context fields

### Example Weighting Strategy

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
      "query": "microsoft",
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

## Error Responses

The API returns standard HTTP error codes with detailed error information:

| HTTP Code | Error Code | Description |
|-----------|------------|-------------|
| 400 | `invalid_request` | Malformed query or invalid field names |
| 400 | `invalid_metadata_filter` | Filter expression syntax error |
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for corpus |
| 404 | `corpus_not_found` | Specified corpus does not exist |
| 429 | `rate_limit_exceeded` | Request rate limit exceeded |


## Limitations

- Currently limited to metadata fields (not full-text content)
- Maximum 100 results per request
- Fuzzy matching parameters are not user-configurable
- Internal API status may limit availability
