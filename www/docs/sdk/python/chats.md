---
id: chats
title: Chats
---

import CodePanel from '@site/src/theme/CodePanel';
import { Spacer } from "@site/src/components/ui/Spacer";

This guide covers the Vectara Python SDK for managing chat conversations, enabling conversational AI with Retrieval Augmented Generation (RAG) and chat history. These methods allow you to create chats, list conversations, retrieve message exchanges (turns), and update turn status, ideal for building interactive applications like support chatbots.

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
         { line: 3, text: 'Use a Query or Index API Key for chat operations.' },
         { line: 6, text: 'OAuth 2.0 is recommended for production environments.' }
       ]
     }}
   />

2. **Authentication**:
   - Obtain an API key or OAuth 2.0 token from the [Vectara Console](https://console.vectara.com).
   - Initialize the `VectaraClient` with your credentials.

3. **Corpus Setup**: Create a corpus with indexed documents using `client.corpora.create` and `client.documents.index` or `client.upload.file` (see [Corpus Management Guide](vectara_python_sdk_corpora.md), [Indexing Documents Guide](vectara_python_sdk_indexing.md), [Uploading Files Guide](vectara_python_sdk_upload.md)).
4. Chat methods enable conversational AI with RAG, using indexed documents for context. For direct search, use `client.corpora.query` (see [Querying Corpora Guide](vectara_python_sdk_queries.md)).

## Chat methods

### 1. Create a chat conversation

**Purpose**: Start or continue a chat conversation with a large language model, supporting RAG for context-aware responses.

<CodePanel
     title="Method"
     defaultLanguage="python"
     snippets={[
       { language: 'python', code: `client.chats.create(
    query: str,
    corpus_key: str,
    search: dict = None,
    generation: dict = None,
    chat: dict = None,
    save_history: bool = True,
    intelligent_query_rewriting: bool = False,
    stream_response: bool = False,
    timeout: int = None,
    timeout_millis: int = None
) -> dict` }
     ]}
    layout="stacked"
   />

**Parameters**:
- `query`: The user’s chat message or question (e.g., "How do I reset my password?").
- `corpus_key`: Unique identifier of the corpus for RAG context (e.g., "support_kb").
- `search`: Optional dictionary for search parameters:
  - `metadata_filter`: Filter expression (e.g., "doc.category = 'authentication'").
  - `lexical_interpolation`: Float (0–1) for hybrid search (e.g., 0.05).
  - `limit`, `offset`: Pagination controls.
- `generation`: Optional dictionary for RAG:
  - `generation_preset_name`: LLM preset (e.g., "mockingbird-2.0").
  - `prompt_template`: Custom prompt template (JSON format).
  - `max_response_characters`: Maximum response length.
  - `response_language`: Language code (e.g., "eng").
- `chat`: Optional dictionary for chat settings:
  - `store`: Boolean to store chat messages (default: True).
- `save_history`: Optional boolean to save the chat in history (overrides `chat.store`, default: True).
- `intelligent_query_rewriting`: Optional boolean for query rewriting (tech preview, default: False).
- `stream_response`: Optional boolean for streaming responses (default: False).
- `timeout`, `timeout_millis`: Optional timeouts.

**Returns**: Dictionary with:
- `chat_id`: ID of the chat (e.g., "cht_123").
- `turn_id`: ID of the turn (e.g., "trn_456").
- `answer`: LLM response to the query.
- `response_language`: Response language (e.g., "eng").
- `search_results`: List of results used for RAG.
- `factual_consistency_score`: Response reliability score (0.0–1.0, if applicable).
- `rendered_prompt`: Rendered prompt sent to the LLM (if `prompt_template` is used).

<CodePanel
  title="Example: Creating a Support Chat"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `try:\n    response = client.chats.create(\n        query="How do I reset my password?",\n        corpus_key="support_kb",\n        search={\n            "metadata_filter": "doc.category = 'authentication'",\n            "lexical_interpolation": 0.05,\n            "limit": 3\n        },\n        generation={\n            "generation_preset_name": "mockingbird-2.0",\n            "prompt_template": '''[\n  {"role": "system", "content": "You are a technical support assistant."},\n  {"role": "user", "content": "Based on the search results, provide a concise answer to: How do I reset my password?"}\n]''',\n            "max_response_characters": 200,\n            "response_language": "eng"\n        },\n        save_history=True,\n        stream_response=False\n    )\n    print(f"Chat ID: {response['chat_id']}")\n    print(f"Answer: {response['answer']}")\n    print(f"Factual Consistency: {response.get('factual_consistency_score', 'N/A')}")\nexcept Exception as e:\n    print(f"Chat creation failed: {e}")` },
    { language: 'json', code: `{\n  "query": "How do I reset my password?",\n  "corpus_key": "support_kb",\n  "search": {\n    "metadata_filter": "doc.category = 'authentication'",\n    "lexical_interpolation": 0.05,\n    "limit": 3\n  },\n  "generation": {\n    "generation_preset_name": "mockingbird-2.0",\n    "prompt_template": "[{\\"role\\": \\"system\\", \\"content\\": \\"You are a technical support assistant.\\"},{\\"role\\": \\"user\\", \\"content\\": \\"Based on the search results, provide a concise answer to: How do I reset my password?\\"}]",\n    "max_response_characters": 200,\n    "response_language": "eng"\n  },\n  "save_history": true,\n  "stream_response": false,\n  "chat_id": "cht_123",\n  "turn_id": "trn_456",\n  "answer": "To reset your password, submit a ticket with your user ID and last login IP.",\n  "response_language": "eng",\n  "search_results": [\n    {\n      "text": "Password reset requires a ticket with user ID and IP...",\n      "score": 0.87,\n      "document_id": "it_kb_reset"\n    }\n  ],\n  "factual_consistency_score": 0.92\n}` }
  ]}
  annotations={{
    python: [
      { line: 3, text: 'User’s question for the chat.' },
      { line: 4, text: 'Corpus providing context for RAG.' },
      { line: 9, text: 'Enable RAG with Mockingbird LLM.' },
      { line: 10, text: 'Prompt template for concise response.' }
    ],
    json: [
      { line: 4, text: 'Search parameters for RAG context.' },
      { line: 9, text: 'Static prompt template for RAG.' },
      { line: 13, text: 'Response includes chat and turn IDs.' }
    ]
  }}
  layout="stacked"
