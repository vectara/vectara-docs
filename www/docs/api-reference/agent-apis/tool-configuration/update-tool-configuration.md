---
id: update-tool-configuration
title: Update Tool Configuration API Definition
sidebar_label: Update Tool Configuration
---

import CodePanel from '@site/src/theme/CodePanel';

The Update Tool Configuration API enables you to update an existing tool configuration's settings and argument overrides while preserving previous versions for rollback capabilities. Organizations use this API to refine tool behavior, adjust parameters based on performance feedback, and maintain configuration evolution while ensuring agents can continue operating with previous versions if needed.

## Update Tool Configuration Request and Response

To update a tool configuration, send a PATCH request to `/v2/tools/{tool_id}/configurations/{configuration_id}`. You specify the following parameters in the request body:

- `name` (string, optional): Updated human-readable name for the configuration.
- `description` (string, optional): Updated description of the configuration's purpose.
- `argument_override` (object, optional): Updated argument overrides for the tool.
- `query_configuration` (object, optional): Updated query configuration for corpora search tools.
- `metadata` (object, optional): Updated metadata for tracking and organization.
- `enabled` (boolean, optional): Whether the configuration should be enabled.

The response includes the full definition of the updated configuration with an incremented version number, while preserving all previous versions.

### Example Request

<CodePanel
  title="Example request"
  snippets={[
    {
      language: 'json',
      code: `PATCH /v2/tools/tol_web_search/configurations/tcf_customer_support_123

{
  "name": "customer-support-search-v2",
  "description": "Updated web search configuration with enhanced settings",
  "argument_override": {
    "limit": 15,
    "provider": "tavily",
    "search_depth": "advanced",
    "include_domains": ["support.company.com", "docs.company.com"]
  },
  "metadata": {
    "team": "support",
    "category": "customer-facing",
    "version_notes": "Added domain filtering"
  },
  "enabled": true
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
  "id": "tcf_customer_support_123",
  "name": "customer-support-search-v2",
  "description": "Updated web search configuration with enhanced settings",
  "type": "web_search",
  "tool_id": "tol_web_search",
  "argument_override": {
    "limit": 15,
    "provider": "tavily",
    "search_depth": "advanced",
    "include_domains": ["support.company.com", "docs.company.com"]
  },
  "metadata": {
    "team": "support",
    "category": "customer-facing",
    "version_notes": "Added domain filtering"
  },
  "enabled": true,
  "version": 3,
  "created_at": "2025-01-14T10:00:00.000Z",
  "updated_at": "2025-01-14T12:15:00.000Z"
}`
    }]}
  layout="stacked"
/>

## Error Responses

The API returns standard HTTP error codes with detailed error information:

| HTTP Code | Error Code | Description |
|-----------|------------|-------------|
| 400 | `invalid_request` | Invalid argument overrides or malformed request structure |
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for updating tool configurations |
| 404 | `not_found` | Tool or tool configuration not found |
| 409 | `conflict` | Configuration name conflicts with existing configuration |
| 429 | `rate_limit_exceeded` | Configuration update rate limit exceeded |