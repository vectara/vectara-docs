---
id: tools
title: Tools
sidebar_label: Tools
---

import CodePanel from '@site/src/theme/CodePanel';

Tools are external or internal capabilities that agents can invoke 
dynamically. They are defined by:

* A unique ID and name
* A description of their function
* An input schema describing accepted parameters (in JSON Schema format)
* Metadata for categorization
* Runtime availability (enabled/disabled)

## Examples of tools:

* **tol_web_search:** Retrieves web search results
* **tol_email_sender:** Sends templated emails
* **tol_ticket_creator:** Opens support tickets
* **tol_corpus_search:** Searches across selected corpora

Tools are discovered and synchronized from registered MCP servers. When a tool 
is updated on its source server, the changes are automatically reflected in 
the Vectara platform during synchronization.


### Example Tool Definition

<CodePanel
  title="Tool Example"
  snippets={[
    {
      language: 'json',
      code: `{
    "id": "tol_corpus_search",
    "name": "corpus_search_tool",
    "description": "A tool for searching a knowledge base.",
    "server_id": "tsr_internal_tools",
    "parameters": {
      "type": "object",
      "properties": {
        "query": {
          "type": "string",
          "description": "The query to search for."
        }
      },
       "required": ["query"]
    }
}`
    }]}
  annotations={{
    json: [
      { line: 2, text: 'The unique ID of the tool.' },
      { line: 3, text: 'The name of the tool.' },
      { line: 4, text: 'A description of the tool.' },
      { line: 5, text: 'The ID of the Tool Server that exposes this tool.' },
      { line: 6, text: 'The parameters that this tool accepts, in JSON Schema format.' }
    ]
  }}
  layout="stacked"
/>