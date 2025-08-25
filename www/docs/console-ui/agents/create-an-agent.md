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


## Example: Create a documentation support agent

In this example, you create a document support agent that answers customer 
support questions by searching our internal support documentation corpus and 
the public web.

### Prerequisites

* A deployed corpus containing your reference content.
    * In this example, the corpus_key is `techdocs`.
    * Ensure your corpus is populated with data.
* Corpus Search tool enabled in your account.
* Web Search tool enabled in your account.
* Agent creation permissions in the Vectara Console.

To create the agent:
1. In the Vectara Console, go to **Agents**, and click **Add Agent**.
2. On the General step:
   1. Enter **Support Docs** as the name.
   2. Provide a description about the agent.
   3. Click **Next**.
3. On the Model step:
   1. Select a model name like **gpt-4o**.
   2. Add a temperature of **0.3** for more consistent answers compared to creativity.
   3. Click **Next**. 
4. On the Instructions step:
   1. Provide the system prompt that guides the agent’s behavior:  
`“You are a customer support assistant. When answering a query, first check the internal support documentation corpus. If the corpus does not contain a relevant answer, perform a web search. Always provide concise, accurate, and helpful responses. Include sources when possible.”`
   2. Click **Next**.
5. On the Tools step, add the Corpus Search and Web Search tools individually:
   1. Click **Add first tool**, and select **Corpus Search**.
   2. Paste the following input override:
   3. Click **Add tool**, and select **Web Search**.
   4. Paste the following input override:
   5. Click **Next**.
6. The final panel is the **Advanced** step.  
   Agent metadata attaches additional information or attributes to your agent, 
   which helps with organization, tracking, and integration. Think of it as a 
   set of custom labels or tags you can assign to the agent using a JSON format.  
   For example:
    1.  Organization: Categorize agents by team or department: `{ "team": "HR" } or { "department": "support" }`
    2.  Tracking: Apply versioning or creation details: `{ "version": "1.0", "created_by": "Paul" }`
    3.  Integration: Add fields for external systems `{ "integration_id": "12345" }`.  
   For this tutorial, you can leave metadata blank (or add optional fields if needed).
    4. Click **Create Agent**.
7. Go back to Agents, open your new Support Docs agent, and test by entering a query.  
   
The agent should first search your techdocs corpus and fall back to web search if needed.