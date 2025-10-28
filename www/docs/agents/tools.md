---
id: tools
title: Tools
sidebar_label: Tools
---

import CodePanel from '@site/src/theme/CodePanel';

Tools represent external or internal capabilities that agents can invoke 
dynamically. They are defined by:

* A unique ID (`tol_abcd`) and name.
* A description of their function.
* An input schema describing accepted parameters (in JSON Schema format).
* Metadata for categorization.
* Runtime availability (enabled or disabled).

## Available tools

Vectara Agents support the following tool types:

### Built-in tools

* `corpora_search`: Retrieves results from Vectara corpora using Retrieval
  Augmented Generation (RAG). This tool provides summary and relevant search results using
  the same default parameters as the [Query API](/docs/api-reference/search-apis/search).
  For more details about configuring the `corpora_search` tool, see
  [**Configure Agent Search Behavior**](/docs/agents/#configure-agent-search-behavior).

* `web_search`: Searches the public web for current information. Powered by Tavily,
  this tool enables agents to access real-time data and recent developments that may not
  be in your indexed corpora.

### External and custom tools

* `mcp`: Connect to external services through the Model Context Protocol (MCP).
  MCP tools enable agents to integrate with external systems and services. See
  [**Model Context Protocol**](/docs/agents/model-context-protocol) for details.

* `lambda`: Execute custom Python functions in a secure, sandboxed environment.
  Lambda tools allow you to define user-defined functions that agents can call to
  perform custom logic, calculations, or data transformations. Currently supports
  Python 3.12 with a curated set of libraries including numpy and pandas.

* `structured_indexing`: Index structured documents into Vectara corpora with full
  control over document structure, sections, metadata, tables, and images. This tool
  enables agents to dynamically add content to your knowledge base during conversations.

## Tool permissions and security

Tools follow the same permission model as the rest of Vectara:

1. **API keys**: Tools can only access corpora if the API key has access to the 
   corpora.
2. **Metadata filtering**: Additional security through metadata filters.
3. **Result limiting**: Control how much data tools can retrieve.
