---
id: agent-tools
title: Built-in tools
sidebar_label: Built-in tools
---

import CodePanel from '@site/src/theme/CodePanel';

Tools provide agents with capabilities to interact with data and external
systems. An agent uses the conversational context and its instructions to
decide which tools to call, and how use the tools' responses to respond to
the user's query.

Vectara offers a number of useful tools out-of-the-box, including multi-modal
capabilities for working with text, images, and documents. You can also build
your own. For a complete list of available tools, refer to the [Tools API
docs](/docs/rest-api/tools).

* **Corpora search**
  * Searches through Vectara corpora to find relevant information. Agents can use 
    this tool to query your indexed document collections and retrieve contextually 
    relevant results.
  * Supports custom search parameters, generation settings, and query 
    configuration.
* **Web search**
    * Searches the internet for current information beyond your indexed corpora.
    * Configurable result limits and query parameters. You can also specify 
  domains to include or exclude from the search.
* **Sub-agents** 
  * Initiates specialized sub-agents to handle complex, multi-step tasks autonomously.
  * Provides separate context management, configurable session timeouts, specialized workflows.
* **Lambda tools**
  * Enables user-defined Python functions that run in a secure, sandboxed 
    environment.
  * Automatic input and output schema generation from type annotations.
* **Document conversion**
  * Converts supported document types (PDF, DOCX, PPTX) and images into markdown.
  * Includes OCR for extracting text from images.
* **Artifacts**
  * Reads artifact content stored within the agent session with optional range 
    and encoding parameters.
  * Searches through an artifact using standard pattern matching syntax and options.
  * Cross-reference artifacts across multiple turns of a conversation.
  * Create new files during the session, such as saving reports.
* **Image reading**
  * Enables visual analysis of image artifacts uploaded to agent sessions.
  * Interprets charts, graphs, screenshots, and diagrams.
  * Supports PNG, JPEG, GIF, and WebP formats.
* **Model Context Protocol (MCP)**
  * MCP tools extend agent functionality with external integrations, file handling, 
  and media processing capabilities. Each MCP tool operates in a secure sandbox 
  with clear input/output schemas.