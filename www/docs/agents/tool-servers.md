---
id: tool-servers
title: Tool Servers
sidebar_label: Tool Servers
---

import CodePanel from '@site/src/theme/CodePanel';

Tool Servers are MCP-compliant external systems that expose collections of 
tools for agent use. They represent the infrastructure layer that provides 
agent capabilities.

When you register a Tool Server, Vectara synchronizes with it to discover the 
tools it exposes. These tools then become available for use by your agents.

Key properties of a Tool Server include:

- A unique ID following the pattern `tsr_[identifier]`
- Connection details including URI and authentication headers
- Synchronization status and tool discovery metadata
- Health monitoring and availability tracking

Tool servers enable agents to access enterprise systems like CRM platforms, 
business intelligence tools, workflow systems, and databases through 
standardized MCP interfaces.

<CodePanel
  title="Tool Server Example"
  snippets={[
    {
      language: 'json',
      code: `{  
    "name": "internal-tools-server",  
    "description": "A server that exposes internal tools for use by agents.",  
    "type": "mcp",  
    "uri": "https://internal-tools.example.com/mcp",  
    "authentication": {    
      "type": "bearer",    
      "token": "super-secret-token"  
    }
  }`
  }]}
  annotations={{
    json: [
      { line: 2, text: 'The name of the tool server.' },
      { line: 3, text: 'A description of the tool server.' },
      { line: 4, text: 'The type of the tool server. Must be \'mcp\'.' },
      { line: 5, text: 'The URI of the tool server.' },
      { line: 6, text: 'Authentication details for the tool server.' }
    ]
  }}
  layout="stacked"
/>

