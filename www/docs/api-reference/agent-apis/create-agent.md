---
id: create-agent
title: Create Agent API Definition
sidebar_label: Create Agent
---

import CodePanel from '@site/src/theme/CodePanel';

The Create Agent API lets you design and deploy smart AI agents capable of 
managing sophisticated workflows, running tool-based actions, and 
also keep conversational context across multi-turn dialogues. Using the Model 
Context Protocol (MCP), this API enables the development of autonomous digital 
workers that combine retrieval-augmented generation with external system 
integration.

By configuring agents with specific tools, behavioral instructions, and model 
parameters, enterprises can deploy specialized agents for customer support, 
business intelligence, workflow automation, and technical assistance scenarios. 
These agents operate as configurable, decision-making entities that can reason
through problems, coordinate multiple tools, and adapt their responses based on 
conversation context and available capabilities.

## What is an agent?

An agent is an AI-powered orchestrator comprised of three main components:

1. **Instructions:** Guide the agent's behavior and personality. Instructions are similar to a system prompt in other platforms and use Velocity templates for dynamic content.
2. **Steps:** Define the workflow the agent executes when receiving input. Currently, only conversational steps are supported, which enable the agent to respond through dialogue with users.
3. **Tool Configurations:** Define which tools (capabilities) the agent can use and how they're configured. Tools enable agents to search corpora, access the web, or integrate with external systems.

To use an agent, create a new session (called a _thread_ or _chat_ in other
platforms), and send inputs to the agent to receive responses. Each session maintains conversation context across multiple interactions.

## Create Agent Request and Response

To create an agent, send a POST request to `/v2/agents`. You specify the 
following parameters in the request body:

- `key` (string, optional): A user provided key that uniquely identifies this agent. 
  If not provided, one will be auto-generated based on the agent name. Pattern: `[0-9a-zA-Z_-]+$`
- `name` (string, required): The human-readable name of the agent
- `description` (string, optional): Detailed description of agent purpose and capabilities
- `tool_configurations` (object, required): A map of tool configurations available to the agent. Each entry in this map defines a named tool configuration that the agent can use:
  - **Key:** A user-defined name for the tool configuration (e.g., `customer_search`, `web_search`). This name is how the agent refers to this specific tool configuration in events and logs.
  - **Value:** An `AgentToolConfiguration` object that specifies:
    - `type` (string, required): The tool type - one of:
      - `corpora_search`: Query Vectara corpora using RAG
      - `web_search`: Search the web for current information
      - `mcp`: Connect to external Model Context Protocol servers
      - `lambda`: Execute custom Python functions (user-defined tools)
      - `structured_indexing`: Index structured documents into Vectara corpora
    - `argument_override` (object, optional): Hardcoded arguments that override LLM-provided values. When specified, the LLM cannot change these parameters. Supports dynamic references using `{"$ref": "path.to.value"}` syntax (e.g., `{"$ref": "session.metadata.customer_id"}`)
    - `query_configuration` (object, required for `corpora_search`): Query settings including search parameters, generation settings, and reranking configuration - not exposed to the LLM
- `model` (object, required): Model configuration for agent reasoning
  - `name` (string, required): Model name (e.g., `gpt-4`)
  - `parameters` (object, optional): Model-specific parameters like temperature and max_tokens
  - `retry_configuration` (object, optional): Retry behavior for LLM interactions
    - `enabled` (boolean, optional): Enable or disable retry logic (default: `true`)
    - `max_retries` (integer, optional): Maximum retry attempts after initial failure, range 0-10 (default: `3`)
    - `initial_backoff_ms` (integer, optional): Initial delay before first retry in milliseconds, range 100-60000 (default: `1000`)
    - `max_backoff_ms` (integer, optional): Maximum delay between retries in milliseconds, range 1000-300000 (default: `30000`)
    - `backoff_factor` (float, optional): Exponential multiplier for backoff delays, range 1.0-10.0 (default: `2.0`)
- `first_step` (object, required): Defines the agent's entry point and execution behavior
  - `type` (string, required): Step type (must be `conversational` - the only currently supported type)
  - `instructions` (array, required): An ordered list of instructions that guide the agent's behavior. Instructions use the Apache Velocity template language and can reference context variables. You can mix reference and inline instructions:
    - **Reference instructions** - Reusable instructions stored separately that can be shared across multiple agents:
      - `type` (string, required): Must be `reference`
      - `id` (string, required): The instruction's unique identifier (pattern: `ins_[0-9a-zA-Z_-]+$`)
      - `version` (integer, optional): Specific version number to use. If omitted, the latest version is used. Note: When a referenced instruction is updated, agents must be explicitly updated to use the new version.
    - **Inline instructions** - Instructions defined directly within the agent configuration:
      - `type` (string, required): Must be `inline`
      - `name` (string, required): Human-readable name for this instruction
      - `template_type` (string, optional): Template language to use (must be `velocity`, which is the default)
      - `template` (string, required): The instruction content using Velocity template syntax. Use `${variableName}` to reference dynamic values.
      - `description` (string, optional): Optional description explaining the instruction's purpose
  - `output_parser` (object, required): Configures how the agent's output is parsed and returned
    - `type` (string, required): Parser type (currently only `default` is supported, which uses native LLM tool calling)
