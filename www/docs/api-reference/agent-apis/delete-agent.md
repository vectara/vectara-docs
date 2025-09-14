---
id: delete-agent
title: Delete Agent API Definition
sidebar_label: Delete Agent
---

# Delete Agent API Definition

The Delete Agent API enables you to permanently remove an AI agent and its configuration from the Vectara platform, supporting agent lifecycle management and resource cleanup in enterprise environments. This API enforces safety constraints by preventing deletion of agents with active sessions, ensuring that ongoing conversations are not disrupted by administrative actions.

Organizations use this API for decommissioning outdated agents, cleaning up development and testing environments, removing agents that are no longer needed, and maintaining organized agent inventories as their AI deployments evolve. The permanent nature of deletion makes this API critical for environments where data governance and resource management are essential.

## Delete Agent Request and Response

To delete an agent, send a DELETE request to `/v2/agents/{agent_id}`. You specify the following parameter in the URL path:

- `agent_id` (string, required): Unique agent identifier following the pattern `agt_[0-9a-zA-Z_-]+$`

The response returns HTTP status 204 (No Content) on successful deletion with no response body, or an error response if the deletion cannot be completed due to active sessions or other constraints.

### Example Request

```
DELETE /v2/agents/agt_customer_support_001
```

### Example Response

```
HTTP/1.1 204 No Content
```

## Error Responses

The API returns standard HTTP error codes with detailed error information:

| HTTP Code | Error Code | Description |
|-----------|------------|-------------|
| 400 | `invalid_request` | Invalid agent_id format or malformed request |
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for deleting this agent |
| 404 | `agent_not_found` | Agent with the specified ID does not exist |
| 409 | `agent_in_use` | Cannot delete agent with active sessions |
| 429 | `rate_limit_exceeded` | Request rate limit exceeded |