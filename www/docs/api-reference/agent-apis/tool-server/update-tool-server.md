---
id: update-tool-server
title: Update Tool Server API Definition
sidebar_label: Update Tool Server
---

import CodePanel from '@site/src/theme/CodePanel';

The Update Tool Server API enables you to modify the configuration of 
registered Model Context Protocol (MCP) servers. This API supports 
updating connection parameters, authentication settings, metadata, and 
operational status, allowing you to maintain and evolve your tool server 
integrations without re-registration.

Use this API to update server endpoints after infrastructure changes, rotate 
authentication credentials, enable or disable servers for maintenance, 
update metadata for tracking and governance, and modify connection headers 
or parameters.

## Update Tool Server Request and Response

To update a tool server, send a PATCH request to `/v2/tool_servers/{tool_server_id}`. 
You specify the following parameters:

- `tool_server_id` (string, required): Tool server identifier in the URL path 
  following pattern `tsr_[0-9a-zA-Z_-]+$`.
- Request body parameters (all optional):
  - `name` (string): The human-readable name of the tool server.
  - `description` (string): Updated description of server capabilities.
  - `uri` (string): The URI of the tool server.
  - `headers` (object): HTTP headers to include when connecting.
  - `transport` (string): Transport protocol (must be `sse` if provided).
  - `auth` (object): Updated authentication configuration.
  - `enabled` (boolean): Whether the server should be enabled.
  - `metadata` (object): Updated arbitrary metadata.

The response includes the complete updated tool server configuration.

### Example Request

<CodePanel
  title="Example request"
  snippets={[
    {
      language: 'json',
      code: `PATCH /v2/tool_servers/tsr_crm_integration

{
  "description": "Enhanced CRM integration with customer analytics and advanced search capabilities",
  "headers": {
    "X-API-Version": "2.1",
    "Accept": "text/event-stream",
    "X-Request-ID": "vectara-mcp-client"
  },
  "auth": {
    "type": "bearer",
    "token": "new_auth_token_after_rotation"
  },
  "metadata": {
    "version": "1.1",
    "department": "engineering",
    "contact": "platform-team@company.com",
    "capabilities": ["customer_search", "ticket_management", "analytics"]
  }
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
  "id": "tsr_crm_integration",
  "name": "Enterprise CRM Integration Server",
  "type": "mcp",
  "description": "Enhanced CRM integration with customer analytics and advanced search capabilities",
  "uri": "https://crm-integration.company.com/mcp/sse",
  "transport": "sse",
  "headers": {
    "X-API-Version": "2.1",
    "Accept": "text/event-stream",
    "X-Request-ID": "vectara-mcp-client"
  },
  "enabled": true,
  "metadata": {
    "version": "1.1",
    "department": "engineering",
    "contact": "platform-team@company.com",
    "capabilities": ["customer_search", "ticket_management", "analytics"]
  },
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T16:45:00Z"
}`
    }]}  
  layout="stacked"
/>

## Error Responses

The API returns standard HTTP error codes with detailed error information:

| HTTP Code | Error Code | Description |
|-----------|------------|-------------|
| 400 | `invalid_request` | Invalid parameters or malformed request |
| 400 | `invalid_uri` | New URI format is invalid |
| 400 | `invalid_transport` | Transport must be 'sse' |
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for updating this tool server |
| 404 | `server_not_found` | Tool server with the specified ID does not exist |
| 409 | `uri_conflict` | Another server already uses the specified URI |
| 429 | `rate_limit_exceeded` | Update rate limit exceeded |

