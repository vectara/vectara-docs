---
id: instructions
title: Instruction
sidebar_label: Instruction
---

import CodePanel from '@site/src/theme/CodePanel';

Instructions serve as reusable blocks of system prompt logic. They guide the 
agent’s reasoning in each step by setting expectations, tone, or rules of 
engagement for the LLM. Defined independently, they are referenced by name and 
can be updated without touching agent configurations. An agent references a 
particular version of the instruction. Each instruction includes the following:

* A unique ID (ins_abcd)
* A name and description. The name must be unique across all instructions per customer
* A prompt template
* Optional metadata for versioning or rollout control

:::note
An agent references a particular version of the instruction. The version 
number is optional but can be specified in the request, or the latest version 
is selected. You must update the agent refer to any newer versions of 
instructions.
:::

Instructions are the system-level configuration for agent behavior. They use 
the Velocity templating engine to allow for dynamic content.

## Shared Instructions

Shared instructions are referenced by ID across multiple agents. You can 
define instructions independently on inline. Each instruction includes:

* A unique ID following the pattern *ins_*[identifier]
* A name that must be unique across all instructions per customer
* A description of the instruction's purpose
* A prompt template with support for variables populated from tool context
* Version management for controlled updates
* Optional metadata for categorization

When an instruction is updated, the changes create a new version. Agents 
reference a specific version of the instruction, so updates are not 
automatically reflected until the agent is explicitly updated to reference the 
newer version. The version number is optional in requests but can be specified 
for precise control. If omitted, the latest version is used.

## Inline Instructions

Inline instructions have a one-to-one relationship with the agent and cannot 
be used with other agents. They are automatically deleted when the agent is 
deleted. This model provides simplified management for agent-specific 
behavioral logic that doesn't need to be shared.

### Template Context

Instructions use the Velocity templating engine with access to tool 
context during execution. The template receives information about available 
tools and their execution results. Agent and session context are not included 
in the template scope for this version.

Instructions are the system-level configuration for agent behavior and provide 
the flexibility to define consistent reasoning patterns across different 
agents or create specialized behavior for specific use cases.

<CodePanel
  title="Instruction Example"
  snippets={[
    {
      language: 'json',
      code: `{
   "id": "ins_support_agent_instructions",
   "name": "support-agent-instructions",
   "description": "Instructions for a customer support agent.",
   "prompt": "You are a customer support agent who helps users resolve their issues."
}`
    }]}
  annotations={{
    json: [
      { line: 2, text: 'The unique ID of the instruction.' },
      { line: 3, text: 'The name of the instruction.' },
      { line: 4, text: 'A description of the instruction.' },
      { line: 5, text: 'The prompt template that uses Velocity templating' }
    ]
  }}
  layout="stacked"
/>
