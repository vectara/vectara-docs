---
id: agents
title: Agents
sidebar_label: Agents
---

import CodePanel from '@site/src/theme/CodePanel';

Agents represents the core orchestration unit in the Vectara platform. The 
agent decides how to respond to user input, when to invoke tools, and how to 
manage conversation state. Each agent is configured with: 

```mermaid
flowchart TD
    %% User Input and Response Flow
    User[User Query] --> Reasoning[Reasoning LLM Brain Understand user query and intent]
    Reasoning --> Planning[Planning Build execution plan using available tools]
    Planning --> Response[Response Collect information and respond]
    Response --> Output[Response]

    %% Orchestration Flow
    Planning --> OP

    %% Tools and Agents in Orchestration Pipeline
    subgraph OP[🔧 Orchestration Pipeline 🔧]
        Tool1[Tool 1]
        Tool2[Tool 2]
        Tool3[Tool 3]
        Agent1[Agent 1]
        Agent2[Agent 2]
    end

    %% Orchestration pipeline links outside agent
    
    Tool1 <--> RAG1[Vectara RAG 1]
    Tool2 <--> RAG2[Vectara RAG 2]
    Tool3 <--> API[API]
    Agent1 <--> DB[Database]
    Agent2 <--> Custom[Custom Service]

    %% Grouping
    subgraph Agent [🧠 Agent 🧠]
        Reasoning
        Planning
        Response
        OP
    end

    classDef llm fill:#DCE6FF,stroke:#2B6CB0,color:#000;
    classDef pipeline fill:#EDF2F7,stroke:#718096,color:#000;
    classDef tools fill:#E6FFFA,stroke:#319795,color:#000;
    classDef sources fill:#FFF5F5,stroke:#E53E3E,color:#000;

    class Reasoning,Planning,Response llm;
    class OP pipeline;
    class Tool1,Tool2,Tool3,Agent1,Agent2 tools;
    class RAG1,RAG2,API,DB,Custom sources;
```

## Agent Prerequisites

Before creating an agent, you must:
1. **Define tools**: Configure tools first, as they are required for agent 
   creation
2. **Configure instructions**: Instructions are required to guide the behavior 
3. of the agent

Each agent is configured with:

* A unique ID and name following the pattern agt_[identifier]
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