- `metadata` (object, optional): Arbitrary key-value pairs for organization and tracking
- `enabled` (boolean, optional): Whether agent is active upon creation (defaults to `true`)

The response includes the complete agent configuration with system-generated fields including the unique agent key, creation timestamp, and update timestamp.

### Example Request

<CodePanel
  title="Example agent request"
  snippets={[
    {
      language: 'json',
      code: `{
  "key": "customer_support",
  "name": "Customer Support Agent", 
  "description": "AI agent specialized in handling customer support inquiries using company documentation",
  "tool_configurations": {
    "customer_search": {
      "type": "corpora_search",
      "query_configuration": {
        "search": {
          "corpora": [
            {
              "corpus_key": "support_docs",
              "limit": 10
            }
          ]
        },
        "save_history": true
      }
    },
    "web_search": {
      "type": "web_search",
      "argument_override": {
        "limit": 5
      }
    }
  },
  "model": {
    "name": "gpt-4",
    "parameters": {
      "temperature": 0.1,
      "max_tokens": 1500
    },
    "retry_configuration": {
      "enabled": true,
      "max_retries": 3,
      "initial_backoff_ms": 1000,
      "max_backoff_ms": 30000,
      "backoff_factor": 2.0
    }
  },
  "first_step": {
    "type": "conversational",
    "instructions": [
      {
        "type": "reference",
        "id": "ins_customer_support_init",
        "version": 2
      },
      {
        "type": "inline",
        "name": "Additional Guidelines",
        "template": "Always be polite and professional. Today's date is ${currentDate}.",
        "template_type": "velocity"
      }
    ],
    "output_parser": {
      "type": "default"
    }
  },
  "metadata": {
    "department": "customer_service",
    "version": "1.0.0"
  },
  "enabled": true
}`
    }]}  
  layout="stacked"
/>

### Example Response

<CodePanel
  title="Example response"
  snippets={[
    {
      language: 'json',
      code: `{
  "key": "customer_support",
  "name": "Customer Support Agent",
  "description": "AI agent specialized in handling customer support inquiries using company documentation",
  "tool_configurations": {
    "customer_search": {
      "type": "corpora_search",
      "argument_override": {
        "query": "customer support documentation"
      },
      "query_configuration": {
        "search": {
          "corpora": [
            {
              "corpus_key": "support_docs",
              "limit": 10
            }
          ]
        },
        "save_history": true
      }
    },
    "web_search": {
      "type": "web_search",
      "argument_override": {
        "limit": 5
      }
    }
  },
  "model": {
    "name": "gpt-4",
    "parameters": {
      "temperature": 0.1,
      "max_tokens": 1500
    },
    "retry_configuration": {
      "enabled": true,
      "max_retries": 3,
      "initial_backoff_ms": 1000,
      "max_backoff_ms": 30000,
      "backoff_factor": 2.0
    }
  },
  "first_step": {
    "type": "conversational",
    "instructions": [
      {
        "type": "reference",
        "id": "ins_customer_support_init",
        "version": 2
      },
      {
        "type": "inline",
        "name": "Additional Guidelines",
        "template": "Always be polite and professional. Today's date is ${currentDate}.",
        "template_type": "velocity"
      }
    ],
    "output_parser": {
      "type": "default"
    }
  },
  "metadata": {
    "department": "customer_service",
    "version": "1.0.0"
  },
  "enabled": true,
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}`
    }]}  
  layout="stacked"
/>

## Error Responses

The API returns standard HTTP error codes with detailed error information:

| HTTP Code | Error Code | Description |
|-----------|------------|-------------|
| 400 | `invalid_request` | Missing required fields or malformed request structure |
| 400 | `invalid_tool_reference` | Referenced tool does not exist or is inaccessible |
| 400 | `invalid_instruction_reference` | Referenced instruction does not exist or is inaccessible |
| 400 | `invalid_model_configuration` | Invalid model name or unsupported parameters |
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for agent creation |
| 429 | `rate_limit_exceeded` | Agent creation rate limit exceeded |
