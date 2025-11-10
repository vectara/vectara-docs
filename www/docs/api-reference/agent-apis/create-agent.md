---
id: create-agent
title: Create Agent API Definition
sidebar_label: Create Agent
---

import CodePanel from '@site/src/theme/CodePanel';

The Create Agent API lets you design and deploy smart AI agents
capable of managing sophisticated workflows, running tool-based
actions, and maintaining conversations.

By configuring agents with specific instructions, tools, and model parameters,
enterprises can deploy specialized agents for 
customer support, business intelligence, workflow automation, and
technical assistance scenarios.

:::tip Create an agent
You can create an agent in the [**Vectara Console**](/docs/console-ui/agents/create-an-agent), or you can use the
API. For more information, check out our [**Agents Quick Start**](/docs/agents/agents-quickstart).
:::

## Configure agents

Each agent is configured as follows:

* A unique `key` and `name` following the pattern agt_[*identifier*]. If you do not 
  provide an agent key, Vectara generates one based on the name automatically.
* A human-readable description.
* Optional instructions (system prompts).
* A list of available tools (referenced by name or ID).  
  When using the `corpora_search` tool, make sure that you already have access 
  to a corpus with data.
* Metadata and versioning controls.
* A _first_step_ definition that encompasses optional instructions for the 
  agent's behavior.  

:::note 
Currently, agents execute a single conversational step. The `first_step` name
reflects the platform's future support for multi-step agent workflows. For now,
treat `first_step` as "the step." It's the only step your agent executes.
:::

## Create Agent Request and Response

To create an agent, send a POST request to `/v2/agents` with the
following configuration sections. For a list of all agent configuration 
parameters, see [Create Agent API Definition](/docs/api-reference/agent-apis/create-agent).

### Basic Configuration

Core agent identification and metadata:

* `key` (string, optional): A user provided key that uniquely
  identifies this agent. If not provided, one will be auto-generated
  based on the agent name. Pattern: `[0-9a-zA-Z_-]+$`
* `name` (string, required): The human-readable name of the agent
* `description` (string, optional): Detailed description of agent
  purpose and capabilities
* `metadata` (object, optional): Arbitrary key-value pairs for
  organization and tracking
* `enabled` (boolean, optional): Whether agent is active upon creation
  (defaults to `true`)

### Tool Configurations

The `tool_configurations` parameter defines which capabilities the
agent can use. It's a map where each entry pairs a configuration name
with tool settings:

* **Key:** A user-defined name for the tool configuration (e.g.,
  `customer_search`, `web_search`). This name is how the agent refers
  to this specific tool configuration in events and logs.
* **Value:** An `AgentToolConfiguration` object that specifies:
  * `type` (string, required): The tool type - one of:
    * `corpora_search`: Query Vectara corpora using RAG
    * `web_search`: Search the web for current information
    * `mcp`: Connect to external Model Context Protocol servers
    * `lambda`: Execute custom Python functions (user-defined tools)
    * `structured_indexing`: Index structured documents into Vectara
      corpora
  * `argument_override` (object, optional): Hardcoded arguments that
    override LLM-provided values. When specified, the LLM cannot
    change these parameters. Supports dynamic references using
    `{"$ref": "path.to.value"}` syntax (e.g.,
    `{"$ref": "session.metadata.customer_id"}`)
  * `query_configuration` (object, required for `corpora_search`):
    Query settings including search parameters, generation settings,
    and reranking configuration - not exposed to the LLM

### Model Configuration

The `model` parameter controls the LLM used for agent reasoning:

* `name` (string, required): Model name (e.g., `gpt-4`)
* `parameters` (object, optional): Model-specific parameters like
  temperature and max_tokens
* `retry_configuration` (object, optional): Retry behavior for LLM
  interactions
  * `enabled` (boolean, optional): Enable or disable retry logic
    (default: `true`)
  * `max_retries` (integer, optional): Maximum retry attempts after
    initial failure, range 0-10 (default: `3`)
  * `initial_backoff_ms` (integer, optional): Initial delay before
    first retry in milliseconds, range 100-60000 (default: `1000`)
  * `max_backoff_ms` (integer, optional): Maximum delay between
    retries in milliseconds, range 1000-300000 (default: `30000`)
  * `backoff_factor` (float, optional): Exponential multiplier for
    backoff delays, range 1.0-10.0 (default: `2.0`)

### Step Configuration

The `first_step` parameter defines the agent's workflow and behavior:

* `type` (string, required): Step type (must be `conversational` -
  the only currently supported type)
