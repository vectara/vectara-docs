---
id: example-agents
title: Example Agents
sidebar_label: Example Agents
---

import CodePanel from '@site/src/theme/CodePanel';

This section provides example agents that you can create for your enterprise, 
including a web research assistant, documentation support agent, and internal 
knowledge base expert. 

## Example: Research assistant (no corpus required)

For a quick start, try creating a research assistant that can search the web. 
This agent requires no corpus setup and demonstrates core agent capabilities.

Follow the [Agent Quick Start](/docs/agents/agents-quickstart) guide to create an 
agent in minutes using either the Console UI or API. This agent:

- Searches the web for current information
- Provides cited responses
- Handles general knowledge and recent events
- Perfect for testing agent functionality

**Example queries**:
- "What are the latest developments in agentic AI?"
- "What is the population of the United States of America?"
- "How many people will attend games at the next FIFA World Cup?"

---

## Example: Create a documentation support agent

In this example, you create a document support agent that answers customer 
support questions by searching our internal support documentation corpus and 
the public web.

### Prerequisites

* A deployed corpus containing your reference content.
    * In this example, the corpus_key is `techdocs`.
    * Ensure your corpus is populated with data, such as technical documentation 
  for your organization.
* Verify that the Corpus Search tool is enabled in your account.
* Verify that the Web Search tool is enabled in your account.
* Agent creation permissions in the Vectara Console.

### Create the agent

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
   1. Click **Next**.
1. On the Tools step, add the Corpus Search and Web Search tools individually:
   1. Click **Add first tool**, and select **Corpus Search**.
   2. Paste the following input override:
   3. Click **Add tool**, and select **Web Search**.
   4. Paste the following input override:
   5. Click **Next**.
2. The final panel is the **Advanced** step.  
   Agent metadata attaches additional information or attributes to your agent, 
   which helps with organization, tracking, and integration. Think of it as a 
   set of custom labels or tags you can assign to the agent using a JSON format.  
   For example:
    1.  Organization: Categorize agents by team or department: `{ "team": "HR" } or { "department": "support" }`
    2.  Tracking: Apply versioning or creation details: `{ "version": "1.0", "created_by": "Paul" }`
    3.  Integration: Add fields for external systems `{ "integration_id": "12345" }`.  
   For this tutorial, you can leave metadata blank (or add optional fields if needed).
    4. Click **Create Agent**.
3. Go back to Agents, open your new Support Docs agent, and test by entering a query.  
   
The agent should first search your techdocs corpus and fall back to web search if needed.

---

## Example: Create an internal knowledge base expert

Employees spend a significant amount of time searching 
for information in the company's internal knowledge base, which includes HR 
policies, technical documentation, and best practice guides.

In this example, you create an agent that acts as an Internal Knowledge Base 
Expert, using the `CorporaSearchTool` to provide quick and accurate answers to 
employee questions.

### Agent configuration

*   **Name:** `Internal Knowledge Base Expert`
*   **Description:** `An agent that answers employee questions based on the company's internal knowledge base.`
*   **Tools:**
    *   `CorporaSearchTool`: Configured to search across all relevant internal corpora (e.g., `hr-policies`, `tech-docs`, `best-practices`).
*   **Instructions:**
    *   `"Provide a clear and concise answer to the user's question."`
    *   `"If the answer is found in multiple documents, synthesize the information into a single response."`
    *   `"Include links to the source documents."`

### Parameter overrides

When creating the agent, you can provide override values for the 
`CorporaSearchTool`. Here are some examples of how to do this:

**Example 1: Use a specific generation preset**

This example shows how to use a specific generation preset to control the style and tone of the agent's responses.

<CodePanel
  title="Generation Preset Example"
  snippets={[
    {
      language: 'json',
      code: `{
   "name": "Internal Knowledge Base Expert",
   "description": "An agent that answers employee questions based on the internal knowledge base.",
   "tools": {
     "tol_corpus_search": {
       "type": "inline",
       "tool_type": "corpora_search",
       "query_configuration": {
         "generation": {
           "generation_preset_name": "internal-qa-preset"
         }
       }
     }
   }
}`
    }]}
  layout="stacked"
/>

**Example 2: Customize the search parameters**

This example shows how to customize the search parameters to use a specific reranker and lexical interpolation.

<CodePanel
  title="Search Parameters Example"
  snippets={[
    {
      language: 'json',
      code: `{
   "name": "Internal Knowledge Base Expert",
   "description": "An agent that answers employee questions based on the internal knowledge base.",
   "tools": {
     "tol_corpus_search": {
       "type": "inline",
       "tool_type": "corpora_search",
       "query_configuration": {
         "search": {
           "reranker": {
             "type": "customer_reranker",
             "reranker_name": "Rerank_Multilingual_v1"
           },
           "lexical_interpolation": 0.4
         }
       }
     }
   }
}`
    }]}
  layout="stacked"
/>

## Example agent interaction

**User Query:** `"What is the company's policy on PTO?"`

**Agent Actions:**

1.  The agent receives the query and understands that it needs to search the 
   internal knowledge base.
2.  It invokes the `CorporaSearchTool` with the user's query, searching across 
   the `hr-policies` corpus.
3.  The `CorporaSearchTool` returns the relevant sections from the vacation and 
   sick time policy document.
4.  The agent processes the search results and generates a clear and concise 
   answer, summarizing the key points of the policy.
5.  It also provides a direct link to the full vacation and sick time policy 
   document for further reading.

**Business Value:** This agent improves employee productivity by providing instant 
access to information. It also ensures that employees receive consistent and 
accurate information, reducing the burden on HR and other support teams.