/>

**Error handling**:
- **400 Bad Request**: Invalid query, search, or generation parameters.
  - *Resolution*: Ensure `query` is a non-empty string, `metadata_filter` uses valid syntax (e.g., single quotes for strings), and `prompt_template` is valid JSON.
- **403 Forbidden**: Insufficient permissions.
  - *Resolution*: Use a Query or Index API Key with chat access.
- **404 Not Found**: Corpus doesn’t exist.
  - *Resolution*: Verify `corpus_key` using `client.corpora.list`.

**Notes**:
- Use `generation.prompt_template` to customize responses, aligning with GenAI prompt expectations (see [Vectara Prompt Engine](https://docs.vectara.com/docs/prompts/vectara-prompt-engine)).
- Set `stream_response=True` for real-time responses in interactive applications.
- `save_history` enables tracking conversations, useful for auditing or analytics.

### 2. List chat conversations

**Purpose**: Retrieve a paginated list of chat conversations in the account.

<CodePanel
     title="Method"
     defaultLanguage="python"
     snippets={[
       { language: 'python', code: `client.chats.list(
    limit: int = 10,
    filter: str = None,
    chat_ids: List[str] = None,
    page_key: str = None,
    timeout: int = None,
    timeout_millis: int = None
) -> dict` }
     ]}
    layout="stacked"
   />

**Parameters**:
- `limit`: Maximum number of chats to return (1–100, default: 10).
- `filter`: Optional regex to filter by first query or answer (e.g., "password").
- `chat_ids`: Optional list of chat IDs to filter (e.g., `["cht_123"]`).
- `page_key`: Optional token for pagination.
- `timeout`, `timeout_millis`: Optional timeouts.

**Returns**: Dictionary with `chats` (list of chat metadata) and `metadata` (pagination info, e.g., `page_key`).

<CodePanel
  title="Example: Listing Chat Conversations"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `try:\n    response = client.chats.list(\n        limit=5,\n        filter="password"\n    )\n    for chat in response["chats"]:\n        print(f"Chat: {chat['id']} (First Query: {chat['first_query']})")\n    if response["metadata"]["page_key"]:\n        print(f"Next page key: {response["metadata"]["page_key"]}")\nexcept Exception as e:\n    print(f"Listing chats failed: {e}")` },
    { language: 'json', code: `{\n  "chats": [\n    {\n      "id": "cht_123",\n      "first_query": "How do I reset my password?",\n      "first_answer": "Submit a ticket with your user ID...",\n      "enabled": true,\n      "created_at": "2025-06-05T22:30:00Z"\n    }\n  ],\n  "metadata": {\n    "page_key": "next_page_token"\n  }\n}` }
  ]}
  annotations={{
    python: [
      { line: 3, text: 'Limit the number of chats returned.' },
      { line: 4, text: 'Filter by query or answer content.' },
      { line: 8, text: 'Use page_key for pagination.' }
    ],
    json: [
      { line: 4, text: 'Unique chat ID.' },
      { line: 11, text: 'Pagination token for next page.' }
    ]
  }}
  layout="stacked"
