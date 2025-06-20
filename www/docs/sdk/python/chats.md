---
id: chats
title: Chats
hide_table_of_contents: true
---

import CodePanel from '@site/src/theme/CodePanel';
import { Spacer } from "@site/src/components/ui/Spacer";

# Chats

This guide covers the Vectara Python SDK for managing chat conversations, 
enabling conversational AI with Retrieval Augmented Generation (RAG) and 
chat history. These methods enable you to create chats, list conversations, 
retrieve message exchanges (turns), and update turn status, ideal for building 
interactive applications like support chatbots or customer service platforms.

## Install the Vectara SDK

<CodePanel
  title="Install Vectara SDK"
  defaultLanguage="bash"
  snippets={[
    { language: 'bash', code: `pip install vectara` }
  ]}
  annotations={{
    bash: [{ line: 1, text: 'Installs the Vectara Python SDK via pip.' }]
  }}
  customWidth="50%"
/>

Install the Vectara Python SDK to enable chat functionality for your enterprise 
conversational AI solutions.

<Spacer size="l" />

### Initialize the Vectara Client

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
  customWidth="50%"
/>

Configure authentication to securely access chat methods, using an API key or 
OAuth 2.0 token.

- **Authentication**: Obtain credentials from the [Vectara Console](https://console.vectara.com).
- **Corpus Setup**: Create a corpus with indexed documents using `client.corpora.create` 
  and `client.documents.index` or `client.upload.file`.
- **Chat Focus**: Chat methods enable conversational AI with RAG, using indexed 
  documents for context. For direct search, use `client.corpora.query` (see [Querying Corpora Guide](vectara_python_sdk_queries.md)).

---

## Create a chat conversation

<CodePanel
  title="Create a chat"
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
  customWidth="50%"
/>

Initiate or continue a chat conversation with an LLM, leveraging RAG to provide 
context-aware responses for enhanced customer engagement. This section helps 
you build interactive AI solutions.

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
- `save_history`: Optional boolean to save the chat in history (overrides 
  `chat.store`, default: True).
- `intelligent_query_rewriting`: Optional boolean for query rewriting (tech preview, 
  default: False).
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

---

### Example: Creating a Support Chat

<CodePanel
  title="Example: Creating a Support Chat"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `try:
    response = client.chats.create(
        query="How do I reset my password?",
        corpus_key="support_kb",
        search={
            "metadata_filter": "doc.category = 'authentication'",
            "lexical_interpolation": 0.05,
            "limit": 3
        },
        generation={
            "generation_preset_name": "mockingbird-2.0",
            "prompt_template": '''[
  {"role": "system", "content": "You are a technical support assistant."},
  {"role": "user", "content": "Provide a concise answe"}
]''',
            "max_response_characters": 200,
            "response_language": "eng"
        },
        save_history=True,
        stream_response=False
    )
    print(f"Chat ID: {response['chat_id']}")
    print(f"Answer: {response['answer']}")
    print(f"Factual Consistency: {response.get('factual_consistency_score', 'N/A')}")
except Exception as e:
    print(f"Chat creation failed: {e}")` },
    { language: 'json', code: `{
  "query": "How do I reset my password?",
  "corpus_key": "support_kb",
  "search": {
    "metadata_filter": "doc.category = 'authentication'",
    "lexical_interpolation": 0.05,
    "limit": 3
  },
  "generation": {
    "generation_preset_name": "mockingbird-2.0",
    "prompt_template": "[{\\"role\\": \\"system\\", \\"content\\": \\"You are a technical support assistant.\\"},{\\"role\\": \\"user\\", \\"content\\": \\"Provide a concise answer\\"}]",
    "max_response_characters": 200,
    "response_language": "eng"
  },
  "save_history": true,
  "stream_response": false,
  "chat_id": "cht_123",
  "turn_id": "trn_456",
  "answer": "To reset your password, submit a ticket with your user ID and last login IP.",
  "response_language": "eng",
  "search_results": [
    {
      "text": "Password reset requires a ticket with user ID and IP...",
      "score": 0.87,
      "document_id": "it_kb_reset"
    }
  ],
  "factual_consistency_score": 0.92
}` }
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
  customWidth="50%"
