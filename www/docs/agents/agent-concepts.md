---
id: agent-concepts
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

<div className="mermaid-container">
```mermaid
flowchart TD
    %% Nodes
    User["User"]
    Session["**Agent**"]
    Agent["**Session** (handles Artifacts)"]
    Inst["**Instructions**"]
    Query["**Agent Query**"]

    %% Tools layer
    AvailableTools["**Tools** (Corpora Search, Web Search, Lambda Tools)"]

    %% MCP
    MCP["**MCP Tool + Client**"]
    ExtMCP["External MCP Server"]

    %% Core flow
    User -->|Query| Session
    Session -->|Conversation state| Agent
    Agent --> |Configured with| Inst
    Inst --> |Guide agent behavior| Query

    %% Tool execution paths
    Query <--> AvailableTools

    %% Optional MCP path (de-emphasized)
    Query <--> MCP
    MCP -.-> ExtMCP

    %% Return to user
    Query -->|Synthesizes response| Session
    Session -->|Response| User

    %% Classes for color grouping
    classDef userEntry fill:#182033,color:#fff,stroke:#fff,stroke-width:2px;
    classDef session fill:#EEF2F8,color:#182033,stroke:#787878,stroke-width:2px;
    classDef agentic fill:#EEF2F8,color:#182033,stroke:#787878,stroke-width:2px;
    classDef toolLayer fill:#EEF2F8,color:#182033,stroke:#787878,stroke-width:2px;
    classDef corpus fill:#E9368E,color:#fff,stroke:#E9368E,stroke-width:2px;
    classDef external fill:#182033,color:#fff,stroke:#fff,stroke-width:2px;
    classDef mcpTP fill:#EEF2F8,color:#182033,stroke:#787878,stroke-width:2px;

    %% Assign classes
    class User userEntry;
    class Session session;
    class Agent,Inst,Query agentic;
    class AvailableTools toolLayer;
    class ExtMCP external;
    class MCP mcpTP;

```
</div>

---

An agent consists of these primary components that define its behavior and
capabilities.

* **Instructions** serve as the system prompt for the agent and define its
  behavior, how to respond to user input, and which tools to use. 
* **Tools** provide agents with capabilities to interact with data and external
  systems including corpora search, web search, artifacts (uploaded files),
  subagents and MCP servers.
* **Sub-agents** enable you to create modular agent systems. This
    allows the main agent to delegate domain-specific tasks to a sub-agent that 
    executes its own reasoning loop and returns the result to the
    parent agent.
* **Sessions** preserve context throughout a conversation so the agent can
  consider all prior information when responding to a query.
* **Artifacts:** define uploaded documents and files within a session for the 
  agent to analyze without indexing them into a permanent corpus. You can also 
  generate new documents from these artifacts and upload to a corpus for 
  future use.

To chat with your agent, read on about [Sessions](/docs/agents/sessions).

