---
id: sessions
title: Sessions
sidebar_label: Sessions
---

import CodePanel from '@site/src/theme/CodePanel';

A session is a contextual container for a conversation between a user (or 
application) and an agent. It provides continuity across multiple 
interactions. Key properties include:

* A session ID and human-readable name
* Associated agent ID
* Optional description to clarify session context ("Order Issue Support")
* Metadata such as end_user_id, application_id, priority, or channel
* enabled flag to denote active/inactive status
* Timestamps for creation and last update

Sessions support lifecycle operations such as creation, update, retrieval, 
listing, and deletion.

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
     "id": "ase_12345",
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