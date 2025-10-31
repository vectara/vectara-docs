---
id: get-tool
title: Get Tool API Definition
sidebar_label: Get Tool
---
The Get Tool API enables you to retrieve the complete definition and 
configuration details of a specific tool.

Use this API to inspect tool definitions during agent development and review 
tool capabilities for agent configuration decisions.

## Get Tool Request and Response

To retrieve a tool, send a GET request to `/v2/tools/{tool_id}`. You specify 
the following parameter in the URL path:

- `tool_id` (string, required): Unique tool identifier following the 
- pattern `tool_[a-zA-Z0-9_-]+$`

The response includes the complete tool definition and all associated 
properties as discovered during tool server synchronization.

### Example Request

```
GET /v2/tools/tool_customer_lookup_crm001
```

### Example Response

```json
{
  "tol_id": "tool_customer_lookup_crm001",
  "name": "customer_lookup",
  "description": "Search and retrieve customer account information and history with advanced filtering capabilities, data export options, and comprehensive account analytics for customer service and sales teams",
  "tool_server": {
    "id": "tsr_crm_integration_001",
    "name": "Enterprise CRM Integration Server",
    "uri": "https://crm-integration.company.com/mcp",
    "type": "mcp",
    "enabled": true
  },
  "input_schema": {
    "type": "object",
    "properties": {
      "customer_id": {
        "type": "string",  
        "pattern": "^cust_[0-9a-zA-Z_-]+$",
        "description": "Unique customer identifier in CRM system"
      },
      "email": {
        "type": "string",
        "format": "email",
        "description": "Customer email address for lookup"
      },
      "phone": {
        "type": "string",
        "pattern": "^\\+?[1-9]\\d{1,14}$",
        "description": "Customer phone number in E.164 format"
      },
      "include_history": {
        "type": "boolean",
        "default": false,
        "description": "Include complete transaction and interaction history"
      },
      "include_analytics": {
        "type": "boolean", 
        "default": false,
        "description": "Include customer analytics and behavioral insights"
      },
      "segment_filter": {
        "type": "array",
        "items": {
          "type": "string",
          "enum": ["enterprise", "mid_market", "small_business", "individual"]
        },
        "description": "Filter results by customer segments"
      },
      "date_range": {
        "type": "object",
        "properties": {
          "start_date": {"type": "string", "format": "date"},
          "end_date": {"type": "string", "format": "date"}
        },
        "description": "Date range for historical data inclusion"
      }
    },
    "anyOf": [
      {"required": ["customer_id"]},
      {"required": ["email"]},
      {"required": ["phone"]}
    ]
  },
  "output_schema": {
    "type": "object",
    "properties": {
      "customer": {
        "type": "object",
        "description": "Complete customer account information"
      },
      "transaction_history": {
        "type": "array",
        "description": "Customer transaction records"
      },
      "analytics": {
        "type": "object", 
        "description": "Customer behavioral analytics and insights"
      }
    }
  },
  "category": "customer_management",
  "tags": ["crm", "customer_data", "search", "analytics"],
  "capabilities": ["search", "filtering", "export", "analytics"],
  "rate_limits": {
    "requests_per_minute": 60,
    "concurrent_requests": 5
  },
  "last_synced": "2024-01-15T14:30:00Z",
  "created_at": "2024-01-10T10:30:00Z", 
  "updated_at": "2024-01-15T14:30:00Z"
}
```

## Error Responses

The API returns standard HTTP error codes with detailed error information:

| HTTP Code | Error Code | Description |
|-----------|------------|-------------|
| 400 | `invalid_request` | Invalid tool_id format or malformed request |
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for accessing this tool |
| 404 | `tool_not_found` | Tool with the specified ID does not exist |
| 429 | `rate_limit_exceeded` | Request rate limit exceeded |