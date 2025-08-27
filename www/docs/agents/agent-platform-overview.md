---
id: agent-platform-overview
title: Vectara Agentic Platform
sidebar_label: Vectara Agentic Platform
---

The Vectara Agentic Platform enables enterprises to build sophisticated, 
enterprise-grade intelligent, applications that go beyond basic question 
answering. Agents interpret user input, reason through context, 
leverage external tools, and maintain continuity across multi-turn 
interactions. Unlike traditional RAG systems that simply retrieve documents 
and pass them to a language model, Vectara agents provide orchestrated workflows 
capable of taking action, retrieving information, invoking APIs, or maintaining 
user sessions.

## What is the Vectara Agentic Platform?

The Agentic Platform is a comprehensive framework for building AI-powered 
applications that can:

- **Understand Context**: Maintain conversation history across multiple interactions.
- **Use Tools**: Access and manipulate data through a variety of tools including corpus search and web search.
- **Follow Instructions**: Execute complex workflows based on customizable instructions and templates.
- **Stream Responses**: Provide real-time updates as agents process requests.

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
agent can use. This ensures:

* Clear separation between orchestration logic (agents) and data access 
  (tools/corpora).
* Audible permissions for every retrieval or external action
* Reusable tools that can serve multiple agents


## Vectara agentic components


The Vectara Agentic Platform is built around the following core concepts:

### Agents

Agents act as the orchestration layer of the platform:
- Coordinate between different tools and data sources.
- Maintain conversation context through sessions.
- Follow customizable instructions to guide behavior.
- Support streaming responses for real-time interaction.

### Tools

Tools provide agents with capabilities to interact with data and external systems:
- **Corpus Search Tool**: Query your Vectara corpora with semantic search.
- **Web Search Tool**: Access current information from the internet.
- **MCP Tools**: Integrate with external services through the Model Context Protocol (MCP).

### Sessions

Sessions maintain the state of conversations:
- Track all interactions (also known as events) within a conversation.
- Preserve context across multiple turns.
- Enable multi-turn reasoning and follow-up questions.

### Instructions

Instructions guide agent behavior using Velocity templates:
- Define the agent's persona and objectives.
- Customize responses based on context.
- Support dynamic variable substitution.


<div className="mermaid-container">
```mermaid
flowchart TD
    %% Nodes
    User["User / Application"]
    Session["**Agent Session**"]
    Agent["**Agent**"]
    Inst["**Instructions**"]
    Query["**Agent Query**"]

    %% Tools + execution layer
    Tool["**Tool**"]
    ToolServer["**Tool Server**"]

    %% Data/targets
    Corpus["Corpus Search"]
    Web["Web Search"]

    %% MCP
    MCP["**MCP Client**"]
    ExtMCP["External MCP Server"]

    %% Core flow
    User -->|Query| Session
    Session -->|Provides context| Agent
    Agent --> Inst
    Inst --> Query
    Agent --> Query
    Query -->|Direct answer| Session
    Query e4@<==> Tool
    Tool e5@<==> Query

    %% Internal tool execution paths
    Tool e3@<--> ToolServer
    ToolServer e7@<--> Tool
    ToolServer --> Corpus
    ToolServer -.-> Web

    %% Optional MCP path (de-emphasized)
    Tool e2@<--> MCP
    MCP e6@<--> Tool
    MCP -.-> ExtMCP

    %% Return to user
    Query e1@==>|Synthesizes response| Session
    Session -->|Answer| User

    %% Classes for color grouping
    classDef userEntry fill:#0D2FFF,color:#fff,stroke:#0D2FFF,stroke-width:2px;
    classDef session fill:#182033,color:#fff,stroke:#0D2FFF,stroke-width:2px;
    classDef agentic fill:#07E3D7,color:#182033,stroke:#00ABA0,stroke-width:2px;
    classDef toolLayer fill:#EEF2F8,color:#182033,stroke:#787878,stroke-width:2px;
    classDef corpus fill:#E9368E,color:#fff,stroke:#E9368E,stroke-width:2px;
    classDef external fill:#F3F4F6,color:#111827,stroke:#9CA3AF,stroke-width:1.5px,stroke-dasharray: 6 4;
    classDef mcpTP fill:#FFF4B8,color:#182033,stroke:#FFD700,stroke-width:1.5px,stroke-dasharray: 6 4;

    %% Assign classes
    class User userEntry;
    class Session session;
    class Agent,Inst,Query agentic;
    class Tool,ToolServer toolLayer;
    class Corpus corpus;
    class Web,ExtMCP external;
    class MCP mcpTP;

    %% Animations
    e1@{ animation: slow }
    e2@{ animation: slow }
    e3@{ animation: slow }
    e4@{ animation: slow }
    e5@{ animation: slow }
    e6@{ animation: slow }
    e7@{ animation: slow }
```
</div>

## Getting Started

To build your first agent:

1. [**Create an agent**](/docs/console-ui/agents/create-an-agent): Define the agent's name, description, and available tools.
2. **Configure Tools**: Set up corpus access permissions and any external integrations.
3. **Write Instructions**: Create templates that guide the agent's behavior.
4. **Test with Sessions**: Start conversations and iterate on your configuration.

## Platform Benefits

- **Rapid Development**: Build sophisticated AI applications without managing infrastructure
- **Enterprise Security**: Role-based access control and audit trails
- **Scalability**: Handle thousands of concurrent conversations
- **Flexibility**: Customize every aspect of agent behavior
- **Integration Ready**: Connect with existing systems through APIs and connectors
