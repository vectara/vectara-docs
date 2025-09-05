---
id: rest
title: REST APIs
sidebar_label: REST APIs
---


import CodePanel from '@site/src/theme/CodePanel';


While gRPC provides low latency and excellent scalability, REST APIs provide a
traditional integration path for web-based applications. With the introduction
of Vectara's REST API 2.0, developers can now leverage a more intuitive and
user-friendly API design that follows RESTful principles and simplifies the
getting started experience.

:::warning Deprecation Notice
REST API v1 was deprecated and fully retired on **August 16, 2025**. 
Migrate to API v2 as soon as possible.
:::

:::caution
Review the [**REST API 1.0 to 2.0 migration guide**](/docs/migration-guide-api-v2) which highlights important
differences between the Vectara REST API v1 and REST API v2.
:::

## API formatting guidelines

You can find all of our APIs at `https://api.vectara.io/v2/<api-endpoint>`
The API endpoints are outlined in the various subsections of this API
Reference section and are designed to be intuitive and follow a standard
RESTful structure.

- The current version is **v2**.
- `api-endpoint` follows a hierarchical structure, using lowercase and hyphens.
  For example, `/corpora/:corpus_key/documents`.

## API authentication

All <Config v="names.product"/> APIs are authenticated. Indexing and Search
APIs can be authenticated via [API Keys](/docs/learn/authentication/api-key-management).
The Personal API Key enables most Admin actions for creating and deleting
corpora, but for deleting accounts and accessing usage data, you need to use
[OAuth 2.0](/docs/learn/authentication/oauth-2).

## API Reference and OpenAPI specifications

