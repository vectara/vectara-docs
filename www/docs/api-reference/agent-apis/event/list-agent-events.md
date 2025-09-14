---
id: list-agent-events
title: List Agent Events API Definition
sidebar_label: List Agent Events
---

# List Agent Events API Definition

The List Agent Events API enables you to retrieve a chronological sequence of all interactions and processing activities within a specific agent session, providing complete visibility into conversation flow, agent reasoning, tool executions, and response generation. This API is essential for conversation analysis, debugging agent behavior, and maintaining detailed audit trails of agent interactions.

Organizations use this API to analyze conversation patterns for quality assurance, troubleshoot agent behavior during development, generate conversation transcripts for compliance purposes, and extract interaction data for training and optimization of agent performance across their enterprise AI deployments.

## List Agent Events Request and Response

To list agent events, send a GET request to `/v2/agents/{agent_key}/sessions/{session_key}/events`. You specify the following parameters:

- `agent_key` (string, required): Agent identifier in the URL path following pattern `agt_[0-9a-zA-Z_-]+$`
- `session_key` (string, required): Session identifier in the URL path following pattern `ase_[0-9a-zA-Z_-]+$`
- `limit` (integer, optional): Maximum number of events to return (default: 20, maximum: 100)
- `page_key` (string, optional): Pagination token for retrieving subsequent pages of results

The response includes an array of event objects in chronological order, representing the complete interaction history within the specified session, along with pagination metadata for accessing additional events when available.

### Example Request

```
GET /v2/agents/agt_customer_support/sessions/ase_customer_support_001/events?limit=20
```

### Example Response

```json
{
  "events": [
    {
      "id": "aev_user_input_001",
      "session_key": "ase_customer_support_001",
      "type": "input_message",
      "messages": [
        {
          "type": "text",
          "content": "I'm having trouble with my widget installation."
        }
      ],
      "created_at": "2024-01-15T10:35:00Z"
    },
    {
      "id": "aev_thinking_001",
      "session_key": "ase_customer_support_001",
      "type": "thinking",
      "content": "The user is experiencing installation issues. I should search our knowledge base for troubleshooting steps.",
      "created_at": "2024-01-15T10:35:01Z"
    },
    {
      "id": "aev_tool_input_001",
      "session_key": "ase_customer_support_001",
      "type": "tool_input",
      "tool_call_id": "call_knowledge_search_001",
      "tool_configuration": "knowledge_search",
      "tool_name": "knowledge_base_search",
      "tool_input": {
        "query": "widget installation troubleshooting",
        "max_results": 5
      },
      "created_at": "2024-01-15T10:35:02Z"
    },
    {
      "id": "aev_tool_output_001",
      "session_key": "ase_customer_support_001",
      "type": "tool_output",
      "tool_call_id": "call_knowledge_search_001",
      "tool_configuration": "knowledge_search",
      "tool_name": "knowledge_base_search",
      "tool_output": {
        "results": [
          {
            "title": "Widget Installation Guide",
            "content": "Common troubleshooting steps for widget installation issues."
          }
        ]
      },
      "created_at": "2024-01-15T10:35:03Z"
    },
    {
      "id": "aev_agent_output_001",
      "session_key": "ase_customer_support_001",
      "type": "agent_output",
      "content": "I can help you troubleshoot the widget installation. Let me check our knowledge base for common solutions.",
      "created_at": "2024-01-15T10:35:04Z"
    }
  ],
  "metadata": {
    "page_key": "eyJldmVudF9pZCI6ImFldl9hZ2VudF9vdXRwdXRfMDAxIn0=",
    "total_count": 45
  }
}
```

## Error Responses

The API returns standard HTTP error codes with detailed error information:

| HTTP Code | Error Code | Description |
|-----------|------------|-------------|
| 400 | `invalid_request` | Invalid query parameters or malformed request |
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for accessing events in this session |
| 404 | `agent_not_found` | Agent with the specified `agent_key` does not exist |
| 404 | `session_not_found` | Session with the specified `session_key` does not exist |
| 429 | `rate_limit_exceeded` | Request rate limit exceeded |