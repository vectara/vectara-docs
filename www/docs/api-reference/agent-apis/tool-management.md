---
id: tool-management
title: Tool Management APIs
sidebar_label: Tool Management
---

import CodePanel from '@site/src/theme/CodePanel';

The Tool Management APIs handle individual tools available to agents, including both built-in tools and those discovered from MCP tool servers.

- **List available tools** that agents can use
- **Get tool details** including parameters, descriptions, and capabilities
- **Update tool settings** for MCP tools
- **Delete tools** when no longer needed
- **Manage tool configurations** with full versioning support

## Tool types
- **Web search tools**: Internet search via Tavily provider
- **Corpora search tools**: Query Vectara corpora for relevant content  
- **MCP tools**: External tools discovered from tool servers

## Tool properties
- **Name and description**: Human-readable identification
- **Parameters**: Input schema defining what data the tool accepts
- **Capabilities**: What actions the tool can perform
- **Access control**: Which agents or users can use the tool

## Built-in tools

### Web Search

<CodePanel
title="Web Search"
  snippets={[
    {
      language: 'json',
      code: `{
   "type": "web_search",
   "argument_override": {
     "limit": 10,
     "provider": "tavily"
   }
}`
    }]}
  layout="stacked"
/>

### Corpora Search

<CodePanel
title="Corpora Search"
  snippets={[
    {
      language: 'json',
      code: `{
   "type": "corpora_search",
   "query_configuration": {
     "search": {
       "corpora": ["your-corpus-id"],
       "limit": 5
     }
   }
}`
    }]}
  layout="stacked"
/>

### MCP Tools

<CodePanel
title="MCP Tools"
  snippets={[
    {
      language: 'json',
      code: `{
   "type": "mcp",
   "server_id": "database-server",
   "tool_name": "query_customers",
   "argument_override": {
     "timeout": 30
   }
}`
    }]}
  layout="stacked"
/>
