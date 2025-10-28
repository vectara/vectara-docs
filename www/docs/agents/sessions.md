---
id: sessions
title: Sessions
sidebar_label: Sessions
---

import CodePanel from '@site/src/theme/CodePanel';

A session is a contextual container for a conversation between a user (or 
application) and an agent. It provides continuity across multiple 
interactions. Key properties include:

* A session key and human-readable name (`ase_12345`). If not provided, Vectara 
  generates one automatically based on the name.
* Associated `agent_key` (`agt_abcd`)
* Metadata such as end_user_id, application_id, priority, or channel
* Timestamps for creation and last update

Sessions support lifecycle operations such as creation, update, retrieval, 
listing, and deletion.

## Session keys

Every session has a unique `key` that identifies it in API calls. You have
two options for session keys, **auto-generated** or **custom**:

### Auto-generated keys

If you don't provide a `key` when creating a session, Vectara automatically
generates one based on the session name:

<CodePanel
  title="Create session with auto-generated key"
  snippets={[
    {
      language: 'bash',
      code: `curl -X POST https://api.vectara.io/v2/agents/support-agent/sessions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Customer Support Chat"
  }'

# Response:
# {
#   "key": "customer_support_chat_abc123",
#   "name": "Customer Support Chat",
#   ...
# }`
    }
  ]}
  annotations={{
    bash: [
      { line: 5, text: 'No key provided - Vectara auto-generates one' },
      { line: 10, text: 'Auto-generated key based on name + unique suffix' }
    ]
  }}
  layout="stacked"
/>

### Custom session keys

You can provide your own key to map sessions to your application with these 
requirements:

- **Pattern**: `[0-9a-zA-Z_-]+` (alphanumeric, underscores, hyphens only)
- **Length**: 1-50 characters
- **Uniqueness**: Must be unique per agent

<CodePanel
  title="Create session with custom key"
  snippets={[
    {
      language: 'bash',
      code: `curl -X POST https://api.vectara.io/v2/agents/support-agent/sessions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "key": "user_12345_session_2025_01_15",
    "name": "User 12345 Support Session"
  }'`
    }
  ]}
  annotations={{
    bash: [
      { line: 5, text: 'Custom key for easy cross-referencing with your system' }
    ]
  }}
  layout="stacked"
/>

**Common patterns:**
- User-based: `user_{user_id}_session_{timestamp}`
- Channel-based: `web_chat_{uuid}`
- Transaction-based: `order_{order_id}_support`
- Support ticket: `ticket_{ticket_number}_session`


## Session Metadata

Session metadata provides context-specific data to agents, enabling
personalization, security controls, and dynamic behavior. This key-value 
data attaches to a session and becomes accessible as follows:

- **Agent instructions** (Velocity templates) using `${session.metadata.field}` syntax
- **Tool configurations** (argument overrides) using `{"$ref": "session.metadata.field"}` syntax

Use session metadata such as when you want to limit data access per user (RBAC) 
with `customer_id` or `tenant_id` or personalization like `user_name`, 
`language`, or `region`. It can also help with auditing use cases to log the 
`user_id`, `ip_address`, and `time_stamp`.

### Example session with metadata

<CodePanel
  title="Session with comprehensive metadata"
  snippets={[
    {
      language: 'bash',
      code: `curl -X POST https://api.vectara.io/v2/agents/support-agent/sessions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "key": "user_12345_session",
    "name": "Customer Support Session",
    "metadata": {
      "customer_id": "12345",
      "customer_name": "Acme Corporation",
      "user_role": "premium",
      "region": "EMEA",
      "language": "en",
      "department": "billing",
      "channel": "web_chat",
      "priority": "high"
    }
  }'`
    }
  ]}
  annotations={{
    bash: [
      { line: 7, text: 'Metadata object with arbitrary key-value pairs' },
      { line: 8, text: 'Customer identifier for RBAC filtering' },
      { line: 10, text: 'User tier for conditional agent behavior' },
      { line: 11, text: 'Geographic region for localized responses' },
      { line: 12, text: 'Language preference' },
      { line: 13, text: 'Department for targeted knowledge access' },
      { line: 14, text: 'Communication channel tracking' },
      { line: 15, text: 'Support priority level' }
    ]
  }}
  layout="stacked"
/>


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
Sessions persist conversation history, so subsequent messages in the same session will have context of previous interactions. This enables natural, multi-turn conversations with the agent.
:::
