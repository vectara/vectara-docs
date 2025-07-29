---
id: agents
title: Agents
sidebar_label: Agents
---

import CodePanel from '@site/src/theme/CodePanel';

An agent represents the core orchestration unit in the Vectara platform. The 
agent decides how to respond to user input, when to invoke tools, and how to 
manage conversation state. Each agent is configured with:

* A unique ID and name
* A human-readable description
* One or more instructions (referenced by name)
* A global list of available tools (referenced by name or ID)
* Optional access to corpora for retrieval
* Metadata (owner, department, version)
* A _first_step_ definition that a configures the agent’s entry point.  
  This includes the initial instructions and output parsing logic.

Because agents are structured as a _step machine,_ they can be extended to 
support more advanced, multi-step workflows in the future.

Agents operate in a conversational loop by default, continually interpreting 
new input and responding appropriately, but the API design anticipates 
conditional branching and workflow orchestration in future releases.

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
