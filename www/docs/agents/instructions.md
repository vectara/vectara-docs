---
id: instructions
title: Instructions
sidebar_label: Instructions
---

import CodePanel from '@site/src/theme/CodePanel';

Instructions serve as reusable blocks of system prompt logic. They guide the 
reasoning and behavior of an agent by setting expectations, prompts, 
and providing the rules for the underlying Large Language Model (LLM).

Instructions use the [Apache Velocity](https://velocity.apache.org/) templating 
engine, which enables you to dynamically insert variables into your prompts. 
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
execution, such as the results from tool calls. This allows you to create 
dynamic and responsive instructions. For this version, agent and session 
context are not included in the template scope.
