---
id: create-agent
title: Create Agent API Definition
sidebar_label: Create Agent API Definition
---

# Create Agent API Definition

The Create Agent API enables you to define and deploy intelligent AI agents within the Vectara platform that can orchestrate complex workflows, execute tool-based actions, and maintain conversational context across multi-turn interactions. This API supports the creation of autonomous digital workers that combine retrieval-augmented generation with external system integration through the Model Context Protocol (MCP).

By configuring agents with specific tools, behavioral instructions, and model parameters, enterprises can deploy specialized agents for customer support, business intelligence, workflow automation, and technical assistance scenarios. These agents operate as configurable, decision-making entities that can reason through problems, coordinate multiple tools, and adapt their responses based on conversation context and available capabilities.

## Create Agent Request and Response

To create an agent, send a POST request to `/v2/agents`. You specify the following parameters in the request body:

- `name` (string, required): Human-readable agent name
- `description` (string, optional): Detailed description of agent purpose and capabilities
- `tools` (object, required): Tool configuration object
  - `available` (array, required): List of available tools
    - `id` (string, required): Tool identifier following pattern `tol_.*`
    - `argument_bindings` (object, optional): Fixed arguments for tool execution
  - `mode` (string, optional): Tool interaction mode (`native` or `instruction`, defaults to `native`)
- `model` (object, required): Model configuration for agent reasoning
  - `name` (string, required): Model name (e.g., `gpt-4`)
  - `parameters` (object, optional): Model-specific parameters like temperature and max_tokens
- `first_step` (object, required): Initial execution step configuration
  - `type` (string, required): Step type (must be `conversational`)
  - `instructions` (array, required): List of instruction objects
    - Reference instructions:
      - `type` (string, required): Must be `reference`
      - `id` (string, required): Instruction identifier following pattern `ins_.*`
      - `version` (integer, optional): Specific instruction version
    - Inline instructions:
      - `type` (string, required): Must be `inline`
      - `template_type` (string, required): Must be `velocity`
      - `template` (string, required): Instruction template content
      - `name` (string, optional): Human-readable instruction name
      - `description` (string, optional): Instruction description
  - `output_parser` (object, required): Output parser configuration (typically `{"type": "default"}`)
- `metadata` (object, optional): Arbitrary key-value pairs for organization and tracking
- `enabled` (boolean, optional): Whether agent is active upon creation (defaults to `true`)

The response includes the complete agent configuration with system-generated fields including the unique agent ID, creation timestamp, and update timestamp.

### Example Request

```json
{
  "name": "Customer Support Agent", 
  "description": "AI agent specialized in handling customer support inquiries using company documentation",
  "tools": {
    "available": [
      {
        "id": "tol_knowledge_search",
        "argument_bindings": {
          "max_results": 10,
          "corpus_filter": "support_docs"
        }
      },
      {
        "id": "tol_ticket_creator"
      }
    ],
    "mode": "native"
  },
  "model": {
    "name": "gpt-4",
    "parameters": {
      "temperature": 0.1,
      "max_tokens": 1500
    }
  },
  "first_step": {
    "type": "conversational",
    "instructions": [
      {
        "type": "reference",
        "id": "ins_customer_support_init",
        "version": 2
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
}
```

### Example Response

```json
{
  "id": "agt_customer_support_001",
  "name": "Customer Support Agent",
  "description": "AI agent specialized in handling customer support inquiries using company documentation", 
  "tools": {
    "available": [
      {
        "id": "tol_knowledge_search",
        "argument_bindings": {
          "max_results": 10,
          "corpus_filter": "support_docs"
        }
      },
      {
        "id": "tol_ticket_creator"
      }
    ],
    "mode": "native"
  },
  "model": {
    "name": "gpt-4",
    "parameters": {
      "temperature": 0.1,
      "max_tokens": 1500
    }
  },
  "first_step": {
    "type": "conversational",
    "instructions": [
      {
        "type": "reference",
        "id": "ins_customer_support_init", 
        "version": 2
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
}
```

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
| 409 | `agent_name_exists` | Agent name already exists in the account |
| 429 | `rate_limit_exceeded` | Agent creation rate limit exceeded |