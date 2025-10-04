---
id: agent-platform-overview
title: Agents
sidebar_label: Agents
---

Vectara Agents enable enterprises to build sophisticated, 
enterprise-grade intelligent applications that go beyond basic question 
answering. Agents interpret user input, reason through context, 
leverage external tools, and maintain continuity across multi-turn 
interactions.

Unlike traditional RAG systems that simply retrieve documents and pass them to 
a language model, Vectara agents provide orchestrated workflows capable of 
taking action, retrieving information, invoking APIs, or maintaining user 
sessions.

## What are agents?

Agents provide a comprehensive framework for building AI-powered 
applications with the following capabilities:

- **Understand context**: Maintain conversation history across multiple 
  interactions.
- **Use tools**: Access and manipulate data through a variety of tools, including 
  corpus search and web search.
- **Follow instructions**: Execute complex workflows based on customizable 
  instructions and templates.
- **Stream responses**: Provide real-time updates as agents process requests.

## **What agents can accomplish**

| **Desired outcome** | **Workflow** |
|---|---|
| **Automate customer support workflows** | <ol><li>Agent handles L1 support</li><li>Searches knowledge bases</li><li>Escalates complex issues</li><li>Creates tickets</li></ol> |
| **Build intelligent research assistants** | <ol><li>Agent searches multiple data sources</li><li>Synthesizes findings</li><li>Maintains research context across sessions</li></ol> |
| **Create workflow automation systems** | <ol><li>Agent triggers business processes</li><li>Sends notifications</li><li>Updates CRM systems based on natural language requests</li></ol> |
| **Develop conversational enterprise tools** | <ol><li>Agent maintains context</li><li>Handles multi-step processes</li><li>Integrates with existing business systems</li></ol> |
| **Deploy autonomous business processes** | <ol><li>Agent monitors conditions</li><li>Makes decisions</li><li>Executes actions without human intervention</li></ol> |

## How agents work

Agents use **tools** to access information and take action. Each tool provides 
a specific capability, such as searching a specific corpus, accessing a web 
page, or interacting with an external service. When creating or configuring an 
agent, you select which tools it can use which helps ensure the following:

* A clear separation between orchestration logic (the agent) and the 
  capabilities provided by tools.
* Auditable permissions for every data retrieval or external action.
* Reusable tools that can serve multiple agents.

## Agent concepts

### Agents

Agents act as the orchestration layer of the platform:
- Coordinate between different tools and data sources.
- Maintain conversation context through sessions.
- Follow customizable instructions to guide behavior.
- Support streaming responses for real-time interaction.

### Tools

Tools provide agents with capabilities to interact with data and external systems:
- **Corpora Search**: Query your Vectara corpora with semantic search.
- **Web Search**: Access current information from the internet.
- **MCP Tools**: Integrate with external services through the [Model Context Protocol (MCP)](mcp).

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
2. [**Configure tools**](/docs/console-ui/agents/create-an-agent#tools): Set up corpus access permissions and any external integrations.
3. [**Write instructions**](/docs/console-ui/agents/create-an-agent#instructions): Create templates that guide the agent's behavior.
4. [**Test with sessions**](/docs/console-ui/agents/use-agents): Start conversations and iterate on your configuration.

## Platform Benefits

- **Rapid Development**: Build sophisticated AI applications without managing infrastructure.
- **Enterprise Security**: Role-based access control and audit trails.
- **Scalability**: Handle thousands of concurrent conversations.
- **Flexibility**: Customize every aspect of agent behavior.
- **Integration Ready**: Connect with existing systems through APIs and connectors.
