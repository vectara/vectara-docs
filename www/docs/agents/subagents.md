---
id: subagents
title: Sub-agents
sidebar_label: Sub-agents
---

import CodePanel from '@site/src/theme/CodePanel';

The sub-agent tool enables your agent to delegate specialized tasks to other 
agents that work independently and reduce the load and context bloat for the 
main agent. Think of them as isolated domain experts that your parent 
agent can use for specific tasks. Each sub-agent maintains its own tools, 
instructions, and conversation history that enables sub-agents to complete 
tasks independently before returning results to the parent agent.

A sub-agent should have a clear purpose, such as code reviewer, researcher, 
content writer, or data analyst. The parent agent must tell the sub-agent 
exactly what to do with precise instructions.

## How sub-agents work

When a parent agent invokes a `sub_agent` tool:
1. The sub-agent tool creates a new session, or resumes a previous one using a 
   `session_key`.
2. The sub-agent tool calls the referenced agent (identified by `agent_key`) with the input message:
     * The sub-agent processes this request using its own instructions, tools, and memory.
     * The sub-agent can only access its own tools.
     * The parent agent cannot access the sub-agent's tools.
4. The sub-agent tool returns the `session_key` and `sub_agent_response` (the sub-agent's 
   final output) to the parent agent.

:::tip Tips
* The sub-agent tool always returns **only the final response** of the sub-agent. Activity 
inside the sub-agent is not returned to the parent agent. Ensure that you write 
sub-agent instructions so that the final message is self-contained.
* Sub-agents operate in isolated workspaces. They do not share memory, history, 
or tool state with the parent unless configured with artifact sharing.
:::

## Configure a sub-agent tool

You can configure the sub-agent tool inline when creating or updating an agent. 
The configuration defines which agent to invoke (`agent_key`), optional session 
behavior, and optional `argument_override`.

`argument_override` lets you hardcode values for fields exposed to the LLM of the 
sub-agent tool (`message` and `session_tti_minutes`). The LLM cannot modify 
overridden fields or see the values that were supplied.

You can also use dynamic references inside `argument_override`. These values are 
resolved at runtime using `$ref` syntax and can read from:

- `session.metadata.*`
- `agent.metadata.*`

### Session modes

The sub-agent tool supports three session modes that control whether sessions 
are resumed or created fresh each time:

* `llm_controlled`: (Default) The model decides when to resume a previous session 
  or start a new one.  
  If the LLM provides a `session_key`, the session resumes. If not, a new session 
  starts.
* `persistent`: The sub-agent tool always reuses the same session created on first 
  invocation.  
  Use this for agents that build knowledge across multiple invocations, such as 
  research or iterative drafting workflows.
* `ephemeral`: The sub-agent tool always starts fresh. Each call creates a new session.  
  Use this when you want strict isolation and do not want state to carry across 
  invocations.

## Invoke a sub-agent

After configuring a sub-agent tool, the parent agent can invoke it by passing a 
task message. The sub-agent tool then calls the referenced sub-agent with this 
message. The `message` field is exposed to the LLM and defines the specific 
task the sub-agent must perform.

## Session management

The sub-agent tool maintains sessions for sub-agents across invocations using 
a `session_key`.

* If the parent agent does not provide a `session_key`, the sub-agent tool 
  creates a new session.
* If the parent agent retains the `session_key` of the sub-agent, the sub-agent 
  tool resumes that session.

Sub-agent sessions are owned by the parent agent. No other agent can access
them. If a parent attempts to resume a session it did not create, the request
is rejected.

## Artifact sharing

Parent agents can share artifacts with sub-agents through the sub-agent tool. 
The sub-agent tool passes the artifact to the sub-agent's workspace using the 
`artifact_id`.

:::note
The parent must own the artifact before sharing it. If the artifact does not
exist in the parent’s workspace, the system returns an error.
:::

## Sub-agent patterns

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

**Persistent sub-agent sessions:** When when tasks have multiple steps, such as
  iterative reviews or content generation.

<CodePanel
  title="Persistent sub-agent sessions"
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

**Multiple specialized sub-agents:** Assign different sub-agents for a variety of tasks.

<CodePanel
  title="Multiple specialized sub-agents"
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

### Example: Inline code review sub-agent

<CodePanel
  title="Inline code review sub-agent"
  layout="stacked"
  snippets={[
    {
      language: "curl",
      code: `curl -X POST https://api.vectara.io/v2/agents \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "main_agent",
    "description": "Agent that delegates code review to a specialized sub-agent.",
    "tools": [
      {
        "type": "sub_agent",
        "name": "code_review_tool",
        "description": "Invoke a specialized code review sub-agent.",
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
