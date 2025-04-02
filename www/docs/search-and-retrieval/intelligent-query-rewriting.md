---
id: intelligent-query-rewriting
title: Intelligent Query Rewriting
sidebar_label: Intelligent Query Rewriting
---


Many datasets contain filterable metadata that can improve search relevance, 
but users often lack knowledge of these metadata structures, or how to 
apply filters effectively. The tech preview release of Intelligent Query 
Rewriting addresses this by analyzing user queries, automatically extracting 
and applying relevant metadata filters, and rephrasing the query. 

This capability enhances search precision by automatically generating metadata 
filter expressions from natural language queries. This enables users to 
retrieve highly relevant information without needing to understand or apply 
metadata filters manually.

For example, a user searches for `“What was Apple’s revenue last year?”`, and Intelligent 
Query Rewriting automatically generates a filter like 
`doc.ticker = 'aapl' AND doc.year = 2023` to refine the search results. 


## Enable intelligent query rewriting

You enable intelligent query rewriting on a per-query basis by setting the 
`intelligent_query_rewriting` parameter to `true` in the search request. This 
allows you to have flexible control over applying this capability.

### Supported API endpoints (beta)

* [Simple Single Corpus Query](/docs/rest-api/search-corpus). Set the 
  `intelligent_query_rewriting` parameter in the query string. For other endpoints, 
  include it in the request body.
* [Advanced Single Corpus Query](/docs/rest-api/query-corpus)
* [Multiple Corpora Query](/docs/rest-api/query)
* [Start a Chat](/docs/rest-api/create-chat)
* [Create Chat Turn](/docs/rest-api/create-chat-turn)

## Example intelligent query rewriting

Consider a corpus containing movie data with the metadata filter attribute:

`doc.production_country` (Text)

1. A user submits the following query:

  `What are some of the highest grossing movies made in US, UK, or India?`

2. Intelligent Query Rewriting processes the query by extracting the following 
   metadata filters:

  `doc.production_country IN ('United States of America', 'United Kingdom', 'India')`

3. Rephrasing the query removes the filter context:

  `What are some of the highest grossing movies?`

### Example request
```json
{
  "query": "What are some of the highest grossing movies made in US, UK, or India?",
  "intelligent_query_rewriting": true,
  "corpora": [
    {
      "corpus_key": "movie_database"
    }
  ]
}  
```
### Example response

```json
{
	  ...
	  "rewritten_queries": [
	    {
	      "corpus_key": "my_corpus",
	      "filter_extraction": {
	        "query": "What are some of the highest grossing movies?",
	        "metadata_filter": "doc.production_country IN ('United States of America', 'United Kingdom', 'India')"
	      }
	    }
	  ]
  }
```

### Error handling

If an error occurs during filter extraction, Intelligent Query Rewriting is 
aborted for the affected corpus, and the original query is executed. A warning 
message is returned in the response.

**Example Error Response**

```json
{
  "warnings": [
    "intelligent_query_rewriting_failed"
  ],
  "rewritten_queries": [
    {
      "corpus_key": "my_corpus",
      "filter_extraction": {}
    }
  ]
}
```

## Behavior with existing metadata filters in requests

If the request already contains a `metadata_filter` and you enable 
`intelligent_query_rewriting`, the extracted filter combines with the provided 
filter using a logical `AND`.

### Example request with metadata filter

```json
{
  "query": "What are some of the highest grossing movies made in US, UK or India?",
  "intelligent_query_rewriting": true,
  "search": {
    "corpora": [
      {
        "corpus_key": "my_corpus",
        "metadata_filter": "doc.genre = 'action'"
      }
    ]
  }
}
```
#### Example Response

```json
{
  "rewritten_queries": [
    {
      "corpus_key": "my_corpus",
      "filter_extraction": {
        "query": "What are some of the highest grossing movies?",
        "metadata_filter": "(doc.genre = 'action') AND (doc.production_country IN ('United States of America', 'United Kingdom', 'India'))"
      }
    }
  ]
}
```

## Best practices for intelligent query rewriting

### Define filter attributes clearly

Providing detailed descriptions of filter attributes improves filter 
extraction and search accuracy. Consider including the following information:

* **Content and Format Descriptions**
      Explain the purpose and structure of each attribute.  
    `doc.production_country (Text): The production country of a movie.`
* **Possible Values**  
  For text attributes, list possible values where applicable.  
   * **direction:** Specifies the compass direction. Possible values: `[NORTH, SOUTH, EAST, WEST]`.
   * **color:** Indicates product color. Possible values: `[WHITE, BLACK, GREY]`.
* **Case Sensitivity**  
  Specify if values are case-sensitive, such as all lowercase or PascalCase.
* **Value Format**  
  Indicate whether values use abbreviations (`USA`, `UK`) or full names (`United States of America`).

### Handling date attributes

While date attributes are not fully supported, they can function as 
text attributes if stored in the format `YYYY-MM-DD`. This allows comparison 
operators (`<`, `>`) to work effectively.

`doc.release_date = '2024-02-06'`
