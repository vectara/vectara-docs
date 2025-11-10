---
id: create-instruction
title: Create Instruction API Definition
sidebar_label: Create Instruction
---

import CodePanel from '@site/src/theme/CodePanel'; 

The Create Instruction API enables you to create reusable sets of behaviors to 
tell agents how to reason, respond, and interact with users and tools. 


Organizations use this API to define standardized operational protocols, 
enforce compliance with regulatory requirements, and customize agent behavior 
to align with specific business use cases, such as customer support, financial 
analysis, or internal workflow automation.

## Create Instruction Request and Response

To create an instruction, send a POST request to `/v2/instructions`. You 
specify the following parameters in the request body:

- `name` (string, required): A human-readable name for the instruction.
- `description` (string, optional): A detailed description of the instruction's purpose and intended use.
- `template` (string, required): The instruction content in Apache Velocity Template Language, which allows for dynamic variable substitution.
- `enabled` (boolean, optional): Whether the instruction should be enabled upon creation (defaults to `true`).
- `metadata` (object, optional): Arbitrary metadata for tracking, versioning, or categorization.

The response includes the full definition of the newly created instruction, 
including system-generated fields such as `id`, `version`, `created_at`, and 
`updated_at`.

### Example Request

<CodePanel
  title="Example create instruction request"
  snippets={[
    {
      language: 'json',
      code: `POST /v2/instructions

{
   "name": "Customer Support Tone and Style Guide",
   "description": "Ensures that the agent responds to customer inquiries with a helpful, friendly, and professional tone.",
   "template": "You are a customer support agent. Always be polite and empathetic. Address the customer by their name. Do not use technical jargon.",
   "enabled": true,
   "metadata": {
     "owner": "customer-support-team",
     "version": "1.0.0"
   }
}`
    }]}
  layout="stacked"
/>

### Example Response

<CodePanel
  title="Example create instruction response"
  snippets={[
    {
      language: 'json',
      code: `{
   "id": "ins_12345",
   "name": "Customer Support Tone and Style Guide",
   "description": "Ensures that the agent responds to customer inquiries with a helpful, friendly, and professional tone.",
   "template": "You are a customer support agent. Always be polite and empathetic. Address the customer by their name. Do not use technical jargon.",
   "enabled": true,
   "version": 1,
   "metadata": {
     "owner": "customer-support-team",
     "version": "1.0.0"
   },
   "created_at": "2024-01-15T10:30:00Z",
   "updated_at": "2024-01-15T10:30:00Z"
}`
    }]}
  layout="stacked"
/>

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



## Error Responses

The API returns standard HTTP error codes with detailed error information:

| HTTP Code | Error Code | Description |
|-----------|------------|-------------|
| 400 | `invalid_request` | Missing required fields or malformed request structure |
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for creating instructions |
| 409 | `conflict` | An instruction with the same name already exists |
| 429 | `rate_limit_exceeded` | Instruction creation rate limit exceeded |
