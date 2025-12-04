---
id: agent-management
title: Agent Management APIs
sidebar_label: Agent Management
---

The Agent Management APIs enable you to create, configure, and manage Vectara 
agents. Agents are AI assistants that can use tools, follow instructions, and 
maintain conversation context.

- **Create agents** with custom tools, instructions, and model configurations
- **List agents** to view all agents in your account
- **Get agent details** to retrieve configuration and metadata
- **Update agent settings** to modify tools, instructions, or other properties
- **Delete agents** when no longer needed

## Agent configuration

- **Name and description**: Human-readable identification
- **Tool configurations**: Define what tools the agent can use (web search, corpora search, MCP tools)
- **Instructions**: Provide personality, behavior guidelines, and task-specific guidance
- **Model settings**: Configure which LLM to use and its parameters
- **First step**: Define the agent's entry point and initial behavior

## Agent tools

Agents can be configured with various tools:
- **Web search**: Search the internet for current information via Tavily
- **Corpora search**: Query your Vectara corpora for relevant content  
- **MCP tools**: External tools from Model Context Protocol servers  

## Available endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| [Create Agent](/docs/rest-api/create-agent) | POST | Create a new agent with specified configuration |
| [List Agents](/docs/rest-api/list-agents) | GET | Retrieve all agents in your account |
| [Get Agent](/docs/rest-api/get-agent) | GET | Get detailed configuration of a specific agent |
| [Update Agent](/docs/rest-api/update-agent) | PATCH | Modify existing agent properties |
| [Replace Agent](/docs/rest-api/replace-agent) | PUT | Completely replace an agent's configuration |
| [Delete Agent](/docs/rest-api/delete-agent) | DELETE | Remove an agent permanently |

