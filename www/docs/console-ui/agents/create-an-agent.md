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

1. Access the **Agents** page from the sidebar.
2. Click **Add Agent**.  
   ![Agent page](/img/agents/agents_page.png)
3. **General**: Define initial information about the agent.
    * Enter a **Name** like *My Custom Agent* or *Chatbot*.
    * Add a **Description** like "Handles queries on internal data".  
  ![General tab](/img/agents/general_tab.png)
1. **Model**: Choose the LLM that you want to associate with this agent.
    * Select a **Model name** such as *gpt-4o*.
    * Configure **Parameters** in JSON for response control. For example:  
  `{ "temperature": 0.5, "max_completion_tokens": 1024 }` 
  ![Model tab](/img/agents/model_tab.png)
1. **Instructions**: Set the behavior for the agent
    * Add at least one **Instruction** like “Respond concisely and use tools when relevant. Prioritize RAG for internal knowledge”
    * Optionally add more instructions from the library.  
    ![Instructions tab](/img/agents/instructions_tab.png)
2. **Tools**: Enable capabilities for the agent.  
    ![Tools tab](/img/agents/tools_tab.png)
    * Add tools like Corpus Search `tol_corpus_search` and Web Search `tol_web_search`
    * For each tool, set **Input overrides** in JSON.  
  `{ "search": { "corpora": [ { "corpus_key": "my-corpus" } ] } }`  
  ![Tools override](/img/agents/tools_override.png)
1. **Advanced**: Fine-tune the agent with custom metadata.
    * Add **Metadata** in JSON.  
  `{ "team": "support" }` or `{ "team": "engineering" }`
    * Click **Create Agent** to finish.  
  ![Advanced tab](/img/agents/advanced_tab.png)

After creating the agent, test it in the Vectara chat interface.
