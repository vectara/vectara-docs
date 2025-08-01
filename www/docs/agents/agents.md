---
id: agents
title: Agents
sidebar_label: Agents
---

import CodePanel from '@site/src/theme/CodePanel';

An agent is the core orchestration unit in Vectara's platform. It decides how 
to respond to user input, when to invoke tools, and how to manage conversation 
state. 

## Agent Prerequisites

Before creating an agent, you must:
1. **Define tools**: Configure tools first, as they are mandatory for agent 
   creation
2. **Configure instructions**: Instructions are required to guide the behavior 
3. of the agent

Each agent is configured with:

* A unique ID and name following the pattern agt_[identifier]
* A human-readable description
* **(Required)** Tool configuration specifying available MCP tools and argument 
  bindings
* Model configuration including parameters like temperature and max tokens
* **(Required)** Instructions that guide agent reasoning and behavior (referenced 
  by ID or defined inline)
* Metadata for tracking (owner, department, version)
* Enabled status for availability control

A timer tool is automatically provided as a default to ensure agents have 
basic functionality and don't fail due to lack of tool configuration.

Agents operate through a conversational step architecture, processing user 
input through reasoning, tool execution, and response generation phases. 
The step-based design enables complex multi-turn workflows and intelligent 
tool orchestration.

### Example Agent Definition

<CodePanel
  title="Agent example"
  snippets={[
    {
      language: 'json',
      code: `{
   "name": "customer-support-agent",
   "description": "A customer support agent that can answer questions and create tickets.",
   "instructions": [
     {
       "name": "support-agent-instructions"
     }
   ],
   "tools": [
     {
       "id": "tol_corpus_search"
     },
     {
       "id": "tol_ticket_creator"
     }
   ],
   "first_step": {
     "instruction_name": "support-agent-instructions"
   }
}`
    }]}  
  annotations={{
    json: [
      { line: 2, text: 'The name of the customer support agent' },
      { line: 3, text: 'A description about the customer support agent.' },
      { line: 6, text: 'The first set of instructions for the agent.' },
      { line: 11, text: 'The first tool ID of this agent.' },
      { line: 14, text: 'The second tool ID of this agent.' },
      { line: 18, text: 'The definition that configures the entry point of the agent.' }
    ]
  }}
  layout="stacked"
/>
