---
id: update-agent
title: Update Agent API Definition
sidebar_label: Update Agent API Definition
---

# Update Agent API Definition

The Update Agent API enables you to modify an existing AI agent's configuration, including tool assignments, behavioral instructions, model parameters, and operational metadata. This API supports agile agent development and operational management by allowing incremental updates without requiring complete agent recreation or disrupting existing agent sessions.

Organizations use this API to evolve agent capabilities over time, adding new tools as they become available, refining behavioral instructions based on user feedback, adjusting model parameters for optimal performance, and updating metadata for better organization and governance across their agent ecosystem.

## Update Agent Request and Response

To update an agent, send a PATCH request to `/v2/agents/{agent_id}`. You specify the agent identifier in the URL path and include only the fields you want to modify in the request body:

- `agent_id` (string, required): Unique agent identifier in the URL path following pattern `agt_[0-9a-zA-Z_-]+$`
- `name` (string, optional): Updated human-readable agent name
- `description` (string, optional): Updated description of agent purpose and capabilities
- `tools` (object, optional): Updated tool configuration object
  - `available` (array, required if tools object provided): Complete list of available tools
    - `id` (string, required): Tool identifier following pattern `tol_.*`
    - `argument_bindings` (object, optional): Fixed arguments for tool execution
  - `mode` (string, optional): Tool interaction mode (`native` or `instruction`)
- `model` (object, optional): Updated model configuration
  - `name` (string, required if model object provided): Model name
  - `parameters` (object, optional): Model-specific parameters
- `first_step` (object, optional): Updated execution step configuration
  - `type` (string, required if first_step provided): Step type (must be `conversational`)
  - `instructions` (array, required if first_step provided): Updated list of instruction objects
  - `output_parser` (object, required if first_step provided): Output parser configuration
- `metadata` (object, optional): Updated metadata (replaces existing metadata completely)
- `enabled` (boolean, optional): Updated enabled status

The response includes the complete updated agent configuration with the new `updated_at` timestamp reflecting when the changes were applied.

### Example Request

```json
{
  "name": "Enhanced Customer Support Agent",
  "description": "Updated AI agent with expanded capabilities for customer support",
  "tools": {
    "available": [
      {
        "id": "tol_knowledge_search",
        "argument_bindings": {
          "max_results": 15,
          "corpus_filter": "support_docs,faq_docs"
        }
      },
      {
        "id": "tol_ticket_creator"
      },
      {
        "id": "tol_email_sender",
        "argument_bindings": {
          "template": "support_followup"
        }
      }
    ],
    "mode": "native"
  },
  "metadata": {
    "department": "customer_service",
    "version": "1.1.0",
    "owner": "support-team",
    "last_reviewed": "2024-01-18"
  }
}
```

### Example Response

```json
{
  "id": "agt_customer_support_001",
  "name": "Enhanced Customer Support Agent", 
  "description": "Updated AI agent with expanded capabilities for customer support",
  "tools": {
    "available": [
      {
        "id": "tol_knowledge_search",
        "argument_bindings": {
          "max_results": 15,
          "corpus_filter": "support_docs,faq_docs"
        }
      },
      {
        "id": "tol_ticket_creator"
      },
      {
        "id": "tol_email_sender",
        "argument_bindings": {
          "template": "support_followup"
        }
      }
    ],
    "mode": "native"
  },
  "model": {
    "name": "gpt-4",
    "parameters": {
      "temperature": 0.1,
      "max_tokens": 1500,
      "top_p": 0.9
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
    "version": "1.1.0",
    "owner": "support-team", 
    "last_reviewed": "2024-01-18"
  },
  "enabled": true,
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-18T14:30:00Z"
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
| 403 | `forbidden` | Insufficient permissions for updating this agent |
| 404 | `agent_not_found` | Agent with the specified ID does not exist |
| 409 | `agent_name_exists` | Updated name conflicts with existing agent |
| 429 | `rate_limit_exceeded` | Request rate limit exceeded |