---
id: delete-agent-session
title: Delete Agent Session API Definition
sidebar_label: Delete Agent Session API Definition
---

# Delete Agent Session API Definition

The Delete Agent Session API enables you to permanently remove a conversational session and all its associated events and interaction history from the Vectara platform. This API supports session lifecycle management, privacy compliance, and resource cleanup by providing controlled deletion capabilities for completed or inactive conversations.

Organizations use this API to comply with data retention policies, clean up test and development sessions, remove sensitive conversations upon customer request, and maintain organized session inventories by removing completed interactions that are no longer needed for operational or analytical purposes.

## Delete Agent Session Request and Response

To delete an agent session, send a DELETE request to `/v2/agents/{agent_id}/sessions/{session_id}`. You specify the following parameters in the URL path:

- `agent_id` (string, required): Agent identifier following the pattern `agt_[0-9a-zA-Z_-]+$`
- `session_id` (string, required): Session identifier following the pattern `ase_[0-9a-zA-Z_-]+$`

The response returns HTTP status 204 (No Content) on successful deletion with no response body, indicating that the session and all associated events have been permanently removed from the system.

### Example Request

```
DELETE /v2/agents/agt_customer_support/sessions/ase_customer_support_001
```

### Example Response

```
HTTP/1.1 204 No Content
```

## Error Responses

The API returns standard HTTP error codes with detailed error information:

| HTTP Code | Error Code | Description |
|-----------|------------|-------------|
| 400 | `invalid_request` | Invalid agent_id or session_id format |
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for deleting this session |
| 404 | `agent_not_found` | Agent with the specified ID does not exist |
| 404 | `session_not_found` | Session with the specified ID does not exist |
| 429 | `rate_limit_exceeded` | Request rate limit exceeded |