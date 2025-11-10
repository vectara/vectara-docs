---
id: get-agent-event
title: Get Agent Event API Definition
sidebar_label: Get Agent Event
---

The Get Agent Event API enables you to retrieve detailed information about a 
specific interaction event within an agent session, providing comprehensive 
visibility into individual steps of agent processing, tool executions, or 
user inputs. 

Use this API to inspect specific events during troubleshooting, analyze tool 
execution results for optimization, verify agent reasoning patterns, and extract 
detailed information about individual interactions for performance analysis and 
conversation quality assessment.

## Get Agent Event Request and Response

To retrieve an agent event, send a GET request to 
`/v2/agents/{agent_key}/sessions/{session_id}/events/{event_id}`. You specify 
the following parameters in the URL path:

- `agent_key` (string, required): Agent identifier following the pattern `agt_[0-9a-zA-Z_-]+$`
- `session_key` (string, required): Session identifier following the pattern `ase_[0-9a-zA-Z_-]+$`
- `event_id` (string, required): Event identifier following the pattern `aev_[0-9a-zA-Z_-]+$`

The response includes the complete event details with all associated data, 
including event type, content, timestamps, and any tool-specific information 
depending on the event type.

### Example Request

```
GET /v2/agents/agt_customer_support/sessions/ase_customer_support_001/events/aev_tool_output_001
```

### Example Response

```json
{
  "id": "aev_tool_output_001",
  "session_id": "ase_customer_support_001",
  "type": "tool_output",
  "tool_call_id": "call_knowledge_search_001",
  "tool_configuration_name": "knowledge_search",
  "tool_name": "knowledge_base_search",
  "tool_output": {
    "results": [
      {
        "title": "Widget Configuration Wizard Troubleshooting",
        "content": "Step 3 failures are commonly caused by insufficient permissions or network connectivity issues. Ensure you're running the installer as an administrator and check that your firewall allows connections to widget-api.company.com on port 443.",
        "relevance_score": 0.92,
        "document_id": "doc_troubleshooting_001"
      },
      {
        "title": "Common Installation Errors",
        "content": "If the configuration wizard fails, try temporarily disabling antivirus software during installation and ensure you have at least 2GB of free disk space.",
        "relevance_score": 0.87,
        "document_id": "doc_installation_errors_001"
      }
    ],
    "query_used": "widget installation configuration wizard step 3 failure error",
    "total_results": 15,
    "search_time_ms": 245
  },
  "created_at": "2024-01-15T10:35:03Z"
}
```

## Error Responses

The API returns standard HTTP error codes with detailed error information:

| HTTP Code | Error Code | Description |
|-----------|------------|-------------|
| 400 | `invalid_request` | Invalid `agent_key`, `session_key`, or event_id format |
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for accessing this event |
| 404 | `agent_not_found` | Agent with the specified `agent_key` does not exist |
| 404 | `session_not_found` | Session with the specified ID does not exist |
| 404 | `event_not_found` | Event with the specified ID does not exist |
| 429 | `rate_limit_exceeded` | Request rate limit exceeded |
