---
id: delete-agent-session
title: Delete Agent Session API Definition
sidebar_label: Delete Agent Session
---

The Delete Agent Session API enables you to permanently remove a 
session and all its associated events and interaction history.


Use this API to comply with data retention policies, clean up test and 
development sessions, remove sensitive conversations upon customer request.

## Delete Agent Session Request and Response

To delete an agent session, send a DELETE request to 
`/v2/agents/{agent_key}/sessions/{session_key}`. You specify the following parameters 
in the URL path:

- `agent_key` (string, required): Agent identifier following the pattern `agt_[0-9a-zA-Z_-]+$`
- `session_key` (string, required): Session identifier following the pattern `ase_[0-9a-zA-Z_-]+$`

The response returns HTTP status 204 (No Content) on successful deletion with 
no response body, indicating that the session and all associated events have 
been permanently removed from the system.

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
| 400 | `invalid_request` | Invalid `agent_key` or `session_key` format |
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for deleting this session |
| 404 | `agent_not_found` | Agent with the specified `agent_key` does not exist |
| 404 | `session_not_found` | Session with the specified `session_key` does not exist |
| 429 | `rate_limit_exceeded` | Request rate limit exceeded |
