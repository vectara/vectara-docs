---
id: agent-platform-overview
title: Concepts
sidebar_label: Concepts
---

import CodePanel from '@site/src/theme/CodePanel';

Agents are autonomous systems that understand natural language and use tools 
and reasoning to accomplish tasks. An Agent maintains state and uses reasoning 
to determine the best way to solve a user's problem.

:::tip Quick Start
To build your first agent, see the [**Agent quick start**](/docs/agents/agents-quickstart). 
Or, check out our [**Agents APIs**](/docs/rest-api/agents).
:::

An agent consists of three primary components that define its behavior and 
capabilities.

## Instructions

Instructions serve as the system prompt for the agent and define its behavior, 
how to respond to user input, and which tools to use. Velocity templates, 
enable dynamic variable substitutions. You can also reference session 
metadata (such as `${session.metadata.user_role}`) to personalize agent behavior.

## Tools

Tools provide agents with capabilities to interact with data and 
external systems including corpora search, web search, artifacts (uploaded 
files), subagents and MCP servers.


### Subagents

Subagents enable you to create modular agent systems. Instead of building a 
single agent that tries to handle every scenario, you define specialized agents 
and register them as tools for a parent agent. This allows the main agent to 
delegate domain-specific tasks to a subagent. The subagents executes its own 
reasoning loop and returns the result to the parent agent.


## Sessions

Sessions preserve context throughout a conversation so the agent 
can consider all prior information when responding to a query.

* **Metadata:** You can provide custom metadata into a session (like `user_id` or 
  `language`), which the Agent can access through the instructions.
* **Artifacts:** Sessions provide a workspace for file uploads. You can upload 
  documents to a session for the agent to analyze without indexing them into 
  a permanent corpus. You can also generate new documents from these artifacts 
  and upload to a corpus for future use.

To chat with your agent, read on about [Sessions](/docs/agents/sessions).

