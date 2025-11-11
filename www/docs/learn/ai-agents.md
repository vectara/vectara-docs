---
id: ai-agents
title: AI Agents
sidebar_label: AI Agents
---

AI agents are autonomous systems that understand natural language, reason
through problems, use tools to accomplish tasks, and maintain context across
conversations. Unlike traditional chatbots that follow scripted responses,
agents can make decisions, access multiple data sources, and take actions to
achieve user goals.

## What are AI agents?

AI agents are systems or programs that automatically take actions to
accomplish specific goals. Modern agents powered by large language models
(LLMs) can understand natural language, reason through complex problems, and
interact with data and systems through instructions and tools.

**Core capabilities:**

- **Understand context**: Maintain conversation history and remember previous
  interactions to provide coherent, context-aware responses.
- **Reason and plan**: Break down complex requests into steps, make
  decisions about which tools to use, and adapt plans based on results.
- **Use tools**: Access databases, search the web, call APIs, run
  calculations, and integrate with external systems to accomplish tasks.
- **Follow instructions**: Execute workflows based on customizable
  instructions (also called system prompts) that define behavior and
  objectives.
- **Stream responses**: Provide real-time updates as they process requests
  and gather information.

## What agents can accomplish

| **Desired outcome** | **Workflow** |
|---|---|
| **Automate customer support workflows** | <ol><li>Agent handles L1 support</li><li>Searches knowledge bases</li><li>Escalates complex issues</li><li>Creates tickets</li></ol> |
| **Build intelligent research assistants** | <ol><li>Agent searches multiple data sources</li><li>Synthesizes findings</li><li>Maintains research context across sessions</li></ol> |
| **Create workflow automation systems** | <ol><li>Agent triggers business processes</li><li>Sends notifications</li><li>Updates CRM systems based on natural language requests</li></ol> |
| **Develop conversational enterprise tools** | <ol><li>Agent maintains context</li><li>Handles multi-step processes</li><li>Integrates with existing business systems</li></ol> |
| **Deploy autonomous business processes** | <ol><li>Agent monitors conditions</li><li>Makes decisions</li><li>Executes actions without human intervention</li></ol> |

## How AI agents work

AI agents typically follow a cycle of receiving input, reasoning about the
best approach, planning actions, and executing tasks using available tools.
This allows them to break down complex requests into manageable steps and
handle scenarios that require multiple data sources or actions.

1. **Receive**: Receive and interpret user input or environmental changes.
2. **Reason**: Understand the goal and determine what information or actions
   are needed.
3. **Plan**: Create a sequence of steps to accomplish the goal.
4. **Execute**: Use tools to gather information, perform calculations, or
   take actions.
5. **Respond**: Synthesize results into a natural language response

This cycle can repeat multiple times in a single conversation as the agent
gathers more information, refines its understanding, and works toward the
user's goal.

## Building agents with Vectara

Vectara provides a production-ready platform for building AI agents that
combine the power of RAG (Retrieval Augmented Generation) with tool calling,
session management, and enterprise-grade security.

**Why Vectara for agents:**

- **RAG-powered**: Agents can search your private corpora to ground responses
  in your data, reducing hallucinations and ensuring accuracy.
- **Built-in tools**: Corpus search, web search, custom Python functions, and
  external integrations through Model Context Protocol (MCP).
- **Session management**: Automatic conversation history, metadata for
  personalization, and multi-turn context handling.
- **Dynamic behavior**: Use templates to customize instructions and tool
  behavior based on user roles, permissions, or preferences.
- **Enterprise security**: Row-level access control, tenant isolation, and
  auditable tool permissions.

[**Build your first Vectara Agent →**](/docs/agent-os/agent-platform-overview)

:::tip Conversational AI Platform
Agents are perfect for building conversational AI experiences like virtual
assistants and chatbots.
[**Learn more about Vectara's Conversational AI →**](/docs/agent-os/conversational-ai)
:::
