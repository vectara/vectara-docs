---
id: instructions
title: Instructions
sidebar_label: Instructions
---

import CodePanel from '@site/src/theme/CodePanel';

Instructions serve as reusable blocks of system prompt logic. They guide the 
agent’s reasoning in each step by setting expectations, tone, or rules of 
engagement for the LLM. Defined independently, they are referenced by name 
and can be updated without touching agent configurations. Each instruction 
includes the following:

* A name and description
* A prompt template with support for variables populated from agent, tool, or 
* session context
* Optional metadata for versioning or rollout control

Instructions are the system-level configuration for agent behavior. They use 
the Velocity templating engine to allow for dynamic content.

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
