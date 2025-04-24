---
id: list-table-extractors
title: List Table Extractors API Definition
sidebar_label: List Table Extractors API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import {vars} from '@site/static/variables.json';

Tabular data extraction plays a crucial role in document processing, enabling 
efficient indexing and retrieval of structured information. The List Table 
Extractors API allows users to query available table extractors, ensuring 
seamless integration with Vectara's document processing pipeline. This API 
helps users identify the extractors supported by the platform, along with 
their specifications, to optimize document indexing.

Table extractors process documents to extract and structure tabular content. 
Users can choose from multiple extractors, each providing different extraction 
capabilities, or rely on the default extractor provided by Vectara.


## List Table Extractors Request and Response Details

To retrieve the available table extractors, send a `GET` request to 
`/v2/table_extractors`. This request returns a list of all supported table 
extractors, their names, descriptions, and whether they are the default 
extractor for document indexing.

### Example response

```json
{
  "table_extractors": [
    {
      "name": "gmft",
      "is_default": false,
      "description": "GMFT table extraction service",
      "generation": {
        "llm_name": "gpt-4o",
        "prompt_template": "[\n{\n\"role\": \"system\",\n\"content\": \"You are a helpful assistant tasked with summarizing tables...",
        "model_parameters": {
          "temperature": 0,
          "max_tokens": 1024,
          "top_p": 1,
          "frequency_penalty": 0,
          "presence_penalty": 0
        }
      }
    },
    {
      "name": "textract",
      "is_default": true,
      "description": "AWS Textract service",
      "generation": {
        "llm_name": "gpt-4o",
        "prompt_template": "[\n{\n\"role\": \"system\",\n\"content\": \"You are a helpful assistant tasked with summarizing tables.. .",
        "model_parameters": {
          "temperature": 0,
          "max_tokens": 1024,
          "top_p": 1,
          "frequency_penalty": 0,
          "presence_penalty": 0
        }
      }
    }
  ]
}
```
### Error responses

* **403 Forbidden** – The user does not have permission to list table extractors.
* **500 Internal Server Error** – A server-side error occurred while retrieving extractors.

## REST 2.0 URL

### List Table Extractors Endpoint

<Config v="names.product"/> exposes an HTTP endpoint to retrieve the supported table extractors:

<code>https://<Config v="domains.rest.indexing"/>/v2/table_extractors</code>