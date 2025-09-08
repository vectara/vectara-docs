---
id: bring-your-own-llm
title: Bring Your Own LLM
sidebar_label: Bring Your Own LLM
---


import CodePanel from '@site/src/theme/CodePanel';

Organizations often need to integrate multiple Large Language Models (LLMs) 
from different providers to optimize cost, performance, or compliance. 
Vectara's Bring Your Own LLM (BYO-LLM) capability enables seamless integration 
of third-party LLMs into Vectara's AI stack, supporting OpenAI-compatible 
models, resposes API for reasoning models, and Google Cloud Vertex AI.

By configuring LLMs with the Create LLM API, you can enhance flexibility in 
how Vectara generates summaries, answers, and content, leveraging your 
preferred LLM infrastructure while retaining full compatibility with Vectara's 
powerful RAG workflows.

## Define a custom LLM configuration

The integration relies on defining a custom LLM configuration with the 
[Create LLM](/docs/api-reference/llms-apis/create-llm) endpoint. Vectara supports three LLM types:

### Supported LLM Types

| Type | Description | Use For |
| --- | --- | --- |
| `openai-compatible` | OpenAI-style APIs | OpenAI, Anthropic Claude, Azure OpenAI |
| `openai-responses` | OpenAI Responses API | Reasoning models (o1, o3) |
| `vertex-ai` | Google Cloud Vertex AI | Gemini models |

After you enter the `type`, continue with the remaining configuration fields:

### Configuration Fields

| Field | Description |
| --- | --- |
| `type` | One of the following: `openai-compatible`, `openai-responses`, or `vertex-ai` |
| `name` | User-defined label for the LLM (referenced in queries) |
| `description` | (Optional) Metadata or notes about the model |
| `model` | Specific model version (`gpt-4`, `claude-3.5-sonnet`, `gemini-2.5-flash`) |
| `uri` | The API endpoint URL |
| `auth` | Authentication configuration (varies by type) |
| `headers` | (Optional) Additional HTTP headers for the API |
| `test_model_parameters` | (Optional) Test parameters to validate the configuration |

## Add custom LLM examples

Here are some examples for Anthropic, OpenAI, and Google LLMs.

### Add Anthropic Claude 3.7 Sonnet

#### Request Body

<CodePanel snippets={[{language: "json", code: `{
   "type": "openai-compatible",
   "name": "Claude 3.7 Sonnet",
   "description": "Anthropic'\\''s Claude 3.7 Sonnet model",
  "model": "claude-3-7-sonnet-20250219",
   "uri": "https://api.anthropic.com/v1/chat/completions",
   "auth": {
     "type": "header",
     "header": "x-api-key",
     "value": "sk-ant-......"
    },
   "test_model_parameters": {
     "max_tokens": 512
   }
}`
}]} title="Request Example" layout="stacked" />

#### cURL Example

<CodePanel snippets={[{language: "json", code: `curl -L -X POST 'https://api.vectara.io/v2/llms' \\
-H 'Content-Type: application/json' \\
-H 'Accept: application/json' \\
-H 'x-api-key: YOUR-VECTARA-API-KEY' \\
--data-raw '{
  "type": "openai-compatible",
  "name": "Claude 3.7 Sonnet",
  "description": "Anthropic'\\''s Claude 3.7 Sonnet model",
  "model": "claude-3-7-sonnet-20250219",
  "uri": "https://api.anthropic.com/v1/chat/completions",
  "auth": {
    "type": "header",
    "header": "x-api-key",
    "value": "sk-ant-..."
   },
   "test_model_parameters": {
     "max_tokens": 512
   }
}`
}]} title="Claude Example" layout="stacked" />

#### Successful Response

<CodePanel snippets={[{language: "json", code: `{
   "id": "llm_520721844",
   "name": "Claude 3.7 Sonnet",
   "description": "Anthropic's Claude 3.7 Sonnet model",
   "enabled": true
}`
}]} title="Response Example" layout="stacked" />

## Add OpenAI GPT-4o

<CodePanel snippets={[{language: "json", code: `curl -L -X POST 'https://api.vectara.io/v2/llms' \\
-H 'Content-Type: application/json' \\
-H 'Accept: application/json' \\
-H 'x-api-key: zut_' \\
--data-raw '{
  "type": "openai-compatible",
  "name": "GPT-4o Mini",
  "description": "OpenAI'\\''s 4o mini",
  "model": "gpt-4o-mini",
  "uri": "https://api.openai.com/v1/chat/completions",
  "auth": {
    "type": "header",
    "header": "Authorization",
    "value": "Bearer sk-..."
   },
  "test_model_parameters": {
    "max_tokens": 512
   }
}'`
}]} title="GPT-4o Mini Example" layout="stacked" />

