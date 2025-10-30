---
id: tools
title: Tools
sidebar_label: Tools
---

import CodePanel from '@site/src/theme/CodePanel';

Tools provide agents with capabilities to interact with data and external 
systems. An agent uses the conversational context and its instructions to 
decide which tools to call, and how use the tools' responses to respond to 
the user's query.

Vectara offers a number of useful tools out-of-the-box, but you can also 
build your own. For a complete list of available tools, refer to the 
[Tools API docs](/docs/rest-api/tools).


Tools represent external or internal capabilities that agents can invoke 
dynamically. They are defined by:

* A unique ID (`tol_abcd`) and name.
* A description of their function.
* An input schema describing accepted parameters (in JSON Schema format).
* Metadata for categorization.
* Runtime availability (enabled or disabled).

## Searching corpora with tools

You configure corpus search behavior for Vectara agents using the 
`query_configuration` parameter within the `corpora_search` tool. This 
parameter uses the same `search` and `generation` object formatting as shown 
in [Query API](/docs/api-reference/search-apis/search) and [Advanced Single Corpus Query](/docs/rest-api/query-corpus). Before using this tool, 
ensure that you have at least one indexed corpus with data. The LLM cannot 
modify these predefined search parameters during
conversation.

For more details about the different corpus objects, see 
[Configure Query Parameters](/docs/api-reference/search-apis/query-configuration).

## Agent configuration examples

This example demonstrates a basic configuration.

<CodePanel
  title="Basic query configuration example"
  snippets={[
    {
      language: 'json',
      code: `{
   "tool_configurations": {
     "knowledge_base_search": {
       "type": "corpora_search",
       "query_configuration": {
         "search": {
           "corpora": [
             {
               "corpus_key": "customer-guides"
             }
           ]
         }
       }
     }
   }
}`
    }
  ]}
  annotations={{
    json: [
      { line: 2, text: 'Tool configurations object containing all agent tools' },
      { line: 3, text: 'Custom name for this knowledge base search tool' },
      { line: 4, text: 'Tool type for searching Vectara corpora' },
      { line: 5, text: 'Query configuration with search settings' },
      { line: 6, text: 'Search configuration defining which corpora to query' },
      { line: 9, text: 'Unique corpus identifier to search' }
    ]
  }}
  layout="stacked"
/>
