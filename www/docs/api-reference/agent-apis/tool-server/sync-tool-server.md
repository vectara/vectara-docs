---
id: sync-tool-server
title: Sync Tool Server API Definition
sidebar_label: Sync Tool Server API Definition
---

import CodePanel from '@site/src/theme/CodePanel';

The Sync Tool Server API enables you to trigger synchronization of a registered MCP server to discover and update its available tools. This API ensures that the Vectara platform maintains an accurate, up-to-date catalog of tools exposed by each server, automatically reflecting any changes in tool availability, schemas, or metadata.

Synchronization is essential after server deployment changes, tool additions or modifications, server configuration updates, or as part of regular maintenance to ensure tool discovery remains current.

## Sync Tool Server Request and Response

To synchronize a tool server, send a POST request to `/v2/tool_servers/{tool_server_id}/sync`. You specify the following parameter:

- `tool_server_id` (string, required): Tool server identifier in the URL path following pattern `tsr_[0-9a-zA-Z_-]+$`

The request body should be empty. The API returns a 204 No Content response on successful synchronization.

### Example Request

<CodePanel
  title="Example request"
  snippets={[
    {
      language: 'http',
      code: `POST /v2/tool_servers/tsr_crm_integration/sync`
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

## Synchronization Process

When you trigger a sync:
1. The platform connects to the tool server using configured authentication
2. Discovers all available tools through the MCP protocol
3. Updates tool definitions, schemas, and metadata in the platform
4. Marks newly discovered tools as available for agent configuration
5. Preserves any tool-specific settings (like enabled/disabled status)

## Error Responses

The API returns standard HTTP error codes with detailed error information:

| HTTP Code | Error Code | Description |
|-----------|------------|-------------|
| 400 | `sync_failed` | Unable to connect to or sync with the tool server |
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for synchronizing this tool server |
| 404 | `server_not_found` | Tool server with the specified ID does not exist |
| 409 | `sync_in_progress` | Another sync operation is already in progress |
| 429 | `rate_limit_exceeded` | Sync rate limit exceeded |
| 503 | `server_unavailable` | Tool server is not responding or is unavailable |

## Notes

- Synchronization is typically fast but may take longer for servers exposing many tools
- Tools are never deleted during sync; removed tools are marked as unavailable
- Sync operations are atomic - either all tools are updated or none are
- Consider scheduling regular syncs to maintain tool catalog accuracy