/>

**Error handling**:
- **403 Forbidden**: Insufficient permissions.
  - *Resolution*: Use a Query or Index API Key with read access.
- **400 Bad Request**: Invalid filter or parameters.
  - *Resolution*: Ensure `filter` is a valid regex and `limit` is within 1–100.

:::tip Tips
- Use `page_key` to fetch additional pages if more than `limit` chats exist.
- Chat metadata includes `first_query` and `first_answer`, useful for auditing.
:::

### 3. List chat turns

**Purpose**: Retrieve a paginated list of turns (message exchanges) in a specific chat conversation.

<CodePanel
     title="Method"
     defaultLanguage="python"
     snippets={[
       { language: 'python', code: `client.chats.list_turns(
    chat_id: str,
    limit: int = 10,
    page_key: str = None,
    timeout: int = None,
    timeout_millis: int = None
) -> dict` }
     ]}
    layout="stacked"
   />

**Parameters**:
- `chat_id`: Unique identifier of the chat (e.g., "cht_123").
- `limit`: Maximum number of turns to return (1–100, default: 10).
- `page_key`: Optional token for pagination.
- `timeout`, `timeout_millis`: Optional timeouts.

**Returns**: Dictionary with `turns` (list of turn metadata) and pagination info.

<CodePanel
  title="Example: Listing Chat Turns"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `try:\n    response = client.chats.list_turns(\n        chat_id="cht_123",\n        limit=3\n    )\n    for turn in response["turns"]:\n        print(f"Turn: {turn['id']} (Query: {turn['query']})")\n    if response["page_key"]:\n        print(f"Next page key: {response['page_key']}")\nexcept Exception as e:\n    print(f"Listing turns failed: {e}")` },
    { language: 'json', code: `{\n  "turns": [\n    {\n      "id": "trn_456",\n      "chat_id": "cht_123",\n      "query": "How do I reset my password?",\n      "answer": "Submit a ticket with your user ID...",\n      "enabled": true,\n      "created_at": "2025-06-05T22:30:00Z"\n    }\n  ],\n  "page_key": null\n}` }
  ]}
  annotations={{
    python: [
      { line: 3, text: 'Specify the chat to retrieve turns from.' },
      { line: 4, text: 'Limit the number of turns returned.' }
    ],
    json: [
      { line: 4, text: 'Unique turn ID within the chat.' },
      { line: 6, text: 'User’s query in the turn.' }
    ]
  }}
  layout="stacked"
/>

**Error handling**:
- **403 Forbidden**: Insufficient permissions.
  - *Resolution*: Verify read access with a Query or Index API Key.
