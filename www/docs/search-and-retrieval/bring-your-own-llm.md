---
id: bring-your-own-llm
title: Bring Your Own LLM
sidebar_label: Bring Your Own LLM
---

Organizations often need to integrate multiple Large Language Models (LLMs) 
from different providers to optimize cost, performance, or compliance. 
Vectara’s Bring Your Own LLM (BYO-LLM) capability allows seamless integration 
of third-party LLMs—including OpenAI, Anthropic, Google, and other 
OpenAI-compatible models—into Vectara's AI stack.

By configuring LLMs with the Create LLM API, you can enhance flexibility in 
how Vectara generates summaries, answers, and content, leveraging your 
preferred LLM infrastructure while retaining full compatibility with Vectara's 
powerful RAG workflows.

## Define a custom LLM configuration

The integration relies on defining a custom LLM configuration with the 
[Create LLM](/docs/api-reference/llms-apis/create-llm) endpoint. The following table provides 
the custom LLM configuration fields:

| Field | Description |
| --- | --- |
| `type`                  | Set to `openai-compatible` to indicate compatibility with OpenAI-style APIs. |
| `name`                  | User-defined label for the LLM configuration. |  |
| `description`           | (Optional) Metadata or notes about the model. |  |
| `model`                 | Specific model version (`gpt-4`, `claude-3-7-sonnet-20250219`) |  |
| `uri`                   | The API endpoint used to send LLM requests. For example, `https://api.anthropic.com/v1/chat/completions`|  |
| `auth`                  | Authentication object (bearer token or custom header auth). |  |
| `test_model_parameters` | (Optional) Test parameters to validate the configuration (`max_tokens`) |  |

## Custom LLM examples

### Add Anthropic Claude 3.7 Sonnet

#### Request Body

```json
{
  "type": "openai-compatible",
  "name": "Claude 3.7 Sonnet",
  "description": "Anthropic'\''s Claude 3.7 Sonnet model",
  "model": "claude-3-7-sonnet-20250219",
  "uri": "https://api.anthropic.com/v1/chat/completions",
  "auth": {
    "type": "header",
    "header": "x-api-key",
    "value": "sk-ant-......"
  },
  "test_model_parameters": {
    "max_tokens": 256
  }
}
```

#### cURL Example

```json
curl -L -X POST 'https://api.vectara.io/v2/llms' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-H 'x-api-key: YOUR-VECTARA-API-KEY' \
--data-raw '{
  "type": "openai-compatible",
  "name": "Claude 3.7 Sonnet",
  "description": "Anthropic'\''s Claude 3.7 Sonnet model",
  "model": "claude-3-7-sonnet-20250219",
  "uri": "https://api.anthropic.com/v1/chat/completions",
  "auth": {
    "type": "header",
    "header": "x-api-key",
    "value": "sk-ant-..."
  },
  "test_model_parameters": {
    "max_tokens": 256
  }
}'
```

#### Successful Response

```json
{
  "id": "llm_520721844",
  "name": "Claude 3.7 Sonnet",
  "description": "Anthropic's Claude 3.7 Sonnet model",
  "enabled": true
}
```

## Add OpenAI GPT-4

```json
curl -L -X POST 'https://api.vectara.io/v2/llms' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-H 'x-api-key: zut_' \
--data-raw '{
  "type": "openai-compatible",
  "name": "GPT-4o Mini",
  "description": "OpenAI'\''s 4o mini",
  "model": "gpt-4o-mini",
  "uri": "https://api.openai.com/v1/chat/completions",
  "auth": {
    "type": "header",
    "header": "Authorization",
    "value": "Bearer sk-..."
  },
  "test_model_parameters": {
    "max_tokens": 256
  }
}'
```

## Add Google Gemini 2.0 Flash

```json
curl -L -X POST 'https://api.vectara.io/v2/llms' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-H 'x-api-key: zut_...' \
--data-raw '{
  "type": "openai-compatible",
  "name": "Google Gemini 2.0 Flash",
  "description": "Google 2.0 Flash",
  "model": "gemini-2.0-flash",
  "uri": "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
  "auth": {
    "type": "header",
    "header": "Authorization",
    "value": "Bearer AI..."
  },
  "test_model_parameters": {
    "max_tokens": 256
  }
}'

```
## Verify your configuration

To confirm your model was added successfully:

```
curl -L -X GET 'https://api.vectara.io/v2/llms' \
-H 'Accept: application/json' \
-H 'x-api-key: YOUR-VECTARA-API-KEY'
```

Look for your model in the response JSON and verify it has `"enabled": true`.

## Querying with a custom LLM

After you register a third-party LLM using the `/v2/llms` endpoint, you do not 
reference it directly by ID in your query. Instead, you associate the custom 
LLM with a generation preset, and then use that preset in your query 
with `generation_preset_name`.

However, when defining custom `model_parameters`, you can override the default 
preset and explicitly specify the registered model by name.

### Example query 

```json
curl -X POST 'https://api.vectara.io/v2/query' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-H 'x-api-key: zut_...' \
-d '{
  "query": "Here is my query",
  "search": {
    "corpora": [
      {
        "corpus_key": "corpus_1",
        "lexical_interpolation": 0.025
      }
    ],
    "limit": 10,
    "offset": 0
  },
  "generation": {
    "generation_preset_name": "custom-llm",
    "prompt_template": "[ {\"role\": \"user\", \"content\": \"custom instructions\"} ]",
    "model_parameters": {
      "llm_name": "claude-3-7-sonnet"
    }
  }
}'
```
