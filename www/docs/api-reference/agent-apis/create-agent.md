---
id: create-agent
title: Create Agent API Definition
sidebar_label: Create Agent API Definition
---

import CodePanel from '@site/src/theme/CodePanel';

The Create Agent API enables you to define and deploy intelligent AI agents within 
the Vectara platform that can orchestrate complex workflows, execute tool-based 
actions, and maintain conversational context across multi-turn interactions. 
This API supports the creation of autonomous digital workers that combine 
retrieval-augmented generation with external system integration through the Model Context Protocol (MCP).

By configuring agents with specific tools, behavioral instructions, and model 
parameters, enterprises can deploy specialized agents for customer support, 
business intelligence, workflow automation, and technical assistance scenarios. 
These agents operate as configurable, decision-making entities that can reason 
through problems, coordinate multiple tools, and adapt their responses based on 
conversation context and available capabilities.

## Create Agent Request and Response

To create an agent, send a POST request to `/v2/agents`. You specify the following parameters in the request body:

- `key` (string, optional): A user provided key that uniquely identifies this agent. If not provided, one will be auto-generated based on the agent name. Pattern: `[0-9a-zA-Z_-]+$`
- `name` (string, required): The human-readable name of the agent
- `description` (string, optional): Detailed description of agent purpose and capabilities
- `tools` (object, required): A map of tools available to the agent where:
  - Key: tool_id following pattern `tol_.*`
  - Value: AgentToolConfiguration object with:
    - `type` (string, required): Tool configuration type (`mcp`, `corpora_search`, or `web_search`)
    - `argument_override` (object, optional): Optional hardcoded arguments for tool calls
    - `query_configuration` (object, required for corpora_search): User-configurable settings for corpus search
- `model` (object, required): Model configuration for agent reasoning
  - `name` (string, required): Model name (e.g., `gpt-4`)
  - `parameters` (object, optional): Model-specific parameters like temperature and max_tokens
- `first_step` (object, required): Initial execution step configuration
  - `type` (string, required): Step type (must be `conversational`)
  - `instructions` (array, required): List of instruction objects
    - Reference instructions:
      - `type` (string, required): Must be `reference`
      - `id` (string, required): Instruction identifier following pattern `ins_[0-9a-zA-Z_-]+$`
      - `version` (integer, optional): Specific instruction version
    - Inline instructions:
      - `type` (string, required): Must be `inline`
      - `name` (string, required): Human-readable instruction name
      - `template_type` (string, optional): Must be `velocity` (default)
      - `template` (string, required): Instruction template content
      - `description` (string, optional): Instruction description
  - `output_parser` (object, required): Output parser configuration
    - `type` (string, required): Parser type (must be `default`)
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
  "tools": {
    "tol_customer_search": {
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
    "tol_web_search": {
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
        "template": "Always be polite and professional. Today's date is currentDate.",
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
  "tools": {
    "tol_customer_search": {
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
    "tol_web_search": {
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
        "template": "Always be polite and professional. Today's date is currentDate.",
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
