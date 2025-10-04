---
id: update-instruction
title: Update Instruction API Definition
sidebar_label: Update Instruction
---

import CodePanel from '@site/src/theme/CodePanel';

The Update Instruction API enables you to modify an existing behavioral instruction. This allows you to iterate on agent behavior, update guidelines, and refine the tone and personality of your AI agents over time.

## Update Instruction Request and Response

To update an instruction, send a PATCH request to `/v2/instructions/{instruction_id}`. You include the parameters you wish to update in the request body. Any omitted fields will remain unchanged.

Supported fields:

- `name` (string, optional): New human-readable name for the instruction.
- `description` (string, optional): Updated description of the instruction's purpose.
- `template` (string, optional): The new instruction content in Apache Velocity Template Language.
- `enabled` (boolean, optional): Toggle instruction availability.
- `metadata` (object, optional): Replaces the current metadata.

The response returns the updated instruction configuration.

### Example Request

<CodePanel
  title="Example request"
  snippets={[
    {
      language: 'json',
      code: `PATCH /v2/instructions/ins_12345

{
   "description": "Updated tone and style guide for customer support agents.",
   "template": "You are a helpful and friendly customer support agent. Always address the customer by their first name. Avoid technical jargon and use simple language.",
   "metadata": {
     "owner": "customer-support-team",
     "version": "1.1.0"
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
   "description": "Updated tone and style guide for customer support agents.",
   "template": "You are a helpful and friendly customer support agent. Always address the customer by their first name. Avoid technical jargon and use simple language.",
   "enabled": true,
   "version": 2,
   "metadata": {
     "owner": "customer-support-team",
     "version": "1.1.0"
   },
   "created_at": "2024-01-15T10:30:00Z",
   "updated_at": "2024-01-16T14:00:00Z"
}`
    }]}
  layout="stacked"
/>

## Error Responses

The API returns standard HTTP error codes with detailed error information:

| HTTP Code | Error Code | Description |
|-----------|------------|-------------|
| 400 | `invalid_request` | Invalid `instruction_id` format or malformed request body |
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for updating this instruction |
| 404 | `not_found` | Instruction with the specified ID does not exist |
| 429 | `rate_limit_exceeded` | Request rate limit exceeded |
