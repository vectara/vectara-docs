---
id: agent-apis-overview
title: Agentic Platform APIs
sidebar_label: Agentic Platform APIs
---

import { Grid } from "@site/src/components/ui/Grid";
import { Spacer } from "@site/src/components/ui/Spacer";
import { TopicButton } from "@site/src/components/ui/TopicButton";

import CodePanel from '@site/src/theme/CodePanel';

The Vectara Agentic Platform APIs enable the development of intelligent agents 
that go beyond basic question answering. These agents are configurable, 
decision-making entities designed to interpret input, reason through context, 
leverage external tools, and maintain continuity across multi-turn 
interactions.

Agents do not access corpora directly. Instead, all corpus access occurs 
through tools registered on the platform. Each tool is configured with explicit 
permissions and input schemas. When creating or configuring an agent, you 
select which tools the agent can use. These tools determine the scope of 
knowledge and retrieval operations available to the agent. This enforces a 
clear, auditable separation between orchestration logic (agents) and data 
access (tools/corpora).

## What Agent APIs Enable

By using the Vectara Agentic Platform APIs, you can build purpose-driven agents 
that do the following:
- Respond adaptively to complex user input
- Retrieve relevant data from corpora or APIs to enrich responses through tool 
  integration
- Maintain session memory for stateful, multi-step conversations
- Execute complex reasoning workflows with chain-of-thought capabilities

Agents are not limited to reactive question-answering; they are proactive, 
configurable digital workers, capable of executing multi-turn tasks and 
integrating with enterprise systems through standardized MCP protocols.

This agent architecture shifts the design from reactive Q&A systems to 
proactive, configurable digital workers. It enables developers to deliver 
outcomes across use cases like support automation, research assistants, 
internal tools, and customer service.

## Agents

An agent is the core orchestration unit in Vectara's platform. It decides how to respond to user input, when to invoke tools, and how to manage conversation state. Each agent is configured with:

- A unique key following the pattern `[0-9a-zA-Z_-]+`
- A human-readable name and description
- Tool configuration specifying available MCP tools and argument bindings
- Model configuration including parameters like temperature and max tokens
- A "first_step" definition that configures the agent's conversational behavior
- Instructions that guide agent reasoning and behavior (referenced by ID or defined inline)
- Metadata for tracking (owner, department, version)
- Enabled status for availability control
- Created and updated timestamps

Agents operate through a conversational step architecture, processing user input through reasoning, tool execution, and response generation phases. The step-based design enables complex multi-turn workflows and intelligent tool orchestration.

## Tools

Tools are external or internal capabilities that agents can invoke dynamically through the Model Context Protocol (MCP). They are defined by:

- A unique ID following the pattern `^tol_.*`
- A name identifying the tool within its MCP server
- A title (human-readable) and description of their function and capabilities
- An input schema describing accepted parameters (in JSON Schema format)
- MCP server association through server_id
- Optional annotations providing behavioral hints (read_only, destructive, idempotent, open_world)
- Runtime availability (enabled/disabled)
- Created and updated timestamps

### Available tools

The following tools are available in the tech preview of the Vectara Agentic 
Platform:
- Corpora Search
- Web Search

## Instructions

Instructions serve as reusable blocks of behavioral guidance that shape how agents reason and respond. They use Velocity templating for dynamic content:

- A unique ID following the pattern `ins_[0-9a-zA-Z_-]+`
- A human-readable name and description
- Template content with variable substitution support (using Velocity template engine)
- Version management for controlled updates (auto-incremented on updates)
- Metadata for categorization and governance
- Enabled status for availability control
- Created and updated timestamps

Instructions can be referenced by agents using their ID and optional version, or defined inline within agent configuration. They support enterprise governance through versioning and controlled rollout capabilities.

## Agent Sessions

A session is a contextual container for a conversation between a user (or application) and an agent. It provides continuity across multiple interactions:

- A session key following the pattern `[0-9a-zA-Z_-]+`
- Associated agent_key
- A human-readable name and optional description
- Metadata such as customer_id, priority, or channel information
- Enabled flag for active/inactive status
- Creation timestamps

Sessions support full lifecycle operations including creation, update, retrieval, listing, and deletion. They maintain conversation context and tool execution history for comprehensive interaction tracking.

## Agent Events

Each session contains one or more events, representing individual interactions and system activities within the conversation. Events follow the pattern `aev_[0-9a-zA-Z_-]+` for their IDs:

- **Input Message Events**: User input with text content
- **Thinking Events**: Agent reasoning and chain-of-thought processes  
- **Tool Input Events**: Tool execution parameters with `tool_call_id`, `tool_key`, `tool_name`, and input data
- **Tool Output Events**: Tool execution results with matching tool_call_id and output data
- **Agent Output Events**: Final agent responses to user input
- **Context Limit Exceeded Events**: Notifications when token limits are reached

Events support both synchronous and streaming delivery, enabling real-time conversation experiences with progressive response building.

## Agentic Platform API Structure

The Agentic Platform APIs follow RESTful patterns with clear resource hierarchies:

### Agent Management
- `POST /v2/agents` - Create new agents
- `GET /v2/agents` - List agents with filtering and pagination
- `GET /v2/agents/{agent_key}` - Retrieve specific agent configuration
- `PATCH /v2/agents/{agent_key}` - Update agent configuration
- `DELETE /v2/agents/{agent_key}` - Remove agents

### Session Management
- `POST /v2/agents/{agent_key}/sessions` - Create agent sessions
- `GET /v2/agents/{agent_key}/sessions` - List agent sessions
- `GET /v2/agents/{agent_key}/sessions/{session_key}` - Retrieve session details
- `PATCH /v2/agents/{agent_key}/sessions/{session_key}` - Update session metadata
- `DELETE /v2/agents/{agent_key}/sessions/{session_key}` - Remove sessions

### Event Management
- `POST /v2/agents/{agent_key}/sessions/{session_key}/events` - Create conversation events (input only)
- `GET /v2/agents/{agent_key}/sessions/{session_key}/events` - List session events
- `GET /v2/agents/{agent_key}/sessions/{session_key}/events/{event_id}` - Retrieve specific events

### Tool Server Management
- `POST /v2/tool_servers` - Register MCP servers
- `GET /v2/tool_servers` - List registered servers
- `GET /v2/tool_servers/{tool_server_id}` - Retrieve server details
- `PATCH /v2/tool_servers/{tool_server_id}` - Update server configuration
- `DELETE /v2/tool_servers/{tool_server_id}` - Remove servers
- `POST /v2/tool_servers/{tool_server_id}/sync` - Synchronize server tools

### Tool Management
- `GET /v2/tools` - List available tools
- `GET /v2/tools/{tool_id}` - Retrieve tool specifications
- `PATCH /v2/tools/{tool_id}` - Update tool configuration
- `DELETE /v2/tools/{tool_id}` - Remove tools

### Instruction Management
- `POST /v2/instructions` - Create behavioral instructions
- `GET /v2/instructions` - List instructions with filtering
- `GET /v2/instructions/{instruction_id}` - Retrieve instruction details
- `PATCH /v2/instructions/{instruction_id}` - Update instruction templates
- `DELETE /v2/instructions/{instruction_id}` - Remove instructions
- `POST /v2/instructions/{instruction_id}/test` - Test instruction compilation
- `DELETE /v2/instructions/{instruction_id}/versions/{version}` - Remove specific instruction versions
