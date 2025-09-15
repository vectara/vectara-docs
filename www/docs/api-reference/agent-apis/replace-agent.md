---
id: replace-agent
title: Replace Agent API Definition
sidebar_label: Replace Agent
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodePanel from '@site/src/theme/CodePanel';

# Replace Agent API Definition

The Replace Agent API enables you to completely replace an existing agent's configuration, including its corpora, tools, and generation presets. This endpoint performs a full replacement of the agent definition, unlike the Update Agent API which only modifies specified fields.

**Endpoint:** `PUT /v2/agents/{agent_key}`

## Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `agent_key` | string | The unique key of the agent to replace |

## Request Body

The request body should contain a complete agent definition with all required fields:

<CodePanel
  title="Replace agent request"
  snippets={[
    {
      language: 'json',
      code: `{
  "name": "updated-customer-support",
  "description": "Updated customer support agent with new capabilities",
  "tool_configurations": {
    "support_search": {
      "type": "corpora_search",
      "query_configuration": {
        "search": {
          "corpora": [{"corpus_key": "support-docs-v2"}],
          "limit": 5
        }
      }
    },
    "web_search": {
      "type": "web_search",
      "argument_override": {
        "limit": 10
      }
    }
  },
  "first_step": {
    "type": "conversational",
    "instructions": [{
      "type": "inline",
      "name": "Support Assistant",
      "template": "You are a customer support assistant. Always be helpful and search internal docs first."
    }],
    "output_parser": {
      "type": "default"
    }
  },
  "model": {
    "name": "gpt-4",
    "parameters": {
      "temperature": 0.3,
      "max_tokens": 1000
    }
  },
  "metadata": {
    "version": "2.0",
    "team": "support"
  },
  "enabled": true
}`
    }
  ]}
  annotations={{
    json: [
      { line: 2, text: 'Updated agent name' },
      { line: 3, text: 'New description' },
      { line: 4, text: 'Complete tool configurations object' },
      { line: 5, text: 'Corpora search tool configuration' },
      { line: 12, text: 'Web search tool configuration' },
      { line: 19, text: 'First step with instructions' },
      { line: 22, text: 'Inline instruction definition' },
      { line: 29, text: 'Model configuration' },
      { line: 35, text: 'Updated metadata' },
      { line: 38, text: 'Agent enabled status' }
    ]
  }}
  layout="stacked"
/>

## Response

<Tabs>
<TabItem value="200" label="200 - Success">

```json
{
  "key": "agt_customer_support_123",
  "name": "updated-customer-support", 
  "description": "Updated customer support agent with new capabilities",
  "tool_configurations": {
    "support_search": {
      "type": "corpora_search",
      "query_configuration": {
        "search": {
          "corpora": [{"corpus_key": "support-docs-v2"}],
          "limit": 5
        }
      }
    },
    "web_search": {
      "type": "web_search",
      "argument_override": {
        "limit": 10
      }
    }
  },
  "first_step": {
    "type": "conversational",
    "instructions": [{
      "type": "inline",
      "name": "inl_support_001",
      "description": "Support assistant instruction",
      "template": "You are a customer support assistant. Always be helpful and search internal docs first.",
      "enabled": true
    }],
    "output_parser": {
      "type": "default"
    }
  },
  "model": {
    "name": "gpt-4",
    "parameters": {
      "temperature": 0.3,
      "max_tokens": 1000
    }
  },
  "metadata": {
    "version": "2.0",
    "team": "support"
  },
  "enabled": true,
  "created_at": "2025-01-14T10:00:00.000Z"
}
```

</TabItem>
<TabItem value="400" label="400 - Bad Request">

```json
{
  "field_errors": {
    "name": "Agent name is required",
    "tool_configurations": "At least one tool configuration is required"
  },
  "request_id": "req_123"
}
```

</TabItem>
<TabItem value="404" label="404 - Not Found">

```json
{
  "message": "Agent not found",
  "request_id": "req_456"
}
```

</TabItem>
<TabItem value="403" label="403 - Forbidden">

```json
{
  "message": "Permissions do not allow replacing this agent",
  "request_id": "req_789"
}
```

</TabItem>
</Tabs>

## Usage Examples

<Tabs>
<TabItem value="curl" label="cURL">

<CodePanel
  title="Replace agent with cURL"
  snippets={[
    {
      language: 'bash',
      code: `curl -X PUT https://api.vectara.io/v2/agents/agt_customer_support_123 \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "updated-customer-support",
    "description": "Updated customer support agent with new capabilities",
    "tool_configurations": {
      "support_search": {
        "type": "corpora_search",
        "query_configuration": {
          "search": {
            "corpora": [{"corpus_key": "support-docs-v2"}],
            "limit": 5
          }
        }
      }
    },
    "first_step": {
      "type": "conversational",
      "instructions": [{
        "type": "inline",
        "name": "Support Assistant",
        "template": "You are a customer support assistant. Always be helpful and search internal docs first."
      }],
      "output_parser": {
        "type": "default"
      }
    },
    "model": {
      "name": "gpt-4",
      "parameters": {
        "temperature": 0.3,
        "max_tokens": 1000
      }
    },
    "enabled": true
  }'`
    }
  ]}
  layout="stacked"
/>

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

url = "https://api.vectara.io/v2/agents/agt_customer_support_123"

headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}

data = {
    "name": "updated-customer-support",
    "description": "Updated customer support agent with new capabilities",
    "tool_configurations": {
        "support_search": {
            "type": "corpora_search",
            "query_configuration": {
                "search": {
                    "corpora": [{"corpus_key": "support-docs-v2"}],
                    "limit": 5
                }
            }
        }
    },
    "first_step": {
        "type": "conversational",
        "instructions": [{
            "type": "inline",
            "name": "Support Assistant",
            "template": "You are a customer support assistant. Always be helpful and search internal docs first."
        }],
        "output_parser": {
            "type": "default"
        }
    },
    "model": {
        "name": "gpt-4",
        "parameters": {
            "temperature": 0.3,
            "max_tokens": 1000
        }
    },
    "enabled": True
}

response = requests.put(url, headers=headers, json=data)
print(response.json())
```

</TabItem>
</Tabs>

## Difference from Update Agent

- **Replace Agent (PUT)**: Completely replaces the entire agent configuration
- **Update Agent (PATCH)**: Only modifies specified fields, leaving others unchanged

Use Replace Agent when you want to:
- Completely redefine an agent's configuration
- Ensure the agent has only the specified tools and settings
- Reset all fields to new values