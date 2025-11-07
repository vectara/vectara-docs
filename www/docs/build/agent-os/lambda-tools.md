---
id: lambda-tools
title: Lambda Tools
sidebar_label: Lambda Tools
---

import CodePanel from '@site/src/theme/CodePanel';

As your AI agents take on more complex workflows, they might need to perform
actions that go beyond what built-in tools can handle. For example, applying
custom business logic or transforming data.

Lambda Tools enable you to create custom Python functions that your agents can
run during conversations. Think of them as custom skills that teach your agent
how to handle specialized tasks. These user-defined functions run in secure,
sandboxed environments, allowing you to extend agent capabilities with custom
business logic, data processing, or integrations. Check out our tutorial on 
[building a financial research agent](/docs/tutorials/build-a-financial-research-agent).

Lambda Tools are user-defined functions that:

- Execute in a **sandboxed Python 3.12 environment** with gVisor isolation.
- Have **automatic schema discovery** from function type annotations.
- Support a **curated set of libraries**: `json`, `math`, `datetime`, `collections`,
  `itertools`, `functools`, `re`, `time`, `typing`.
- Include **resource limits**: 100MB memory (up to 1GB), 30-second timeout
  (up to 300 seconds).
- Provide **complete audit trails** of execution history.

:::tip Note
Lambda Tools run **without** network access. You have read-only file system access, and
you **cannot** install custom packages. This ensures secure execution in multi-tenant
environments.
:::

## Use a lambda tool with an agent

After creating a Lambda Tool, you can configure agents to use it through inline tool configurations.
You reference the tool by its ID and optionally provide argument overrides.

### Inline configuration

Use an inline configuration to point an agent to an existing Lambda Tool by ID:

<CodePanel
  title="Inline Lambda Tool Configuration (inside Agent)"
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

The `argument_override` field allows you to:
- **Hardcode specific values** that the LLM cannot change (e.g., `"customer_tier": "enterprise"`)
- **Use dynamic context references** with `$ref` to pull values from session or agent metadata (e.g., `{"$ref": "session.metadata.search_query"}`)

### Reusable Lambda Tool Configuration

You can also create a reusable `LambdaToolConfiguration` that can be referenced across multiple agents.
This approach is useful for consistent, governed usage of Lambda Tools.

<CodePanel
  title="Create Reusable Lambda Tool Configuration"
  layout="stacked"
  snippets={[
    {
      language: "curl",
      code: `curl -X POST https://api.vectara.io/v2/tools/tol_abc123/configurations \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "lambda",
    "name": "enterprise_customer_scoring",
    "description": "Pre-configured scoring for enterprise customers",
    "argument_override": {
      "customer_tier": "enterprise",
      "days_active": 90
    },
    "metadata": {
      "owner": "customer-success-team",
      "version": "1.0"
    }
  }'`
    }
  ]}
/>

Then reference this configuration in your agent:

<CodePanel
  title="Reference Lambda Tool Configuration in Agent"
  layout="stacked"
  snippets={[
    {
      language: "json",
      code: `{
  "type": "lambda",
  "configuration_id": "tcf_enterprise_scoring"
}`
    }
  ]}
/>


## Create a lambda tool

To create a Lambda Tool, review the prerequisites, define a function, and
use the API. 

1. Meet the following prerequisites:
   - Access to the Vectara API with tool creation permissions.
   - Basic Python familiarity.
   - API key.
2. Define a simple function. The entry point must be `process`.  
   This example calculates customer scores based on their activity metrics:
    <CodePanel
    title="customer_score_calculator.py"
    layout="stacked"
    snippets={[
        {
        language: "python",
        code: `def process(order_count: int, total_revenue: float, days_active: int = 1) -> dict:
        """Calculate customer score based on activity metrics."""
        score = (order_count * 10 + total_revenue * 0.1) / days_active
        tier = 'gold' if score > 20 else 'silver' if score > 10 else 'bronze'
        return {
            'score': round(score, 2),
            'tier': tier
        }`
        }
    ]}
    />
    :::note Notes
    - Use type annotations for automatic schema discovery
    - Parameters with default values become optional in the schema
    - Return a JSON-serializable dictionary
    :::
