---
id: create-tool-server
title: Create Tool Server API Definition
sidebar_label: Create Tool Server
---

import CodePanel from '@site/src/theme/CodePanel';

The Create Tool Server API enables you to register Model Context Protocol 
(MCP) compliant servers that expose tools for use by AI agents. Tool servers 
act as bridges between your enterprise systems and the Vectara platform, 
making capabilities like database queries, API integrations, and custom 
business logic available to agents through a standardized protocol.

## Create Tool Server Request and Response

To create a tool server, send a POST request to `/v2/tool_servers`. You 
specify the following parameters in the request body:

- `name` (string, required): The human-readable name of the tool server.
- `type` (string, required): Must be `mcp` (Model Context Protocol).
- `description` (string, optional): A detailed description of what this tool 
  server provides.
- `uri` (string, required): The URI of the tool server (must be a valid URI).
- `transport` (string, required): Transport protocol, must be `sse` (Server-Sent 
  Events).
- `headers` (object, optional): HTTP headers to include when connecting to the 
  server.
- `auth` (object, optional): Authentication configuration for connecting to the 
  tool server.
  - Various auth types supported (see Authentication documentation).
- `enabled` (boolean, optional): Whether the server is enabled upon creation 
  (defaults to `true`).
- `metadata` (object, optional): Arbitrary metadata for tracking and organization.

The response includes the complete tool server configuration with a system-generated 
ID and timestamps.

### Example Request

<CodePanel
  title="Example request"
  snippets={[
    {
      language: 'json',
      code: `{
  "name": "Enterprise CRM Integration Server",
  "type": "mcp",
  "description": "Provides customer data access and CRM operations through MCP protocol",
  "uri": "https://crm-integration.company.com/mcp/sse",
  "transport": "sse",
  "headers": {
    "X-API-Version": "2.0",
    "Accept": "text/event-stream"
  },
  "auth": {
    "type": "bearer",
    "token": "server_auth_token_here"
  },
  "enabled": true,
  "metadata": {
    "version": "1.0",
    "department": "engineering",
    "contact": "platform-team@company.com"
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
  "description": "Provides customer data access and CRM operations through MCP protocol",
  "uri": "https://crm-integration.company.com/mcp/sse",
  "transport": "sse",
  "headers": {
    "X-API-Version": "2.0",
    "Accept": "text/event-stream"
  },
  "enabled": true,
  "metadata": {
    "version": "1.0",
    "department": "engineering",
    "contact": "platform-team@company.com"
  },
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
| 400 | `invalid_uri` | URI format is invalid or uses unsupported protocol |
| 400 | `invalid_transport` | Transport must be 'sse' |
| 400 | `invalid_type` | Type must be 'mcp' |
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for creating tool servers |
| 409 | `server_exists` | A tool server with this URI already exists |
| 429 | `rate_limit_exceeded` | Tool server creation rate limit exceeded |

## Next Steps

After creating a tool server, you should:
1. Synchronize the server to discover available tools using the [Sync Tool Server API](/docs/api-reference/agent-apis/tool-server/sync-tool-server)
2. Verify tools were discovered using the [List Tools API](/docs/api-reference/agent-apis/tool/list-tools)
3. Configure agents to use the discovered tools