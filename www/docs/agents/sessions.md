---
id: sessions
title: Sessions
sidebar_label: Sessions
---

import CodePanel from '@site/src/theme/CodePanel';

Agents keep track of their conversations with sessions. One conversation is
one session. To begin chatting with an agent, you need to create a session
first. Each message sent by the user and each response from the agent is
appended to the session. Sessions also provide a workspace for artifacts,
allowing agents to work with uploaded documents and images throughout the
conversation.

## Chat with your agent

After creating an agent, you can interact with it by creating a session and 
sending messages. Sessions provide conversation context and are required for 
all agent interactions.

### Create a session (UI)

1. Log into the [Vectara Console(https://console.vectara.com/console/home)].
2. Navigate to the [Agents](https://console.vectara.com/console/agents/list) page.
3. Select an agent from the list.  
   The agent opens the **Preview** tab. 
   ![Create agent session](/img/create-agent-session.png)
4. Chat with the agent in the **Preview** tab.
5. Upload [***artifacts**](/docs/agents/artifacts) to the session, and chat about these artifacts 
   with your agent.  
   You can configure and fine tune the agent through the **Settings** tab.

### Create a session (API)

1. Send a `POST` request to the sessions endpoint.
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
      "name": "Customer support session",
      "description": "Help with password reset"
      }`
        }
      ]}
      annotations={{
        json: [
          { line: 2, text: 'Session name for identification and tracking' },
          { line: 3, text: 'Optional description of session purpose and context' }
        ]
      }}
      layout="stacked"
    />
2. Once you have a session, send messages using the events endpoint:
    <CodePanel
      title="Send a message"
      snippets={[
        {
          language: 'bash',
          code: `POST /v2/agents/{agent_key}/sessions/{session_key}/events`
        },
        {
          language: 'json',
          code: `{
      "type": "input_message",
      "messages": [{
        "type": "text",
        "content": "I forgot my password. Can you help?"
      }]
     }`
        }
      ]}
      annotations={{
        json: [
          { line: 2, text: 'Event type must be "input_message" for user input' },
          { line: 3, text: 'Array containing one or more message objects' },
          { line: 4, text: 'Message type "text" for plain text content' },
          { line: 5, text: 'User message content to send to the agent' }
        ]
      }}
      layout="stacked"
    />

The agent will respond with events including its reasoning, tool usage, and
final response.

You can also upload files (documents and images) to the session workspace using
multipart requests. See [Artifacts](/docs/agents/artifacts) for details on working
with files in agent sessions.

## Define session context with session metadata

Let's say you want to make the agent aware of the user's preferred language, 
so that it can respond in that language. Or imagine you want to tell the agent 
that the user is only permitted access to a specific type of data. You can do 
all this with session metadata. Session metadata enables you to inject 
arbitrary information into the session context, which your instructions and 
tools can refer to.

Session metadata provides context-specific data to agents, enabling
personalization, security controls, and dynamic behavior. This key-value 
data attaches to a session and becomes accessible as follows:

- **Agent instructions** (Velocity templates) using `${session.metadata.field}` syntax
- **Tool configurations** (argument overrides) using `{"$ref": "session.metadata.field"}` syntax


Here's how you might implement the language preference and access control examples.

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
      "user_role": "premium",
      "language": "en",
    }
  }'`
    }
  ]}
  annotations={{
    bash: [
      { line: 7, text: 'Metadata object with arbitrary key-value pairs' },
      { line: 8, text: 'User role identifier' },
      { line: 9, text: 'Language preference' },
    ]
  }}
  layout="stacked"
/>

Then you'd write an instruction like this, to respond in the preferred
language.

<CodePanel
  title="Instruction referencing session metadata"
  snippets={[
    {
      language: 'json',
      code: `{
  "type": "inline",
  "name": "Language preference",
  "template": "Always respond to the user in their preferred language: $&#123;session.metadata.language&#125;. If the language is 'en', use English. If it's 'es', use Spanish. If it's 'fr', use French."
}`
    }
  ]}
  annotations={{
    json: [
      { line: 2, text: 'Inline instruction type' },
      { line: 3, text: 'Descriptive name for the instruction' },
      { line: 4, text: 'Velocity template referencing session.metadata.language' }
    ]
  }}
  layout="stacked"
/>

And you'd configure a corpora search tool like this, to limit the user's
access to certain corpora.

<CodePanel
  title="Tool with metadata-based access control"
  snippets={[
    {
      language: 'json',
      code: `{
  "knowledge_search": {
    "type": "corpora_search",
    "argument_override": {
      "metadata_filter": "doc.access_level = '\${session.metadata.user_role}'"
    },
    "query_configuration": {
      "search": {
        "corpora": [
          {
            "corpus_key": "company-docs"
          }
        ]
      }
    }
  }
}`
    }
  ]}
  annotations={{
    json: [
      { line: 2, text: 'Named tool configuration for knowledge base search' },
      { line: 3, text: 'Tool type for searching Vectara corpora' },
      { line: 4, text: 'Override arguments that the LLM cannot change' },
      { line: 5, text: 'Metadata filter referencing session.metadata.user_role' },
      { line: 7, text: 'Query configuration for search behavior' },
      { line: 11, text: 'Corpus to search with access control applied' }
    ]
  }}
  layout="stacked"
/>