## Add Google Gemini (Vertex AI)

### Using API Key Authentication

<CodePanel snippets={[{language: "json", code: `curl -L -X POST 'https://api.vectara.io/v2/llms' \\
-H 'Content-Type: application/json' \\
-H 'Accept: application/json' \\
-H 'x-api-key: YOUR-VECTARA-API-KEY' \\
--data-raw '{
  "type": "vertex-ai",
  "name": "Gemini 2.5 Flash",
  "description": "Google Gemini 2.5 Flash model",
  "model": "gemini-2.5-flash",
  "uri": "https://aiplatform.googleapis.com/v1/projects/YOUR-PROJECT-ID/locations/us-central1",
  "auth": {
    "type": "api_key",
    "api_key": "YOUR-GOOGLE-CLOUD-API-KEY"
   },
   "test_model_parameters": {
     "max_tokens": 512
   }
}'`}]} title="Google Gemini Example" layout="stacked" />

### Using Service Account Authentication

<CodePanel snippets={[{language: "json", code: `curl -L -X POST 'https://api.vectara.io/v2/llms' \\
-H 'Content-Type: application/json' \\
-H 'Accept: application/json' \\
-H 'x-api-key: YOUR-VECTARA-API-KEY' \\
--data-raw '{
  "type": "vertex-ai",
  "name": "Gemini 2.5 Pro",
  "description": "Google Gemini 2.5 Pro model",
  "model": "gemini-2.5-pro",
  "uri": "https://aiplatform.googleapis.com/v1/projects/YOUR-PROJECT-ID/locations/us-central1",
  "auth": {
    "type": "service_account",
    "key_json": "{\\"type\\":\\"service_account\\",\\"project_id\\":\\"YOUR-PROJECT\\",\\"private_key\\":\\"-----BEGIN PRIVATE KEY-----\\\\n...\\\\n-----END PRIVATE KEY-----\\\\n\\"}"
   }
}'`}]} title="Service Account Example" layout="stacked" />

## Add OpenAI Reasoning Models (o1, o3)

<CodePanel snippets={[{language: "json", code: `curl -L -X POST 'https://api.vectara.io/v2/llms' \\
-H 'Content-Type: application/json' \\
-H 'Accept: application/json' \\
-H 'x-api-key: YOUR-VECTARA-API-KEY' \\
--data-raw '{
  "type": "openai-responses",
  "name": "o1-preview",
  "description": "OpenAI o1 Preview reasoning model",
  "model": "o1-preview",
  "uri": "https://api.openai.com/v1/chat/completions",
  "auth": {
    "type": "bearer",
    "token": "sk-..."
   },
   "test_model_parameters": {
     "max_tokens": 512
   }
}'`}]} title="OpenAI o1 Example" layout="stacked" />
## Verify your configuration

To confirm your model was added successfully:

<CodePanel snippets={[{language: "bash", code: `curl -L -X GET 'https://api.vectara.io/v2/llms' \\
-H 'Accept: application/json' \\
-H 'x-api-key: YOUR-VECTARA-API-KEY'`
}]} title="Verification Example" layout="stacked" />

Look for your model in the response JSON and verify it has `"enabled": true`.

## Querying with a custom LLM

After you register a third-party LLM using the `/v2/llms` endpoint, you do not 
reference it directly by ID in your query. Instead, you associate the custom 
LLM with a generation preset, and then use that preset in your query 
with `generation_preset_name`.

However, when defining custom `model_parameters`, you can override the default 
preset and explicitly specify the registered model by name.

### Example query 

<CodePanel snippets={[{language: "json", code: `curl -X POST 'https://api.vectara.io/v2/query' \\
-H 'Content-Type: application/json' \\
-H 'Accept: application/json' \\
-H 'x-api-key: zut_...' \\
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
    "prompt_template": "[ {\\"role\\": \\"user\\", \\"content\\": \\"custom instructions\\"} ]",
    "model_parameters": {
      "llm_name": "claude-3-7-sonnet"
    }
  }
}'`
}]} title="Query Custom LLM Example" layout="stacked" />
