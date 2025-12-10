---
id: instructions
title: Instructions
sidebar_label: Instructions
---

import CodePanel from '@site/src/theme/CodePanel';

An agent's behavior is defined by the instructions you provide. The agent uses
these instructions alongside information from a conversation session to
determine how to respond to user input, including which tools to use.

This section provides information about creating instructions, velocity 
templates, and some metadata pattern examples.

:::tip Note
Instructions in Vectara are referred to as **system prompts** in other LLM APIs
(such as Gemini, Mistral, and OpenAI). If you are familiar with _system prompts_
terminology, instructions serve a similar purpose. Instructions define the
role, behavior, and guidelines of an agent before any user interaction begins.
:::

## Writing good instructions

To write good instructions, specify **exactly** what you want the agent to do. 
* Use CAPS for emphasis, if you want the agent to follow a specific format.
* Use negative prompts like **DO NOT DO _this_ or _that_**, if you want the 
  agent to avoid any thing.

Agents can also use multiple instructions together that process in order. See 
the [Create Instruction API](/docs/rest-api/create-instruction) for more details.

## Inline vs reference instructions

When creating or configuring agents, you can use instructions in two ways:

* **Create new** instructions in the agent configuration directly:
  <CodePanel
      title="Inline Instruction in Agent"
      layout="stacked"
      snippets={[
        {
          language: "json",
          code: `{
      "first_step": {
        "type": "conversational",
        "instructions": [
          {
            "type": "inline",
            "name": "Task-Specific Behavior",
            "template_type": "velocity",
            "template": "For this specific task, prioritize speed over completeness. Provide quick, actionable answers."
          }
        ],
        "output_parser": {
          "type": "default"
        }
      }
    }`
        }
      ]}
    />
* Reference an **existing instruction** by name and version:
  <CodePanel
      title="Reference Instruction in Agent"
      layout="stacked"
      snippets={[
        {
          language: "json",
          code: `{
      "first_step": {
        "type": "conversational",
        "instructions": [
          {
            "type": "reference",
            "name": "Customer Support Tone and Style Guide",
            "version": 1
          }
        ],
        "output_parser": {
          "type": "default"
        }
      }
    }`
        }
      ]}
    />

## Create dynamic instructions with Velocity templates

Instructions use the [Apache Velocity](https://velocity.apache.org/engine/1.7/user-guide.html) templating engine, which 
enables you to dynamically insert variables into your prompts using the 
**tools context** and the **metadata context**.

See the [available prompt variables](/docs/prompts/vectara-prompt-engine#available-prompt-variables) for more information.

### Tools context

`$tools` is a list of tools available to the agent. You can iterate over tools
to display their names and descriptions in your instructions.

<CodePanel
  title="Tools in Template"
  layout="stacked"
  snippets={[
    {
      language: "velocity",
      code: `You have access to the following tools:
#foreach($tool in $tools)
  - \${tool.name}: \${tool.description}
#end

Use these tools to help answer user questions. Always search your knowledge base before using web search.`
    }
  ]}
/>

This dynamically lists all available tools when the agent is initialized.

### Metadata context

Instructions can access metadata from both sessions and agents, enabling
personalized and context-aware behavior:

- `${session.metadata.field}` - Access session-specific metadata (user context, permissions, preferences)
- `${agent.metadata.field}` - Access agent-level metadata (version, configuration, environment)
- `${currentDate}` - Current date/time in ISO 8601 format

<CodePanel
  title="Session Metadata in Template"
  layout="stacked"
  snippets={[
    {
      language: "velocity",
      code: `Hello! I see you're \${session.metadata.user_name} from \${session.metadata.region}.

I'm here to help you with \${session.metadata.department} inquiries.

#if(\${session.metadata.subscription_tier} == "enterprise")
As an enterprise customer, you have access to priority support and advanced features.
#end

Your support tier: \${session.metadata.support_tier}
Preferred language: \${session.metadata.language}`
    }
  ]}
/>

When a session is created with this metadata:

<CodePanel
  title="Session Metadata"
  layout="stacked"
  snippets={[
    {
      language: "json",
      code: `{
  "metadata": {
    "user_name": "Jane Smith",
    "region": "EMEA",
    "department": "billing",
    "subscription_tier": "enterprise",
    "support_tier": "priority",
    "language": "en"
  }
}`
    }
  ]}
/>

The instruction renders as:

> "Hello! I see you're Jane Smith from EMEA. I'm here to help you with billing inquiries. As an enterprise customer, you have access to priority support and advanced features. Your support tier: priority. Preferred language: en"

