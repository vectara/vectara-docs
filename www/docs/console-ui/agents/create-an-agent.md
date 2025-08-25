---
id: create-an-agent
title: Create an Agent
sidebar_label: Create an Agent
---

This section provides a step-by-step procedure for creating a custom AI agent 
in the Vectara platform. Agents are configurable AI entities that can leverage 
models, instructions, and tools to handle queries intelligently. You can 
create agents with the Vectara Console or programmatically through the API. 
The Console is ideal for quick setups, while the API suits automation or advanced integrations.

## Prerequisites

* Access to a Vectara account with appropriate permissions.
* For RAG tool usage: At least one populated corpus (uploaded documents or data sources).
* Familiarity with JSON for overrides and parameters.
* Supported models ("gpt-4o", "claude-sonnet-4").

The agent creation process follows a linear flow in the UI:

1. **General**: Define initial information about the agent.
    * Enter a **Name** like *My Custom Agent*.
    * Add a **Description** like "Handles queries on internal data".
2. **Model**: Choose the LLM that you want to associate with this agent.
    * Select a **Model name** such as *claude-sonnet-4*.
    * Configure **Parameters** in JSON for response control.  
  `{ "temperature": 0.5, "max_completion_tokens": 1024 }`
3. **Instructions**: Set the behavior for the agent
    * Add at least one **Instruction** like “Respond concisely and use tools when relevant. Prioritize RAG for internal knowledge”
    * Optionally add more instructions from the library.
4. **Tools**: Enable capabilities for the agent.
    * Add tools like Corpus Search `tol_corpus_search` and Web Search `tol_web_search`
    * For each tool, set **Input overrides** in JSON.  
  `{ "search": { "corpora": [ { "corpus_key": "my-corpus" } ] } }`
5. **Advanced**: Fine-tune the agent with custom metadata.
    * Add **Metadata** in JSON.  
  `{ "team": "support" }`
    * Click **Create Agent** to finish.

After creating the agent, test it in the Vectara chat interface.


