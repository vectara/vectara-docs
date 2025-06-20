---
id: generation_presets
title: Generation Presets
---

import CodePanel from '@site/src/theme/CodePanel';
import { Spacer } from "@site/src/components/ui/Spacer";

This guide covers the Vectara Python SDK for managing generation presets, which are configurations for controlling Retrieval Augmented Generation (RAG) behavior in queries and chats. Generation presets define default settings for large language models (LLMs), such as prompt templates, token limits, and response characteristics, enabling customized conversational AI and summarization.

## Prerequisites

   <CodePanel
     title="Install Vectara SDK"
     defaultLanguage="bash"
     snippets={[
       { language: 'bash', code: `pip install vectara` }
     ]}
     annotations={{
       bash: [{ line: 1, text: 'Installs the Vectara Python SDK via pip.' }]
     }}
   />

1. **Install the SDK**:

   <CodePanel
     title="Initialize VectaraClient"
     defaultLanguage="python"
     snippets={[
       { language: 'python', code: `from vectara import VectaraClient\n\n# Using API key\nclient = VectaraClient(api_key="your_api_key", customer_id="your_customer_id")\n\n# Using OAuth 2.0\nclient = VectaraClient(bearer_token="your_bearer_token", customer_id="your_customer_id")` }
     ]}
     annotations={{
       python: [
         { line: 3, text: 'Use a Query or Index API Key for accessing presets.' },
         { line: 6, text: 'OAuth 2.0 is recommended for production environments.' }
       ]
     }}
   />

2. **Authentication**:
 - Obtain an API key or OAuth 2.0 token from the [Vectara Console](https://console.vectara.com). 
 - Initialize the `VectaraClient` with your credentials.

3. **Corpus setup**: Create a corpus with indexed documents using `client.corpora.create` and `client.documents.index` or `client.upload.file` (see [Corpus Management Guide](corpus.md), [Indexing Documents Guide](index.md), [Uploading Files Guide](upload_file.md)).
4. Generation presets configure RAG for queries and chats, not direct document management. Use presets in `client.corpora.query` or `client.chats.create` to customize responses (see [Querying Corpora Guide](query.md), [Managing Chats Guide](chats.md)).

## Generation presets method

### List generation presets

**Purpose**: Retrieve a paginated list of generation presets available for configuring RAG in queries and chats, including LLM settings and prompt templates.

<CodePanel
     title="Method"
     defaultLanguage="python"
     snippets={[
       { language: 'python', code: `client.generation_presets.list(
    limit: int = 10,
    page_key: str = None,
    timeout: int = None,
    timeout_millis: int = None
) -> dict` }
     ]}
     layout="stacked"
   />

**Parameters**:
- `limit`: Maximum number of presets to return (1–100, default: 10).
- `page_key`: Optional token for pagination.
- `timeout`, `timeout_millis`: Optional timeouts.

**Returns**: Dictionary with:
- `generation_presets`: List of preset metadata, including `name`, `description`, `llm_name`, `prompt_template`, `max_used_search_results`, `max_tokens`, `temperature`, `frequency_penalty`, `presence_penalty`, `enabled`, and `default`.
- `metadata`: Pagination info (e.g., `page_key`).

<CodePanel
  title="Example: List Generation Presets for a Support Chatbot"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `try:\n    response = client.generation_presets.list(\n        limit=5\n    )\n    for preset in response["generation_presets"]:\n        print(f"Preset: {preset['name']} (LLM: {preset['llm_name']}, Default: {preset['default']})")\n    if response["metadata"]["page_key"]:\n        print(f"Next page key: {response['metadata']['page_key']}")\nexcept Exception as e:\n    print(f"Listing presets failed: {e}")` },
    { language: 'json', code: `{\n  "generation_presets": [\n    {\n      "name": "support_chat",\n      "description": "Preset for technical support chat responses",\n      "llm_name": "mockingbird-2.0",\n      "prompt_template": "[{\\"role\\": \\"system\\", \\"content\\": \\"You are a technical support assistant. Provide concise answers based on search results.\\"},{\\"role\\": \\"user\\", \\"content\\": \\"Answer the query based on the provided search results.\\"}]",\n      "max_used_search_results": 5,\n      "max_tokens": 200,\n      "temperature": 0.7,\n      "frequency_penalty": 0.5,\n      "presence_penalty": 0.3,\n      "enabled": true,\n      "default": false\n    }\n  ],\n  "metadata": {\n    "page_key": "next_page_token"\n  }\n}` }
  ]}
  annotations={{
    python: [
      { line: 3, text: 'Limit the number of presets returned.' },
      { line: 5, text: 'Access preset details like name and LLM.' },
      { line: 7, text: 'Use page_key for pagination.' }
    ],
    json: [
      { line: 4, text: 'Preset name for use in queries or chats.' },
      { line: 7, text: 'Prompt template for RAG configuration.' },
      { line: 16, text: 'Pagination token for next page.' }
    ]
  }}
  layout="stacked"
/>

