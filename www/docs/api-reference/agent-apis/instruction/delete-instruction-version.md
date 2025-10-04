---
id: delete-instruction-version
title: Delete Instruction Version API Definition
sidebar_label: Delete Instruction Version
---

import CodePanel from '@site/src/theme/CodePanel';

The Delete Instruction Version API enables you to permanently remove a specific version of a behavioral instruction. This is useful for managing the version history of your instructions and removing outdated or unused versions.

## Delete Instruction Version Request and Response

To delete a specific version of an instruction, send a DELETE request to `/v2/instructions/{instruction_id}/versions/{version}`. The `instruction_id` and `version` are the unique identifiers of the instruction and the specific version you want to remove.

There is no request body. If the operation is successful, the API responds with a 204 No Content status, indicating that the instruction version was removed.

### Example Request

<CodePanel
  title="Example request"
  snippets={[
    {
      language: 'bash',
      code: `DELETE /v2/instructions/ins_12345/versions/1`
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
| 400 | `invalid_request` | Invalid `instruction_id` or `version` format |
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for deleting this instruction version |
| 404 | `not_found` | Instruction with the specified ID and version does not exist |
| 429 | `rate_limit_exceeded` | Request rate limit exceeded |
