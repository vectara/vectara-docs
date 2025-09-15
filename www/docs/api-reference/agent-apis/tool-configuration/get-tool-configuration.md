---
id: get-tool-configuration
title: Get Tool Configuration API Definition
sidebar_label: Get Tool Configuration
---

import CodePanel from '@site/src/theme/CodePanel';

The Get Tool Configuration API enables you to retrieve the details of a specific tool configuration by its ID, including its settings and argument overrides. Organizations use this API to inspect configuration details, compare different versions, and understand how tool configurations are structured before reusing them in other agents.

## Get Tool Configuration Request and Response

To get a tool configuration, send a GET request to `/v2/tools/{tool_id}/configurations/{configuration_id}`. You can specify the following optional query parameters:

- `version` (integer, optional): Specific version to retrieve (defaults to the latest version).

The response includes the complete configuration definition, including all settings, metadata, and version information.

### Example Request

<CodePanel
  title="Example request"
  snippets={[
    {
      language: 'json',
      code: `GET /v2/tools/tol_web_search/configurations/tcf_customer_support_123`
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
  "id": "tcf_customer_support_123",
  "name": "customer-support-search",
  "description": "Web search configuration optimized for customer support queries",
  "type": "web_search",
  "tool_id": "tol_web_search",
  "argument_override": {
    "limit": 10,
    "provider": "tavily",
    "search_depth": "advanced"
  },
  "metadata": {
    "team": "support",
    "category": "customer-facing",
    "created_by": "user_123"
  },
  "enabled": true,
  "version": 2,
  "created_at": "2025-01-14T10:00:00.000Z",
  "updated_at": "2025-01-14T11:30:00.000Z"
}`
    }]}
  layout="stacked"
/>

## Error Responses

The API returns standard HTTP error codes with detailed error information:

| HTTP Code | Error Code | Description |
|-----------|------------|-------------|
| 400 | `invalid_request` | Invalid version parameter or malformed request |
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for accessing tool configurations |
| 404 | `not_found` | Tool, configuration, or specified version not found |
| 429 | `rate_limit_exceeded` | Request rate limit exceeded |