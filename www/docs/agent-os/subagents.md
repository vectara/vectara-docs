---
id: subagents
title: Subagents
sidebar_label: Subagents
---

import CodePanel from '@site/src/theme/CodePanel';

Subagents enable your agent to delegate specialized tasks to other agents 
that work independently and reduce the load and context bloat for the main 
agent. Think of them as isolated domain experts that your parent 
agent can use for specific tasks. Each subagent maintains its own tools, 
instructions, and conversation history that enables subagents to complete 
tasks independently before returning results to the parent agent.

A subagent should have a clear purpose, such as code reviewer, researcher, 
content writer, or data analyst. The parent agent must tell the subagent 
exactly what to do with precise instructions.

## How subagents work

When a parent agent invokes a `sub_agent` tool:
1. The tool creates a new subagent session, or resumes a previous one using a 
   `session_key`.
2. The subagent follows the instructions of the referenced agent (`agent_key`):
   * It processes this request using its own instructions, tools, and 
   memory. It can only access its own tools.
   * The parent cannot access the subagent's tools.
3. The tool returns the `session_key` value and `sub_agent_response`, which is the 
   final output of the subagent.

:::tip Tips
* Subagents always return **only the final response** of the subagent. Activity 
inside the subagent are not returned to the parent. Ensure that you write 
subagent instructions so that the final message is self-contained.
* Subagents operate in isolated workspaces. They do not share memory, history, 
or tool state with the parent unless configured with artifact sharing.
:::

## Configure a subagent

You can configure subagents inline when creating or updating an agent. The 
configuration defines the subagent's `agent_key`, optional session behavior, and 
optional `argument_override`.

`argument_override` lets you hardcode values for the LLM-exposed fields of the 
subagent tool (`message` and `session_tti_minutes`). The LLM cannot modify 
overridden fields or see the values that were supplied.

You can also use dynamic references inside `argument_override`. These values are 
resolved at runtime using `$ref` syntax and can read from:

- `session.metadata.*`
- `agent.metadata.*`

### Subagent session modes

Subagents support three session mode options that control whether the
subagent resumes previous state or starts new work each time.

* `llm_controlled`: (Default) The model decides when to resume a previous session 
  or start a new one.  
  If the LLM provides a `session_key`, the session resumes. If not, a new session 
  starts.
* `persistent`: The subagent always reuses the same session created on first 
  invocation.  
  Use this for agents that build knowledge across multiple invocations, such as 
  research or iterative drafting workflows.
* `ephemeral`: The subagent always starts fresh. Each call creates a new session.  
  Use this when you want strict isolation and do not want state to carry across 
  invocations.

## Invoke a subagent

After configuring a subagent tool, the parent agent can invoke it by passing a 
task message. The `message` field is LLM-exposed and defines the specific task
the subagent must perform.

## Session management

Subagents maintain their own sessions across conversations using a 
`session_key`.

* If the parent agent does not provide a `session_key`, the subagent creates 
  a new session.
* If the parent agent retains the `session_key` of the subagent, it can use 
  that key in subsequent calls and "remember" the previous context.

Subagent sessions are owned by the parent agent. No other agent can access
them. If a parent attempts to resume a session it did not create, the request
is rejected.

## Artifact sharing

Parent agents can share artifacts with subagents. The subagent receives the
artifact in its own workspace with the `artifact_id`.

:::note
The parent must own the artifact before sharing it. If the artifact does not
exist in the parent’s workspace, the system returns an error.
:::

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
          "agent_key": "code-review-agent",
          "session_mode": "llm_controlled"
        }
      }
    ]
  }'`
    }
  ]}
/>
