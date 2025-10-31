---
id: list-tool-servers
title: List Tool Servers API Definition
sidebar_label: List Tool Servers
---

import CodePanel from '@site/src/theme/CodePanel';

The List Tool Servers API enables you to retrieve and browse all 
registered Model Context Protocol (MCP) servers in your Vectara account. 
This API provides visibility into the complete ecosystem of tool servers 
that expose enterprise capabilities to AI agents, facilitating server 
management, monitoring, and troubleshooting.

Use this API to audit registered integrations, monitor server health and 
status, plan tool availability for agent configurations, and maintain an 
inventory of connected enterprise systems.

## List Tool Servers Request and Response

To list tool servers, send a GET request to `/v2/tool_servers`. 
You can optionally specify the following query parameters:

- `filter` (string, optional): A regular expression against tool server 
  names and descriptions to filter results.
- `type` (string, optional): Filter by server type (allowed value: `mcp`).
- `enabled` (boolean, optional): Filter servers by enabled status.
- `limit` (integer, optional): Maximum number of servers to return per page 
  (1-100, defaults to 10).
- `page_key` (string, optional): Pagination token from previous response to 
  retrieve next page.

The response includes an array of tool server configurations with complete 
metadata and pagination information.

### Example Request

<CodePanel
  title="Example request"
  snippets={[
    {
      language: 'http',
      code: `GET /v2/tool_servers?type=mcp&enabled=true&limit=20`
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
  "tool_servers": [
    {
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
        "department": "engineering"
      },
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T14:45:00Z"
    },
    {
      "id": "tsr_analytics_platform",
      "name": "Analytics Platform MCP Server",
      "type": "mcp",
      "description": "Exposes business intelligence queries and report generation capabilities",
      "uri": "https://analytics.company.com/mcp/sse",
      "transport": "sse",
      "headers": {
        "Accept": "text/event-stream"
      },
      "enabled": true,
      "metadata": {
        "version": "2.1",
        "department": "data-science"
      },
      "created_at": "2024-01-10T09:15:00Z",
      "updated_at": "2024-01-14T16:30:00Z"
    }
  ],
  "metadata": {
    "page_key": "eyJjcmVhdGVkX2F0IjoiMjAyNC0wMS0xMFQwOToxNTowMFoiLCJpZCI6InRzcl9hbmFseXRpY3NfcGxhdGZvcm0ifQ=="
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
| 403 | `forbidden` | Insufficient permissions for listing tool servers |
| 429 | `rate_limit_exceeded` | Request rate limit exceeded |
| 500 | `internal_error` | Internal server error during retrieval |