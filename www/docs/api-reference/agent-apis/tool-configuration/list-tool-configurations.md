---
id: list-tool-configurations
title: List Tool Configurations API Definition
sidebar_label: List Tool Configurations
---

import CodePanel from '@site/src/theme/CodePanel';

The List Tool Configurations API enables you to retrieve all tool configurations for a specific tool with optional filtering and pagination. Organizations use this API to discover existing configurations that can be reused across agents, ensuring consistency and reducing duplication when setting up new agents with standardized tool behaviors.

## List Tool Configurations Request and Response

To list tool configurations, send a GET request to `/v2/tools/{tool_id}/configurations`. You can specify the following optional query parameters:

- `filter` (string, optional): Regular expression to filter by name or description.
- `type` (string, optional): Filter by configuration type (e.g., `mcp`, `corpora_search`, `web_search`).
- `enabled` (boolean, optional): Filter by enabled status.
- `limit` (integer, optional): Maximum configurations to return (1-100, default: 10).
- `page_key` (string, optional): Pagination key for retrieving the next page.

The response includes an array of tool configurations matching the filter criteria, along with pagination metadata if applicable.

### Example Request

<CodePanel
  title="Example request"
  snippets={[
    {
      language: 'json',
      code: `GET /v2/tools/tol_web_search/configurations?type=web_search&enabled=true&limit=20`
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
  "tool_configurations": [
    {
      "id": "tcf_support_search_123",
      "name": "support-docs-search",
      "description": "Search configuration for customer support documentation",
      "type": "corpora_search",
      "tool_id": "tol_corpora_search",
      "query_configuration": {
        "search": {
          "corpora": [{"corpus_key": "support-docs"}],
          "limit": 5
        }
      },
      "metadata": {
        "team": "support"
      },
      "enabled": true,
      "version": 2,
      "created_at": "2025-01-14T10:00:00.000Z"
    },
    {
      "id": "tcf_web_search_456",
      "name": "news-search",
      "description": "Web search for news and current events",
      "type": "web_search",
      "tool_id": "tol_web_search",
      "argument_override": {
        "limit": 15,
        "provider": "tavily"
      },
      "metadata": {
        "category": "news"
      },
      "enabled": true,
      "version": 1,
      "created_at": "2025-01-14T09:30:00.000Z"
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
| 400 | `invalid_request` | Invalid filter parameters or malformed request |
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for listing tool configurations |
| 404 | `not_found` | Specified tool not found |
| 429 | `rate_limit_exceeded` | Request rate limit exceeded |