---
id: agent-concepts
title: Concepts
sidebar_label: Concepts
---

import CodePanel from '@site/src/theme/CodePanel';
import { Spacer } from "@site/src/components/ui/Spacer";

Agents are autonomous systems that understand natural language and use tools 
and reasoning to accomplish tasks. They maintain conversation context through 
sessions and can handle multi-turn interactions.

To build your first agent, see the [**Agent quick start**](/docs/agents/agents-quickstart). You can also try our [**Agent API tutorial notebook**](https://github.com/vectara/example-notebooks/blob/main/notebooks/api-examples/4-agent-api.ipynb). For more information about our Agent APIs see the [**API Reference**](/docs/rest-api/agents).

## How agents work

<div className="mermaid-container">
```mermaid
flowchart TD
    %% Nodes
    User["User"]
    Session["**Agent**"]
    Agent["**Session**<br><small>(handles Artifacts)</small>"]
    Inst["**Instructions**"]
    Query["**Agent Query**"]

    %% Tools layer
    AvailableTools["**Tools**<br/><small>(Built-in tools)</small>"]

    %% Sub-agents
    SubAgents["**Sub-agent(s)**<br/><small>Delegated tasks to separate agents</small>"]
    SubAgentTasks["Separate instructions, tools, and results"]

    %% MCP
    MCP["**MCP Tool + Client**"]
    ExtMCP["External MCP Server"]

    %% Core flow
    User -->|<small>Query</small>| Session
    Session -->|<small>Conversation state</small>| Agent
    Agent --> |<small>Configured with</small>| Inst
    Inst --> |<small>Guide agent behavior</small>| Query

    %% Tool execution paths
    Query <--> AvailableTools
    Query <--> SubAgents
    SubAgents <--> SubAgentTasks

    %% Optional MCP path (de-emphasized)
    Query <--> MCP
    MCP -.-> ExtMCP

    %% Return to user
    Query -->|<small>Synthesizes response</small>| Session
    Session -->|<small>Response</small>| User

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
    class AvailableTools,SubAgents toolLayer;
    class ExtMCP external;
    class MCP mcpTP;
```
</div>

<Spacer size="l" />

An agent consists of these primary components that define its behavior and
capabilities.

* **Instructions** serve as the system prompt for the agent and define its
  behavior, how to respond to user input, and which tools to use. 
* **Tools** provide agents with capabilities to interact with data and external
  systems including corpora search, web search, artifacts (uploaded files),
  and other built-in tools.
* **Sub-agents** enable you to create modular agent systems. The parent agent 
  can delegate domain-specific tasks to an existing agent or agents. This 
  sub-agent then executes its own reasoning loop and returns the final result 
  to the parent agent.
* **Sessions** preserve context throughout a conversation so the agent can
  consider all prior information when responding to a query.
* **Artifacts** define uploaded documents and files within a session for the 
  agent to analyze without indexing them into a permanent corpus. You can also 
  generate new documents from these artifacts and upload to a corpus for 
  future use.

To chat with your agent, read on about [**Sessions**](/docs/agents/sessions).

