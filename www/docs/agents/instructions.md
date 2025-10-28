---
id: instructions
title: Instructions
sidebar_label: Instructions
---

import CodePanel from '@site/src/theme/CodePanel';

Instructions define the behavior that agents follow. They are the most important
component to configure when building an agent. Instructions guide how the agent
reasons, responds, and uses tools to accomplish user goals. Instructions use the [Apache Velocity](https://velocity.apache.org/) templating 
engine, which enables you to dynamically insert variables into your prompts. 


- **Define agent behavior**: Set the persona, objectives, response
  style, and decision-making guidelines of the agent.
- **Access session metadata**: Use `${session.metadata.field}` syntax to
  customize instructions based on user role, department, permissions, or any
  other context you provide when creating a session.
- **Guide tool usage**: Tell the agent when and how to use specific tools,
  what information to gather, and how to structure responses.
- **Work with argument overrides**: Instructions guide what the agent does, 
  while tools can use `argument_override` to dynamically filter or customize 
  behavior based on the same session metadata.

:::tip Note
Instructions in Vectara are referred to **system prompts** in other LLM APIs
(such as Gemini, Mistral, and OpenAI). If you are familiar with _system prompts_
terminology, instructions work the same way. Instructions define the role, 
behavior, and guidelines of an agent before any user interaction begins.
:::

You can configure instructions for an agent in two ways: **inline** or 
**shared**.

## Inline Instructions

You define inline instructions when you configure an agent. These instructions 
are specific to that agent and best for situations that do not require reuse.

- **Type**: To specify an inline instruction, set the `type` field to `"inline"`.
- **Lifecycle**: An inline instruction is automatically deleted if the agent it 
  belongs to is deleted.

<CodePanel
  title="Example: Inline Instruction for a Financial Analyst Agent"
  snippets={[
    {
      language: 'json',
      code: `{
  "name": "Financial Analyst Assistant",
  // ... other agent configuration ...
  "first_step": {
    "type": "conversational",
    "instructions": [
      {
        "type": "inline",
        "name": "Financial Summary Rule",
        "template": "You are a financial analyst assistant. When summarizing a report, focus on revenue, profit margins, and year-over-year growth. Present the summary in three bullet points. The current fiscal quarter is $fiscalQuarter.",
        "template_type": "velocity",
        "description": "An inline instruction to guide financial report summarization."
      }
    ],
    // ...
  }
}`
    }]}
  annotations={{
    json: [
      { line: 7, text: 'Set the type to "inline" for an inline instruction.' },
      { line: 9, text: 'The prompt template defines a specific role and output format, and uses a dynamic variable.' }
    ]
  }}
  layout="stacked"
/>

## Shared (Reference) Instructions

You can create shared instructions as independent, versioned entities for reuse 
across multiple agents. This is ideal for standardizing behavior, such as 
enforcing brand voice or defining common workflows.

A shared instruction consists of the following:
* A unique ID (`ins_12345`).
* A `name` and `description`.
* A `prompt` template.
* Optional `metadata` for organization.
* A `version` for tracking updates.

To use a shared instruction, set the `type` field to `"reference"` 
and provide the instruction's unique `id`.

:::note
When you update a shared instruction, this creates a new version of that 
instruction. To use the new version, you must update any agents that 
reference the instruction. If you do not specify a version, the agent uses 
the latest one.
:::

<CodePanel
  title="Example: Shared Instruction"
  snippets={[
    {
      language: 'json',
      code: `{
  "name": "My Agent with a Shared Instruction",
  // ... other agent configuration ...
  "first_step": {
    "type": "conversational",
    "instructions": [
      {
        "type": "reference",
        "id": "ins_customer_support_init",
        "version": 2
      }
    ],
    // ...
  }
}`
    }]}
  annotations={{
    json: [
      { line: 7, text: 'Set the type to "reference" to use a shared instruction.' },
      { line: 8, text: 'The unique ID of the shared instruction to reference.' },
      { line: 9, text: 'Optionally, specify a version of the instruction.' }
    ]
  }}
  layout="stacked"
/>

## Template Context

The Velocity templating engine has access to contextual information during
execution, allowing you to create dynamic and responsive instructions. The
available context variables include:

### Tools context

- `$tools`: A list of tools available to the agent. You can iterate over tools to display their names and descriptions in your instructions.

Example usage in templates:
```velocity
You have access to the following tools:
#foreach($tool in $tools)
  - ${tool.name}: ${tool.description}
#end
```

### Metadata context

Instructions can access metadata from both sessions and agents, enabling
personalized and context-aware behavior:

- `${session.metadata.field}`: Access session-specific metadata (user 
  context, permissions, preferences).
- `${agent.metadata.field}`: Access agent-level metadata (version, 
  configuration, environment).

## Use metadata in instructions

Metadata can provide context to your instructions, enabling personalization,
role-based access control (RBAC), and dynamic behavior based on user or 
session context. 

## Session metadata examples

Consider the following session metadata examples:

### Access Control & Security
- `user_role` (admin, manager, employee):  Filter search results by permission 
  level.
- `tenant_id` (company123):  Isolate data in multi-tenant systems.
- `department` (legal, sales, engineering):  Show only relevant documents.
- `clearance_level` (public, confidential):  Enforce document access policies.
- `data_classification` (internal, external):  Control what information can be 
  shared.

### Personalization
- `language` (en, es, fr):  Respond in user's preferred language.
- `timezone` (America/New_York):  Schedule meetings, show local times.
- `subscription_tier` (free, pro, enterprise):  Enable/disable features.
- `user_preference` (brief, detailed):  Adjust response verbosity.
- `region` (EMEA, APAC, Americas):  Show region-specific content, pricing, 
  compliance.

### Business Context
- `customer_id` (cust_789):  Pull customer-specific orders, support history.
- `account_type` (trial, paid, enterprise):  Customize onboarding experience.
- `industry` (healthcare, finance):  Use industry-specific terminology.
- `product_owned` (basic, premium):  Provide relevant help documentation.
- `contract_type` (annual, monthly, perpetual):  Tailor renewal reminders.

### Workflow & Routing
- `support_tier` (L1, L2, escalated):  Route to appropriate knowledge base.
- `conversation_type` (sales, support, onboarding):  Apply different tones and 
  approaches.
- `agent_purpose` (billing, technical, general):  Focus search on relevant corpora.
- `escalation_needed` (true/false):  Track when to hand off to human.
- `channel` (web, mobile, API, voice):  Adjust response format and length.

### Metadata usage example

```json
"template": "Hello! I see you're ${session.metadata.user_name} from ${session.metadata.region}. I'm here to help you with ${session.metadata.department} inquiries."
```

When a session is created with this metadata:
```json
{
  "metadata": {
    "user_name": "John Doe",
    "region": "NA",
    "department": "billing"
  }
}
```

The instruction renders as:
> "Hello! I see you're John Doe from North America. I'm here to help you with billing inquiries."

### Custom variables

You can define custom variables and pass them when testing instructions using
the Test Instruction API. This enables you to validate how your templates
render with different context values before deploying them in production agents.

:::note Important
For the current version, agent and session metadata are not directly included
in the instruction template scope. However, you can use `argument_override`
with dynamic references (`{"$ref": "session.metadata.field"}`) in tool
configurations to access session and agent metadata during tool execution.
:::
