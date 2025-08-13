---
id: agent-platform-overview
title: Vectara Agentic Platform
sidebar_label: Vectara Agentic Platform
---

The Vectara Agentic Platform enables enterprises to build intelligent, agentic 
applications that go beyond basic question answering. Configurable, 
decision-making entities called **agents** power these applications. Agents 
interpret user input, reason through context, leverage external tools, and 
maintain continuity across multi-turn interactions.

Unlike traditional RAG systems that simply retrieve documents and pass them to
a language model, Vectara agents provide orchestrated workflows capable of 
taking action, retrieving information, invoking APIs, or maintaining user 
sessions.

## **What agents can accomplish**

| **Desired Outcome** | **Workflow** |
|---|---|
| **Automate customer support workflows** | Agent handles L1 support, searches knowledge bases, escalates complex issues, creates tickets |
| **Build intelligent research assistants** | Agent searches multiple data sources, synthesizes findings, maintains research context across sessions |
| **Create workflow automation systems** | Agent triggers business processes, sends notifications, updates CRM systems based on natural language requests |
| **Develop conversational enterprise tools** | Agent maintains context, handles multi-step processes, integrates with existing business systems |
| **Deploy autonomous business processes** | Agent monitors conditions, makes decisions, executes actions without human intervention |


## How Vectara agents work

Agents do not access corpora directly. Instead, all corpus access occurs with 
**tools**. Each tool is configured with explicit permissions to one or more 
corpora. When creating or configuring an agent, you select which tools the 
agent can use. These tools determine the scope of knowledge and retrieval 
operations available to the agent. This enforces a clear, auditable separation 
between orchestration logic (agents) and data access (tools/corpora).

```mermaid
graph LR
    classDef default fill:#3B82F6,stroke:#2563EB,stroke-width:2px,color:#fff
    classDef solution fill:#F97316,stroke:#EA580C,stroke-width:2px,color:#fff

    A[User Request] --> B{Agent Reasons on Request};
    B -- No Tool Needed --> E[Generate Response];
    B -- Tool Needed --> C[Select & Use Tools];
    C --> E;
    E --> F[Solution-Oriented Response];

    class A,B,C,E default
    class F solution
```

The Agentic Platform lets you build applications that do the following: 

* **Respond adaptively to complex user input:** Agents understand the nuances of 
  human language and respond in a way that is relevant and helpful.
* **Call tools for external actions:** Agents interact with other systems and 
  services, such as sending emails, creating support tickets, or triggering workflows.
* **Retrieve relevant data from corpora or APIs:** Agents access and process 
  information from a variety of sources to enrich their responses.
* **Maintain session memory for statefful, multi-step conversations:** Agents remember 
  the context of a conversation to provide more personalized and relevant 
  responses over time.

Agents are not limited to reactive question-answering. They are proactive, 
configurable digital workers, capable of executing multi-turn tasks and 
integrating with enterprise systems.

## Core Components

```mermaid
flowchart TD
    %% Nodes
    User["User / Application"]
    Session["Agent Session"]
    Agent["Agent"]
    Inst["Instructions"]
    Query["Agent Query"]
    Tool["Tool"]
    ToolServer["Tool Server"]
    Corpus["Corpus (Knowledge Base)"]

    %% Flow
    User -->|Sends message| Session
    Session -->|Provides context and history| Agent
    Agent --> Inst
    Inst -->|Shapes| Query
    Agent -->|Creates| Query
    Query -->|Direct answer| Session
    Query -->|Needs tool| Tool
    Tool -->|Executes with| ToolServer
    ToolServer -->|Returns data| Tool
    Tool -->|Retrieves| Corpus
    Tool -->|Returns result| Query
    Query -->|Synthesizes response| Session
    Session -->|Delivers answer| User

    %% Classes for color grouping
    classDef userEntry fill:#0D2FFF,color:#fff,stroke:#0D2FFF,stroke-width:2px;
    classDef session fill:#182033,color:#fff,stroke:#0D2FFF,stroke-width:2px;
    classDef agentic fill:#07E3D7,color:#182033,stroke:#07E3D7,stroke-width:2px;
    classDef toolLayer fill:#EEF2F8,color:#182033,stroke:#07E3D7,stroke-width:2px;
    classDef corpus fill:#E9368E,color:#fff,stroke:#E9368E,stroke-width:2px;

    %% Assign classes
    class User userEntry;
    class Session session;
    class Agent,Inst,Query agentic;
    class Tool,ToolServer toolLayer;
    class Corpus corpus;
```