3. Create the Lambda Tool with the API.
    <CodePanel
    title="Create Lambda Tool Request"
    layout="stacked"
    snippets={[
        {
        language: "curl",
        code: `curl -X POST https://api.vectara.io/v2/tools \\
    -H "Authorization: Bearer YOUR_API_KEY" \\
    -H "Content-Type: application/json" \\
    -d '{
        "type": "lambda",
        "language": "python",
        "name": "customer_score_calculator",
        "title": "Customer Score Calculator",
        "description": "Calculates a customer score based on order count, revenue, and days active. Returns score (0-100) and tier (bronze/silver/gold).",
        "code": "def process(order_count: int, total_revenue: float, days_active: int = 1) -> dict:\\n    score = (order_count * 10 + total_revenue * 0.1) / days_active\\n    tier = 'gold' if score > 20 else 'silver' if score > 10 else 'bronze'\\n    return {'score': round(score, 2), 'tier': tier}",
        "execution_configuration": {
        "max_execution_time_seconds": 30,
        "max_memory_mb": 100
        }
    }'`
        }
    ]}
    />
    **Example response:**
    <CodePanel
    title="Create Lambda Tool Response"
    layout="stacked"
    snippets={[
        {
        language: "json",
        code: `{
    "type": "lambda",
    "id": "tol_abc123",
    "name": "customer_score_calculator",
    "title": "Customer Score Calculator",
    "description": "Calculates a customer score based on order count, revenue, and days active.",
    "language": "python",
    "enabled": true,
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z",
    "input_schema": {
        "type": "object",
        "properties": {
        "order_count": {"type": "integer"},
        "total_revenue": {"type": "number"},
        "days_active": {"type": "integer", "default": 1}
        },
        "required": ["order_count", "total_revenue"]
    },
    "output_schema": {
        "type": "object",
        "properties": {
        "score": {"type": "number"},
        "tier": {"type": "string"}
        }
    },
    "function_definition": {
        "language": "python",
        "code": "def process(order_count: int, total_revenue: float, days_active: int = 1) -> dict:...",
        "validation_status": "valid"
    }
    }`
        }
    ]}
    />

The input and output schemas were automatically discovered from the function's
type annotations.

## Test Lambda Tools

Before deploying your Lambda Tool to agents, test it with sample inputs to
verify correct behavior.

### Test your Lambda Tool

<CodePanel
  title="Test Lambda Tool Request"
  layout="stacked"
  snippets={[
    {
      language: "curl",
      code: `curl -X POST https://api.vectara.io/v2/tools/tol_abc123/test \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "input": {
      "order_count": 50,
      "total_revenue": 5000,
      "days_active": 30
    },
    "timeout_seconds": 30
  }'`
    }
  ]}
/>

**Test Response:**

<CodePanel
  title="Test Lambda Tool Response"
  layout="stacked"
  snippets={[
    {
      language: "json",
      code: `{
  "type": "success",
  "output": {
    "score": 33.33,
    "tier": "gold"
  },
  "latency_millis": 125,
  "memory_used_mb": 12,
  "validation_results": {
    "input_valid": true,
    "output_valid": true,
    "validation_errors": []
  }
}`
    }
  ]}
/>

## Update lambda tools

Modify existing Lambda Tools to update code, configuration, or metadata:

<CodePanel
  title="Update Lambda Tool Request"
  layout="stacked"
  snippets={[
    {
      language: "curl",
      code: `curl -X PATCH https://api.vectara.io/v2/tools/tol_abc123 \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "lambda",
    "title": "Advanced Customer Score Calculator",
    "description": "Enhanced scoring with predictive analytics",
    "code": "def process(order_count: int, total_revenue: float, days_active: int = 1, loyalty_points: int = 0) -> dict:\\n    base_score = (order_count * 10 + total_revenue * 0.1) / days_active\\n    adjusted_score = base_score + (loyalty_points * 0.05)\\n    return {\\'score\\': round(adjusted_score, 2), \\'tier\\': \\'platinum\\' if adjusted_score > 30 else \\'gold\\' if adjusted_score > 20 else \\'silver\\'}",
    "execution_configuration": {
      "max_execution_time_seconds": 60,
      "max_memory_mb": 200
    }
  }'`
    }
  ]}
/>

When you update the code, schemas are automatically re-discovered from the 
new function signature.

## List all lambda tools

<CodePanel
  title="List Lambda Tools"
  layout="stacked"
  snippets={[
    {
      language: "curl",
      code: `curl -X GET "https://api.vectara.io/v2/tools?type=lambda" \\
  -H "Authorization: Bearer YOUR_API_KEY"`
    }
  ]}
/>

## Disable a lambda tool

<CodePanel
  title="Disable Lambda Tool"
  layout="stacked"
  snippets={[
    {
      language: "curl",
      code: `curl -X PATCH https://api.vectara.io/v2/tools/tol_abc123 \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "lambda",
    "enabled": false
  }'`
    }
  ]}
/>

## Delete a lambda tool

<CodePanel
  title="Delete Lambda Tool"
  layout="stacked"
  snippets={[
    {
      language: "curl",
      code: `curl -X DELETE https://api.vectara.io/v2/tools/tol_abc123 \\
  -H "Authorization: Bearer YOUR_API_KEY"`
    }
  ]}
/>

## Available Python libraries

Lambda Tools run in a secure sandbox with access to the 
following Python 3.12 standard library modules:

- **`json`** - JSON encoding and decoding
- **`math`** - Mathematical functions
- **`datetime`** - Date and time handling
- **`collections`** - Container datatypes (deque, Counter, OrderedDict, etc.)
- **`itertools`** - Iterator functions
- **`functools`** - Higher-order functions and operations on callable objects
- **`re`** - Regular expression operations
- **`time`** - Time access and conversions
- **`typing`** - Type hints and annotations (List, Dict, Optional, Union, TypedDict, etc.)

:::warning Security Constraints
Lambda Tools cannot:
- Install additional packages (pip install is not available)
- Access the network (all network operations are blocked)
- Write to the file system (read-only environment)
- Execute system commands
- Import modules outside the allowed list
:::