<CodePanel
  title="Example: Financial summary using generation"
  defaultLanguage="python"
  snippets={[
    {
      language: 'python',
      code: `import requests
import json

url = "https://api.vectara.io/v2/chats"

payload = json.dumps({
  "query": "Summarize Q1 2024 earnings for all European banking clients.",
  "generation": {
    "generation_preset_name": "mockingbird-2.0",
    "response_language": "eng"
  },
  "search": {
    "corpora": [
      {
        "corpus_key": "finance_docs"
      }
    ],
    "metadataFilter": "doc_region = 'EU' AND doc_quarter = 'Q1-2024' AND doc_industry = 'banking'"
  },
  "chat": {
    "store": false
  }
})
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'x-api-key': '<x-api-key>'
}

response = requests.post(url, headers=headers, data=payload)
print(response.text)`
    }
  ]}
  annotations={{
    python: [
      { line: 7, text: 'Query focused on summarizing Q1 earnings for EU banking sector.' },
      { line: 9, text: 'Use the Mockingbird 2.0 preset for financial reporting.' },
      { line: 15, text: 'Scoped to a finance-specific corpus.' },
      { line: 18, text: 'Filter by region, quarter, and industry.' }
    ]
  }}
  layout="stacked"
/>

<CodePanel
  title="Example: Support troubleshooting generation"
  defaultLanguage="python"
  snippets={[
    {
      language: 'python',
      code: `import requests
import json

url = "https://api.vectara.io/v2/chats"

payload = json.dumps({
  "query": "What causes repeated login failures in our mobile app?",
  "generation": {
    "generation_preset_name": "mockingbird-2.0",
    "response_language": "eng"
  },
  "search": {
    "corpora": [
      {
        "corpus_key": "support_kb"
      }
    ],
    "metadataFilter": "doc_platform = 'mobile' AND doc_issue_type = 'auth_failure'"
  },
  "chat": {
    "store": false
  }
})
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'x-api-key': '<x-api-key>'
}

response = requests.post(url, headers=headers, data=payload)
print(response.text)`
    }
  ]}
  annotations={{
    python: [
      { line: 7, text: 'Troubleshooting question targeting mobile authentication issues.' },
      { line: 9, text: 'Use generation preset optimized for support responses.' },
      { line: 15, text: 'Reference corpus for technical support knowledge base.' },
      { line: 18, text: 'Narrow results to mobile platform and auth failures.' }
    ]
  }}
  layout="stacked"
/>

<CodePanel
  title="Example: legal clause generation example"
  defaultLanguage="python"
  snippets={[
    {
      language: 'python',
      code: `import requests
import json

url = "https://api.vectara.io/v2/chats"

payload = json.dumps({
  "query": "Explain whether this arbitration clause excludes class actions.",
  "generation": {
    "generation_preset_name": "mockingbird-2.0",
    "response_language": "eng"
  },
  "search": {
    "corpora": [
      {
        "corpus_key": "legal_docs"
      }
    ],
    "metadataFilter": "doc_clause_type = 'arbitration' AND doc_jurisdiction = 'US'"
  },
  "chat": {
    "store": false
  }
})
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'x-api-key': '<x-api-key>'
}

response = requests.post(url, headers=headers, data=payload)
print(response.text)`
    }
  ]}
  annotations={{
    python: [
      { line: 7, text: 'Prompt focused on class-action implications in arbitration clauses.' },
      { line: 9, text: 'Use the legal-tuned generation preset.' },
      { line: 15, text: 'Corpora dedicated to contracts and legal language.' },
      { line: 18, text: 'Filter for US-based arbitration clauses.' }
    ]
  }}
  layout="stacked"
/>


**Error handling**:
- **400 Bad Request**: Invalid parameters.
  - *Resolution*: Ensure `limit` is within 1–100 and `page_key` is a valid token if provided.
- **403 Forbidden**: Insufficient permissions.
  - *Resolution*: Use a Query or Index API Key with read access.

:::tip Tips
- Use preset names (e.g., `support_chat`) in `client.corpora.query` or `client.chats.create` via the `generation_preset_name` parameter to apply preset settings.
- The `prompt_template` defines how search results are processed for RAG (see [Vectara Prompt Engine](https://docs.vectara.com/docs/prompts/vectara-prompt-engine)).
- `default` presets are used when no `generation_preset_name` is specified.
- To create or modify presets, contact Vectara support, as these operations are not exposed in the API.
:::

## Additional notes

- **Generation tasks**: Generation presets enhance RAG in queries and chats, addressing user needs for customized conversational AI. Use presets to streamline LLM configuration, aligning with GenAI expectations.
- **Query vs. prompt confusion**: Presets configure RAG prompts, not direct queries. Apply presets in `client.corpora.query` or `client.chats.create` to mimic prompt-based interactions (see [Querying Corpora Guide](vectara_python_sdk_queries.md), [Managing Chats Guide](vectara_python_sdk_chats.md)).
- **Preset management**: The API only supports listing presets. For creating or updating presets, contact `feedback@vectara.com` or use the Vectara Console.
- **Improving usability**: If preset parameters (e.g., `temperature`, `prompt_template`) are unclear, provide feedback to `feedback@vectara.com` with specific examples, as suggested internally.

## Next steps

- Use listed presets in `client.corpora.query` or `client.chats.create` to customize RAG responses.
- Index documents or upload files to enrich RAG context (see [Indexing Documents Guide](index.md), [Uploading Files Guide](upload_file.md)).
- Explore chat functionality with `client.chats.create` for conversational AI (see [Managing Chats Guide](chats.md)).
- Review the [Vectara API Recipes](https://docs.vectara.com/docs/api-recipes) for RAG configuration examples.
- Test presets in the [Vectara API Playground](https://console.vectara.com) to validate settings.
