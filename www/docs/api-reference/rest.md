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
APIs can be authenticated via [API Keys](/docs/deploy-and-scale/authentication/api-key-management).
The Personal API Key enables most Admin actions for creating and deleting
corpora, but for deleting accounts and accessing billing data, you need to use
[OAuth 2.0](/docs/deploy-and-scale/authentication/oauth-2).

## API Reference and OpenAPI specifications

You can find up-to-date OpenAPI specifications at
[https://docs.vectara.com/vectara-oas-v2.yaml](https://docs.vectara.com/vectara-oas-v2.yaml).
These specifications provide a comprehensive overview of the available
endpoints, request/response formats, and authentication requirements.

You can use these with tools of your choosing like [Insomnia](https://insomnia.rest/)
or [Postman](https://www.postman.com/).

1. Download the OpenAPI YAML file.
2. Import the file into Insomonia or Postman.
3. Start making API calls directly from the tool.

Want to try the REST APIs live in your browser? Head over to our
[Interactive API Reference](/docs/rest-api) and make
real-time API calls from your browser.

## Explore the API Reference

The sections below provide an overview of Vectara's REST API capabilities
organized by functional area. Each section explains the business value and
use cases, then links to the detailed API specifications in our
[Interactive API Reference](/docs/rest-api).

The Interactive API Reference provides:
- Complete request and response schemas
- Live API testing in your browser
- Code examples in multiple languages
- Detailed parameter documentation

### Agent operating system

Build conversational AI assistants that can search your data,
call external APIs, and execute multi-step workflows. Create chatbots, virtual
assistants, and automation agents with custom instructions and tool integrations.

- Create agents with custom instructions and personality
- Configure tools for search, API calls, and custom functions
- Manage conversation sessions with context persistence
- Send and receive messages in agent conversations
- Version and test instructions before deployment
- Connect to Model Context Protocol (MCP) tool servers

**API Reference:** [Agent APIs](/docs/rest-api#tag/Agents)

### Search and retrieval

Find relevant information across your knowledge base using
natural language queries, semantic search, and advanced filtering. Power
search experiences in applications, chatbots, and knowledge management systems.

- Search across multiple corpora simultaneously
- Apply metadata filters to narrow results
- Configure pagination and result limits
- Enable summarization and answer generation
- Use hybrid search (keyword + semantic)

**API Reference:** [Query APIs](/docs/rest-api#tag/Queries)

### Corpora management

Organize and structure your knowledge base by creating isolated
data collections (corpora) with their own configurations, embeddings, and access controls.
Think of corpora as databases or containers for related documents.

- Create and configure corpora with custom settings
- Manage filter attributes for metadata-based search
- Monitor corpus size and usage
- Enable or disable corpora
- Reset corpus contents while preserving configuration

**API Reference:** [Corpus APIs](/docs/rest-api#tag/Corpora)

### Document operations

Populate your knowledge base with content from various sources.
Index structured data, upload files for automatic parsing, and maintain document
metadata for filtering and organization.

- Index documents in structured or core format
- Upload files (PDF, DOCX, HTML, etc.) for automatic extraction
- Update document metadata for better filtering
- Delete outdated or incorrect documents
- Retrieve document contents and metadata
- Extract and process tables from documents

**API Reference:** [Document APIs](/docs/rest-api#tag/Documents)

### Authentication and security

Secure your API access and control who can read, write, and
manage your data. Implement API key authentication for applications and OAuth 2.0
for user-based access with fine-grained permissions.

- Generate and manage API keys with specific permissions
- Create OAuth 2.0 application clients
- Configure role-based access control
- Audit API usage and access patterns
- Enable or disable keys and clients
- Reset credentials securely

**API Reference:** [API Keys](/docs/rest-api#tag/API-Keys) and [Application Clients](/docs/rest-api#tag/Application-Clients)

### User management

Control team access to your Vectara account. Add developers,
data scientists, and administrators with appropriate permissions. Manage user
lifecycle from onboarding to offboarding.

- Create users with specific roles
- Update user permissions and status
- Remove users from your account
- Initiate password resets
- List all users and their roles

**API Reference:** [User APIs](/docs/rest-api#tag/Users)

### Encoders, rerankers, and LLMs

Customize your search and generation pipeline. Use different
embedding models for domain-specific data, apply rerankers to improve result
quality, and configure large language models for answer generation.

- Create custom encoders for specialized domains
- List available embedding models
- Configure reranking models for result improvement
- Add custom LLM configurations
- Set generation presets for consistent prompt templates
- Use OpenAI-compatible chat completions endpoint

**API Reference:** [Encoders](/docs/rest-api#tag/Encoders), [Rerankers](/docs/rest-api#tag/Rerankers), and [LLMs](/docs/rest-api#tag/Large-Language-Models)

### Hallucination detection and correction

Ensure factual accuracy in AI-generated responses. Detect when
language models hallucinate information not supported by your source documents and
correct inaccuracies before presenting answers to users.

- Evaluate factual consistency using Hughes Hallucination Evaluation Model (HHEM)
- Score responses against source documents
- Access hallucination correction models
- Improve response accuracy and reliability

**API Reference:** [Hallucination APIs](/docs/rest-api#tag/Evaluation)

### Background jobs

Monitor long-running operations like large file uploads,
corpus resets, or bulk document operations. Track job status, progress, and
completion to build reliable asynchronous workflows.


- Retrieve job status and progress
- List all jobs for your account
- Filter jobs by status and type
- Track job completion and errors

**API Reference:** [Job APIs](/docs/rest-api#tag/Jobs)

### Query history

Analyze search patterns, understand user behavior, and improve
your search experience. Access detailed logs of queries, results, and user interactions
for analytics and optimization.

- Retrieve query history for a corpus
- Access query metadata and results
- Filter by date range and query type
- Export for analytics and reporting

**API Reference:** [Query History APIs](/docs/rest-api#tag/Query-History)

## Request timeouts

By default, requests will take as long as they need to complete. However, you
can request a maximum time for most of the APIs to take by specifying the
`Request-Timeout` or `Request-Timeout-Millis` parameters in the HTTP headers.
`Request-Timeout` is specified in seconds and if you need a more granular
timeout, you can use `Request-Timeout-Millis`. Note that both parameters are
considered best-effort: in the event either time lapses, Vectara will attempt
to terminate the request as soon as possible after.
