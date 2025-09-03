---
id: list-instructions
title: List Instructions API Definition
sidebar_label: List Instructions
---

import CodePanel from '@site/src/theme/CodePanel';

The List Instructions API enables you to retrieve a paginated list of all behavioral instructions available to the authenticated user. This is useful for managing and monitoring instruction sets across different agents and use cases.

## List Instructions Request and Response

To list instructions, send a GET request to `/v2/instructions`. You can include optional query parameters to filter and paginate results:

- `filter` (string, optional): A regex to match against instruction names or descriptions.
- `enabled` (boolean, optional): Filter by whether instructions are currently enabled.
- `limit` (integer, optional): Maximum number of instructions to return (default: 10).
- `page_key` (string, optional): Used to paginate through results.

The response includes an array of instruction definitions and a `metadata` object with pagination info.

### Example Request

<CodePanel
  title="Example request"
  snippets={[
    {
      language: 'bash',
      code: `GET /v2/instructions?filter=support.*&limit=2`
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
   "instructions": [
     {
       "id": "ins_12345",
       "name": "Customer Support Tone and Style Guide",
       "description": "Ensures that the agent responds to customer inquiries with a helpful, friendly, and professional tone.",
       "enabled": true,
       "version": 1,
       "created_at": "2024-01-15T10:30:00Z",
       "updated_at": "2024-01-15T10:30:00Z"
     },
     {
       "id": "ins_67890",
       "name": "Support Ticket Creation Rules",
       "description": "Rules for when and how to create a support ticket.",
       "enabled": true,
       "version": 2,
       "created_at": "2024-01-14T11:00:00Z",
       "updated_at": "2024-01-14T11:30:00Z"
     }
   ],
   "metadata": {
     "page_key": "next_page_token"
   }
}`
    }]}
  layout="stacked"
/>

## Error Responses

The API returns standard HTTP error codes with detailed error information:

| HTTP Code | Error Code | Description |
|-----------|------------|-------------|
| 400 | `invalid_request` | Invalid query parameters or malformed request |
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for listing instructions |
| 429 | `rate_limit_exceeded` | Request rate limit exceeded |
