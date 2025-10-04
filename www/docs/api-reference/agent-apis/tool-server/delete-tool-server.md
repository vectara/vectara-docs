---
id: delete-tool-server
title: Delete Tool Server API Definition
sidebar_label: Delete Tool Server
---

import CodePanel from '@site/src/theme/CodePanel';

The Delete Tool Server API enables you to permanently remove a Model Context Protocol (MCP) server from your Vectara account. This action cascades to all associated tools, making them unavailable for agent configuration. This API supports lifecycle management, decommissioning of deprecated integrations, and cleanup of test or development servers.

This operation is irreversible and should be used with caution, particularly for production servers that may be referenced by active agent configurations.

## Delete Tool Server Request and Response

To delete a tool server, send a DELETE request to `/v2/tool_servers/{tool_server_id}`. You specify the following parameter:

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

## Cascading Effects

When you delete a tool server:
1. The server registration is permanently removed
2. All tools associated with the server become unavailable
3. Agents configured with these tools may experience errors
4. Tool configurations referencing these tools remain but become non-functional
5. Active sessions using these tools continue but cannot invoke the deleted tools

## Error Responses

The API returns standard HTTP error codes with detailed error information:

| HTTP Code | Error Code | Description |
|-----------|------------|-------------|
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for deleting this tool server |
| 404 | `server_not_found` | Tool server with the specified ID does not exist |
| 409 | `server_in_use` | Cannot delete server with tools in active use |
| 429 | `rate_limit_exceeded` | Delete rate limit exceeded |

## Best Practices

- List all tools from the server before deletion to understand impact
- Disable the server first and monitor for issues before deletion
- Update agent configurations to remove references to server tools
- Document the deletion for audit and compliance purposes
- Consider exporting server configuration before deletion for recovery

## Warning

This operation cannot be undone. To restore a deleted server, you must re-register it and re-synchronize all tools. Any tool-specific configurations or customizations will be lost.