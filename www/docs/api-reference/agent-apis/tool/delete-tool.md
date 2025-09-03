---
id: delete-tool
title: Delete Tool API Definition
sidebar_label: Delete Tool API Definition
---

# Delete Tool API Definition

The Delete Tool API enables you to remove a specific tool from the Vectara platform's tool catalog, supporting tool lifecycle management and cleanup while enforcing safety constraints to prevent deletion of tools currently referenced by active agents. This API ensures that tool removal does not disrupt ongoing agent operations that depend on specific enterprise integrations.

Organizations use this API for removing deprecated or obsolete tools from the catalog, cleaning up development and testing tools that are no longer needed, maintaining organized tool libraries as business requirements evolve, and ensuring proper governance of tool resources while protecting active agent deployments from accidental capability loss.

## Delete Tool Request and Response

To delete a tool, send a DELETE request to `/v2/tools/{tool_id}`. You specify the following parameter in the URL path:

- `tool_id` (string, required): Unique tool identifier following the pattern `tool_[a-zA-Z0-9_-]+$`

The response returns HTTP status 204 (No Content) on successful deletion with no response body, indicating that the tool has been permanently removed from the platform catalog and is no longer available for agent configuration or usage.

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