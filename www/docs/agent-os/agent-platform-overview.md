---
id: agent-platform-overview
title: Agents
sidebar_label: Agents
---

Agents are autonomous systems that understand natural language and use tools 
and reasoning to accomplish tasks.

1. [**Create an agent**](/docs/rest-api/create-agent): Define the agent's name, description, and available 
   tools.
2. [**Write instructions**](/docs/rest-api/create-instruction): Create templates that guide the agent's behavior.
3. [**Configure tools**](/docs/rest-api/list-tools): Set up corpus access permissions and any external 
   integrations.
4. [**Test agents with sessions**](/docs/rest-api/create-agent-session): Start conversations and iterate on your 
   configuration.


:::tip Quick Start
To build your first agent, see the [**Agent quick start**](/docs/agents/agents-quickstart). 
Or, check out our [**Agents APIs**](/docs/rest-api/agents).
:::

## Concepts

The core concept to understand about agents is that their behavior is defined 
by instructions. The agent uses these instructions alongside information from 
a conversation session to determine how to respond to user input, including 
which tools to use.

These are the other core concepts when it comes to agents:

* **Tools:** Tools provide agents with capabilities to interact with data and 
  external systems.
* **Sessions:** Sessions preserve context throughout a conversation so the agent 
  can consider prior information when responding to a query.

<div className="mermaid-container">
```mermaid
flowchart TD
    %% Nodes
    User["User"]
    Session["**Agent**"]
    Agent["**Session**"]
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

## Model Context Protocol (MCP)

The Model Context Protocol (MCP) is an emerging and rapidly changing standard 
for communication between agents and tools. Introduced by Anthropic and now 
adopted across multiple agentic ecosystems, MCP defines a structured way for 
agents to invoke external tools, pass contextual input, and receive structured 
responses. MCP acts as a universal connector between AI agents and enterprise 
services.

In the tech preview of Agents, Vectara only supports MCP as a 
client. This means Vectara agents can call MCP-enabled tools and services 
hosted on external MCP servers. 

:::note 
You can run your own MCP server to expose your tools and data within the Vectara 
platform. To help you get started, we provide an unsupported 
[open-source MCP server implementation](https://github.com/vectara/py-vectara-agentic). 
Please note that while you can connect your self-hosted MCP server to Vectara, 
you are responsible for its management and maintenance.
:::

## Why MCP is important

MCP eliminates the need for custom integrations by providing a universal 
protocol that any AI system can use to access external capabilities. 
Instead of building custom integrations for every tool or service, MCP 
creates a standardized interface that works across different LLM providers 
and enterprise systems. MCP provides the following benefits:

| Benefit | Description | 
| ------ | ------- | 
| Standardized tool access | Access tools through a common schema and interface.
| Dynamic tool discovery | Agents can discover tools available at a registered MCP server.
| Enterprise integration | Tools can represent internal APIs, RAG systems, databases, or even other agents.
| Auditability and security | Permissions and access control can be managed per tool, enabling secure orchestration.
| Model-agnostic | MCP works across agent platforms (Vectara, Claude, OpenAI SDK, Google Gemini, and so on).

