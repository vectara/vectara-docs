---
id: filter-overview
title: Metadata Filters
sidebar_title: Metadata Filters
---

import {Config} from '@site/docs/definitions.md';

In many search scenarios, retrieving all available documents is not enough to 
meet the your business needs. It may be necessary to narrow the query results 
to documents with specific, granular attributes. This is where metadata 
filters can help you by applying precise conditions to your queries.

Metadata filter expressions are attached to queries, or more formally, to their 
corpus keys. These filter expressions serve to restrict the search to only the 
part of the corpus that matches the expression. In both form and function, 
they are a simpler version of a `WHERE` clause's *search condition* 
in [ANSI SQL, see §7.6][1].

A filter expression operates on the metadata attached to documents that are 
indexed in <Config v="names.product"/>. Because you can associate this 
metadata to either the entire document, or to specific parts within it, the 
*scope* must be explicitly specified for every metadata reference in the 
expression. 

## Document-level and part-level filtering

Metadata can be associated with the entire document (document-level) or 
specific sections of the document (part-level). These valid scopes are `doc.` 
and `part.`, for document and part-level metadata, respectively.
When indexing data in Vectara, you associate metadata at these levels:

* **Document-level scope**
    * Applied across the entire document. Use document-level filtering for metadata that does 
      not vary and remains consistent across the whole document.
    * **Examples:** 
      * `doc.author = 'John Doe' and doc.publication_year > 2024`
      * `doc.publication_date >= '2023-01-01' AND doc.publication_date < '2024-01-01' AND doc.category IN ('Technology', 'Science')`
* **Part-level scope**
    * Applied to specific sections or chunks within a document. Use part-level filtering when 
      properties vary within different parts of the document.
    * **Examples** 
      * `part.section = 'Introduction'`
      * `part.clause_type = 'Liability' AND part.risk_level = 25 AND part.is_boilerplate = false`

## Setting up metadata filters

To use metadata filters, you must configure [filter attributes][4] for your corpus. 
Filter attributes define the metadata fields that queries can filter on. You 
can do this in the following ways:

* **During corpus creation:** Use the `filter_attributes` parameter when [creating a 
  corpus][4].
* **For an existing corpus:**
  * Use the [Update Document Metadata API](/docs/api-reference/indexing-apis/update-document-metadata) to add or update specific metadata 
  fields for a corpus at the document level.
  * Use the [Replace Document Metadata API](/docs/api-reference/indexing-apis/replace-document-metadata) to entirely replace the existing 
  metadata for a document.

:::note
Updating or replacing metadata is limited only to document-level metadata.
:::

## Use cases for metadata filtering

### Language-specific sections

Multilingual documents may have different sections in different languages. The 
following filter expression selects customer reviews in German with better than 
a 3-star rating. Note that while there is a single rating for the entire 
document, the detected language is set at the part level. 

```
doc.rating > 3.0 AND part.lang = 'deu'
```

The `lang` metadata tag used in this example is detected and set automatically
by the platform at indexing time. It's set at the part level for accuracy,
because a single document may contain content in multiple languages.


### Date-specific documents

More complicated expressions are possible, such as the one below, which 
checks for documents with a publication date in 2021.

```
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


### Filtering based on document status

For auditing purposes, you may want to limit results to documents marked as 
`Published` instead of `Draft`:

`doc.status = 'Published'`

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

