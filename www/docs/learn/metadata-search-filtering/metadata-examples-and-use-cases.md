---
id: metadata-examples-and-use-cases
title: Metadata Examples and Use Cases
sidebar_title: Examples and Use Cases
---

import {Config} from '@site/docs/definitions.md';

Metadata filters enable highly versatile and granular control over query 
results. This section provides real-world examples and use cases to illustrate 
how metadata filters can be applied to solve common business and technical 
challenges.

## Language-specific filtering

In multilingual documents, different sections may be in different languages. 
Use part-level metadata to target specific language segments.

**Example: **Filter for German-language customer reviews with a rating higher 
than 3 stars.

```sql
doc.rating > 3 AND part.lang = 'de'
```

The `lang` metadata tag used in this example is detected and set automatically 
by the platform at indexing time. It's set at the part level for accuracy, 
because a single document may contain content in multiple languages.


## Date-Specific Document Retrieval

More complicated expressions are possible, such as the one below, which checks 
for documents with a publication date in 2021.

**Example:** Retrieve documents published in 2021 using epoch time.

```sql
1609459200 < doc.pub_epoch AND doc.pub_epoch < 1640995200
```
Here, `pub_epoch` stores the date in [epoch time][3].

You can find a full list of supported operations on the [Functions and Operators][2]
page, and a full list of how to specify literals on [Data Types][5]. 

[1]: http://www.contrib.andrew.cmu.edu/~shadow/sql/sql1992.txt
[2]: /docs/api-reference/search-apis/sql/func-opr
[3]: https://en.wikipedia.org/wiki/Unix_time
[4]: /docs/api-reference/admin-apis/create-corpus#filter-attribute
[5]: /docs/api-reference/search-apis/sql/data-types


## Filter by document status

For auditing purposes, you may want to limit results to documents marked as 
`Published` instead of `Draft`:

`doc.status = 'Published'`

## Filter by custom tag

Custom metadata fields enable filtering based on business-specific criteria, 
such as priority, category, or internal tags.

**Example:** Filter documents tagged as **High Priority** in the **Technology** 
category.

```sql
doc.priority = 'High' AND doc.category = 'Technology'
```
## Example query with a document-level filter

This example asks the question `"What are the key benefits of cloud computing?"` 
from the Cloud Computing References corpus. Within the `corpora` object, we 
specified a `metadata_filter` to filter though published documents with 
`"metadata_filter": "doc.status = 'Published'",`

```json
curl -X POST \
-H "customer-id: 123456789" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ...nMRNknvg"  \
https://api.vectara.io:443/v2/query \
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
END
```

## Example response with a document-level filter

The example response returns documents with a `"status": "Published",` in the document 
metadata. This response also shows other metadata associated with each `document_id`.

```json
[
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
]
```
## Example query with part-level metadata

Now let's send a query with part-level meta for `part.concept = 'Overview'`.

We will only change the `metadata_filter` value from the previous example so 
that it filters for this part-level metadata:

```json
"corpora": [
      {
        "corpus_key": "Cloud_Computing_References",
        "metadata_filter": "part.concept = 'Overview'",
        "lexical_interpolation": 0.005,
        "custom_dimensions": {}
      }
```

## Example response with part-level metadata

```json
[
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
]
```

