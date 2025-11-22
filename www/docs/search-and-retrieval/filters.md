---
id: filters
title: Filters
sidebar_title: Filters
---

import CodePanel from '@site/src/theme/CodePanel';

Metadata filters restrict search results to only the document chunks that 
match a specified logical expression. They act as a WHERE clause for your 
semantic search, ensuring only relevant, pre-qualified content is retrieved 
before summarization.

Using filters helps with:

* **Precision:** Limit results based on attributes like status, author, or category.
* **Scope:** Target specific document parts, such as only part.is_title = true.

## Filter syntax

Filters are defined using a simple, SQL-like syntax in the `metadata_filter` 
field within the `corpora` object of your query.

* Specify whether the metadata is at the document or part level.  
  **Example:** `doc.`, `part.`
* Use logical and comparison operators.  
  **Example:** `AND`, `OR`, `doc.year > 2025`, `part.type IN ('A', 'B')`
* Ensure that the data type values match.  
  **Example:** `doc.status = 'Published'`, `doc.price <= 50.0`, `part.is_title = true`



## Metadata use case examples

Metadata filters enable highly versatile and granular control over query 
results. This section provides real-world examples and use cases to illustrate 
how metadata filters can be applied to solve common business and technical 
challenges.

* **Language-specific filtering** - In multilingual documents, different
  sections may be in different languages. Use part-level metadata to target
  specific language segments.

  `doc.rating > 3 AND part.lang = 'de'`

  The `lang` metadata tag used in this example is detected and set
  automatically by the platform at indexing time. It's set at the part level
  for accuracy, because a single document may contain content in multiple
  languages.

* **Date-specific document retrieval** - More complicated expressions are
  possible, such as the one below, which checks for documents with a
  publication date in 2021.

  `1609459200 < doc.pub_epoch AND doc.pub_epoch < 1640995200`

  Here, `pub_epoch` stores the date in [epoch time][3].

  You can find a full list of supported operations on the
  [Functions and Operators][2] page, and a full list of how to specify
  literals on [Data Types][4].

  [2]: /docs/build/prepare-data/metadata-filters/func-opr
  [3]: https://en.wikipedia.org/wiki/Unix_time
  [4]: /docs/build/prepare-data/metadata-filters/data-types

* **Filter by document status** - For auditing purposes, you may want to limit
  results to documents marked as `Published` instead of `Draft`:

  `doc.status = 'Published'`

* **Filter by custom tag** - Custom metadata fields enable filtering based on
  business-specific criteria, such as priority, category, or internal tags.

  `doc.priority = 'High' AND doc.category = 'Technology'`

* **Filter by date range** - Find documents published during a specific year
  (assuming `pub_year` is an Integer).

  `doc.pub_year = 2023`

* **Exclude drafts and authors** - Find content that is not a Draft and was
  not written by a specific author.

  `doc.status != 'Draft' AND NOT (doc.author = 'John Doe')`

* **Part-level filtering (title)** - Only retrieve chunks that are titles, or
  never retrieve titles.

  `part.is_title = true`

* **Multiple tags/values** - Find documents that are tagged as either Science
  or History.

  `doc.category IN ('Science', 'History')`

## Example query with a document-level filter

This example asks the question `"What are the key benefits of cloud computing?"`
from the Cloud Computing References corpus. Within the `corpora` object, we
specified a `metadata_filter` to filter though published documents with 
`"metadata_filter": "doc.status = 'Published'",`

<CodePanel snippets={[{language: "json", code: `curl -X POST \\
-H "customer-id: 123456789" \\
-H "Content-Type: application/json" \\
-H "Authorization: Bearer ...nMRNknvg"  \\
https://api.vectara.io:443/v2/query \\
-d @- <<END;
{
  "query": "What are key benefits of cloud computing?",
  "search": {
    "corpora": [
      {
        "corpus_key": "Cloud_Computing_References",
        "metadata_filter": "doc.status = 'Published'",
        "lexical_interpolation": 0.005,
        "custom_dimensions": {}
      }
    ],
    "offset": 0,
    "limit": 25,
    "context_configuration": {
      "sentences_before": 2,
      "sentences_after": 2,
      "start_tag": "%START_SNIPPET%",
      "end_tag": "%END_SNIPPET%"
    },
    "reranker": {
      "type": "mmr",
      "diversity_bias": 0
    }
  },
  "stream_response": true,
  "generation": {
    "prompt_name": "mockingbird-1.0-2024-07-16",
    "max_used_search_results": 3,
    "prompt_text": "",
    "response_language": "eng",
    "enable_factual_consistency_score": true
  }
}
END`}]} title="Metadata Example" layout="stacked" />

### Example response with a document-level filter

The example response returns documents with a `"status": "Published",` in the document 
metadata. This response also shows other metadata associated with each `document_id`.

