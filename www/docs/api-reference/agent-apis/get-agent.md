---
id: get-agent
title: Get Agent API Definition
sidebar_label: Get Agent API Definition
---

# Get Agent API Definition

The Get Agent API enables you to retrieve the complete configuration and operational details of a specific AI agent, providing comprehensive visibility into agent capabilities, tool integrations, behavioral instructions, and metadata. This API is essential for agent debugging, configuration auditing, and understanding agent behavior during development and production operations.

Development teams and administrators use this API to inspect agent configurations before creating sessions, troubleshoot agent behavior issues, clone agent configurations for new deployments, and maintain documentation of agent capabilities across their enterprise AI infrastructure.

## Get Agent Request and Response

To retrieve an agent, send a GET request to `/v2/agents/{agent_key}`. You specify the following parameter in the URL path:

- `agent_key` (string, required): Unique agent identifier following the pattern `agt_[0-9a-zA-Z_-]+$`

The response includes the complete agent configuration with all tools, instructions, model parameters, and metadata as originally configured during agent creation or subsequent updates.

### Example Request

```
GET /v2/agents/agt_customer_support_001
```

### Example Response

```json
{
  "id": "agt_customer_support_001",
  "name": "Customer Support Agent",
  "description": "AI agent specialized in handling customer support inquiries using company documentation and support tools",
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
      },
      {
        "id": "tol_crm_lookup",
        "argument_bindings": {
          "timeout": 30
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
      },
      {
        "type": "inline",
        "name": "Session Context",
        "template_type": "velocity",
        "template": "Current session priority: ${session.priority}. Handle accordingly."
      }
    ],
    "output_parser": {
      "type": "default"
    }
  },
  "metadata": {
    "department": "customer_service",
    "version": "1.0.0",
    "owner": "support-team",
    "cost_center": "customer_operations"
  },
  "enabled": true,
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-16T14:45:00Z"
}
```

## Error Responses

The API returns standard HTTP error codes with detailed error information:

| HTTP Code | Error Code | Description |
|-----------|------------|-------------|
| 400 | `invalid_request` | Invalid `agent_key` format or malformed request |
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for accessing this agent |
| 404 | `agent_not_found` | Agent with the specified ID does not exist |
| 429 | `rate_limit_exceeded` | Request rate limit exceeded |