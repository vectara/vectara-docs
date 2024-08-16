---
id: filter-overview
title: Metadata Filters
sidebar_title: Metadata Filters
---

import {Config} from '@site/docs/definitions.md';

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

## Understanding document and part scopes

Valid scopes are `doc.` and `part.`, for document and part-level 
metadata, respectively.
When indexing data in Vectara, you associate metadata at two levels: the 
`doc` level and `part` level:

* **Document-level scope**
    * Applies to the entire document
    * Useful for properties that are consistent across the whole document
    * **Examples:** 
      * `doc.author = 'John Doe' and doc.publication_year > 2024`
      * `doc.publication_date >= '2023-01-01' AND doc.publication_date < '2024-01-01' AND doc.category IN ('Technology', 'Science')`
* **Part-level scope**
    * Applies to specific sections or chunks within a document
    * Useful for properties that may vary within different parts of the document
    * **Examples** 
      * `part.section = 'Introduction'`
      * `part.clause_type = 'Liability' AND part.risk_level = 25 AND part.is_boilerplate = false`


To learn more about setting up filterable metadata review the [filter attribute][4] 
section of the corpus creation documentation.

## Example filter expressions

The following filter expression selects customer reviews in German with better than a
3-star rating. Note that while there is a single rating for the entire document,
the detected language is set at the part level. 

```
doc.rating > 3.0 AND part.lang = 'deu'
```

The `lang` metadata tag used in this example is detected and set automatically
by the platform at indexing time. It's set at the part level for accuracy,
because a single document may contain content in multiple languages.

More complicated expressions are possible, such as the one below, which 
checks for documents with a publication date in 2021.

```
1609459200 < doc.pub_epoch AND doc.pub_epoch < 1640995200
```

Here, `pub_epoch` stores the date in [epoch time][3].

You can find a full list of supported syntax on the [Functions and Operators][2]
page.

[1]: http://www.contrib.andrew.cmu.edu/~shadow/sql/sql1992.txt
[2]: /docs/api-reference/search-apis/sql/func-opr
[3]: https://en.wikipedia.org/wiki/Unix_time
[4]: /docs/api-reference/admin-apis/create-corpus#filter-attribute

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
metadata. This response also shows other document-level and part-level metadata 
associated with each `document_id`.

```json
[
    {
        "type": "search_results",
        "search_results": [
            {
                "text": "Cloud computing has transformed the IT landscape by offering scalable and flexible resources...",
                "score": 0.8154528737068176,
                "part_metadata": {
                    "part.concept": "Overview",
                    "part.process": "Introduction",
                    "part.procedure": "1. Outline key benefits; 2. Discuss technological evolution; 3. Highlight future potential",
                    "part.reference": "Cloud Computing Foundations",
                    "part.is_boilerplate": false,
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
                    "desc": "An in-depth exploration of cloud computing, covering its evolution, service models, security implications, and future trends in technology."
                },
                "document_id": "CC-2024-TECH"
            },
            {
                "text": "An in-depth exploration of cloud computing, covering its evolution, service models...",
                "score": 0.7818809151649475,
                "part_metadata": {
                    "part.concept": "Overview",
                    "part.process": "Introduction",
                    "part.procedure": "1. Outline key benefits; 2. Discuss technological...",
                    "part.reference": "Cloud Computing Foundations",
                    "part.is_boilerplate": false,
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
                "text": "It covers the latest in encryption technologies, compliance standards, and best practices...",
                "score": 0.7642544507980347,
                "part_metadata": {
                    "part.concept": "Security",
                    "part.process": "Detailed Analysis",
                    "part.procedure": "1. Review current security measures; 2. Introduce advanced encryption...",
                    "part.reference": "Cloud Security Protocols",
                    "part.is_boilerplate": false,
                    "title": "Security Measures in Cloud Computing",
                    "lang": "eng",
                    "offset": 462,
                    "len": 154
                },
                "document_metadata": {
                    "category": "Technology",
                    "status": "Published",
                    "published": "2024-01-01",
                    "author": "Jane Doe",
                    "audience": "IT Professionals",
                    "doc_length": "extensive",
                    "title": "Comprehensive Guide to Cloud Computing",
                    "desc": "An in-depth exploration of cloud computing, covering its evolution, service models, security implications, and future trends in technology."
                },
                "document_id": "CC-2024-TECH"
            }
        ] 
   }      
]
```
