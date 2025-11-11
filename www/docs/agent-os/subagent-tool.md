---
id: subagent-tool
title: Subagents
sidebar_label: Subagents
---

import CodePanel from '@site/src/theme/CodePanel';

As a single agent handles increasingly complex workflows, some tasks require 
multi-step reasoning that goes beyond a single tool call. For example, an 
agent that summarizes documentation may need to also perform code reviews and 
generate diverse output types. Managing these separate workflows within a 
single context leads to confusion and hallucinations.

Subagents enable your agents to delegate specialized tasks to other agents 
that work autonomously. Think of them as expert consultants that your main 
agent can call upon for more nuanced work. These specialized subagents 
maintain their own context and conversation history, allowing them to handle intricate workflows independently before returning results to the parent agent.

Subagents provide the following:

- **Delegate tasks** to specialized agents with their own tools and instructions.
- **Separate context** so that subagents maintain independent conversation history.
- **Execute autonomously** to handle complex, multi-step tasks without parent
  agent intervention.
- **Manage sessions** as configurable time-to-idle for persistent or one-time
  sessions.
- **Return complete** and processed results to the parent agent.

:::note
After creating specialized agents, you can configure parent agents to invoke
them through inline sub-agent tool configurations. You reference the agent by
  its key and configure session behavior.
:::

## Create a subagent

To create a subagent, review the prerequisites, configure the tool, and
use the Create Subagent API to enable agents to initialize specialized sub-agents for complex 
tasks.


## Configure a subagent

Subagents are configured inline when creating or updating an agent. They
reference an existing agent to invoke as a sub-agent.

<CodePanel
  title="Code review subagent"
  layout="stacked"
  snippets={[
    {
      language: "curl",
      code: `curl -X POST https://api.vectara.io/v2/agents \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
  "type": "sub_agent",
  "name": "code_review_tool",
  "title": "Code Review Sub-agent",
  "description": "Specialized sub-agent for performing security-focused code reviews",
  "enabled": true,
  "input_schema": {
    "type": "object",
    "properties": {
      "agent_key": {
        "type": "string",
        "description": "The key identifier of the sub-agent to invoke"
      },
      "prompt": {
        "type": "string",
        "description": "The detailed task instructions for the sub-agent"
      },
      "session_key": {
        "type": "string",
        "description": "The session key to use or resume"
      },
      "session_tti_minutes": {
        "type": "integer",
        "description": "Time to idle in minutes before the session expires"
      }
    },
    "required": ["agent_key", "prompt"]
   }
}'`
    }
  ]}
/>
