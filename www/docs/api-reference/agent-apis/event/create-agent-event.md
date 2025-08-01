---
id: create-agent-event
title: Create Agent Event API Definition
sidebar_label: Create Agent Event API Definition
---

# Create Agent Event API Definition

The Create Agent Event API enables you to initiate new interactions within agent sessions by submitting user input messages that trigger agent processing, reasoning, tool execution, and response generation. This API serves as the primary interface for conversational interactions and represents the core mechanism through which users communicate with AI agents.

Organizations use this API to power customer support chat interfaces, internal business process interactions, technical assistance conversations, and any application where users need to engage in meaningful dialogue with intelligent agents that can reason, access tools, and provide contextual responses.

## Create Agent Event Request and Response

To create an agent event, send a POST request to `/v2/agents/{agent_id}/sessions/{session_id}/events`. You specify the following parameters:

- `agent_id` (string, required): Agent identifier in the URL path following pattern `agt_[0-9a-zA-Z_-]+$`
- `session_id` (string, required): Session identifier in the URL path following pattern `ase_[0-9a-zA-Z_-]+$`
- `type` (string, required): Event type (must be `input_message`)
- `messages` (array, required): List of input message objects
  - `type` (string, required): Message type (must be `text`)
  - `content` (string, required): Text content of the user input
- `stream_response` (boolean, optional): Enable streaming response delivery (defaults to `false`)

The response includes a complete sequence of events representing the agent's processing workflow, including user input, agent reasoning, tool executions, and final response, or streaming events if `stream_response` is enabled.

### Example Request

```json
{
  "type": "input_message",
  "messages": [
    {
      "type": "text",
      "content": "I'm having trouble with my widget installation. The configuration wizard keeps failing at step 3."
    }
  ],
  "stream_response": false
}
```

### Example Response

```json
[
  {
    "id": "aev_user_input_001",
    "session_id": "ase_customer_support_001",
    "type": "input_message",
    "messages": [
      {
        "type": "text",
        "content": "I'm having trouble with my widget installation. The configuration wizard keeps failing at step 3."
      }
    ],
    "created_at": "2024-01-15T10:35:00Z"
  },
  {
    "id": "aev_thinking_001",
    "session_id": "ase_customer_support_001",
    "type": "thinking",
    "content": "The user is experiencing issues with widget installation, specifically at step 3 of the configuration wizard. I should check our knowledge base for common step 3 issues and also look up their account to see if there are any specific configuration requirements.",
    "created_at": "2024-01-15T10:35:01Z"
  },
  {
    "id": "aev_tool_input_001",
    "session_id": "ase_customer_support_001",
    "type": "tool_input",
    "tool_call_id": "call_knowledge_search_001",
    "tool_key": "knowledge_search",
    "tool_name": "knowledge_base_search",
    "tool_input": {
      "query": "widget installation configuration wizard step 3 failure error",
      "max_results": 5,
      "corpus_filter": "support_docs"
    },
    "created_at": "2024-01-15T10:35:02Z"
  },
  {
    "id": "aev_tool_output_001",
    "session_id": "ase_customer_support_001",
    "type": "tool_output",
    "tool_call_id": "call_knowledge_search_001",
    "tool_key": "knowledge_search",
    "tool_name": "knowledge_base_search",
    "tool_output": {
      "results": [
        {
          "title": "Widget Configuration Wizard Troubleshooting",
          "content": "Step 3 failures are commonly caused by insufficient permissions or network connectivity issues.",
          "relevance_score": 0.92
        }
      ]
    },
    "created_at": "2024-01-15T10:35:03Z"
  },
  {
    "id": "aev_agent_output_001",
    "session_id": "ase_customer_support_001",
    "type": "agent_output",
    "content": "I can help you troubleshoot the widget installation issue at step 3. Based on our support documentation, step 3 failures are commonly caused by insufficient permissions or network connectivity issues. Could you try running the installer as administrator and ensure your firewall allows connections to widget-api.company.com on port 443?",
    "created_at": "2024-01-15T10:35:04Z"
  }
]
```

## Error Responses

The API returns standard HTTP error codes with detailed error information:

| HTTP Code | Error Code | Description |
|-----------|------------|-------------|
| 400 | `invalid_request` | Missing required fields or malformed request structure |
| 400 | `invalid_message_content` | Message content is empty or exceeds length limit |
| 400 | `session_disabled` | Target session is disabled and cannot accept new events |
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for creating events in this session |
| 404 | `agent_not_found` | Agent with the specified ID does not exist |
| 404 | `session_not_found` | Session with the specified ID does not exist |
| 429 | `rate_limit_exceeded` | Event creation rate limit exceeded |
| 500 | `agent_processing_failed` | Internal error during agent processing |