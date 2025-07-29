---
id: agent-apis-overview
title: Agent APIs
sidebar_label: Agent APIs
---

import { Grid } from "@site/src/components/ui/Grid";
import { Spacer } from "@site/src/components/ui/Spacer";
import { TopicButton } from "@site/src/components/ui/TopicButton";

import CodePanel from '@site/src/theme/CodePanel';

Vectara's Agent APIs enable the development of intelligent, agentic agents that go beyond basic question answering. These agents are configurable, decision-making entities designed to interpret input, reason through context, leverage external tools, and maintain continuity across multi-turn interactions.

Unlike traditional RAG systems, which retrieve documents and pass them to a language model, Vectara agents are orchestrated workflows capable of taking action, retrieving information, invoking APIs, or maintaining user sessions through the Model Context Protocol (MCP) framework.

Agents do not access corpora directly. Instead, all corpus access occurs through tools registered via MCP servers. Each tool is configured with explicit permissions and input schemas. When creating or configuring an agent, you select which tools the agent can use. These tools determine the scope of knowledge and retrieval operations available to the agent. This enforces a clear, auditable separation between orchestration logic (agents) and data access (tools/corpora).

## What Agent APIs Enable

By using the Agent API suite, you can build purpose-driven agents that do the following:

- Respond adaptively to complex user input
- Call MCP tools for external actions (e.g., send emails, trigger workflows, search enterprise systems)
- Retrieve relevant data from corpora or APIs to enrich responses through tool integration
- Maintain session memory for stateful, multi-step conversations
- Execute complex reasoning workflows with chain-of-thought capabilities

Agents are not limited to reactive question-answering; they are proactive, configurable digital workers, capable of executing multi-turn tasks and integrating with enterprise systems through standardized MCP protocols.

This agent architecture shifts the design from reactive Q&A systems to proactive, configurable digital workers. It enables developers to deliver outcomes across use cases like support automation, research assistants, internal tools, and customer service.

## Key Benefits

**Modularity**: Agents are composed of independent, swappable components—tools, instructions, and model configurations—that simplify customization.

**Extensibility**: As needs evolve, agents can be updated with new MCP tools or behavioral instructions without redesigning the entire system.

**Flexibility**: Agents support diverse use cases including support bots, research assistants, automated schedulers, and enterprise workflow automation.

**Context Management**: Sessions retain prior exchanges and tool interactions, enabling nuanced, context-aware responses that span multiple turns.

**Reusability**: Instructions and tools are managed independently from agents, enabling easy reuse, version control, and deployment strategies such as A/B testing or safe rollback.

**Standards-Based Integration**: Built on the Model Context Protocol (MCP) for seamless integration with enterprise systems and third-party tools.

## Core Components

### Agents

An agent is the core orchestration unit in Vectara's platform. It decides how to respond to user input, when to invoke tools, and how to manage conversation state. Each agent is configured with:

- A unique ID and name following the pattern `agt_[identifier]`
- A human-readable description
- Tool configuration specifying available MCP tools and argument bindings
- Model configuration including parameters like temperature and max tokens
- A "first_step" definition that configures the agent's conversational behavior
- Instructions that guide agent reasoning and behavior
- Metadata for tracking (owner, department, version)
- Enabled status for availability control

Agents operate through a conversational step architecture, processing user input through reasoning, tool execution, and response generation phases. The step-based design enables complex multi-turn workflows and intelligent tool orchestration.

### Tools

Tools are external or internal capabilities that agents can invoke dynamically through the Model Context Protocol (MCP). They are defined by:

- A unique ID following the pattern `tol_[identifier]`
- A name identifying the tool within its MCP server
- A description of their function and capabilities
- An input schema describing accepted parameters (in JSON Schema format)
- MCP server association through server_id
- Optional annotations providing behavioral hints (read-only, destructive, idempotent)
- Runtime availability (enabled/disabled)

Examples of tools:
- `tol_web_search`: Retrieves web search results
- `tol_customer_lookup`: Searches customer database
- `tol_ticket_creator`: Opens support tickets
- `tol_knowledge_search`: Searches across selected corpora

Tools are discovered and synchronized from registered MCP servers. When a tool is updated on its source server, the changes are automatically reflected in the Vectara platform during synchronization.

### Tool Servers

Tool Servers are MCP-compliant external systems that expose collections of tools for agent use. They represent the infrastructure layer that provides agent capabilities:

- A unique ID following the pattern `tsr_[identifier]`
- Connection details including URI and authentication headers
- Synchronization status and tool discovery metadata
- Health monitoring and availability tracking

Tool servers enable agents to access enterprise systems like CRM platforms, business intelligence tools, workflow systems, and databases through standardized MCP interfaces.

### Instructions

Instructions serve as reusable blocks of behavioral guidance that shape how agents reason and respond. They use Velocity templating for dynamic content:

- A unique ID following the pattern `ins_[identifier]`
- Template content with variable substitution support
- Version management for controlled updates
- Metadata for categorization and governance

Instructions can be referenced by agents or defined inline, providing flexibility in agent behavior configuration. They support enterprise governance through versioning and controlled rollout capabilities.

### Agent Sessions

A session is a contextual container for a conversation between a user (or application) and an agent. It provides continuity across multiple interactions:

- A session ID following the pattern `ase_[identifier]`
- Associated agent ID
- Optional description clarifying session context
- Metadata such as customer_id, priority, or channel information
- Enabled flag for active/inactive status
- Creation and update timestamps

Sessions support full lifecycle operations including creation, update, retrieval, listing, and deletion. They maintain conversation context and tool execution history for comprehensive interaction tracking.

### Agent Events

Each session contains one or more events, representing individual interactions and system activities within the conversation:

