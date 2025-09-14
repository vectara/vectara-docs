---
id: delete-tool-configuration
title: Delete Tool Configuration API Definition
sidebar_label: Delete Tool Configuration
---

import CodePanel from '@site/src/theme/CodePanel';

The Delete Tool Configuration API enables you to permanently delete a tool configuration and all its associated versions and settings. Organizations use this API to clean up unused configurations and maintain a tidy configuration registry, ensuring that only active and relevant tool configurations remain available for agent deployment.

## Delete Tool Configuration Request and Response

To delete a tool configuration, send a DELETE request to `/v2/tools/{tool_id}/configurations/{configuration_id}`. No request body is required.

The API returns a 204 No Content status on successful deletion. This action cannot be undone and will affect any agents that reference this configuration.

### Example Request

<CodePanel
  title="Example request"
  snippets={[
    {
      language: 'json',
      code: `DELETE /v2/tools/tol_web_search/configurations/tcf_customer_support_123`
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

Configuration deleted successfully (no response body)`
    }]}
  layout="stacked"
/>

## Error Responses

The API returns standard HTTP error codes with detailed error information:

| HTTP Code | Error Code | Description |
|-----------|------------|-------------|
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for deleting tool configurations |
| 404 | `not_found` | Tool or tool configuration not found |
| 409 | `conflict` | Configuration is currently used by active agents and cannot be deleted |
| 429 | `rate_limit_exceeded` | Request rate limit exceeded |