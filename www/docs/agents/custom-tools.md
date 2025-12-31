---
id: custom-tools
title: Custom tools
sidebar_label: Custom tools
---

import CodePanel from '@site/src/theme/CodePanel';

Custom tools extend agent capabilities. You can create tools once and reuse 
them across multiple agents with consistent behavior and governance.

## Lambda tools

User-defined Python functions that execute in secure, sandboxed environments:

- Run in isolated Python 3.12 environments.
- Automatic schema generation from type annotations.
- No network access.
- Resource limits: 100MB memory, 30-second timeout.

Use [Lambda tools](/docs/agents/lambda-tools) for custom business logic, data transformations, and
calculations that don't require external connectivity.

## MCP tools

Tools from external MCP-compliant servers that enable enterprise integrations:

- Standards-based protocol.
- Dynamic tool discovery.
- Register a tool server once, automatically discover all its tools.
- Connect to CRM systems, databases, and enterprise APIs.

Register an MCP tool server to make its tools available. Learn more about
[MCP](/docs/agents/model-context-protocol) and
[Tool Servers](/docs/agents/tool-servers).


## Using custom tools with agents

After creating a Lambda tool or registering an MCP server, reference the tool
in your agent configuration:

<CodePanel
  title="Lambda Tool Configuration in Agent"
  layout="stacked"
  snippets={[
    {
      language: "json",
      code: `{
   "type": "lambda",
   "tool_id": "tol_abc123"
}`
    }
  ]}
/>

<CodePanel
  title="MCP Tool Configuration in Agent"
  layout="stacked"
  snippets={[
    {
      language: "json",
      code: `{
   "type": "mcp",
   "tool_id": "tol_xyz789"
}`
    }
  ]}
/>

### Argument overrides

Control tool behavior with hardcoded values or dynamic context references:

<CodePanel
  title="Tool Configuration with Argument Override"
  layout="stacked"
  snippets={[
    {
      language: "json",
      code: `{
   "type": "lambda",
   "tool_id": "tol_abc123",
   "argument_override": {
     "customer_tier": "enterprise",
     "query": {
       "$ref": "session.metadata.search_query"
     }
   }
}`
    }
  ]}
/>

Argument overrides:
- **Hardcoded values** that the LLM cannot modify (e.g., `"customer_tier": "enterprise"`).
- **Dynamic references** using `$ref` to pull values from:
  - Session metadata: `{"$ref": "session.metadata.field_name"}`
  - Agent metadata: `{"$ref": "agent.metadata.field_name"}`

For complete API details, see [Tools API](/docs/rest-api/tools).
