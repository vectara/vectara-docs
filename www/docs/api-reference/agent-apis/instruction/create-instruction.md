---
id: create-instruction
title: Create Instruction API Definition
sidebar_label: Create Instruction
---

import CodePanel from '@site/src/theme/CodePanel';

The Create Instruction API enables you to create reusable sets of behavioral guidelines that shape how AI agents reason, respond, and interact with users and tools. Instructions are fundamental to ensuring that agents operate within enterprise policies, follow best practices, and maintain a consistent tone and personality across all interactions.

Organizations use this API to define standardized operational protocols, enforce compliance with regulatory requirements, and customize agent behavior to align with specific business use cases, such as customer support, financial analysis, or internal workflow automation.

## Create Instruction Request and Response

To create an instruction, send a POST request to `/v2/instructions`. You specify the following parameters in the request body:

- `name` (string, required): A human-readable name for the instruction.
- `description` (string, optional): A detailed description of the instruction's purpose and intended use.
- `template` (string, required): The instruction content in Apache Velocity Template Language, which allows for dynamic variable substitution.
- `enabled` (boolean, optional): Whether the instruction should be enabled upon creation (defaults to `true`).
- `metadata` (object, optional): Arbitrary metadata for tracking, versioning, or categorization.

The response includes the full definition of the newly created instruction, including system-generated fields such as `id`, `version`, `created_at`, and `updated_at`.

### Example Request

<CodePanel
  title="Example request"
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
  title="Example response"
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

## Error Responses

The API returns standard HTTP error codes with detailed error information:

| HTTP Code | Error Code | Description |
|-----------|------------|-------------|
| 400 | `invalid_request` | Missing required fields or malformed request structure |
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for creating instructions |
| 409 | `conflict` | An instruction with the same name already exists |
| 429 | `rate_limit_exceeded` | Instruction creation rate limit exceeded |
