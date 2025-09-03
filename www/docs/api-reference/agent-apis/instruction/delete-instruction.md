---
id: delete-instruction
title: Delete Instruction API Definition
sidebar_label: Delete Instruction
---

import CodePanel from '@site/src/theme/CodePanel';

The Delete Instruction API enables you to permanently remove a behavioral instruction from the Vectara platform. This is useful for decommissioning outdated instructions, cleaning up test environments, or revoking guidelines that are no longer needed.

## Delete Instruction Request and Response

To delete an instruction, send a DELETE request to `/v2/instructions/{instruction_id}`. The `instruction_id` must be the unique identifier of the instruction you want to remove.

There is no request body. If the operation is successful, the API responds with a 204 No Content status, indicating that the instruction was removed.

### Example Request

<CodePanel
  title="Example request"
  snippets={[
    {
      language: 'bash',
      code: `DELETE /v2/instructions/ins_12345`
    }]}
  layout="stacked"
/>

### Example Response

<CodePanel
  title="Example response"
  snippets={[
    {
      language: 'http',
      code: `HTTP/1.1 204 No Content`
    }]}
  layout="stacked"
/>

## Error Responses

The API returns standard HTTP error codes with detailed error information:

| HTTP Code | Error Code | Description |
|-----------|------------|-------------|
| 400 | `invalid_request` | Invalid `instruction_id` format |
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for deleting this instruction |
| 404 | `not_found` | Instruction with the specified ID does not exist |
| 429 | `rate_limit_exceeded` | Request rate limit exceeded |
