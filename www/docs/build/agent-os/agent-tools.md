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
  - Indexes structured documents into the Vectara platform with full control over document structure.
  - Enablers target corpus selection, document structure, and metadata management.
- **MCP (Model Context Protocol)**
  - Connects to external MCP servers to extend agent functionality with third-party integrations.
  - Supports hints about tool behavior (read-only, destructive, idempotent, open-world).
- **Subagent**
  - Initiates specialized sub-agents to handle complex, multi-step tasks autonomously.
  - Provides separate context management, configurable session timeouts, specialized workflows.
