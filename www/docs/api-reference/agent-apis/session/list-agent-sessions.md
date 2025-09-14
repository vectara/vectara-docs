---
id: list-agent-sessions
title: List Agent Sessions API Definition
sidebar_label: List Agent Sessions
---

import CodePanel from '@site/src/theme/CodePanel';

# List Agent Sessions API Definition

The List Agent Sessions API enables you to retrieve a paginated collection of conversational sessions associated with a specific AI agent, providing essential visibility into agent usage patterns, active conversations, and session management across your enterprise deployment. This API supports operational monitoring, user analytics, and administrative oversight of agent interactions.

Organizations use this API to monitor customer engagement levels, track support case volumes, analyze conversation patterns for training and optimization, and maintain operational dashboards that provide real-time visibility into their AI agent ecosystem's performance and utilization.

## List Agent Sessions Request and Response

To list agent sessions, send a GET request to `/v2/agents/{agent_key}/sessions`. You specify the following parameters:

- `agent_key` (string, required): Agent identifier in the URL path following pattern `agt_[0-9a-zA-Z_-]+$`
- `limit` (integer, optional): Maximum number of sessions to return (default: 10, maximum: 100)
- `page_key` (string, optional): Pagination token for retrieving subsequent pages of results
- `enabled` (boolean, optional): Filter sessions by their enabled status

The response includes an array of session objects associated with the specified agent and pagination metadata for accessing additional results when available.

### Example Request

```
GET /v2/agents/agt_customer_support/sessions?limit=25&enabled=true
```

### Example Response

<CodePanel
  title="List Agent Sessions Response"
  snippets={[
    {
      language: 'json',
      code: `{
  "sessions": [
    {
      "id": "ase_customer_support_001",
      "agent_key": "agt_customer_support",
      "description": "Customer support session for billing inquiry",
      "metadata": {
        "customer_id": "customer_12345",
        "priority": "high",
        "channel": "web_chat",
        "issue_category": "billing"
      },
      "enabled": true,
      "created_at": "2024-01-15T10:30:00Z"
    },
    {
      "id": "ase_customer_support_002",
      "agent_key": "agt_customer_support",
      "description": "Technical support session for software configuration",
      "metadata": {
        "customer_id": "customer_67890",
        "priority": "medium",
        "channel": "email",
        "issue_category": "technical"
      },
      "enabled": true,
      "created_at": "2024-01-15T11:45:00Z"
    },
    {
      "id": "ase_customer_support_003",
      "agent_key": "agt_customer_support",
      "description": "Product inquiry session for enterprise features",
      "metadata": {
        "customer_id": "customer_54321",
        "priority": "low",
        "channel": "phone",
        "issue_category": "product_inquiry"
      },
      "enabled": false,
      "created_at": "2024-01-15T09:15:00Z"
    }
  ],
  "metadata": {
    "page_key": "eyJzZXNzaW9uX2lkIjoiYXNlX2N1c3RvbWVyX3N1cHBvcnRfMDAzIn0=",
    "total_count": 127
  }
}`
    }]}
  layout="stacked"
/>

## Error Responses

The API returns standard HTTP error codes with detailed error information:

| HTTP Code | Error Code | Description |
|-----------|------------|-------------|
| 400 | `invalid_request` | Invalid query parameters or malformed request |
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for accessing sessions for this agent |
| 404 | `agent_not_found` | Agent with the specified `agent_key` does not exist |
| 429 | `rate_limit_exceeded` | Request rate limit exceeded |