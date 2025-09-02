---
id: update-agent-session
title: Update Agent Session API Definition
sidebar_label: Update Agent Session API Definition
---

# Update Agent Session API Definition

The Update Agent Session API enables you to modify session metadata, descriptions, and operational status during active conversations, supporting dynamic session management and real-time updates to conversation context. This API is crucial for maintaining accurate session tracking as conversations evolve and business context changes.

Organizations use this API to update customer information as it becomes available, adjust session priority levels based on issue escalation, modify session metadata for better categorization and reporting, and manage session lifecycles by enabling or disabling sessions based on operational requirements.

## Update Agent Session Request and Response

To update an agent session, send a PATCH request to `/v2/agents/{agent_key}/sessions/{session_key}`. You specify the agent and session identifiers in the URL path and include only the fields you want to modify in the request body:

- `agent_key` (string, required): Agent identifier in the URL path following pattern `agt_[0-9a-zA-Z_-]+$`
- `session_key` (string, required): Session identifier in the URL path following pattern `ase_[0-9a-zA-Z_-]+$`
- `description` (string, optional): Updated session description or context
- `metadata` (object, optional): Updated session metadata (replaces existing metadata completely)
- `enabled` (boolean, optional): Updated session enabled status

The response includes the complete updated session configuration reflecting all changes applied during the update operation.

### Example Request

```json
{
  "description": "Escalated billing inquiry requiring management review and account adjustment",
  "metadata": {
    "customer_id": "customer_12345",
    "priority": "urgent",
    "channel": "web_chat",
    "issue_category": "billing",
    "resolution_status": "escalated",
    "escalation_level": "tier_2",
    "escalated_to": "manager_001",
    "escalation_reason": "account_adjustment_required",
    "escalation_timestamp": "2024-01-15T15:30:00Z"
  },
  "enabled": true
}
```

### Example Response

```json
{
  "id": "ase_customer_support_001",
  "agent_key": "agt_customer_support",
  "description": "Escalated billing inquiry requiring management review and account adjustment",
  "metadata": {
    "customer_id": "customer_12345",
    "priority": "urgent",
    "channel": "web_chat",
    "issue_category": "billing",
    "resolution_status": "escalated",
    "escalation_level": "tier_2",
    "escalated_to": "manager_001",
    "escalation_reason": "account_adjustment_required",
    "escalation_timestamp": "2024-01-15T15:30:00Z"
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
| 403 | `forbidden` | Insufficient permissions for updating this session |
| 404 | `agent_not_found` | Agent with the specified ID does not exist |
| 404 | `session_not_found` | Session with the specified ID does not exist |
| 429 | `rate_limit_exceeded` | Request rate limit exceeded |