/>

Start a support chat to assist with password resets, using RAG with a custom 
prompt and error handling.

- Use `generation.prompt_template` to customize responses, aligning with GenAI 
  prompt expectations (see [Vectara Prompt Engine](https://docs.vectara.com/docs/prompts/vectara-prompt-engine)).
- Set `stream_response=True` for real-time responses in interactive applications.
- `save_history` enables tracking conversations, useful for auditing or analytics.

**Error handling**:
- **400 Bad Request**: Invalid query, search, or generation parameters.
  - *Resolution*: Ensure `query` is a non-empty string, `metadata_filter` uses valid 
  syntax (e.g., single quotes for strings), and `prompt_template` is valid JSON.
- **403 Forbidden**: Insufficient permissions.
  - *Resolution*: Use a Query or Index API Key with chat access.
- **404 Not Found**: Corpus doesn’t exist.
  - *Resolution*: Verify `corpus_key` using `client.corpora.list`.

---

## List chat conversations

<CodePanel
  title="Method"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `client.chats.list(
    limit: int = 10,
    page_key: str = None,
    timeout: int = None,
    timeout_millis: int = None
) -> dict` }
  ]}
  customWidth="50%"
/>

Retrieve a paginated list of chat conversations to monitor or audit past 
interactions. 

This section supports enterprise oversight of conversational data.

- `limit`: Maximum number of chats to return (1–100, default: 10).
- `page_key`: Optional token for pagination.
- `timeout`, `timeout_millis`: Optional timeouts.

**Returns**: Dictionary with `chats` (list of chat metadata) and `metadata` 
(pagination info, `page_key`).

### Example: Listing Chat Conversations



<CodePanel
  title="Example: Listing Chat Conversations"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `try:
    response = client.chats.list(
        limit=5
    )
    for chat in response["chats"]:
        print(f"Chat: {chat['id']} (First Query: {chat['first_query']})")
    if response["metadata"]["page_key"]:
        print(f"Next page key: {response['metadata']['page_key']}")
except Exception as e:
    print(f"Listing chats failed: {e}")` },
    { language: 'json', code: `{
  "chats": [
    {
      "id": "cht_123",
      "first_query": "How do I reset my password?",
      "first_answer": "Submit a ticket with your user ID...",
      "enabled": true,
      "created_at": "2025-06-05T22:30:00Z"
    }
  ],
  "metadata": {
    "page_key": "next_page_token"
  }
}` }
  ]}
  annotations={{
    python: [
      { line: 3, text: 'Limit the number of chats returned.' },
      { line: 5, text: 'Display chat ID and initial query.' },
      { line: 7, text: 'Use page_key for pagination.' }
    ],
    json: [
      { line: 4, text: 'Unique chat ID.' },
      { line: 11, text: 'Pagination token for next page.' }
    ]
  }}
  customWidth="50%"
/>

Fetch a list of recent chats filtered by a keyword, demonstrating pagination 
and error handling for effective conversation tracking.

- Use `page_key` to fetch additional pages if more than `limit` chats exist.
- Chat metadata includes `first_query` and `first_answer`, useful for auditing.

**Error handling**:
- **403 Forbidden**: Insufficient permissions.
  - *Resolution*: Use a Query or Index API Key with read access.
- **400 Bad Request**: Invalid filter or parameters.
  - *Resolution*: Ensure `limit` is within 1–100.

---

## List chat turns

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
  customWidth="50%"
/>

Retrieve a paginated list of message exchanges (turns) within a specific 
chat to review conversation details. 

This section supports detailed interaction analysis for enterprise applications.

- `chat_id`: Unique identifier of the chat (e.g., "cht_123").
- `limit`: Maximum number of turns to return (1–100, default: 10).
- `page_key`: Optional token for pagination.
- `timeout`, `timeout_millis`: Optional timeouts.

