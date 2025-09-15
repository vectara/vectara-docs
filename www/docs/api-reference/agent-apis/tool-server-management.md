---
id: tool-server-management
title: Tool Server Management APIs
sidebar_label: Tool Server Management
---

import CodePanel from '@site/src/theme/CodePanel';

The Tool Server Management APIs handle Model Context Protocol (MCP) tool 
servers that extend agent capabilities with external integrations and 
custom functionality.

- **Create tool servers** to connect MCP-compatible services
- **List available tool servers** in your environment
- **Get server details** including connection status and available tools
- **Update server configurations** to modify connection parameters
- **Sync tool definitions** to refresh available tools from servers
- **Delete tool servers** when no longer needed

## Model Context Protocol (MCP)

MCP is a protocol that enables agents to connect to external tools and services:
- **Standardized interface**: Consistent way to expose tools to agents
- **Server-sent events (SSE)**: Communication via SSE transport
- **Authentication support**: Controlled access to external systems
- **Dynamic discovery**: Tools are discovered and synchronized from servers

## Tool server capabilities

MCP tool servers can provide various external functionalities:
- **Database access**: Query databases and retrieve structured data
- **API integrations**: Connect to REST APIs and web services  
- **File operations**: Access and manipulate files and documents
- **Custom business logic**: Domain-specific functionality and workflows

## Available endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| [Create Tool Server](/docs/rest-api/create-tool-server) | POST | Register a new MCP tool server |
| [List Tool Servers](/docs/rest-api/list-tool-servers) | GET | Retrieve all registered tool servers |
| [Get Tool Server](/docs/rest-api/get-tool-server) | GET | Get details and status of a specific server |
| [Update Tool Server](/docs/rest-api/update-tool-server) | PATCH | Modify server configuration or connection details |
| [Sync Tool Server](/docs/rest-api/sync-tool-server) | POST | Refresh tool definitions from the server |
| [Delete Tool Server](/docs/rest-api/delete-tool-server) | DELETE | Remove a tool server registration |

## Configuration example

<CodePanel
title="Configuration Example"
  snippets={[
    {
      language: 'json',
      code: `{
   "name": "database-server",
   "url": "mcp://localhost:3000/db-tools",
   "description": "MCP server for database operations",
   "authentication": {
     "type": "api_key",
     "api_key": "your-server-api-key"
   }
}`
    }]}
  layout="stacked"
/>
