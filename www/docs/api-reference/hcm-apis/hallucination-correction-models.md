---
id: list-hallucination-correction-models
title: List Hallucination Correction Models (HCM) API Definition
sidebar_label: List Hallucination Correction Models (HCM) Definition
---

The List Hallucination Correction Models API enables users to list available 
models used for detecting and correcting hallucinations in AI-generated 
content. Vectara provides these models as part of its broader hallucination 
evaluation framework, and the Hallucination Correction Model (HCM) endpoint 
uses these models to propose factual corrections to summaries and other 
generative outputs.

Use this API to inspect available models, filter results, and determine which 
hallucination correction model to reference in downstream workflows or 
evaluation pipelines.

## List Hallucination Correction Models request and response details

To retrieve available correction models, send a `GET` request to 
`/v2/hcms`. The request supports the following 
optional query parameters:

* **`filter`**: A regular expression used to match model names and descriptions.
* **`limit`**: The maximum number of models to return (default is 10, max is 100).
* **`page_key`**: A cursor to fetch the next page of results in a paginated 
  response.

### Example response

The response includes a list of available models and a `page_key` for pagination.

```json
{
  "hallucination_correction_models": [
    {
      "id": "hcm_123",
      "name": "qwen2.5-7b-instruct-hcm",
      "type": "vectara",
      "description": "Qwen/Qwen2.5-7B-Instruct LLM for hallucination correction in AI-generated text.",
      "enabled": true
    }
  ],
  "metadata": {
    "page_key": "eyJzIjoiNTY3OGEifQ=="
  }
}
```
### Error responses

* **400 Bad Request:** The request contained invalid parameters or malformed 
  input.
* **403 Forbidden:** The user does not have permission to access the model list.

## REST 2.0 URL

### List Hallucination Correction Models Endpoint Address

<Config v="names.product"/> exposes an HTTP endpoint for listing hallucination 
correction models:

<code>https://<Config v="domains.rest.indexing"/>/v2/hcms</code>

