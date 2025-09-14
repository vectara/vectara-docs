---
id: delete-tool-configuration-version
title: Delete Tool Configuration Version API Definition
sidebar_label: Delete Tool Configuration Version
---

import CodePanel from '@site/src/theme/CodePanel';

The Delete Tool Configuration Version API enables you to permanently delete a specific version of a tool configuration while preserving other versions. Organizations use this API to clean up old configuration versions, manage storage costs, and maintain a focused version history while ensuring that critical versions remain available for rollback scenarios.

## Delete Tool Configuration Version Request and Response

To delete a specific configuration version, send a DELETE request to `/v2/tools/{tool_id}/configurations/{configuration_id}/versions/{version}`. No request body is required.

The API returns a 204 No Content status on successful deletion. This action cannot be undone and will affect any agents that specifically reference this version.

### Example Request

<CodePanel
  title="Example request"
  snippets={[
    {
      language: 'json',
      code: `DELETE /v2/tools/tol_web_search/configurations/tcf_customer_support_123/versions/2`
    }]}
  layout="stacked"
/>

### Example Response

<CodePanel
  title="Example response"
  snippets={[
    {
      language: 'text',
      code: `204 No Content

Version deleted successfully (no response body)`
    }]}
  layout="stacked"
/>

## Error Responses

The API returns standard HTTP error codes with detailed error information:

| HTTP Code | Error Code | Description |
|-----------|------------|-------------|
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for deleting tool configuration versions |
| 404 | `not_found` | Tool, tool configuration, or version not found |
| 409 | `conflict` | The specified version cannot be deleted as it's used in an agent |
| 429 | `rate_limit_exceeded` | Request rate limit exceeded |