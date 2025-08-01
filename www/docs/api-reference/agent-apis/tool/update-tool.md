---
id: update-tool
title: Update Tool API Definition
sidebar_label: Update Tool API Definition
---

# Update Tool API Definition

The Update Tool API enables you to modify tool metadata and configuration settings for tools discovered from Model Context Protocol (MCP) compliant tool servers, including categorization, tagging, operational status, and local overrides while maintaining synchronization with the source tool server. This API supports customization of tool presentation and behavior within the Vectara platform.

Organizations use this API to customize tool categorization for improved organization and discovery, override tool descriptions with business-specific context, configure tool availability and operational settings, and maintain localized tool metadata that enhances agent development workflows while preserving core tool functionality from enterprise systems.

## Update Tool Request and Response

To update a tool, send a PATCH request to `/v2/tools/{tool_id}`. You specify the tool identifier in the URL path and include only the fields you want to modify in the request body:

- `tool_id` (string, required): Unique tool identifier in the URL path following pattern `tool_[a-zA-Z0-9_-]+$`
- `description` (string, optional): Updated tool description for enhanced context and documentation
- `category` (string, optional): Updated tool category for improved organization and discovery
- `tags` (array, optional): Updated array of tags for tool classification and filtering
- `enabled` (boolean, optional): Updated enabled status to control tool availability
- `metadata` (object, optional): Updated custom metadata for tool management and organization

The response includes the complete updated tool configuration with modified fields and updated timestamp, while preserving core tool definition and input schema from the source tool server.

### Example Request

```json
{
  "description": "Enhanced customer lookup with advanced search capabilities, comprehensive account analytics, and compliance-aware data handling for customer service and sales teams",
  "category": "customer_operations", 
  "tags": ["crm", "customer_data", "search", "analytics", "gdpr_compliant"],
  "metadata": {
    "business_unit": "customer_success",
    "compliance_reviewed": true,
    "training_required": false,
    "usage_guidelines": "Always obtain customer consent before accessing detailed account information",
    "escalation_required": false
  },
  "enabled": true
}
```

### Example Response

```json
{
  "id": "tool_customer_lookup_crm001",
  "name": "customer_lookup",
  "description": "Enhanced customer lookup with advanced search capabilities, comprehensive account analytics, and compliance-aware data handling for customer service and sales teams",
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
      "include_history": {
        "type": "boolean",
        "default": false,
        "description": "Include complete transaction and interaction history"
      }
    },
    "anyOf": [
      {"required": ["customer_id"]},
      {"required": ["email"]}
    ]
  },
  "category": "customer_operations",
  "tags": ["crm", "customer_data", "search", "analytics", "gdpr_compliant"],
  "metadata": {
    "business_unit": "customer_success",
    "compliance_reviewed": true,
    "training_required": false,
    "usage_guidelines": "Always obtain customer consent before accessing detailed account information",
    "escalation_required": false
  },
  "enabled": true,
  "last_synced": "2024-01-15T14:30:00Z",
  "created_at": "2024-01-10T10:30:00Z",
  "updated_at": "2024-01-20T16:45:00Z"
}
```

## Error Responses

The API returns standard HTTP error codes with detailed error information:

| HTTP Code | Error Code | Description |
|-----------|------------|-------------|
| 400 | `invalid_request` | Missing required fields or malformed request structure |
| 400 | `invalid_category` | Category value is not supported or invalid |
| 400 | `invalid_tags` | Tags array contains invalid values or exceeds limits |
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for updating this tool |
| 404 | `tool_not_found` | Tool with the specified ID does not exist |
| 429 | `rate_limit_exceeded` | Request rate limit exceeded |
| 500 | `tool_update_failed` | Internal error during tool update operation |