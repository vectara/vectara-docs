---
id: get-tool-server
title: Get Tool Server API Definition
sidebar_label: Get Tool Server
---

import CodePanel from '@site/src/theme/CodePanel';

The Get Tool Server API enables you to retrieve detailed information 
about a specific Model Context Protocol (MCP) server registered in your 
Vectara account. This API provides complete visibility into server 
configuration, connection details, and metadata, supporting troubleshooting, 
monitoring, and configuration management workflows.

Development teams use this API to verify server configurations, debug 
connectivity issues, audit security settings, and retrieve server details 
for documentation or integration planning.

## Get Tool Server Request and Response

To get tool server details, send a GET request to `/v2/tool_servers/{tool_server_id}`. 
You specify the following parameter:

- `tool_server_id` (string, required): Tool server identifier in the URL path 
  following pattern `tsr_[0-9a-zA-Z_-]+$`

The response includes the complete tool server configuration including 
connection details, metadata, and timestamps.

### Example Request

<CodePanel
  title="Example request"
  snippets={[
    {
      language: 'http',
      code: `GET /v2/tool_servers/tsr_crm_integration`
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
    "contact": "platform-team@company.com",
    "last_sync": "2024-01-15T14:30:00Z",
    "tool_count": 12
  },
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T14:45:00Z"
}`
    }]}  
  layout="stacked"
/>

## Error Responses

The API returns standard HTTP error codes with detailed error information:

| HTTP Code | Error Code | Description |
|-----------|------------|-------------|
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for accessing this tool server |
| 404 | `server_not_found` | Tool server with the specified ID does not exist |
| 429 | `rate_limit_exceeded` | Request rate limit exceeded |
