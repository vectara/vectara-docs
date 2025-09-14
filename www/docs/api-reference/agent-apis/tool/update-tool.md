---
id: update-tool
title: Update Tool API Definition
sidebar_label: Update Tool
---

import CodePanel from '@site/src/theme/CodePanel';

The Update Tool API enables you to modify the configuration of existing tools discovered from MCP servers. Currently, this API supports enabling or disabling tools, allowing administrators to control tool availability for agent configurations without requiring changes to the underlying MCP server.

This API is essential for managing tool lifecycle, implementing phased rollouts of new capabilities, temporarily disabling problematic tools, and controlling which tools are available in different environments or for different user segments.

## Update Tool Request and Response

To update a tool, send a PATCH request to `/v2/tools/{tool_id}`. You specify the following parameters:

- `tool_id` (string, required): Tool identifier in the URL path following pattern `tol_[0-9a-zA-Z_-]+$`
- Request body parameters:
  - `type` (string, required): Must be `mcp` (only MCP tools can be updated)
  - `enabled` (boolean, required): Whether the tool should be enabled or disabled

The response includes the complete updated tool configuration with all metadata.

### Example Request

<CodePanel
  title="Example request"
  snippets={[
    {
      language: 'json',
      code: `PATCH /v2/tools/tol_customer_lookup_001

{
  "type": "mcp",
  "enabled": false
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
  "type": "mcp",
  "id": "tol_customer_lookup_001",
  "server_id": "tsr_crm_integration",
  "name": "customer_lookup",
  "title": "Customer Lookup Tool",
  "description": "Search and retrieve customer account information and history with advanced filtering and data export capabilities",
  "enabled": false,
  "created_at": "2024-01-10T10:30:00Z",
  "updated_at": "2024-01-15T16:45:00Z",
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
}`
    }]}  
  layout="stacked"
/>

## Error Responses

The API returns standard HTTP error codes with detailed error information:

| HTTP Code | Error Code | Description |
|-----------|------------|-------------|
| 400 | `invalid_request` | Missing required fields or malformed request structure |
| 400 | `invalid_tool_type` | Tool type must be 'mcp' for updates |
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for updating this tool |
| 404 | `tool_not_found` | Tool with the specified ID does not exist |
| 429 | `rate_limit_exceeded` | Update rate limit exceeded |

## Notes

- Only MCP tools can be updated through this API
- Tool metadata like name, description, and input schema are synchronized from the MCP server and cannot be modified directly
- To update tool behavior beyond enabling/disabling, use Tool Configurations instead
- Changes take effect immediately for new agent sessions but do not affect existing active sessions
