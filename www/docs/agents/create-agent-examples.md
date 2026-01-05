---
id: create-agent-examples
title: Create agent example
sidebar_label: Create agent example
---

import CodePanel from '@site/src/theme/CodePanel'; 

Let's create an agent with the API.

## Research assistant agent 

This agent completes the following tasks:

* Search the web when users ask questions requiring current information.
* Limit search results to `20` for comprehensive responses.
* Use a lower temperature (`0.3`) for more consistent, factual responses.
* Follow instructions to cite sources and admit uncertainty when appropriate.
* Configure retry logic to handle transient API failures gracefully.

This example requires no corpus setup, making it perfect for immediate testing.


<CodePanel
  title="Complete agent chat example"
  snippets={[
    {
      language: 'bash',
      code: `curl -X POST https://api.vectara.io/v2/agents \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "research-assistant",
    "description": "A research assistant that can search the web for current information",
    "tool_configurations": {
      "web_search": {
        "type": "web_search"
      }
    },
    "first_step": {
      "type": "conversational",
      "instructions": [{
        "type": "inline",
        "name": "Research Assistant",
        "template": "You are a helpful research assistant. When users ask questions, search the web for current and accurate information. Always cite your sources and be honest if you cannot find reliable information."
      }],
      "output_parser": {
        "type": "default"
      }
    },
    "model": {
      "name": "gpt-5",
      "parameters": {
        "temperature": 0.3,
        "max_tokens": 1000
      }
    }
  }' | jq -r '.key')

echo "Agent created with key: $AGENT_KEY"

# 2. Create a session
SESSION_KEY=$(curl -X POST https://api.vectara.io/v2/agents/$AGENT_KEY/sessions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Research session",
    "description": "Testing agent chat"
  }' | jq -r '.key')

echo "Session created with key: $SESSION_KEY"

# 3. Chat with the agent
curl -X POST https://api.vectara.io/v2/agents/$AGENT_KEY/sessions/$SESSION_KEY/events \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "input_message",
    "messages": [{
      "type": "text",
      "content": "What are the main benefits of solar energy for average Texas homes?"
    }]
  }'`
    }
  ]}
  annotations={{
    bash: [
      { line: 1, text: 'Step 1: Create the agent with all configurations' },
      { line: 2, text: 'Capture the agent key for use in next steps' },
      { line: 5, text: 'Unique agent identifier' },
      { line: 6, text: 'Description for documentation' },
      { line: 8, text: 'Enable web search capabilities' },
      { line: 16, text: 'Inline instruction configuration' },
      { line: 17, text: 'Required name for the instruction' },
      { line: 18, text: 'Agent behavior template' },
      { line: 25, text: 'Model selection and parameters' },
      { line: 27, text: 'Lower temperature for accuracy' },
      { line: 30, text: 'Extract key from JSON response' },
      { line: 34, text: 'Step 2: Create a conversation session' },
      { line: 35, text: 'Sessions maintain chat context' },
      { line: 38, text: 'Session configuration' },
      { line: 39, text: 'Descriptive session name' },
      { line: 40, text: 'Optional session description' },
      { line: 41, text: 'Extract session key' },
      { line: 45, text: 'Step 3: Send a message to the agent' },
      { line: 46, text: 'Events endpoint for all interactions' },
      { line: 49, text: 'Event type for user messages' },
      { line: 50, text: 'Messages array (supports multiple)' },
      { line: 52, text: 'Your question to the agent' }
    ]
  }}
  layout="stacked"
/>

## Test your agent with the console UI

1. Navigate to **Agents** in the sidebar and find this **research assistant** agent.
2. In the agent details page, click the **Chat** tab.
3. Try asking quetsions like: `"What are the main benefits of solar energy for average Texas homes?"`
4. You should see the agent search the web and provide a cited response.

### Expected response

The agent acts as follows:
1. Uses web search to find current information.
2. Provides a summary with key points.
3. Includes source citations.
4. Shows tool usage in the response events.

## Response format

The agent responds with events that include:
- `input_message`: Your original message
- `thinking`: The agent's reasoning process (optional)
- `tool_input`/`tool_output`: Web search execution and results
- `agent_output`: The final response with citations.

