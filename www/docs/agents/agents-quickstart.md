---
id: agents-quickstart
title: Agent Quick Start
sidebar_label: Agent Quick Start
---

import CodePanel from '@site/src/theme/CodePanel';

Vectara Agents are AI assistants that can use tools, follow instructions, and 
maintain conversation context. This guide shows you how to create and interact 
with a Vectara agent using the API. We'll walk through the workflow from agent 
creation to having a conversation.

- **Sessions are required**: You cannot chat with an agent directly. You must 
  create a session first.
- **Sessions maintain context**: All messages within a session share 
  conversation history.
- **One agent, many sessions**: Multiple users can have separate conversations with 
  the same agent.
- **Event-based architecture**: All interactions are tracked as events for 
  full auditability.

To chat with an agent:

1. **Create an agent** with tools and instructions
2. **Create a session** to maintain conversation context  
3. **Send messages** through the session to chat with the agent

Let's walk through each step with working examples.

## Step 1: Create an Agent

First, let's create a simple research assistant agent that can search the web:

<CodePanel
  title="Create a research assistant agent"
  snippets={[
    {
      language: 'bash',
      code: `curl -X POST https://api.vectara.io/v2/agents \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "research-assistant",
    "description": "A research assistant that can search the web for current information",
    "tool_configurations": {
      "web_search": {
        "type": "web_search",
        "argument_override": {
          "limit": 5
        }
      }
    },
    "first_step": {
      "type": "conversational",
      "instructions": [{
        "type": "initial",
        "template": "You are a helpful research assistant. When users ask questions, search the web for current and accurate information. Always cite your sources and be honest if you cannot find reliable information."
      }],
      "output_parser": {
        "type": "default"
      }
    },
    "model": {
      "name": "gpt-4",
      "parameters": {
        "temperature": 0.3,
        "max_tokens": 1000
      }
    }
  }'`
    }
  ]}
  annotations={{
    bash: [
      { line: 5, text: 'Unique name for the agent' },
      { line: 7, text: 'Configure web search tool' },
      { line: 10, text: 'Limit search results to 5' },
      { line: 14, text: 'Define agent behavior and personality' },
      { line: 22, text: 'Use GPT-4 model with lower temperature for factual responses' }
    ]
  }}
  layout="stacked"
/>

This creates an agent with the key `research-assistant` (or returns an auto-generated key like `agt_abc123`).

## Step 2: Create a Session

First, create a session to maintain conversation context:

<CodePanel
  title="Create a session"
  snippets={[
    {
      language: 'bash',
      code: `POST /v2/agents/{agent_key}/sessions`
    },
    {
      language: 'json',
      code: `{
  "name": "My first conversation",
  "description": "Testing agent chat functionality"
}`
    }
  ]}
  annotations={{
    json: [
      { line: 2, text: 'Human-readable name for the session' },
      { line: 3, text: 'Optional description of the session purpose' }
    ]
  }}
  layout="stacked"
/>

This returns a session object with a `key` ( `ase_12345`) that you need in 
the next step.

## Step 3: Send Messages to the Agent

Send user input by creating an event in the session:

<CodePanel
  title="Send a message to the agent"
  snippets={[
    {
      language: 'bash',
      code: `POST /v2/agents/{agent_key}/sessions/{session_key}/events`
    },
    {
      language: 'json',
      code: `{
  "type": "input_message",
  "messages": [
    {
      "type": "text",
      "content": "Hello, can you help me with my password reset?"
    }
  ]
}`
    }
  ]}
  annotations={{
    json: [
      { line: 2, text: 'Must be "input_message" for user input' },
      { line: 3, text: 'Array of message objects' },
      { line: 5, text: 'Currently only "text" type is supported' },
      { line: 6, text: 'The actual user message content' }
    ]
  }}
  layout="stacked"
/>

## Complete Example

Here's a complete example using curl:

<CodePanel
  title="Complete agent chat example"
  snippets={[
    {
      language: 'bash',
      code: `# 1. Create an agent (if not already created)
AGENT_KEY=$(curl -X POST https://api.vectara.io/v2/agents \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "support-agent",
    "description": "Customer support assistant"
  }' | jq -r '.key')

# 2. Create a session
SESSION_KEY=$(curl -X POST https://api.vectara.io/v2/agents/$AGENT_KEY/sessions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Customer inquiry session"
  }' | jq -r '.key')

# 3. Chat with the agent
curl -X POST https://api.vectara.io/v2/agents/$AGENT_KEY/sessions/$SESSION_KEY/events \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "input_message",
    "messages": [{
      "type": "text",
      "content": "I need help resetting my password"
    }]
  }'`
    }
  ]}
  layout="stacked"
/>

## Response Format

The agent responds with events that include:
- `input_message`: Your original message
- `thinking`: The agent's reasoning process (optional)
- `tool_input`/`tool_output`: Any tool usage
- `agent_output`: The final response

## Streaming Responses

For real-time responses, add `"stream_response": true`:

<CodePanel
  title="Enable streaming responses"
  snippets={[
    {
      language: 'json',
      code: `{
  "type": "input_message",
  "messages": [{
    "type": "text",
    "content": "Your question here"
  }],
  "stream_response": true
}`
    }
  ]}
  annotations={{
    json: [
      { line: 7, text: 'Enable Server-Sent Events (SSE) for progressive response' }
    ]
  }}
  layout="stacked"
/>

This returns Server-Sent Events (SSE) for progressive response building.
