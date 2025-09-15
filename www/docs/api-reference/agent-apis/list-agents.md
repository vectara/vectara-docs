---
id: list-agents
title: List Agents API Definition
sidebar_label: List Agents
---

import CodePanel from '@site/src/theme/CodePanel';

The List Agents API enables you to retrieve a paginated list of all agents 
available to the authenticated user. This is useful for managing and 
monitoring agent deployments across use cases and environments.

## List Agents Request and Response

To list agents, send a GET request to `/v2/agents`. You can include the following optional query parameters to filter and paginate results:

- `filter` (string, optional): Regular expression pattern to match against agent names and descriptions
- `enabled` (boolean, optional): Filter agents by their enabled status (true for active agents only)
- `limit` (integer, optional): Maximum number of agents to return (default: 10, maximum: 100)
- `page_key` (string, optional): Pagination token for retrieving subsequent pages of results

The response includes an array of agent objects and pagination metadata for accessing additional results when available.

### Example Request

`GET /v2/agents?filter=support.*&enabled=true&limit=25`

### Example Response

<CodePanel
  title="List Agents Response"
  snippets={[
    {
      language: 'json',
      code: `{
  "agents": [
    {
      "id": "agt_customer_support_001",
      "name": "Customer Support Agent",
      "description": "AI agent specialized in handling customer support inquiries",
      "tools": {
        "available": [
          {
            "id": "tol_knowledge_search",
            "argument_bindings": {
              "max_results": 10
            }
          }
        ],
        "mode": "native"
      },
      "model": {
        "name": "gpt-4",
        "parameters": {
          "temperature": 0.1
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
        "department": "customer_service"
      },
      "enabled": true,
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    },
    {
      "id": "agt_technical_support_001", 
      "name": "Technical Support Specialist",
      "description": "Advanced technical support agent with system diagnostic capabilities",
      "tools": {
        "available": [
          {
            "id": "tol_system_diagnostics"
          },
          {
            "id": "tol_log_analyzer",
            "argument_bindings": {
              "max_lines": 1000
            }
          }
        ],
        "mode": "native"
      },
      "model": {
        "name": "gpt-4",
        "parameters": {
          "temperature": 0.05,
          "max_tokens": 2000
        }
      },
      "first_step": {
        "type": "conversational",
        "instructions": [
          {
            "type": "reference",
            "id": "ins_technical_support_init",
            "version": 1
          }
        ],
        "output_parser": {
          "type": "default"
        }
      },
      "metadata": {
        "department": "technical_support",
        "expertise_level": "advanced"
      },
      "enabled": true,
      "created_at": "2024-01-12T09:15:00Z",
      "updated_at": "2024-01-18T14:22:00Z"
    }
  ],
  "metadata": {
    "page_key": "eyJhZ2VudF9pZCI6ImFndF90ZWNobmljYWxfc3VwcG9ydF8wMDEifQ==",
    "total_count": 15
  }
}`
   }]}
  layout="stacked"
/>


## Error Responses

The API returns standard HTTP error codes with detailed error information:

| HTTP Code | Error Code | Description |
|-----------|------------|-------------|
| 400 | `invalid_request` | Invalid query parameters or malformed request |
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for listing agents |
| 429 | `rate_limit_exceeded` | Request rate limit exceeded |