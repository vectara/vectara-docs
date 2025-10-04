---
id: test-instruction
title: Test Instruction API Definition
sidebar_label: Test Instruction
---

import CodePanel from '@site/src/theme/CodePanel';

The Test Instruction API enables you to validate the syntax and compilation of an instruction template written in Apache Velocity Template Language (VTL). This is a crucial step in the development process, as it allows you to catch errors in your templates before they are used by an agent.

## Test Instruction Request and Response

To test an instruction, send a POST request to `/v2/instructions/{instruction_id}/test`. The `instruction_id` is the unique identifier of the instruction you want to test.

There is no request body for this endpoint. If the instruction template is valid, the API responds with a 204 No Content status. If the template is invalid, the API returns a 400 Bad Request with an error message detailing the syntax error.

### Example Request

<CodePanel
  title="Example request"
  snippets={[
    {
      language: 'bash',
      code: `POST /v2/instructions/ins_12345/test`
    }]}
  layout="stacked"
/>

### Example Response (Success)

<CodePanel
  title="Example response (Success)"
  snippets={[
    {
      language: 'http',
      code: `HTTP/1.1 204 No Content`
    }]}
  layout="stacked"
/>

### Example Response (Failure)

<CodePanel
  title="Example response (Failure)"
  snippets={[
    {
      language: 'json',
      code: `{
   "error": {
     "code": "invalid_template",
     "message": "Encountered \\"<EOF>\\" at line 3, column 1.\\nWas expecting one of:\\n    <IF> ...\\n    <SET> ...\\n    ..."
   }
}`
    }]}
  layout="stacked"
/>

## Error Responses

The API returns standard HTTP error codes with detailed error information:

| HTTP Code | Error Code | Description |
|-----------|------------|-------------|
| 400 | `invalid_request` | Invalid `instruction_id` format |
| 400 | `invalid_template` | The instruction template has a syntax error |
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for testing this instruction |
| 404 | `not_found` | Instruction with the specified ID does not exist |
| 429 | `rate_limit_exceeded` | Request rate limit exceeded |
