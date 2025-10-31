---
id: create-agent-event
title: Interact with an Agent API Definition
sidebar_label: Interact with an Agent
---

import CodePanel from '@site/src/theme/CodePanel';

The Interact with an Agent API enables you to chat with an agent.

When you send an input to an agent, it triggers agent processing, 
reasoning, tool execution, and response generation within the context 
of an agent session.

## Interact with an Agent Request and Response

To interact with an agent, send a POST request to 
`/v2/agents/{agent_key}/sessions/{session_key}/events`. You specify the following parameters:

- `agent_key` (string, required): Agent identifier in the URL path following pattern `[0-9a-zA-Z_-]+$`
- `session_key` (string, required): Session identifier in the URL path following pattern `[0-9a-zA-Z_-]+$`
- Request body parameters:
  - `type` (string, required): Event type (must be `input_message`)
  - `messages` (array, required): List of input message objects
    - `type` (string, required): Message type (must be `text`)
    - `content` (string, required): Text content of the user input
  - `stream_response` (boolean, optional): Enable streaming response delivery via Server-Sent Events (defaults to `false`)

The response format depends on the `stream_response` parameter:
- When `false`: Returns an `AgentResponse` with complete list of events
- When `true`: Returns Server-Sent Events stream with individual `AgentStreamedResponse` events

### Example Request

<CodePanel
  title="Example request"
  snippets={[
    {
      language: 'json',
      code: `POST /v2/agents/customer_support/sessions/support_session_12345/events

{
  "type": "input_message",
  "messages": [
    {
      "type": "text",
      "content": "I'm having trouble with my widget installation. The configuration wizard keeps failing at step 3."
    }
  ],
  "stream_response": false
}`
    }]}  
  layout="stacked"
/>

### Example Response (Non-streaming)

<CodePanel
  title="Example response"
  snippets={[
    {
      language: 'json',
      code: `{
  "events": [
    {
      "id": "aev_user_input_001",
      "session_key": "support_session_12345",
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
      "session_key": "support_session_12345",
      "type": "thinking",
      "content": "The user is experiencing issues with widget installation, specifically at step 3 of the configuration wizard. I should check our knowledge base for common step 3 issues and also look up their account to see if there are any specific configuration requirements.",
      "created_at": "2024-01-15T10:35:01Z"
    },
    {
      "id": "aev_tool_input_001",
      "session_key": "support_session_12345",
      "type": "tool_input",
      "tool_call_id": "call_knowledge_search_001",
      "tool_configuration": "customer_search",
      "tool_name": "corpora_search",
      "tool_input": {
        "query": "widget installation configuration wizard step 3 failure error"
      },
      "created_at": "2024-01-15T10:35:02Z"
    },
    {
      "id": "aev_tool_output_001",
      "session_key": "support_session_12345",
      "type": "tool_output",
      "tool_call_id": "call_knowledge_search_001",
      "tool_configuration_name": "customer_search",
      "tool_name": "corpora_search",
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
      "session_key": "support_session_12345",
      "type": "agent_output",
      "content": "I can help you troubleshoot the widget installation issue at step 3. Based on our support documentation, step 3 failures are commonly caused by insufficient permissions or network connectivity issues. Could you try running the installer as administrator and ensure your firewall allows connections to widget-api.company.com on port 443?",
      "created_at": "2024-01-15T10:35:04Z"
    }
  ],
  "session_key": "support_session_12345"
}`
    }]}  
  layout="stacked"
/>

### Example Streaming Response

<CodePanel
  title="Example streaming response"
  snippets={[
    {
      language: 'bash',
      code: `data: {"type": "streaming_thinking", "content": "The user is experiencing issues"}
data: {"type": "streaming_thinking", "content": " with widget installation"}
data: {"type": "streaming_thinking_end"}
data: {"type": "tool_input", "id": "aev_tool_input_001", "session_key": "support_session_12345", "tool_call_id": "call_001", "tool_key": "customer_search", "tool_name": "corpora_search", "tool_input": {"query": "widget installation step 3"}, "created_at": "2024-01-15T10:35:02Z"}
data: {"type": "tool_output", "id": "aev_tool_output_001", "session_key": "support_session_12345", "tool_call_id": "call_001", "tool_key": "customer_search", "tool_name": "corpora_search", "tool_output": {"results": [...]}, "created_at": "2024-01-15T10:35:03Z"}
data: {"type": "streaming_agent_output", "content": "I can help you troubleshoot"}
data: {"type": "streaming_agent_output", "content": " the widget installation issue"}
data: {"type": "streaming_agent_output_end"}
data: {"type": "end"}`
    }]}  
  layout="stacked"
/>

## Event Types

The following event types may appear in responses:

- `input_message`: User input message
- `thinking`: Agent reasoning/chain-of-thought
- `tool_input`: Tool execution request
- `tool_output`: Tool execution result
- `agent_output`: Final agent response
- `context_limit_exceeded`: Token limit exceeded notification

For streaming responses, additional event types include:
- `streaming_thinking`: Progressive thinking content
- `streaming_thinking_end`: End of thinking stream
- `streaming_agent_output`: Progressive agent output
- `streaming_agent_output_end`: End of output stream
- `error`: Stream error
- `end`: Stream completion

### Artifacts in Agent Workspaces

Each agent session includes its own workspace that stores uploaded and 
generated files, known as **artifacts**.

Artifacts persist for the session’s duration and enable the agent to reuse 
files across multiple steps in a workflow.

For example, a user might upload a PDF for analysis, and the agent can 
convert, summarize, and index that same file without requiring reupload. 
Artifacts remain session-bound for privacy and are deleted automatically 
when the session expires.

## Error Responses

The API returns standard HTTP error codes with detailed error information:

| HTTP Code | Error Code | Description |
|-----------|------------|-------------|
| 400 | `invalid_request` | Missing required fields or malformed request structure |
| 400 | `invalid_message_content` | Message content is empty or exceeds length limit |
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for creating events in this session |
| 404 | `agent_not_found` | Agent with the specified key does not exist |
| 404 | `session_not_found` | Session with the specified key does not exist |
| 429 | `rate_limit_exceeded` | Event creation rate limit exceeded |
| 500 | `agent_processing_failed` | Internal error during agent processing |
