---
id: create-encoder
title: Create Encoder API Definition
sidebar_title: Create Encoder API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import vars from '@site/static/variables.json';

The Create Encoder API allows users to register a new text embedding encoder 
for use within the Vectara platform. This API enables seamless integration 
with OpenAI-compatible encoders, such as those used for retrieving embeddings 
from external AI providers. By defining authentication details, model 
parameters, and API endpoints, users can manage multiple encoder 
configurations tailored to their specific AI workflows.

Use this API to configure custom embedding models that generate vector 
representations of text, which can then be leveraged for similarity search, 
document retrieval, and advanced AI applications.

## Create Encoder Request and Response Details

To create a new encoder, send a `POST` request to `/v2/encoders`. The request body 
must include the following parameters:

* `type`: Set to `openai-compatible` to indicate compatibility with OpenAI-based 
  embedding APIs.
* `name`: Provides a unique name for the encoder.
* `description`: Adds a description about the encoder.
* `uri`: Specifies the URI endpoint for the embedding API of where to send the encoding 
  requests, such as `https://api.openai.com/v1/embeddings`
* `model`: Specifies the exact model name, such as `text-embedding-ada-002`.
* `auth`: Defines authentication details, supporting either Bearer token 
  authentication or custom header-based authentication.

### Example request

This example request creates an encoder for document similarity search.

```json
{
  "type": "openai",
  "name": "custom-embedding-encoder",
  "description": "Custom OpenAI embedding encoder for document similarity search.",
  "uri": "https://api.openai.com/v1/embeddings",
  "model": "text-embedding-ada-002",
  "auth": {
    "type": "bearer",
    "token": "your-api-key"
  }
}
```

### Example response

The response includes details about the newly created encoder.

```json
{
    "id": "enc_987654321",
    "name": "custom-embedding-encoder",
    "description": "Custom OpenAI embedding encoder for document similarity search.",
    "output_dimensions": 1536,
    "enabled": true
}
```


## Error responses

* **400 Bad Request** - The request contained invalid parameters.
* **403 Forbidden** - The user does not have permission to create an encoder.

## REST 2.0 URL

### Create Encoder Endpoint Address

<Config v="names.product"/> exposes an HTTP endpoint at the following URL to 
create and configure an encoder:
<code>https://<Config v="domains.rest.indexing"/>/v2/encoders</code>