<CodePanel snippets={[{language: "json", code: `[
    {
        "type": "search_results",
        "search_results": [
            {
                "text": "Cloud computing has transformed the IT landscape by offering scalable and flexible resources...",
                "score": 0.8154528737068176,
                "part_metadata": {
                    "concept": "Overview",
                    "process": "Introduction",
                    "procedure": "1. Outline key benefits; 2. Discuss technological evolution; 3. Highlight future potential",
                    "reference": "Cloud Computing Foundations",
                    "is_boilerplate": false,
                    "title": "Introduction to Cloud Computing",
                    "lang": "eng",
                    "offset": 267,
                    "len": 161
                },
                "document_metadata": {
                    "category": "Technology",
                    "status": "Published",
                    "published": "2024-01-01",
                    "author": "Jane Doe",
                    "audience": "IT Professionals",
                    "doc_length": "extensive",
                    "title": "Comprehensive Guide to Cloud Computing",
                    "desc": "An in-depth exploration of cloud computing, covering its evolution, service models..."
                },
                "document_id": "CC-2024-TECH"
            },
            {
                "text": "An in-depth exploration of cloud computing, covering its evolution, service models...",
                "score": 0.7818809151649475,
                "part_metadata": {
                    "concept": "Overview",
                    "process": "Introduction",
                    "procedure": "1. Outline key benefits; 2. Discuss technological...",
                    "reference": "Cloud Computing Foundations",
                    "is_boilerplate": false,
                    "title": "Introduction to Cloud Computing",
                    "lang": "eng",
                    "offset": 0,
                    "len": 111
                },
                "document_metadata": {
                    "category": "Technology",
                    "status": "Published",
                    "published": "2024-01-01",
                    "author": "Jane Doe",
                    "audience": "IT Professionals",
                    "doc_length": "extensive",
                    "title": "Comprehensive Guide to Cloud Computing",
                    "desc": "An in-depth exploration of cloud computing, covering its evolution..."
                },
                "document_id": "CC-2024-TECH"
            },
            {
                // Additional results would appear here
            }
        ] 
   }      
]`}]} title="Response Example" layout="stacked" />

### Example query with part-level metadata

Now let's send a query with part-level meta for `part.concept = 'Overview'`.

We will only change the `metadata_filter` value from the previous example so 
that it filters for this part-level metadata:

<CodePanel snippets={[{language: "json", code: `"corpora": [
      {
        "corpus_key": "Cloud_Computing_References",
        "metadata_filter": "part.concept = 'Overview'",
        "lexical_interpolation": 0.005,
        "custom_dimensions": {}
      }`}]} title="Metadata Example" layout="stacked" />

### Example response with part-level metadata

<CodePanel snippets={[{language: "json", code: `[
    {
        "type": "search_results",
        "search_results": [
            {
                "text": "An in-depth exploration of cloud computing, covering its evolution...",
                "score": 0.8265947103500366,
                "part_metadata": {
                    "concept": "Overview",
                    "process": "Introduction",
                    "procedure": "1. Outline key benefits; 2. Discuss technological evolution; 3. Highlight future potential",
                    "reference": "Cloud Computing Foundations",
                    "is_boilerplate": false,
                    "title": "Introduction to Cloud Computing",
                    "lang": "eng",
                    "offset": 0,
                    "len": 111
                },
                "document_metadata": {
                    "category": "Technology",
                    "status": "Published",
                    "published": "2024-01-01",
                    "author": "Jane Doe",
                    "audience": "IT Professionals",
                    "doc_length": "extensive",
                    "title": "Comprehensive Guide to Cloud Computing",
                    "desc": "An in-depth exploration of cloud computing, covering its evolution, service models..."
                },
                "document_id": "DD-2024-TECH"
            },
            {
                "text": "This comprehensive guide provides an in-depth introduction to the fundamental principles...",
                "score": 0.8091028928756714,
                "part_metadata": {
                    "concept": "Overview",
                    "process": "Introduction",
                    "procedure": "1. Outline key benefits; 2. Discuss technological evolution; 3. Highlight future potential",
                    "reference": "Cloud Computing Foundations",
                    "is_boilerplate": false,
                    "title": "Introduction to Cloud Computing",
                    "lang": "eng",
                    "offset": 429,
                    "len": 179
                },
                "document_metadata": {
                    "category": "Technology",
                    "status": "Published",
                    "published": "2024-01-01",
                    "author": "Jane Doe",
                    "audience": "IT Professionals",
                    "doc_length": "extensive",
                    "title": "Comprehensive Guide to Cloud Computing",
                    "desc": "An in-depth exploration of cloud computing, covering its evolution, service models..."
                },
                "document_id": "DD-2024-TECH"
            },
            {
                // Additional results would appear here
            }
        ]
    },
]`}]} title="Part-level metadata Example" layout="stacked" />

