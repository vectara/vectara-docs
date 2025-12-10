---
id: agent-tools-overview
title: Agent Tools Overview
sidebar_label: Overview
---

import CodePanel from '@site/src/theme/CodePanel';

Vectara provides several tools that enable agents to perform searches, manage 
artifacts, process documents, and connect to external systems. This overview 
summarizes each tool type and its capabilities.

## Corpora search
* Searches through Vectara corpora to find relevant information. Agents can use 
  this tool to query your indexed document collections and retrieve contextually 
  relevant results.
* Supports custom search parameters, generation settings, and query 
  configuration.

## Web search
* Searches the internet for current information beyond your indexed corpora.
* Configurable result limits and query parameters. You can also specify 

# Sub-agents
* Initiates specialized sub-agents to handle complex, multi-step tasks autonomously.
* Provides separate context management, configurable session timeouts, specialized workflows.

## Lambda tools
* Enables user-defined Python functions that run in a secure, sandboxed 
  environment.
* Automatic input and output schema generation from type annotations.

## Document conversion
* Converts supported document types (PDF, DOCX, PPTX, etc.) into markdown.

## Artifacts
* Reads artifact content stored within the agent session with optional range 
  and encoding parameters.
* Searches through an artifact using standard pattern matching syntax and options.
* Cross-reference artifacts across multiple turns of a conversation.
* Create new files during the session, such as saving reports.

## Image reading
* Interprets image uploads with visual comprehension, such as charts, graphs, 
  screenshots, and diagrams. 

## Model Context Protocol (MCP)
MCP tools extend agent functionality with external integrations, file handling, 
and media processing capabilities. Each MCP tool operates in a secure sandbox 
with clear input/output schemas. 