**Returns**: Dictionary with `turns` (list of turn metadata) and pagination info.

### Example: Listing Chat Turns

<CodePanel
  title="Example: Listing Chat Turns"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `try:
    response = client.chats.list_turns(
        chat_id="cht_123",
        limit=3
    )
    for turn in response["turns"]:
        print(f"Turn: {turn['id']} (Query: {turn['query']})")
    if response["page_key"]:
        print(f"Next page key: {response['page_key']}")
except Exception as e:
    print(f"Listing turns failed: {e}")` },
    { language: 'json', code: `{
  "turns": [
    {
      "id": "trn_456",
      "chat_id": "cht_123",
      "query": "How do I reset my password?",
      "answer": "Submit a ticket with your user ID...",
      "enabled": true,
      "created_at": "2025-06-05T22:30:00Z"
    }
  ],
  "page_key": null
}` }
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
  customWidth="50%"
/>

List turns in a support chat to review user queries and responses, 
demonstrating pagination and error handling.

- Turns represent individual message exchanges, useful for reviewing 
  conversation history.
- Use `page_key` for pagination if the chat has many turns.

**Error handling**:
- **403 Forbidden**: Insufficient permissions.
  - *Resolution*: Verify read access with a Query or Index API Key.
- **404 Not Found**: Chat doesn’t exist.
  - *Resolution*: Verify `chat_id` using `client.chats.list`.

---

# Update a chat turn

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
  customWidth="50%"
/>

Modify a turn’s status within a chat, typically to disable it, to manage 
conversation flow. This section supports moderation and compliance in 
enterprise chat systems.

**Parameters**:
- `chat_id`: Unique identifier of the chat (e.g., "cht_123").
- `turn_id`: Unique identifier of the turn (e.g., "trn_456").
- `enabled`: Boolean to enable/disable the turn (only disabling is supported).
- `timeout`, `timeout_millis`: Optional timeouts.

**Returns**: Dictionary with updated turn metadata.

### Example: Disable a Chat Turn

<CodePanel
  title="Example: Disable a Chat Turn"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `try:
    response = client.chats.update_turn(
        chat_id="cht_123",
        turn_id="trn_456",
        enabled=False
    )
    print(f"Turn {response['id']} disabled: {response['enabled']}")
except Exception as e:
    print(f"Updating turn failed: {e}")` },
    { language: 'json', code: `{
  "id": "trn_456",
  "chat_id": "cht_123",
  "query": "How do I reset my password?",
  "answer": "Submit a ticket with your user ID...",
  "enabled": false,
  "created_at": "2025-06-05T22:30:00Z"
}` }
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
  customWidth="50%"
/>

Disable a specific turn in a chat to hide inappropriate content, 
demonstrating error handling for reliability.

- Disabling a turn hides it and subsequent turns from future chat 
- interactions, useful for moderating conversations.
- Enabling a turn is not supported; contact Vectara support for workarounds.

**Error handling**:
- **403 Forbidden**: Insufficient permissions.
  - *Resolution*: Use an Index API Key or OAuth token with write access.
- **404 Not Found**: Chat or turn doesn’t exist.
  - *Resolution*: Verify `chat_id` and `turn_id` using `client.chats.list` and `client.chats.list_turns`.
- **400 Bad Request**: Invalid parameters.
  - *Resolution*: Ensure `enabled` is a boolean.

## Next steps

- Create chats with `client.chats.create`, then query corpora with 
  `client.corpora.query` for non-conversational search.
- Upload files or index documents to enrich chat context 
  (see [Upload Files](/docs/sdk/python/upload) and [Ingesting data](/docs/sdk/python/ingest_data)).
- Review the [Vectara API Recipes](https://docs.vectara.com/docs/api-recipes) for chat examples.
- Test chats in the [Vectara API Playground](https://console.vectara.com) to validate 
  prompts and settings.