```mermaid
flowchart TD
    %% Nodes
    User["User / Application"]
    Session["Agent Session"]
    Agent["Agent"]
    Inst["Instructions"]
    Query["Agent Query"]
    Tool["Tool"]
    MCP["MCP (Protocol Bridge)"]
    ToolServer["External MCP Server Host"]
    OSS["Open-Source MCP Server"]
    Corpus["Corpus (Knowledge Base)"]

    %% Flow
    User -->|Sends message| Session
    Session -->|Provides context & history| Agent
    Agent --> Inst
    Inst -->|Shapes| Query
    Agent -->|Creates| Query
    Query -->|Direct answer| Session
    Query -->|Needs tool| Tool

    %% MCP client/server boundary
    Tool -->|invoke| MCP
    MCP -->|call tools on| ToolServer
    ToolServer -->|returns data via| MCP
    MCP --> Tool

    %% Data access and results
    Tool -->|Retrieves| Corpus
    Tool -->|Returns result| Query
    Query -->|Synthesizes response| Session
    Session -->|Delivers answer| User

    %% Open-source server (not in platform)
    Tool -. compatible .-> OSS
    OSS -. hosts tools .-> Tool

    %% Classes
    classDef userEntry fill:#0D2FFF,color:#fff,stroke:#0D2FFF,stroke-width:2px;
    classDef session fill:#182033,color:#fff,stroke:#0D2FFF,stroke-width:2px;
    classDef agentic fill:#07E3D7,color:#182033,stroke:#07E3D7,stroke-width:2px;
    classDef toolLayer fill:#EEF2F8,color:#182033,stroke:#07E3D7,stroke-width:2px;
    classDef protocol fill:#FFD700,color:#182033,stroke:#FFD700,stroke-width:2px;
    classDef corpus fill:#E9368E,color:#fff,stroke:#E9368E,stroke-width:2px;
    classDef oss fill:#FFF5F5,color:#000,stroke:#E53E3E,stroke-width:2px;

    %% Assign classes
    class User userEntry;
    class Session session;
    class Agent,Inst,Query agentic;
    class Tool,ToolServer toolLayer;
    class MCP protocol;
    class Corpus corpus;
    class OSS oss;
```


---

<div className="mermaid-container">
```mermaid
flowchart TD
    %% Nodes
    User["User / Application"]
    Session["**Agent Session**"]
    Agent["**Agent**"]
    Inst["**Instructions**"]
    Query["**Agent Query**"]
    Tool["**Tool**"]
    MCP["**MCP Bridge**"]
    MCPServer["External MCP Server (Hosts Tools)"]
    ToolServer["**Tool Server**"]
    OSS["Open‑Source Vectara MCP Server"]
    Corpus["Corpora"]

    %% Core flow
    User -->|Query| Session
    Session -->|Provides context| Agent
    Agent --> Inst
    Inst --> Query
    Agent --> Query
    Query -->|Direct answer| Session
    Query e7@<==> Tool

    %% MCP path for external tools
    Tool e2@<--> |External| MCP
    Tool e3@<--> |Internal| ToolServer
    MCP e4@<--> MCPServer

    %% Internal data retrieval (when using internal tools)
    Tool e5@<--> Corpus

    %% Return to user
    Query e1@-->|Synthesizes response| Session
    Session -->|Answer| User

    %% Optional open-source server (separate from platform)
    MCP e6@<--> OSS

    %% Classes for color grouping
    classDef userEntry fill:#0D2FFF,color:#fff,stroke:#0D2FFF,stroke-width:2px;
    classDef session fill:#182033,color:#fff,stroke:#0D2FFF,stroke-width:2px;
    classDef agentic fill:#07E3D7,color:#182033,stroke:#00ABA0,stroke-width:2px;
    classDef toolLayer fill:#EEF2F8,color:#182033,stroke:#787878,stroke-width:2px;
    classDef protocol fill:#FFD700,color:#182033,stroke:#FFD700,stroke-width:2px;
    classDef corpus fill:#E9368E,color:#fff,stroke:#E9368E,stroke-width:2px;
    classDef oss fill:#FFF5F5,color:#000,stroke:#E53E3E,stroke-width:2px;

    %% Assign classes
    class User userEntry;
    class Session session;
    class Agent,Inst,Query agentic;
    class Tool,ToolServer toolLayer;
    class MCP protocol;
    class Corpus corpus;
    class OSS oss;

    e1@{ animation: slow }
    e2@{ animation: slow }
    e3@{ animation: slow }
    e4@{ animation: slow }
    e5@{ animation: slow }
    e6@{ animation: slow }
    e7@{ animation: slow }
```
</div>

---





The Vectara Agentic Platform is built around the following core concepts:

* **Agents:** An agent is the core orchestration unit in our agentic platform. Agents 
  decide how to respond to user input, when to invoke tools, and how to manage 
  new information and conversation state.
* **Tools:** Tools are external or internal capabilities that agents can invoke dynamically. 
  Tools perform actions such as retrieving information from a corpus, sending an 
  email, or creating a support ticket.
* **Instructions:** Instructions are reusable blocks of system prompt logic. They guide the 
  agent’s reasoning in each step by setting expectations, tone, or rules for the LLM.
* **Corpora:** Corpora provide the knowledge data that can be retrieved 
  and injected into the generative response process.
* **Agent Sessions:** A session is a contextual container for a conversation between a user 
  (or application) and an agent. It provides continuity across multiple interactions.
* **Agent Queries:** Each session contains one or more queries, representing individual 
  user-agent exchanges.

Agents shift the design from reactive Q&A systems to proactive, configurable 
digital workers. Agents enable developers to deliver outcomes across use cases 
like support automation, research assistants, internal tools, and customer 
service.

## Machine Capability Protocol (MCP) Compatibility

Vectara's Agentic Platform is designed to be compatible with the 
Machine Capability Protocol (MCP), a rapidly evolving standard for 
agent-to-agent communication. This ensures that agents built on the Vectara 
platform can, in the future, interoperate with other MCP-compatible agents and 
tools.

MCP compatibility is primarily internal and future releases will enable you 
to invoke external MCP tools and services.

### Security and Access Control

The Vectara implementation of MCP includes robust security and access control 
mechanisms. All tool calls, whether internal or external, are subject to the 
same permission model. This ensures that agents can only access the resources 
and perform the actions that they have been explicitly granted permission to 
use. This provides a secure and auditable way to manage agent capabilities.
