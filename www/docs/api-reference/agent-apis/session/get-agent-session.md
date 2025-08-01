---
id: get-agent-session
title: Get Agent Session API Definition
sidebar_label: Get Agent Session API Definition
---

# Get Agent Session API Definition

The Get Agent Session API enables you to retrieve detailed information about a specific conversational session, including its configuration, metadata, and current status within an agent's interaction history. This API is essential for session monitoring, conversation analysis, and troubleshooting agent behavior during multi-turn interactions.

Development teams and support administrators use this API to inspect session contexts during debugging, analyze conversation metadata for optimization insights, verify session configurations before event creation, and maintain detailed records of customer interactions for quality assurance and compliance purposes.

## Get Agent Session Request and Response

To retrieve an agent session, send a GET request to `/v2/agents/{agent_id}/sessions/{session_id}`. You specify the following parameters in the URL path:

- `agent_id` (string, required): Agent identifier following the pattern `agt_[0-9a-zA-Z_-]+$`
- `session_id` (string, required): Session identifier following the pattern `ase_[0-9a-zA-Z_-]+$`

The response includes the complete session configuration with all metadata, status information, and timestamps as configured during session creation or subsequent updates.

### Example Request

```
GET /v2/agents/agt_customer_support/sessions/ase_customer_support_001
```

### Example Response

```json
{
  "id": "ase_customer_support_001",
  "agent_id": "agt_customer_support",
  "description": "Customer support session for billing inquiry regarding account charges and payment processing issues",
  "metadata": {
    "customer_id": "customer_12345",
    "customer_email": "customer@example.com",
    "customer_name": "John Smith",
    "priority": "high",
    "channel": "web_chat",
    "issue_category": "billing",
    "sub_category": "payment_processing",
    "assigned_rep": "rep_sarah_001",
    "session_context": "premium_customer",
    "account_type": "enterprise",
    "interaction_count": 8,
    "last_interaction": "2024-01-15T14:22:30Z",
    "resolution_status": "in_progress",
    "escalation_level": "tier_1"
  },
  "enabled": true,
  "created_at": "2024-01-15T10:30:00Z"
}
```

## Error Responses

The API returns standard HTTP error codes with detailed error information:

| HTTP Code | Error Code | Description |
|-----------|------------|-------------|
| 400 | `invalid_request` | Invalid agent_id or session_id format |
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for accessing this session |
| 404 | `agent_not_found` | Agent with the specified ID does not exist |
| 404 | `session_not_found` | Session with the specified ID does not exist |
| 429 | `rate_limit_exceeded` | Request rate limit exceeded |