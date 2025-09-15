---
id: tool-configuration-management
title: Tool Configuration Management APIs
sidebar_label: Tool Configuration Management
---

import CodePanel from '@site/src/theme/CodePanel';

The Tool Configuration Management APIs handle reusable configurations for tools 
used by agents. These configurations store argument overrides and settings that 
can be referenced across multiple agents, with full version control support.

- **Create tool configurations** with custom argument overrides
- **List configurations** for each tool type
- **Update configurations** with automatic versioning
- **Delete configurations** or specific versions
- **Reference configurations** in agent definitions

## Tool configuration properties

- **Configuration ID**: Unique identifier (e.g., `tcf_customer_support`)
- **Name and description**: Human-readable identification
- **Argument overrides**: Default values or constraints for tool parameters
- **Version control**: Automatic versioning on updates
- **Metadata**: Custom properties for organization

## Creating tool configurations

### Web Search Configuration

<CodePanel
  title="Create a web search configuration"
  snippets={[
    {
      language: 'bash',
      code: `POST /v2/tools/{tool_id}/configurations`
    },
    {
      language: 'json',
      code: `{
  "name": "news-search-config",
  "description": "Web search configuration for news and current events",
  "type": "web_search",
  "argument_override": {
    "limit": 10,
    "provider": "tavily",
    "search_depth": "advanced"
  },
  "metadata": {
    "category": "news",
    "team": "content"
  }
}`
    }
  ]}
  annotations={{
    json: [
      { line: 2, text: 'Human-readable configuration name' },
      { line: 3, text: 'Description of configuration purpose' },
      { line: 4, text: 'Must match the tool type' },
      { line: 5, text: 'Default arguments for this configuration' },
      { line: 6, text: 'Limit search results to 10' },
      { line: 7, text: 'Use Tavily as the search provider' },
      { line: 10, text: 'Custom metadata for organization' }
    ]
  }}
  layout="stacked"
/>

### Corpora Search Configuration

<CodePanel
  title="Create a corpora search configuration"
  snippets={[
    {
      language: 'bash',
      code: `POST /v2/tools/{tool_id}/configurations`
    },
    {
      language: 'json',
      code: `{
  "name": "support-docs-search",
  "description": "Search configuration for customer support documentation",
  "type": "corpora_search",
  "query_configuration": {
    "search": {
      "corpora": [
        {"corpus_key": "support-docs"},
        {"corpus_key": "faqs"}
      ],
      "limit": 5,
      "reranker": {
        "type": "customer_reranker"
      }
    },
    "generation": {
      "generation_preset_name": "support-responses"
    }
  }
}`
    }
  ]}
  annotations={{
    json: [
      { line: 4, text: 'Configuration for corpora search tool' },
      { line: 5, text: 'Query configuration object' },
      { line: 7, text: 'List of corpora to search' },
      { line: 11, text: 'Maximum results to return' },
      { line: 12, text: 'Reranking configuration' },
      { line: 16, text: 'Generation settings for RAG' }
    ]
  }}
  layout="stacked"
/>

## Versioning

Tool configurations support automatic versioning:

1. **Initial creation**: Version 1
2. **Updates**: Increment version automatically
3. **Version retrieval**: Specify version in GET requests
4. **Version deletion**: Remove specific versions

<CodePanel
  title="Get specific version"
  snippets={[
    {
      language: 'bash',
      code: `GET /v2/tools/{tool_id}/configurations/{configuration_id}?version=2`
    }
  ]}
  layout="stacked"
/>

## Using configurations in agents

Reference tool configurations when creating agents:

<CodePanel
  title="Reference configuration in agent"
  snippets={[
    {
      language: 'json',
      code: `{
  "tool_configurations": {
    "customer_search": {
      "type": "reference",
      "configuration_id": "tcf_support_docs_search"
    },
    "news_search": {
      "type": "reference", 
      "configuration_id": "tcf_news_search_config"
    }
  }
}`
    }
  ]}
  annotations={{
    json: [
      { line: 4, text: 'Reference type indicates using existing configuration' },
      { line: 5, text: 'ID of the tool configuration to use' }
    ]
  }}
  layout="stacked"
/>

## Available endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| [Create Tool Configuration](/docs/rest-api/create-tool-configuration) | POST | Create a reusable tool configuration |
| [List Tool Configurations](/docs/rest-api/list-tool-configurations) | GET | List all configurations for a tool |
| [Get Tool Configuration](/docs/rest-api/get-tool-configuration) | GET | Retrieve specific configuration (with version) |
| [Update Tool Configuration](/docs/rest-api/update-tool-configuration) | PATCH | Update configuration (creates new version) |
| [Delete Tool Configuration](/docs/rest-api/delete-tool-configuration) | DELETE | Remove entire configuration |
| [Delete Tool Configuration Version](/docs/rest-api/delete-tool-configuration-version) | DELETE | Remove specific version |

## Best practices

1. **Use configurations for consistency** across multiple agents
2. **Version management**: Test new versions before updating agent references
3. **Descriptive naming**: Use clear names indicating purpose
4. **Metadata organization**: Use metadata for filtering and management
5. **Avoid deletion** of versions referenced by active agents