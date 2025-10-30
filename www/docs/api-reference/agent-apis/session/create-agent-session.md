---
id: create-agent-session
title: Create Agent Session API Definition
sidebar_label: Create Agent Session
---

import CodePanel from '@site/src/theme/CodePanel';

The Create Agent Session API enables you to initialize a new
chat with an agent, establishing the
contextual container required for multi-turn interactions.

Use this API to create customer support sessions,
internal process automation workflows, business intelligence
conversations, and technical assistance interactions where context
preservation and session-based tracking are essential.

## Create Agent Session Request and Response

To create an agent session, send a POST request to
`/v2/agents/{agent_key}/sessions`. You specify the following
parameters:

- `agent_key` (string, required): Agent identifier in the URL path
  following pattern `[0-9a-zA-Z_-]+$`
- Request body parameters:
  - `key` (string, optional): A user provided key that uniquely
    identifies this session. If not provided, one will be
    auto-generated based on the session name. Pattern:
    `[0-9a-zA-Z_-]+$`
  - `name` (string, required): Human-readable name for the session
  - `description` (string, optional): Optional description of the
    session purpose or context
  - `metadata` (object, optional): Arbitrary metadata associated with
    the session for tracking and organization
  - `enabled` (boolean, optional): Whether the session should be
    enabled upon creation (defaults to `true`)

The response includes the complete session configuration with
system-generated fields including the unique session key, associated
agent key, and creation timestamp.

### Example Request

<CodePanel
  title="Example request"
  snippets={[
    {
      language: 'json',
      code: `POST /v2/agents/customer_support/sessions

{
  "key": "support_session_12345",
  "name": "Customer Support Session",
  "description": "Customer support session for billing inquiry regarding account charges",
  "metadata": {
    "customer_id": "customer_12345",
    "customer_email": "customer@example.com",
    "priority": "high",
    "channel": "web_chat",
    "issue_category": "billing"
  },
  "enabled": true
}`
    }]}  
  layout="stacked"
/>

### Example Response

<CodePanel
  title="Example response"
  snippets={[
    {
      language: 'json',
      code: `{
  "key": "support_session_12345",
  "agent_key": "customer_support",
  "name": "Customer Support Session",
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
}`
    }]}  
  layout="stacked"
/>

## Session keys

When issuing API requests to retrieve or chat with a session, you need to 
identify _which_ session you're referring to. You do this with the session's 
`key`, which is assigned when the session is first created. If you don't specify 
the `key` when you create the session, Vectara will automatically generate one 
for you. If you prefer your session keys to convey meaning, you can define 
the `key` as part of the request.


## Agent events

Each session contains one or more events, representing individual interactions 
and system activities within the conversation:

- **Input message events**: User input with text content
- **Thinking events**: Agent reasoning and chain-of-thought processes
- **Tool input/output events**: Tool execution with parameters and results
- **Agent output events**: Final agent responses to user input

Events support both synchronous and streaming delivery, enabling real-time 
conversation experiences with progressive response building.

### Example session and event

<CodePanel
  title="Session and Event Example"
  snippets={[
    {
      language: 'json',
      code: `{
   "session": {
     "key": "ase_12345",
     "name": "Password reset support for user 123",
     "agent_id": "agt_customer_support",
     "metadata": {
       "end_user_id": "user_123"
     }
   },
   "event": {
     "type": "input_message",
     "content": "I need to reset my password."
   }
}`
    }]}
  annotations={{
    json: [
      { line: 3, text: 'The unique ID of the session.' },
      { line: 4, text: 'A human-readable name for the session.' },
      { line: 5, text: 'The ID of the agent that this session is with.' },
      { line: 6, text: 'Metadata associated with the session.' },
      { line: 11, text: 'The event that is occurring in the session.' }
    ]
  }}
  layout="stacked"
/>

### Session workflow example

Here's how to create a session and start chatting with an agent:

<CodePanel
  title="Create session and chat"
  snippets={[
    {
      language: 'bash',
      code: `# Step 1: Create a new session
curl -X POST https://api.vectara.io/v2/agents/agt_customer_support/sessions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Customer inquiry - Order #12345",
    "metadata": {
      "channel": "web",
      "priority": "high"
    }
  }'

# Response includes session key: ase_abc123

# Step 2: Send a message in the session
curl -X POST https://api.vectara.io/v2/agents/agt_customer_support/sessions/ase_abc123/events \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "input_message",
    "messages": [{
      "type": "text",
      "content": "My order #12345 hasn\'t arrived yet"
    }]
  }'`
    }
  ]}
  annotations={{
    bash: [
      { line: 2, text: 'Create a session with the agent' },
      { line: 6, text: 'Descriptive name for the session' },
      { line: 8, text: 'Channel where conversation originates' },
      { line: 9, text: 'Priority level for support routing' },
      { line: 16, text: 'Send message using the session key' },
      { line: 20, text: 'Event type must be input_message' },
      { line: 23, text: 'User message about their issue' }
    ]
  }}
  layout="stacked"
/>

:::tip
Sessions persist conversation history, so subsequent messages in the same 
session will have context of previous interactions. This enables natural, 
multi-turn conversations with the agent.
:::



## Error Responses

The API returns standard HTTP error codes with detailed error
information:

| HTTP Code | Error Code | Description |
|-----------|------------|-------------|
| 400 | `invalid_request` | Missing required fields or malformed request structure |
| 400 | `invalid_metadata` | Metadata format or content is invalid |
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for creating sessions with this agent |
| 404 | `agent_not_found` | Agent with the specified key does not exist |
| 429 | `rate_limit_exceeded` | Session creation rate limit exceeded |
