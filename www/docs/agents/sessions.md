---
id: sessions
title: Sessions
sidebar_label: Sessions
---

import CodePanel from '@site/src/theme/CodePanel';

Agents keep track of their conversations with sessions. One conversation is 
one session. To begin chatting with an agent, you need to create a session 
first. Each message sent by the user and each response from the agent is 
appended to the session.

* A session key and human-readable name (`ase_12345`). If not provided, Vectara 
  generates one automatically based on the name.
* Associated `agent_key` (`agt_abcd`).
* Metadata such as end_user_id, application_id, priority, or channel.
* Timestamps for creation and last update.

Sessions support lifecycle operations such as creation, update, retrieval, 
listing, and deletion.

## Chat with your agent

After creating an agent, you can interact with it by creating a session and sending messages:

### 1. Create a session

Sessions provide conversation context and are required for all agent interactions:

<CodePanel
  title="Create a session"
  snippets={[
    {
      language: 'bash',
      code: `POST /v2/agents/&#123;agent_key&#125;/sessions`
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

### 2. Send messages to the agent

Once you have a session, send messages using the events endpoint:

<CodePanel
  title="Send a message"
  snippets={[
    {
      language: 'bash',
      code: `POST /v2/agents/&#123;agent_key&#125;/sessions/&#123;session_key&#125;/events`
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
      "metadata_filter": "doc.access_level = '$&#123;session.metadata.user_role&#125;'"
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

## Working with artifacts in sessions

Sessions provide a workspace where agents can access and process files uploaded
by users or generated by tools. These files are stored as **artifacts** —
lightweight references that enable efficient file handling without bloating the
agent's context.

### Uploading files to a session

To make files available to an agent, upload them to the session workspace using
a multipart request. Files are stored as artifacts and can be referenced
throughout the conversation.

<CodePanel
  title="Upload files to session"
  snippets={[
    {
      language: 'bash',
      code: `curl -X POST https://api.vectara.io/v2/agents/{agent_key}/sessions/{session_key}/upload \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@report.pdf" \\
  -F "file=@analysis.docx"`
    }
  ]}
  annotations={{
    bash: [
      { line: 1, text: 'Upload endpoint for session artifacts' },
      { line: 3, text: 'Attach first file' },
      { line: 4, text: 'Attach additional files in same request' }
    ]
  }}
  layout="stacked"
/>

The response contains an `ArtifactUploadEvent` with references to all uploaded
files. This event becomes part of the session history, making the agent aware
of the available files:

<CodePanel
  title="Artifact upload event"
  snippets={[
    {
      language: 'json',
      code: `{
  "id": "aev_upload_x8j2",
  "session_key": "ase_analysis_session",
  "type": "artifact_upload",
  "artifacts": [
    {
      "artifact_id": "art_report_a9k3",
      "filename": "report.pdf",
      "mime_type": "application/pdf",
      "size_bytes": 1048576
    },
    {
      "artifact_id": "art_analysis_b2m5",
      "filename": "analysis.docx",
      "mime_type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "size_bytes": 524288
    }
  ],
  "created_at": "2025-10-31T15:45:00Z"
}`
    }
  ]}
  annotations={{
    json: [
      { line: 4, text: 'Event type for artifact uploads' },
      { line: 5, text: 'Array of artifact references' },
      { line: 7, text: 'Unique identifier for referencing the artifact' },
      { line: 8, text: 'Original filename preserved' }
    ]
  }}
  layout="stacked"
/>

### How agents use artifacts

After files are uploaded as artifacts, the agent can:
- Use document conversion tools to extract content from PDFs, Word documents,
  or PowerPoint files
- Reference artifacts in analysis or question-answering workflows
- Pass artifacts to indexing tools to add content to corpora
- Create new artifacts as outputs of tool operations

Artifacts remain available throughout the session lifecycle, enabling multi-step
workflows without re-uploading files.

:::tip Learn more
For comprehensive details about artifacts, their lifecycle, and common workflows,
see [**Artifacts**](/docs/agents/artifacts).
:::

