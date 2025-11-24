---
id: subagents
title: Subagents
sidebar_label: Subagents
---

import CodePanel from '@site/src/theme/CodePanel';

Subagents enable your agent to delegate specialized tasks to other agents 
that work autonomously. Think of them as domain experts that your parent  
agent can use for more nuanced work. Each subagent maintains its own tools, 
instructions, and conversation history. This enables subagents to complete 
tasks independently before returning results to the parent agent.

A subagent should have a clear purpose, such as code reviewer, researcher, 
content writer, or data analyst. The parent agent should tell the subagent 
exactly what to do with precise instructions. Because each subagent acts 
independently, this reduces the load and context bloat for the main agent.

## How subagents work

When a parent agent invokes a `sub_agent` tool:
1. The tool creates a new subagent session (or resumes a previous one using a 
   `session_key`).
2. The subagent follows the instructions of the referenced agent (`agent_key`).
3. The subagent processes this request using its own instructions, tools, and 
   memory. The subagent can only access its own tools, and the parent cannot 
   cannot access the subagent's tools.
4. The tool returns the `session_key` value and `sub_agent_response`, which is the 
   final output of the subagent.


## Configure a subagent

You can configure subagents inline when creating or updating an agent which 
includes the `agent_key` and `argument_override`. This override can be the 
`message` (task instructions from the parent agent) and `session_tti_minutes` 
(time-to-idle minutes before a subagent session expires).

### Example: Inline code review subagent

<CodePanel
  title="Inline code review subagent"
  layout="stacked"
  snippets={[
    {
      language: "curl",
      code: `curl -X POST https://api.vectara.io/v2/agents \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "main_agent",
    "description": "Agent that delegates code review to a specialized subagent.",
    "tools": [
      {
        "type": "sub_agent",
        "name": "code_review_tool",
        "description": "Invoke a specialized code review subagent.",
        "argument_override": {
          "session_tti_minutes": 60
        },
        "sub_agent_configuration": {
          "agent_key": "code-review-agent"
        }
      }
    ]
  }'`
    }
  ]}
/>


## Invoke a subagent

After configuring a subagent tool, the parent agent can invoke it by passing a 
task message.

<CodePanel
  title="Invoke a subagent"
  layout="stacked"
  snippets={[
    {
      language: "json",
      code: `{
  "type": "sub_agent",
  "message": "Review the code changes in Pull Request 123f for potential security vulnerabilities."
}`
    }
  ]}
/>

## Session management

Vectara subagents can hold their state across conversations using a 
`session_key`.

* If the parent agent does not provide a `session_key`, the subagent creates 
  a new session.
* If the parent agent retains the `session_key` of the subagent, it can use 
  that key in subsequent calls and "remember" the previous context.

<CodePanel
  title="Continue a subagent session"
  layout="stacked"
  snippets={[
    {
      language: "json",
      code: `{
  "type": "sub_agent",
  "session_key": "subsession_72319",
  "message": "Check whether error handling is consistent across modules."
}`
    }
  ]}
/>

## Subagent patterns

**Single task:** Use when tasks do not require any context to carry over.

<CodePanel
  title="Single task"
  layout="stacked"
  snippets={[
    {
      language: "json",
      code: `{
  "type": "sub_agent",
  "message": "Summarize the attached document for key findings."
}`
    }
  ]}
/>

**Persistent subagent sessions:** When when tasks have multiple steps, such as
  iterative reviews or content generation.

<CodePanel
  title="Persistent subagent sessions"
  layout="stacked"
  snippets={[
    {
      language: "json",
      code: `{
  "type": "sub_agent",
  "session_key": "analysis_session_42",
  "message": "Add details about emerging 2024 research trends."
}`
    }
  ]}
/>

**Multiple specialized subagents:** Assign different subagents for a variety of tasks.

<CodePanel
  title="Multiple specialized subagents"
  layout="stacked"
  snippets={[
    {
      language: "json",
      code: `{
  "tools": [
    {
      "type": "sub_agent",
      "name": "data_analyst",
      "sub_agent_configuration": { "agent_key": "data_analysis_agent" }
    },
    {
      "type": "sub_agent",
      "name": "writer",
      "sub_agent_configuration": { "agent_key": "content_writer_agent" }
    }
   ]
}`
    }
  ]}
/>

