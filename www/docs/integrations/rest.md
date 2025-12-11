---
id: rest
title: REST APIs
sidebar_label: REST APIs
---

The Vectara REST APIs give you programmatic access to the platform. All endpoints
live at `https://api.vectara.io/v2/` and follow standard REST conventions with
intuitive paths like `/agents/:agent_key/sessions` and `/corpora/:corpus_key/documents`.

All API requests require authentication using either API keys or OAuth 2.0. See
[Authentication and Authorization](/docs/deploy-and-scale/authentication/authentication-authorization-vectara)
for details.

## What you can build

**AI Agents** are the core of the platform. Build agents that understand natural
language, use tools to search your data, call external APIs, and take actions.
Configure custom instructions to control behavior, upload artifacts, create Lambda 
tools with Python functions, or connect MCP tool servers for enterprise 
integrations. Agents maintain conversation sessions so they remember context 
across multiple turns.

**Retrieval Augmented Generation (RAG)** for traditional search and summarization.
Index your documents into corpora, query with semantic search, and
generate summaries grounded in your data.

**Data management** for your knowledge base. Upload documents in any format,
extract text from PDFs and tables, manage metadata, and keep your corpora up to
date as your content changes.

**Account administration** to manage users, API keys, OAuth clients, and LLM
configurations across your organization.

## OpenAPI specification

Download the full OpenAPI spec at [https://docs.vectara.com/vectara-oas-v2.yaml](https://docs.vectara.com/vectara-oas-v2.yaml).
Import it into Postman, Insomnia, or any OpenAPI-compatible tool to explore
endpoints and make test requests. Or, use our [Postman Collection](/docs/vectara-postman-collection)
with pre-configured examples.

## Getting started

1. [Create an API key](/docs/security/authentication/api-key-management) in the [Vectara Console](https://console.vectara.com/console/apiAccess/apiKeys).
2. Browse the [API Reference](/docs/rest-api) for endpoints.
3. Test with the [Postman Collection](/docs/vectara-postman-collection).

The [API Reference](/docs/rest-api) has complete documentation for every endpoint,
including request/response schemas and interactive examples you can run directly
in your browser.
