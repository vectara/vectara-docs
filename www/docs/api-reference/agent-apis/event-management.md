---
id: event-management
title: Event Management APIs
sidebar_label: Event Management
---

The Event Management APIs handle all interactions within agent sessions. 
Events represent individual messages, tool calls, agent responses, and 
system activities during conversations.

- **Send user messages** to agents within sessions
- **Retrieve conversation events** to view interaction history
- **Stream real-time responses** for dynamic conversation experiences
- **Track event types** including input, thinking, tool usage, and outputs

## Event types
- **Input message**: User messages sent to the agent
- **Thinking**: Agent's internal reasoning and chain-of-thought processes
- **Tool input/output**: When agents use tools like web search or corpora search
- **Agent output**: Final responses from the agent to the user

## Streaming vs. batch
- **Streaming**: Real-time event delivery via Server-Sent Events (SSE)
- **Batch**: Complete response returned after processing finishes
- **Progressive responses**: See agent thinking and tool usage in real-time

## Available endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| [Create Event](/docs/rest-api/create-agent-event) | POST | Send user input or trigger agent responses |
| [List Events](/docs/rest-api/list-agent-events) | GET | Retrieve conversation history for a session |
| [Get Event](/docs/rest-api/get-agent-event) | GET | Get details of a specific event |

## Event structure

### Input Message Event
```json
{
  "type": "input_message",
  "messages": [{
    "type": "text",
    "content": "Your question here"
  }],
  "stream_response": true
}
```

### Response event types
- **thinking**: `{"type": "thinking", "content": "Agent reasoning..."}`
- **tool_input**: `{"type": "tool_input", "tool_name": "web_search", "parameters": {...}}`
- **tool_output**: `{"type": "tool_output", "tool_name": "web_search", "result": {...}}`
- **agent_output**: `{"type": "agent_output", "content": "Final response"}`