- **404 Not Found**: Chat doesn’t exist.
  - *Resolution*: Verify `chat_id` using `client.chats.list`.

:::tip Tips
- Turns represent individual message exchanges, useful for reviewing conversation history.
- Use `page_key` for pagination if the chat has many turns.
:::

### 4. Update a chat turn

**Purpose**: Update a specific turn in a chat conversation, typically to disable it (disabling affects the turn and subsequent turns).

<CodePanel
     title="Method"
     defaultLanguage="python"
     snippets={[
       { language: 'python', code: `client.chats.update_turn(
    chat_id: str,
    turn_id: str,
    enabled: bool,
    timeout: int = None,
    timeout_millis: int = None
) -> dict` }
     ]}
    layout="stacked"
   />

**Parameters**:
- `chat_id`: Unique identifier of the chat (e.g., "cht_123").
- `turn_id`: Unique identifier of the turn (e.g., "trn_456").
- `enabled`: Boolean to enable/disable the turn (only disabling is supported).
- `timeout`, `timeout_millis`: Optional timeouts.

**Returns**: Dictionary with updated turn metadata.

**Example**:
<CodePanel
  title="Example: Disable a Chat Turn"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `try:\n    response = client.chats.update_turn(\n        chat_id="cht_123",\n        turn_id="trn_456",\n        enabled=False\n    )\n    print(f"Turn {response['id']} disabled: {response['enabled']}")\nexcept Exception as e:\n    print(f"Updating turn failed: {e}")` },
    { language: 'json', code: `{\n  "id": "trn_456",\n  "chat_id": "cht_123",\n  "query": "How do I reset my password?",\n  "answer": "Submit a ticket with your user ID...",\n  "enabled": false,\n  "created_at": "2025-06-05T22:30:00Z"\n}` }
  ]}
  annotations={{
    python: [
      { line: 3, text: 'Specify the chat containing the turn.' },
      { line: 4, text: 'Identify the turn to update.' },
      { line: 5, text: 'Set to False to disable the turn.' }
    ],
    json: [
      { line: 2, text: 'Updated turn ID.' },
      { line: 6, text: 'Disabled status of the turn.' }
    ]
  }}
  layout="stacked"
/>

**Error handling**:
- **403 Forbidden**: Insufficient permissions.
  - *Resolution*: Use an Index API Key or OAuth token with write access.
- **404 Not Found**: Chat or turn doesn’t exist.
  - *Resolution*: Verify `chat_id` and `turn_id` using `client.chats.list` and `client.chats.list_turns`.
- **400 Bad Request**: Invalid parameters.
  - *Resolution*: Ensure `enabled` is a boolean.

:::tip Tips
- Disabling a turn hides it and subsequent turns from future chat interactions, useful for moderating conversations.
- Enabling a turn is not supported; contact Vectara support for workarounds.
:::

## Additional notes

- **Generation tasks**: Chat methods support RAG and conversational generation, addressing user needs for interactive AI. The `create` method’s `generation` parameters enable customized responses, aligning with GenAI expectations.
- **Query vs. prompt confusion**: Chats use queries for retrieval, with `prompt_template` in `generation` mimicking prompt-based interactions. The example above uses a static template for simplicity (see [Querying Corpora Guide](vectara_python_sdk_queries.md) for prompt details).
- **Chat history**: `save_history` and `chat.store` enable persistent conversations, enhancing user experience in applications like chatbots.
- **Improving usability**: If parameters like `generation` or `chat` are unclear, provide feedback to `feedback@vectara.com` with specific examples, as suggested internally.

## Next steps

- Create chats with `client.chats.create`, then query corpora with `client.corpora.query` for non-conversational search.
- Upload files or index documents to enrich chat context (see [Uploading Files Guide](vectara_python_sdk_upload.md), [Indexing Documents Guide](vectara_python_sdk_indexing.md)).
- Review the [Vectara API Recipes](https://docs.vectara.com/docs/api-recipes) for chat examples.
- Test chats in the [Vectara API Playground](https://console.vectara.com) to validate prompts and settings.