* `instructions` (array, required): An ordered list of instructions
  that guide the agent's behavior. Instructions use the Apache
  Velocity template language and can reference context variables. You
  can mix reference and inline instructions:
  * **Reference instructions** - Reusable instructions stored
    separately that can be shared across multiple agents:
    * `type` (string, required): Must be `reference`
    * `id` (string, required): The instruction's unique identifier
      (pattern: `ins_[0-9a-zA-Z_-]+$`)
    * `version` (integer, optional): Specific version number to use.
      If omitted, the latest version is used. Note: When a referenced
      instruction is updated, agents must be explicitly updated to
      use the new version.
  * **Inline instructions** - Instructions defined directly within
    the agent configuration:
    * `type` (string, required): Must be `inline`
    * `name` (string, required): Human-readable name for this
      instruction
    * `template_type` (string, optional): Template language to use
      (must be `velocity`, which is the default)
    * `template` (string, required): The instruction content using
      Velocity template syntax. Use `${variableName}` to reference
      dynamic values.
    * `description` (string, optional): Optional description
      explaining the instruction's purpose
* `output_parser` (object, required): Configures how the agent's
  output is parsed and returned
  * `type` (string, required): Parser type (currently only `default`
    is supported, which uses native LLM tool calling)

### Response

The response includes the complete agent configuration with
system-generated fields including the unique agent key, creation
timestamp, and update timestamp.

### Example Request

<CodePanel
  title="Example agent request"
  snippets={[
    {
      language: 'json',
      code: `{
  "key": "customer_support",
  "name": "Customer Support Agent", 
  "description": "AI agent specialized in handling customer support inquiries using company documentation",
  "tool_configurations": {
    "customer_search": {
      "type": "corpora_search",
      "query_configuration": {
        "search": {
          "corpora": [
            {
              "corpus_key": "support_docs",
              "limit": 10
            }
          ]
        },
        "save_history": true
      }
    },
    "web_search": {
      "type": "web_search",
      "argument_override": {
        "limit": 5
      }
    }
  },
  "model": {
    "name": "gpt-4",
    "parameters": {
      "temperature": 0.1,
      "max_tokens": 1500
    },
    "retry_configuration": {
      "enabled": true,
      "max_retries": 3,
      "initial_backoff_ms": 1000,
      "max_backoff_ms": 30000,
      "backoff_factor": 2.0
    }
  },
  "first_step": {
    "type": "conversational",
    "instructions": [
      {
        "type": "reference",
        "id": "ins_customer_support_init",
        "version": 2
      },
      {
        "type": "inline",
        "name": "Additional Guidelines",
        "template": "Always be polite and professional. Today's date is $&#123;currentDate&#125;.",
        "template_type": "velocity"
      }
    ],
    "output_parser": {
      "type": "default"
    }
  },
  "metadata": {
    "department": "customer_service",
    "version": "1.0.0"
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
  "key": "customer_support",
  "name": "Customer Support Agent",
  "description": "AI agent specialized in handling customer support inquiries using company documentation",
  "tool_configurations": {
    "customer_search": {
      "type": "corpora_search",
      "argument_override": {
        "query": "customer support documentation"
      },
      "query_configuration": {
        "search": {
          "corpora": [
            {
              "corpus_key": "support_docs",
              "limit": 10
            }
          ]
        },
        "save_history": true
      }
    },
    "web_search": {
      "type": "web_search",
      "argument_override": {
        "limit": 5
      }
    }
  },
  "model": {
    "name": "gpt-4",
    "parameters": {
      "temperature": 0.1,
      "max_tokens": 1500
    },
    "retry_configuration": {
      "enabled": true,
      "max_retries": 3,
      "initial_backoff_ms": 1000,
      "max_backoff_ms": 30000,
      "backoff_factor": 2.0
    }
  },
  "first_step": {
    "type": "conversational",
    "instructions": [
      {
        "type": "reference",
        "id": "ins_customer_support_init",
        "version": 2
      },
      {
        "type": "inline",
        "name": "Additional Guidelines",
        "template": "Always be polite and professional. Today's date is $&#123;currentDate&#125;.",
        "template_type": "velocity"
      }
    ],
    "output_parser": {
      "type": "default"
    }
  },
  "metadata": {
    "department": "customer_service",
    "version": "1.0.0"
  },
  "enabled": true,
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}`
    }]}  
  layout="stacked"
/>


### Argument override option

Each agent also has an optional `argument_override` option that lets you
specify hardcoded arguments for specific search calls. Use this option to
override schema-defined fields like `query` or `limit` for enforcing fixed
behavior.

