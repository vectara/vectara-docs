---
id: agent-tools
title: Agent tools
sidebar_label: Agent tools
---

import CodePanel from '@site/src/theme/CodePanel';

Vectara has several types of agent tools available.

- **Corpora search**
  - Searches through Vectara corpora to find relevant information. Agents can 
  use this tool to query your indexed document collections and retrieve 
  contextually relevant results.
  - Supports custom search parameters, generation settings, and query configuration.
- **Web search** 
  - Searches the internet for current information beyond your indexed corpora.
  - Configurable result limits and query parameters.
- **Lambda tools** 
  - Enables user-defined Python functions that run in a secure, sandboxed environment.
  - Automatic input/output schema generation from type annotations.
- **Structured indexing** 
  - Indexes structured documents into a Vectara corpus while preserving document hierarchy and metadata.  
    Supports ingestion of documents divided into logical sections, each with text, metadata, tables, and images.
  - Enables fine-grained control over corpus selection, document metadata, and artifact-based image or table references.
- **MCP (Model Context Protocol)**
  - Connects to external MCP servers to extend agent functionality with third-party integrations.
  - Supports hints about tool behavior (read-only, destructive, idempotent, open-world).

