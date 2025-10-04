---
id: create-tool-configuration
title: Create Tool Configuration API Definition
sidebar_label: Create Tool Configuration
---

import CodePanel from '@site/src/theme/CodePanel';

The Create Tool Configuration API enables you to create reusable tool configurations that store argument overrides and settings for specific tools. Organizations use this API to standardize tool behavior across multiple agents, ensuring consistent search parameters, API limits, and custom configurations while maintaining version control for rollback capabilities.

## Create Tool Configuration Request and Response

To create a tool configuration, send a POST request to `/v2/tools/{tool_id}/configurations`. You specify the following parameters in the request body:

- `name` (string, required): A human-readable name for the configuration.
- `description` (string, optional): A detailed description of the configuration's purpose.
- `type` (string, required): The type of tool configuration (must match the tool type).
- `argument_override` (object, optional): Default argument overrides for the tool.
- `query_configuration` (object, optional): Query configuration for corpora search tools.
- `metadata` (object, optional): Arbitrary metadata for tracking and organization.
- `enabled` (boolean, optional): Whether the configuration should be enabled (defaults to `true`).

The response includes the full definition of the newly created configuration, including system-generated fields such as `id`, `version`, `created_at`, and `tool_id`.

### Example Request

<CodePanel
  title="Example request"
  snippets={[
    {
      language: 'json',
      code: `POST /v2/tools/tol_web_search/configurations

{
  "name": "customer-support-search",
  "description": "Web search configuration optimized for customer support queries",
  "type": "web_search",
  "argument_override": {
    "limit": 10,
    "provider": "tavily",
    "search_depth": "advanced"
  },
  "metadata": {
    "team": "support",
    "category": "customer-facing"
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
  "id": "tcf_customer_support_search_123",
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
    "category": "customer-facing"
  },
  "enabled": true,
  "version": 1,
  "created_at": "2025-01-14T10:00:00.000Z"
}`
    }]}
  layout="stacked"
/>

## Error Responses

The API returns standard HTTP error codes with detailed error information:

| HTTP Code | Error Code | Description |
|-----------|------------|-------------|
| 400 | `invalid_request` | Missing required fields or invalid configuration type |
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for creating tool configurations |
| 404 | `not_found` | Specified tool not found |
| 409 | `conflict` | A configuration with the same name already exists |
| 429 | `rate_limit_exceeded` | Configuration creation rate limit exceeded |