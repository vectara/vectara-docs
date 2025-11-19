---
id: subagents
title: Subagents
sidebar_label: Subagents
---

import CodePanel from '@site/src/theme/CodePanel';

Subagents enable your agents to delegate specialized tasks to other agents 
that work autonomously. Think of them as domain experts that your main 
agent can call upon for more nuanced work. These specialized subagents 
maintain their own context and conversation history, enabling them to handle 
workflows independently before returning results to the parent agent.

Subagents have their own tools and instructions, maintain independent 
conversation histories and process results to the parent agent.

## Create a subagent

To create a subagent, configure the tool, and use the Create Subagent API 
to enable agents to initialize specialized sub-agents for complex tasks.


## Configure a subagent

You can configure subagents inline when creating or updating an agent. They
reference an existing agent to invoke as a subagent.

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


## Update existing sub-agent configurations

Over time, you might want to update a sub-agent model as business needs evolve. 
The Update Tool Configuration API lets you update existing sub-agents. 


## Session management

Vectara subagents can maintain a persistent session which enables them to 
remember previous context and maintain conversations using a `session_key`.

The [Create Agent Session API](/docs/rest-api/create-agent-session) lets you create a new session when starting a 
task, reuse an existing session for continuity, and control how long the 
session remains active with `session_tti_minutes` (time-to-idle).
