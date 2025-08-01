---
id: create-agent-session
title: Create Agent Session API Definition
sidebar_label: Create Agent Session API Definition
---

# Create Agent Session API Definition

The Create Agent Session API enables you to initialize a new conversational session between users and AI agents, establishing the contextual container required for stateful, multi-turn interactions. This API is fundamental to deploying conversational AI experiences that maintain memory, track interaction history, and provide continuity across extended dialogues with enterprise users.

Organizations use this API to create customer support sessions, internal process automation workflows, business intelligence conversations, and technical assistance interactions where context preservation and session-based tracking are essential for delivering personalized and effective AI-powered experiences.

## Create Agent Session Request and Response

To create an agent session, send a POST request to `/v2/agents/{agent_id}/sessions`. You specify the following parameters:

- `agent_id` (string, required): Agent identifier in the URL path following pattern `agt_[0-9a-zA-Z_-]+$`
- `description` (string, optional): Human-readable session description or context
- `metadata` (object, optional): Arbitrary key-value pairs for session tracking and organization
- `enabled` (boolean, optional): Whether session should be active upon creation (defaults to `true`)

The response includes the complete session configuration with system-generated fields including the unique session ID, associated agent ID, and creation timestamp.

### Example Request

```json
{
  "description": "Customer support session for billing inquiry regarding account charges",
  "metadata": {
    "customer_id": "customer_12345",
    "customer_email": "customer@example.com",
    "priority": "high",
    "channel": "web_chat",
    "issue_category": "billing"
  },
  "enabled": true
}
```

### Example Response

```json
{
  "id": "ase_customer_support_001",
  "agent_id": "agt_customer_support",
  "description": "Customer support session for billing inquiry regarding account charges",
  "metadata": {
    "customer_id": "customer_12345",
    "customer_email": "customer@example.com",
    "priority": "high",
    "channel": "web_chat",
    "issue_category": "billing"
  },
  "enabled": true,
  "created_at": "2024-01-15T10:30:00Z"
}
```

## Error Responses

The API returns standard HTTP error codes with detailed error information:

| HTTP Code | Error Code | Description |
|-----------|------------|-------------|
| 400 | `invalid_request` | Missing required fields or malformed request structure |
| 400 | `invalid_metadata` | Metadata format or content is invalid |
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for creating sessions with this agent |
| 404 | `agent_not_found` | Agent with the specified ID does not exist |
| 409 | `session_limit_exceeded` | Maximum sessions per agent exceeded |
| 429 | `rate_limit_exceeded` | Session creation rate limit exceeded |