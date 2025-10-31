---
id: delete-tool-server
title: Delete Tool Server API Definition
sidebar_label: Delete Tool Server
---

import CodePanel from '@site/src/theme/CodePanel';

The Delete Tool Server API enables you to permanently remove a Model Context 
Protocol (MCP) server from your Vectara account. This action cascades to all 
associated tools, making them unavailable for agent configuration. This API 
supports lifecycle management, decommissioning of deprecated integrations, 
and cleanup of test or development servers.

This operation is irreversible and should be used with caution, particularly for 
production servers that may be referenced by active agent configurations.

## Delete Tool Server Request and Response

To delete a tool server, send a DELETE request to `/v2/tool_servers/{tool_server_id}`. 
You specify the following parameter:

- `tool_server_id` (string, required): Tool server identifier in the URL path following pattern `tsr_[0-9a-zA-Z_-]+$`

The API returns a 204 No Content response on successful deletion.

### Example Request

<CodePanel
  title="Example request"
  snippets={[
    {
      language: 'http',
      code: `DELETE /v2/tool_servers/tsr_legacy_integration`
    }]}  
  layout="stacked"
/>

### Example Response

<CodePanel
  title="Example response"
  snippets={[
    {
      language: 'http',
      code: `HTTP/1.1 204 No Content`
    }]}  
  layout="stacked"
/>

## Error Responses

The API returns standard HTTP error codes with detailed error information:

| HTTP Code | Error Code | Description |
|-----------|------------|-------------|
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for deleting this tool server |
| 404 | `server_not_found` | Tool server with the specified ID does not exist |
| 409 | `server_in_use` | Cannot delete server with tools in active use |
| 429 | `rate_limit_exceeded` | Delete rate limit exceeded |

