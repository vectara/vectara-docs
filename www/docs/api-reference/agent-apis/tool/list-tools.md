---
id: list-tools
title: List Tools API Definition
sidebar_label: List Tools API Definition
---

import CodePanel from '@site/src/theme/CodePanel';

The List Tools API enables you to retrieve and browse all available tools discovered from registered Model Context Protocol (MCP) compliant tool servers, providing comprehensive visibility into the complete catalog of enterprise capabilities accessible to AI agents. This API facilitates tool discovery, capability planning, and agent configuration by presenting the unified tool ecosystem.

Development teams and administrators use this API to explore available enterprise integrations for agent configuration, audit tool availability across different business systems, support tool selection during agent development workflows, and maintain operational awareness of the complete capability landscape that powers their AI agent infrastructure.

## List Tools Request and Response

To list tools, send a GET request to `/v2/tools`. You can optionally specify the following query parameters:

- `filter` (string, optional): A regular expression against tool names and descriptions to filter the results
- `type` (string, optional): Filter tools by type (allowed value: `mcp`)
- `enabled` (boolean, optional): Filter tools by enabled status
- `limit` (integer, optional): Maximum number of tools to return per page (1-100, defaults to 10)
- `page_key` (string, optional): Pagination token from previous response to retrieve next page of results

The response includes an array of tool definitions with complete metadata including source tool server information, capability descriptions, parameter schemas, and operational details along with pagination information for retrieving additional results.

### Example Request

<CodePanel
  title="Example request"
  snippets={[
    {
      language: 'http',
      code: `GET /v2/tools?limit=15&type=mcp&enabled=true`
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
  "tools": [
    {
      "type": "mcp",
      "id": "tol_customer_lookup_001",
      "server_id": "tsr_crm_integration",
      "name": "customer_lookup",
      "title": "Customer Lookup Tool",
      "description": "Search and retrieve customer account information and history with advanced filtering",
      "enabled": true,
      "created_at": "2024-01-10T10:30:00Z",
      "updated_at": "2024-01-15T14:30:00Z",
      "input_schema": {
        "type": "object",
        "properties": {
          "customer_id": {
            "type": "string",
            "description": "Unique customer identifier"
          },
          "email": {
            "type": "string",
            "format": "email",
            "description": "Customer email address for lookup"
          },
          "include_history": {
            "type": "boolean",
            "default": false,
            "description": "Include transaction and interaction history"
          },
          "segment_filter": {
            "type": "array",
            "items": {"type": "string"},
            "description": "Filter by customer segments"
          }
        },
        "anyOf": [
          {"required": ["customer_id"]},
          {"required": ["email"]}
        ]
      },
      "annotations": {
        "read_only_hint": true,
        "idempotent_hint": true,
        "open_world_hint": true
      }
    },
    {
      "type": "mcp",
      "id": "tol_create_support_ticket_001",
      "server_id": "tsr_crm_integration",
      "name": "create_support_ticket",
      "title": "Create Support Ticket",
      "description": "Create new customer support tickets with priority assignment and routing to...",
      "enabled": true,
      "created_at": "2024-01-10T10:30:00Z",
      "updated_at": "2024-01-15T14:30:00Z",
      "input_schema": {
        "type": "object",
        "properties": {
          "customer_id": {
            "type": "string",
            "description": "Customer identifier for ticket association"
          },
          "title": {
            "type": "string",
            "maxLength": 200,
            "description": "Brief ticket title or summary"
          },
          "description": {
            "type": "string",
            "maxLength": 5000,
            "description": "Detailed issue description"
          },
          "priority": {
            "type": "string",
            "enum": ["low", "medium", "high", "critical"],
            "default": "medium",
            "description": "Ticket priority level"
          },
          "category": {
            "type": "string",
            "enum": ["technical", "billing", "account", "feature_request", "bug_report"],
            "description": "Issue category for routing"
          }
        },
        "required": ["customer_id", "title", "description", "category"]
      },
      "annotations": {
        "destructive_hint": false,
        "idempotent_hint": false,
        "open_world_hint": true
      }
    }
  ],
  "metadata": {
    "page_key": "eyJsYXN0X3..."
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
| 403 | `forbidden` | Insufficient permissions for tool operations |
| 429 | `rate_limit_exceeded` | Request rate limit exceeded |
| 500 | `internal_error` | Internal server error during tool retrieval |
