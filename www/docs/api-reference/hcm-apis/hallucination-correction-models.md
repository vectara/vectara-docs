---
id: list-hallucination-correctors
title: List Hallucination Correctors API Definition
sidebar_label: List Hallucination Correctors API Definition
---


import CodePanel from '@site/src/theme/CodePanel';

The List Hallucination Correctors API enables users to list available 
hallucinaton correctors used for detecting and correcting hallucinations in 
AI-generated content. Vectara provides these models as part of its broader 
hallucination evaluation framework, and the Hallucination Correctors endpoint 
uses these models to propose factual corrections to summaries and other 
generative outputs.

Use this API to inspect available correctors, filter results, and determine 
which hallucination corrector to reference in downstream workflows or 
evaluation pipelines.

## List Hallucination Correctors request and response details

To retrieve available correctors, send a `GET` request to 
`/v2/hallucination_correctors`. The request supports the following 
optional query parameters:

* `filter`: A regular expression used to match corrector names and descriptions.
* `limit`: The maximum number of correctors to return.  
  - **Default:** 10  
  - **Maximum:** 100
* `page_key`: A cursor to fetch the next page of results in a paginated 
  response.

### Example response

The response includes a list of available correctors and a `page_key` for 
pagination.

<CodePanel snippets={[{language: "json", code: `{
  "hallucination_correctors": [
    {
      "id": "hc_123",
      "name": "vhc-small-1.0",
      "type": "vectara",
      "description": "Qwen/Qwen2.5-7B-Instruct LLM for hallucination correction in AI-generated text.",
      "enabled": true
    }
  ],
  "metadata": {
    "page_key": "eyJzIjoiNTY3OGEifQ=="
  }
}`}]} title="Code Example" layout="stacked" />
### Error responses

* **400 Bad Request:** The request contained invalid parameters or malformed 
  input.
* **403 Forbidden:** The user does not have permission to access the correctors 
  list.

## REST 2.0 URL

### List Hallucination Correctors endpoint address

<Config v="names.product"/> exposes an HTTP endpoint for listing hallucination 
correctors:

<code>https://<Config v="domains.rest.indexing"/>/v2/hcs</code>

