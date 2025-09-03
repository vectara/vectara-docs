---
id: get-instruction
title: Get Instruction API Definition
sidebar_label: Get Instruction
---

import CodePanel from '@site/src/theme/CodePanel';

The Get Instruction API enables you to retrieve the full definition of a specific behavioral instruction by its ID. This allows you to inspect the instruction's template, metadata, and version history.

## Get Instruction Request and Response

To retrieve an instruction, send a GET request to `/v2/instructions/{instruction_id}`. The `instruction_id` is the unique identifier of the instruction you wish to retrieve.

The response contains the instruction's `id`, `name`, `description`, `template`, `enabled` status, `version`, and metadata.

### Example Request

<CodePanel
  title="Example request"
  snippets={[
    {
      language: 'bash',
      code: `GET /v2/instructions/ins_12345`
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
| 400 | `invalid_request` | Invalid `instruction_id` format |
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for accessing this instruction |
| 404 | `not_found` | Instruction with the specified ID does not exist |
| 429 | `rate_limit_exceeded` | Request rate limit exceeded |
