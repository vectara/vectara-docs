---
id: agent-tools-overview
title: Agent Tools Overview
sidebar_label: Overview
---

import CodePanel from '@site/src/theme/CodePanel';

Vectara provides several categories of agent tools that enable agents to perform searches, manage artifacts, process documents, and connect to external systems. This overview summarizes each tool type and its capabilities.

## Corpora search

Searches across one or more Vectara corpora to find contextually relevant information.

- Retrieves matching results and summaries from indexed document collections.
- Accepts a `query` string parameter for the search.
- Returns semantically relevant responses using Vectara’s hybrid retrieval and generation models.

## Web search

Queries the web for up-to-date information beyond your indexed corpora.

- Uses the `tavily` provider by default.
- Accepts parameters:
  - `query` (required): The search query.
  - `limit`: Maximum number of results to return (default: 10).
- Useful for supplementing corpora knowledge with real-time data.

## Model Context Protocol (MCP) tools

MCP tools extend agent functionality with external integrations, file handling, and media processing capabilities. Each MCP tool operates in a secure sandbox with clear input/output schemas.

## Document and artifact tools

These tools manage, read, and transform document artifacts stored within the 
agent session.

- **Document conversion**
  - Converts supported document types (PDF, DOCX, PPTX, etc.) into `markdown` or `structured_document` formats.
  - Parameters:
    - `artifact_id`: The document to convert.
    - `output_format`: Desired format.

- **Artifact read**
  - Reads artifact content with optional range and encoding parameters.
  - Supports both:
    - `raw` text (with optional `start_line` / `end_line` for large files)
    - `base64` encoding for binary content.

- **Artifact grep**
  - Searches through an artifact using standard `grep` syntax and options.
  - Parameters:
    - `artifact_id`: Artifact to search.
    - `pattern`: Regex search pattern.
    - `grep_options`: Array of optional flags (e.g., `-i`, `-n`, `-C`).

## Corpus and document indexing tools

- **Corpus Document Index**
  - Indexes documents into a Vectara corpus with support for both **core** and 
  **structured** document models.
  - Parameters:
    - `corpus_key` (required): Target corpus key.
    - `document` or `artifact_id`: Defines the document to index.
  - Supports:
    - **CoreDocument**: Explicitly defines document parts and metadata.
    - **StructuredDocument**: Automatically chunks content based on a defined strategy 
  (`sentence_chunking_strategy` or `max_chars_chunking_strategy`).

## Tool categories summary

| Category | Example Tools | Description |
|-----------|----------------|--------------|
| Search | `corpora_search`, `web_search` | Retrieve relevant information from corpora or the web. |
| Documents | `document_conversion`, `corpus_document_index` | Convert and index structured or core documents. |
| Artifacts | `artifact_read`, `artifact_grep` | Read and search artifact contents with flexible options. |
| Integration | `mcp` tools | Extend functionality through external MCP servers. |

