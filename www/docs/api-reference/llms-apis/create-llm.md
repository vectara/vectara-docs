---
id: create-llm
title: Create LLM API Definition
sidebar_label: Create LLM API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import {vars} from '@site/static/variables.json';
import {Config} from '@site/docs/definitions.md';

Large Language Models (LLMs) power AI-driven applications like text 
generation, chat interfaces, and document processing. The Create LLM API 
allows users to integrate and configure external LLMs for use with the Vectara 
query and chat endpoints. This API enables seamless connectivity with 
OpenAI API-compatible models, including Anthropic Claude, Azure OpenAI, and 
custom-hosted LLMs.

Users can configure multiple LLMs by specifying an API key (or other 
credentials), an API endpoint, and a model name and description. This 
flexibility allows organizations to integrate different LLM providers into the
Vectara platform, ensuring seamless compatibility with their applications.

The API makes it easy to integrate external LLMs by allowing users to define 
custom LLM configurations. Users can specify authentication credentials, set 
API endpoints, and provide model details to seamlessly incorporate third-party 
models into their Vectara workflow.

## Create LLM Request and Response Details

To create a new LLM configuration, send a `POST` request to `/v2/llms`. The 
request body specifies the following parameters:

* `type:` Set to `openai-compatible` to indicate compatibility with OpenAI-based 
  APIs such as OpenAI, Anthropic Claude, or Azure OpenAI.
* `name:` Provides a user-defined label for the LLM configuration.
* `description:` Lets you add metadata about the model. 
* `model:` Specifies the exact model name, such as `gpt-4`, `claude-2`. 
* `uri:` Contains the API endpoint where to send requests, ensuring that the 
  model is correctly connected.
* `auth`: Specifies the authentication configuration for an LLM as bearer token 
  authentication or custom header-based authentication.
* `test_model_parameters`: Specifies any additional parameters that are required 
  for the LLM during the test call.

### Authentication methods

The request requires authentication details, and you can provide them either 
as a Bearer token or custom header-based authentication.

**Bearer token authentication**

```json
{
  "type": "bearer",
  "token": "your-api-key"
}
```
**Header-based authentication**

```json
{
  "type": "header",
  "header": "x-api-key",
  "value": "your-api-key"
}
```

### Example request

```json
{
  "type": "openai-compatible",
  "name": "CustomGPT-4",
  "description": "GPT-4 instance hosted on Azure",
  "model": "gpt-4",
  "uri": "https://api.openai.com/v1/chat/completions",
  "auth": {
    "type": "bearer",
    "token": "your-api-key"
  }
}
```

The response contains the newly created LLM configuration and includes a 
unique id assigned to the LLM, along with the name, description, and an 
enabled status indicating that the model is active and available for use.

### Example response

```json
{
    "id": "llm_123456789",
    "name": "CustomGPT-4",
    "description": "GPT-4 instance hosted on Azure",
    "enabled": true
}
```
## Error responses

* **400 Bad Request** - The request body is invalid.
* **403 Forbidden** – The user does not have permission to delete the specified LLM.

## REST 2.0 URL

### Create LLM Endpoint Address

<Config v="names.product"/> exposes an HTTP endpoint at the following URL to 
create and configure a Large Language Model (LLM):
<code>https://<Config v="domains.rest.indexing"/>/v2/llms</code>