- **Input Message Events**: User input with text content
- **Thinking Events**: Agent reasoning and chain-of-thought processes
- **Tool Input/Output Events**: Tool execution with parameters and results
- **Agent Output Events**: Final agent responses to user input

Events support both synchronous and streaming delivery, enabling real-time conversation experiences with progressive response building.

## API Structure

The Agent APIs follow RESTful patterns with clear resource hierarchies:

### Agent Management
- `POST /v2/agents` - Create new agents
- `GET /v2/agents` - List agents with filtering and pagination
- `GET /v2/agents/{agent_id}` - Retrieve specific agent configuration
- `PATCH /v2/agents/{agent_id}` - Update agent configuration
- `DELETE /v2/agents/{agent_id}` - Remove agents

### Session Management
- `POST /v2/agents/{agent_id}/sessions` - Create agent sessions
- `GET /v2/agents/{agent_id}/sessions` - List agent sessions
- `GET /v2/agents/{agent_id}/sessions/{session_id}` - Retrieve session details
- `PATCH /v2/agents/{agent_id}/sessions/{session_id}` - Update session metadata
- `DELETE /v2/agents/{agent_id}/sessions/{session_id}` - Remove sessions

### Event Management
- `POST /v2/agents/{agent_id}/sessions/{session_id}/events` - Create conversation events
- `GET /v2/agents/{agent_id}/sessions/{session_id}/events` - List session events
- `GET /v2/agents/{agent_id}/sessions/{session_id}/events/{event_id}` - Retrieve specific events

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

## Enterprise Integration

### MCP Protocol Foundation

All tool integration is built on the Model Context Protocol (MCP), providing:

- **Standardized Integration**: Universal protocol for connecting AI agents to enterprise systems
- **Security Controls**: Authentication, authorization, and audit logging at the protocol level
- **Scalability**: Efficient connection pooling and load balancing for enterprise deployments
- **Interoperability**: Compatibility with MCP-compliant tools and servers across the ecosystem

### Security and Governance

- **Role-Based Access Control**: Fine-grained permissions for agent, tool, and session operations
- **Audit Logging**: Comprehensive tracking of all agent activities and tool usage
- **Data Classification**: Automatic handling of sensitive information based on enterprise policies
- **Compliance Frameworks**: Support for GDPR, HIPAA, SOX, and other regulatory requirements

### Performance and Reliability

- **Horizontal Scaling**: Agent sessions and tool execution scale independently
- **Connection Management**: Optimized MCP server connections with automatic retry logic
- **Response Streaming**: Real-time conversation delivery with Server-Sent Events
- **Health Monitoring**: Continuous monitoring of agent performance and tool availability

## Use Cases

### Customer Support Automation
Deploy intelligent support agents with comprehensive enterprise tool access for ticket management, knowledge retrieval, and customer data lookup.

### Sales Operations Enhancement
Create sales-focused agents with CRM integration, competitive intelligence, and proposal generation capabilities.

### Business Intelligence Automation
Develop analytical agents with database querying, report generation, and data visualization tools.

### Internal Process Automation
Build workflow agents for expense approval, document generation, and system administration tasks.

### Technical Support Assistance
Configure diagnostic agents with system monitoring, log analysis, and troubleshooting capabilities.

---

## Major Changes from Original Document

### Architectural Changes

1. **MCP Protocol Integration**: Complete shift from direct corpus access to MCP-based tool integration
   - Tools are now discovered from registered MCP servers rather than directly created
   - All external capabilities accessed through standardized MCP protocol
   - Tool servers manage collections of related tools with centralized authentication

2. **Enhanced Agent Architecture**: 
   - Agents now use sophisticated step-based processing with conversational flow
   - Tool configuration includes argument bindings and execution modes
   - Model configuration separated from agent logic with dedicated parameter management
   - Instructions system completely redesigned with Velocity templating and version control

3. **Event-Driven Conversation Model**:
   - Sessions now contain granular events rather than simple query/response pairs
   - Five event types: input_message, thinking, tool_input, tool_output, agent_output
   - Support for streaming responses and real-time conversation delivery
   - Complete audit trail of reasoning processes and tool execution

### API Structure Changes

4. **Hierarchical Resource Organization**:
   - Sessions moved under agents: `/v2/agents/{agent_id}/sessions`
   - Events nested under sessions: `/v2/agents/{agent_id}/sessions/{session_id}/events`
   - Clear parent-child relationships for better resource management

5. **New API Endpoints**:
   - Tool Server management APIs for MCP server registration and synchronization
   - Instruction management APIs with templating and testing capabilities
   - Event management APIs for granular conversation tracking
   - Tool discovery APIs (read-only) for MCP-synchronized tools

6. **Enhanced Data Models**:
   - Agent objects now include complex tool configurations and step definitions
   - Session objects simplified but with richer metadata support
   - Tool objects completely redesigned around MCP specifications with input schemas
   - New instruction objects with Velocity templating and version control

### Functional Enhancements

7. **Advanced Tool Capabilities**:
   - Input schema validation with JSON Schema
   - Behavioral annotations (read-only, destructive, idempotent hints)
   - Automatic tool discovery and synchronization from MCP servers
   - Tool versioning and lifecycle management

8. **Enterprise-Grade Features**:
   - Comprehensive security model with role-based access control
   - Audit logging for all operations and tool usage
   - Performance monitoring and health checks
   - Compliance framework support (GDPR, HIPAA, SOX)

9. **Conversation Intelligence**:
   - Chain-of-thought reasoning with thinking events
   - Streaming response delivery with Server-Sent Events
   - Context preservation across multi-turn interactions
   - Tool execution tracking and optimization

The updated architecture represents a fundamental evolution from a simple agent creation system to a comprehensive enterprise agentic platform built on open standards and designed for production deployment at scale.
