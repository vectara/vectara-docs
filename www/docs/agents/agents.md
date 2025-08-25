---
id: agents
title: Agents
sidebar_label: Agents
---

import CodePanel from '@site/src/theme/CodePanel';

Agents represents the core orchestration unit in the Vectara platform. The 
agent decides how to respond to user input, when to invoke tools, and how to 
manage conversation state. Each agent is configured with: 

* A unique ID and name following the pattern `agt_[identifier]`
* A human-readable description
* One or more instructions
* A list of available tools (referenced by name or ID)
* Optional access to corpora with the Corpus Search tool
* Metadata and versioning controls
* A _first_step_ definition for the entry point logic.

Agents operate through a conversational step architecture, processing user 
input through reasoning, tool execution, and response generation phases. 
The step-based design enables complex multi-turn workflows and intelligent 
tool orchestration.

## Example Agent Definition

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




## Model configuration

Agents use large language models for reasoning and response generation. You 
can configure:

- **Model Selection**: Choose from available models like GPT-4o.
- **Parameters**: Adjust temperature, max tokens, and other model-specific settings
- **Cost Optimization**: Balance performance with token usage

## Create an agent

You can create an agent with the wizard in the UI, or you can use the API.