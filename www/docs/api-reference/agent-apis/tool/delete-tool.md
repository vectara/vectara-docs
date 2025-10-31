---
id: delete-tool
title: Delete Tool API Definition
sidebar_label: Delete Tool
---

The Delete Tool API enables you to remove a specific tool and its associated 
configuration. This cannot be undone. 

Use this API for removing deprecated or obsolete tools from the catalog

## Delete Tool Request and Response

To delete a tool, send a DELETE request to `/v2/tools/{tool_id}`. You specify 
the following parameter in the URL path:

- `tool_id` (string, required): Unique tool identifier following the pattern 
  `tool_[a-zA-Z0-9_-]+$`

The response returns HTTP status 204 (No Content) on successful deletion with 
no response body, indicating that the tool has been permanently removed from 
the platform catalog and is no longer available for agent configuration or usage.

### Example Request

```
DELETE /v2/tools/tool_customer_lookup_crm001
```

### Example Response

```
HTTP/1.1 204 No Content
```

## Error Responses

The API returns standard HTTP error codes with detailed error information:

| HTTP Code | Error Code | Description |
|-----------|------------|-------------|
| 400 | `invalid_request` | Invalid tool_id format or malformed request |
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for deleting this tool |
| 404 | `tool_not_found` | Tool with the specified ID does not exist |
| 409 | `tool_in_use` | Cannot delete tool currently used by active agents |
| 429 | `rate_limit_exceeded` | Request rate limit exceeded |