You can find up-to-date OpenAPI specifications at
[https://docs.vectara.com/vectara-oas-2.yaml](https://docs.vectara.com/vectara-oas-v2.yaml).
These specifications provide a comprehensive overview of the available
endpoints, request/response formats, and authentication requirements.

You can use these with tools of your choosing like [Insomnia](https://insomnia.rest/)
or [Postman](https://www.postman.com/).

1. Download the OpenAPI YAML file.
2. Import the file into Insomonia or Postman.
3. Start making API calls directly from the tool.

Want to try the REST APIs live in your browser? Head over to our
our [API Reference](/docs/rest-api) and make
real-time API calls from your browser.

## List of Vectara REST 2.0 endpoints

Vectara provides the following REST 2.0 endpoints:

### Request timeouts

By default, requests will take as long as they need to complete.  However, you
can request a maximum time for most of the APIs to take by specifying the
`Request-Timeout` or `Request-Timeout-Millis` parameters in the HTTP headers.
`Request-Timeout` is specified in seconds and if you need a more granular
timeout, you can use `Request-Timeout-Millis`.  Note that both parameters are
considered best-effort: in the event either time lapses, Vectara will attempt
to terminate the request as soon as possible after.

### Queries

The following endpoints help you with queries:

- [Query API](/docs/api-reference/search-apis/search): Perform searches across one or more corpora
  using advanced filtering, pagination, and summarization options.
- [Simple Corpus Query API](/docs/api-reference/search-apis/search#simple-single-corpus-query): Execute lightweight
  searches on a single corpus.
- [Advanced Corpus Query API](/docs/api-reference/search-apis/search#advanced-single-corpus-query): Perform advanced queries on a specific corpus
  with additional filtering and customization options.

### Query histories

The following endpoints help you with query histories:
- [Get Query History API](/docs/api-reference/query-history-apis/get-query-history): Retrieve detailed history about a specific 
  query that was made against a corpus
- [List Query Histories API](/docs/api-reference/query-history-apis/get-query-histories): Retrieve, update, and manage 
  query history for a specific corpus

### Corpora

The following endpoints enable you to programmatically manipulate corpora and
perform many operations such as viewing corpus consumption, size, associated
API keys, and more:

- [Create Corpus API](/docs/api-reference/admin-apis/create-corpus): Create a new corpus to store and
  manage documents.
- [List Corpora API](/docs/api-reference/admin-apis/corpus/list-corpora): Get a list of all corpora in
  your account.
- [Get Corpus API](/docs/api-reference/admin-apis/corpus/read-corpus): Retrieve metadata about a specific corpus.
- [Delete Corpus API](/docs/api-reference/admin-apis/delete-corpus): Remove a corpus and all its associated data.
- [Update Corpus API](/docs/api-reference/admin-apis/corpus/update-corpus-enablement): Enable/disable the corpus or update
  filter attributes.
- [Reset Corpus API](/docs/api-reference/admin-apis/reset-corpus): Clear all documents and data from a corpus while keeping the
  corpus itself.
- [Replace Corpus Filter Attributes API](/docs/api-reference/admin-apis/corpus/replace-filter-attributes): Update the filterable attributes of a corpus.

### Index and upload documents

The following endpoints help you index, upload files, and manage documents:

- [Index Document API](/docs/api-reference/indexing-apis/indexing): Add a document to a corpus in either structured or
  core format.
- [File Upload API](/docs/api-reference/indexing-apis/file-upload/file-upload): Upload files to a corpus for automatic parsing
  and document extraction.
- [List Documents API](/docs/api-reference/admin-apis/corpus/list-documents): Retrieve a list of documents in a specific corpus.
- [Retrieve Document API](/docs/api-reference/admin-apis/corpus/retrieve-document): Retrieve the content and metadata of a specific document.
- [Delete Document API](/docs/api-reference/indexing-apis/deleting-documents): Remove a document from a corpus.
- [Update Document Metadata API](/docs/api-reference/indexing-apis/update-document-metadata): Update the metadata of a document in a corpus.
- [Replace Document Metadata API](/docs/api-reference/indexing-apis/replace-document-metadata): Completely replace the metadata of a document.

### Document Processing

The following endpoints provide specialized document processing capabilities:

- [Summarize Document API](/docs/api-reference/documents-apis/summarize-document): Generate summaries of documents using 
  AI-powered summarization.

### Table Extractors

The following endpoints help you extract and process tabular data from documents:

- [List Table Extractors API](/docs/api-reference/table-extractors/list-table-extractors): Get a list of available 
  table extraction models for processing structured data in documents.

### Chats

The following endpoints provide a streamlined solution for integrating chatbot
functionalities into domain-specific applications and websites using
Retrieval Augmented Generation (RAG):

- [Chat API Overview](/docs/api-reference/chat-apis/chat-apis-overview) describes chats at a higher level.
- [Create Chat API](/docs/api-reference/chat-apis/create-chat): Start a new chat session with default retrieval parameters.
- [List Chats API](/docs/api-reference/chat-apis/list-chats): Get a list of all chat sessions.
- [Get Chat API](/docs/api-reference/chat-apis/get-chat): Retrieve a chat summary, including the initial message.
- [Delete Chat API](/docs/api-reference/chat-apis/delete-conversations): Remove a chat session and all its associated turns.
- [Create Chat Turn API](/docs/api-reference/chat-apis/create-chat-turn): Add a message-response pair, also known as a turn, to
  an existing chat.
- [Get Chat Turn API](/docs/api-reference/chat-apis/get-chat-turn): Retrieve a specific turn from a chat.
- [List Chat Turns API](/docs/api-reference/chat-apis/list-turns): Get a list of all turns within a chat.
- [Update Chat Turn API](/docs/api-reference/chat-apis/update-chat-turn): Modify a turn, such as enabling or disabling it.
- [Delete Chat Turn API](/docs/api-reference/chat-apis/delete-turns): Remove a turn from a chat, along with all subsequent
  turns.

### Agents

The following endpoints help you build and manage AI agents with custom instructions and tool integrations:

- [Agent APIs Overview](/docs/api-reference/agent-apis/agent-apis-overview): Learn about Vectara's AI agent framework and capabilities.
- [Create Agent API](/docs/api-reference/agent-apis/create-agent): Create a new AI agent with custom instructions and tool configurations.
- [Get Agent API](/docs/api-reference/agent-apis/get-agent): Retrieve details about a specific agent.
- [List Agents API](/docs/api-reference/agent-apis/list-agents): Get a list of all agents in your account.
- [Update Agent API](/docs/api-reference/agent-apis/update-agent): Modify an agent's configuration, instructions, or tool settings.
- [Delete Agent API](/docs/api-reference/agent-apis/delete-agent): Remove an agent from your account.

#### Agent Sessions

- [Create Agent Session API](/docs/api-reference/agent-apis/session/create-agent-session): Start a new conversation session with an agent.
- [Get Agent Session API](/docs/api-reference/agent-apis/session/get-agent-session): Retrieve details about a specific agent session.
- [List Agent Sessions API](/docs/api-reference/agent-apis/session/list-agent-sessions): Get a list of all sessions for an agent.
- [Update Agent Session API](/docs/api-reference/agent-apis/session/update-agent-session): Modify session settings or status.
- [Delete Agent Session API](/docs/api-reference/agent-apis/session/delete-agent-session): Remove a session and its conversation history.

#### Agent Events

- [Create Agent Event API](/docs/api-reference/agent-apis/event/create-agent-event): Send a message or event to an agent session.
- [Get Agent Event API](/docs/api-reference/agent-apis/event/get-agent-event): Retrieve details about a specific agent event.
- [List Agent Events API](/docs/api-reference/agent-apis/event/list-agent-events): Get the event history for an agent session.

#### Agent Instructions

- [Create Instruction API](/docs/api-reference/agent-apis/instruction/create-instruction): Create custom instructions for agent behavior.
- [Get Instruction API](/docs/api-reference/agent-apis/instruction/get-instruction): Retrieve details about specific agent instructions.
- [List Instructions API](/docs/api-reference/agent-apis/instruction/list-instructions): Get a list of all available instructions.
- [Update Instruction API](/docs/api-reference/agent-apis/instruction/update-instruction): Modify existing agent instructions.
- [Delete Instruction API](/docs/api-reference/agent-apis/instruction/delete-instruction): Remove instructions from your account.
- [Delete Instruction Version API](/docs/api-reference/agent-apis/instruction/delete-instruction-version): Remove a specific version of instructions.
- [Test Instruction API](/docs/api-reference/agent-apis/instruction/test-instruction): Test instructions before deploying to agents.

#### Agent Tools and Tool Servers

- [Get Tool API](/docs/api-reference/agent-apis/tool/get-tool): Retrieve details about a specific agent tool.
- [List Tools API](/docs/api-reference/agent-apis/tool/list-tools): Get a list of all available agent tools.
- [Update Tool API](/docs/api-reference/agent-apis/tool/update-tool): Modify tool configurations and settings.
- [Delete Tool API](/docs/api-reference/agent-apis/tool/delete-tool): Remove a tool from your account.
- [Create Tool Server API](/docs/api-reference/agent-apis/tool-server/create-tool-server): Set up a new tool server for custom agent functionality.
- [Get Tool Server API](/docs/api-reference/agent-apis/tool-server/get-tool-server): Retrieve details about a specific tool server.
- [List Tool Servers API](/docs/api-reference/agent-apis/tool-server/list-tool-servers): Get a list of all tool servers.
- [Update Tool Server API](/docs/api-reference/agent-apis/tool-server/update-tool-server): Modify tool server configurations.
- [Sync Tool Server API](/docs/api-reference/agent-apis/tool-server/sync-tool-server): Synchronize tools from a tool server.
- [Delete Tool Server API](/docs/api-reference/agent-apis/tool-server/delete-tool-server): Remove a tool server from your account.

### Encoders, rerankers, and large language models (LLMs)

The following endpoints help you manage encoders, rerankers, and LLMs:

- [Create Encoder API](/docs/api-reference/encoder-apis/create-encoder): Create a custom encoder for document
  embedding and vectorization.
- [List Encoders API](/docs/api-reference/encoder-apis/list-encoders): Get a list of available encoders for
  document embedding.
- [List Rerankers API](/docs/api-reference/reranker-apis/rerankers): Get a list of available rerankers for
  improving search result ranking.
- [Create LLM API](/docs/api-reference/llms-apis/create-llm): Add a custom large language model configuration
  for query and chat endpoints.
- [Get LLM API](/docs/api-reference/llms-apis/get-llm): Retrieve details about a specific large language model.
- [List LLMs API](/docs/api-reference/llms-apis/llms): Get a list of available large
  language models for query and chat endpoints.
- [Delete LLM API](/docs/api-reference/llms-apis/delete-llm): Remove a custom large language model configuration.
- [List Generation Presets API](/docs/api-reference/generation-presets/list-generation-presets): Get a list of
  available generation presets for configuring prompt templates and model parameters.

### LLM Chat Completions

The following endpoint provides OpenAI-compatible chat completions:

- [Chat Completions API](/docs/api-reference/llm-chat-completions/chat-completions): OpenAI-compatible chat 
  completions endpoint for direct LLM interactions.

### Hallucination Detection and Correction

The following endpoints help you detect and correct hallucinations in AI-generated content:

- [Evaluate Factual Consistency API](/docs/api-reference/hhem-apis/evaluate-factual-consistency-api): Evaluate 
  the factual consistency of AI-generated responses using Hughes Hallucination Evaluation Model (HHEM).
- [Hallucination Correction Models API](/docs/api-reference/hcm-apis/hallucination-correction-models): Access 
  hallucination correction models for improving response accuracy.

### Jobs

The following endpoints help you manage background jobs:

- [Get Job API](/docs/api-reference/jobs-apis/get-job): Retrieve details about a specific background job.
- [List Jobs API](/docs/api-reference/jobs-apis/list-jobs): Get a list of all background jobs for the account.

### Users

The following endpoints help you manage users on your account:

- [Create User API](/docs/api-reference/admin-apis/manage-users/create-user): Add a new user to the current customer
  account.
- [Get User API](/docs/api-reference/admin-apis/manage-users/get-user): Retrieve details about a specific user.
- [List Users API](/docs/api-reference/admin-apis/manage-users/list-users): Get a list of all users in the
  account.
- [Update User API](/docs/api-reference/admin-apis/manage-users/update-user): Modify a user's details, such as
  enabled status or assigned roles.
- [Delete User API](/docs/api-reference/admin-apis/manage-users/delete-user): Remove a user from the account.
- [Reset User Password API](/docs/api-reference/admin-apis/manage-users/reset-user-password): Initiate a password reset for
  a user.

### API keys

The following endpoints help you manage the lifecycle and security of API keys:

- [Create API Key API](/docs/api-reference/api-keys/create-api-key): Generate a new API key for authentication.
- [Get API Key API](/docs/api-reference/api-keys/get-api-key): Retrieve details about a specific API key.
- [List API Keys API](/docs/api-reference/api-keys/list-api-keys): Get a list of all API keys for the account.
- [Update API Key API](/docs/api-reference/api-keys/enable-api-key): Modify an API key, such as enabling or disabling it.
- [Delete API Key API](/docs/api-reference/api-keys/delete-api-key): Remove an API key from the account.

### Application Clients

The following endpoints help you manage OAuth 2.0 application clients on your
account:

- [Create Application Client API](/docs/api-reference/app-clients/create-app-client): Add a new OAuth 2.0 application client for authentication.
- [Get Application Client API](/docs/api-reference/app-clients/get-app-client): Retrieve details about a specific application client.
- [List Application Clients API](/docs/api-reference/app-clients/list-app-clients): Get a list of all application clients for the account.
- [Update Application Client API](/docs/api-reference/app-clients/update-app-client): Modify an application client's details, such as assigned roles.
- [Delete Application Client API](/docs/api-reference/app-clients/delete-app-client): Remove an application client from the account.

:::note

Not all REST API endpoints have long-form documentation in this API Reference.
For example, information about [**Get Usage Metrics**](/docs/1.0/rest-api/get-usage-metrics) is in the
API Reference.

:::
