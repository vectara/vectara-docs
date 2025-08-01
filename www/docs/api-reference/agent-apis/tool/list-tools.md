---
id: list-tools
title: List Tools API Definition
sidebar_label: List Tools API Definition
---

# List Tools API Definition

The List Tools API enables you to retrieve and browse all available tools discovered from registered Model Context Protocol (MCP) compliant tool servers, providing comprehensive visibility into the complete catalog of enterprise capabilities accessible to AI agents. This API facilitates tool discovery, capability planning, and agent configuration by presenting the unified tool ecosystem.

Development teams and administrators use this API to explore available enterprise integrations for agent configuration, audit tool availability across different business systems, support tool selection during agent development workflows, and maintain operational awareness of the complete capability landscape that powers their AI agent infrastructure.

## List Tools Request and Response

To list tools, send a GET request to `/v2/tools`. You can optionally specify the following query parameters:

- `limit` (integer, optional): Maximum number of tools to return per page (defaults to 10, maximum 100)
- `page_key` (string, optional): Pagination token from previous response to retrieve next page of results
- `tool_server_id` (string, optional): Filter tools by specific tool server using pattern `tsr_[0-9a-zA-Z_-]+$`
- `search` (string, optional): Search tools by name or description using partial text matching

The response includes an array of tool definitions with complete metadata including source tool server information, capability descriptions, parameter schemas, and operational details along with pagination information for retrieving additional results.

### Example Request

```
GET /v2/tools?limit=15&tool_server_id=tsr_crm_integration_001
```

### Example Response

```json
{
  "tools": [
    {
      "id": "tool_customer_lookup_crm001",
      "name": "customer_lookup",
      "description": "Search and retrieve customer account information and history with advanced filtering and data export capabilities",
      "tool_server": {
        "id": "tsr_crm_integration_001",
        "name": "Enterprise CRM Integration Server",
        "uri": "https://crm-integration.company.com/mcp"
      },
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
      "category": "customer_management",
      "tags": ["crm", "customer_data", "search"],
      "last_synced": "2024-01-15T14:30:00Z",
      "created_at": "2024-01-10T10:30:00Z",
      "updated_at": "2024-01-15T14:30:00Z"
    },
    {
      "id": "tool_create_support_ticket_crm001",
      "name": "create_support_ticket",
      "description": "Create new customer support tickets with priority assignment, category classification, and automatic routing to appropriate support teams",
      "tool_server": {
        "id": "tsr_crm_integration_001", 
        "name": "Enterprise CRM Integration Server",
        "uri": "https://crm-integration.company.com/mcp"
      },
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
      "category": "customer_support",
      "tags": ["crm", "tickets", "support"],
      "last_synced": "2024-01-15T14:30:00Z",
      "created_at": "2024-01-10T10:30:00Z",
      "updated_at": "2024-01-15T14:30:00Z"
    }
  ],
  "pagination": {
    "limit": 15,
    "total_count": 87,
    "next_page_key": "eyJsYXN0X3N5bmNlZCI6IjIwMjQtMDEtMTVUMTQ6MzA6MDBaIiwiaWQiOiJ0b29sX2NyZWF0ZV9zdXBwb3J0X3RpY2tldF9jcm0wMDEifQ=="
  }
}
```

## Error Responses

The API returns standard HTTP error codes with detailed error information:

| HTTP Code | Error Code | Description |
|-----------|------------|-------------|
| 400 | `invalid_request` | Invalid query parameters or malformed request |
| 400 | `invalid_limit` | Limit parameter exceeds maximum allowed value |
| 400 | `invalid_page_key` | Page key is malformed or expired |
| 400 | `invalid_tool_server_id` | Tool server ID format is invalid |
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for tool operations |
| 429 | `rate_limit_exceeded` | Request rate limit exceeded |
| 500 | `internal_error` | Internal server error during tool retrieval |