<CodePanel snippets={[{language: "json", code: `{
   "argument_override": {
     "query": "latest AI developments 2025",
     "limit": 10
   }
}`}]} title="Argument Override Example" layout="stacked" />


### Retry configuration

When agents interact with LLMs, transient failures may occur that interrupt
the conversation flow, including network timeouts, temporary server issues,
or reaching API rate limits. Without a retry mechanism, these temporary
issues cause your agent to fail immediately, resulting in a poor user
experience.

Vectara provides a retry configuration option for agents which detects these
recoverable failures and retries the request with exponential backoff
automatically.

The `RetryConfiguration` object controls the retry behavior for your agent's
interactions with the LLM. You define these settings when creating or
updating your agent model, and they apply to all LLM requests made by that
agent.

### Retry configuration parameters

- **enabled**: The boolean flag to enable or disable retry logic.
  - Default: `true`
- **max_retries**: The maximum number of retry attempts after the initial failure.
  - Range: 0-10
  - Default: `3`
- **initial_backoff_ms**: The initial delay in milliseconds before the first retry.
  - Range: 100-60000ms
  - Default: `1000ms`
- **max_backoff_ms**: The maximum delay in milliseconds between retries.
  - Range: 1000-300000ms
  - Default: `30000ms`
- **backoff_factor**: The exponential multiplier for calculating backoff delays.
  - Range: 1.0-10.0
  - Default: `2.0`


### Exponential backoff

Exponential backoff progressively increases the delay between retry attempts
to avoid overwhelming a recovering service. For example, with default
settings (initial: 1000ms, factor: 2.0, max: 30000ms):

- Attempt 1: 1000ms delay
- Attempt 2: 2000ms delay
- Attempt 3: 4000ms delay
- Attempt 4: 8000ms delay

The delay continues to grow exponentially until it reaches the
`max_backoff_ms` value, at which point it remains constant for any remaining
retry attempts.

## Example agent definition

This example shows a basic customer support agent configured with corpus 
search capabilities and inline instructions. The agent demonstrates the core 
components: tool configurations for searching support tickets, and a 
conversational first step with behavior guidelines.

<CodePanel
  title="Agent example"
  snippets={[
    {
      language: 'json',
      code: `{
   "name": "customer-support-agent",
   "description": "A customer support agent that can answer questions and create tickets.",
   "tool_configurations": {
     "search_support_tickets": {
       "type": "corpora_search",
       "query_configuration": {
         "search": {
           "corpora": ["support_tickets_corpus"]
         }
       }
     }
   },
   "first_step": {
     "type": "conversational",
     "instructions": [
       {
         "type": "inline",
         "name": "Be concise",
         "template": "Keep your responses brief and to the point. Use as few words as possible."
       }
     ],
     "output_parser": {
       "type": "default"
     }
   }
}`
    }]}  
  annotations={{
    json: [
      { line: 2, text: 'Agent name identifier' },
      { line: 3, text: 'Human-readable description of agent capabilities' },
      { line: 4, text: 'Tool configurations available to this agent' },
      { line: 5, text: 'Custom name for the support ticket search tool' },
      { line: 6, text: 'Tool type for searching a single corpus' },
      { line: 7, text: 'Query configuration for the search tool' },
      { line: 9, text: 'Corpus key for support tickets data' },
      { line: 14, text: 'First step defines the agent entry point behavior' },
      { line: 15, text: 'Conversational type for interactive responses' },
      { line: 16, text: 'Instructions array for agent behavior guidelines' },
      { line: 18, text: 'Inline instruction type for embedded prompts' },
      { line: 19, text: 'Name identifier for this instruction' },
      { line: 20, text: 'Template containing the agent behavior prompt' }
    ]
  }}
  layout="stacked"
/>


## Error Responses

The API returns standard HTTP error codes with detailed error
information:

| HTTP Code | Error Code | Description |
|-----------|------------|-------------|
| 400 | `invalid_request` | Missing required fields or malformed request structure |
| 400 | `invalid_tool_reference` | Referenced tool does not exist or is inaccessible |
| 400 | `invalid_instruction_reference` | Referenced instruction does not exist or is inaccessible |
| 400 | `invalid_model_configuration` | Invalid model name or unsupported parameters |
| 401 | `unauthorized` | Invalid or missing API key |
| 403 | `forbidden` | Insufficient permissions for agent creation |
| 429 | `rate_limit_exceeded` | Agent creation rate limit exceeded |
