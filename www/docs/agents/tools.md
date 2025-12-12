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
in [Advanced Single Corpus Query](/docs/rest-api/query-corpus). Before using this tool, 
ensure that you have at least one indexed corpus with data. The LLM cannot 
modify these predefined search parameters during
conversation.

For more details about the different corpus objects, see 
[Configure Query Parameters](/docs/rest-api/queries).

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

## Working with artifact-based tools

Some agent tools work with files uploaded to a session's workspace. Rather 
than embedding file contents in every request, these tools use artifact references.

### Document conversion tool

The document conversion tool extracts content from uploaded files and converts 
them to markdown format. It accepts an artifact reference as input and creates 
a new artifact containing the markdown output. 

Supported file types include:
- PDF documents (`.pdf`)
- Microsoft Word (`.doc`, `.docx`)
- Microsoft PowerPoint (`.ppt`, `.pptx`)
- Images with OCR capability (`.jpg`, `.png`)

For example ahe tool reads a PDF artifact, converts it to markdown, stores 
the result as a new artifact, and returns the new artifact reference to the 
agent.

### Structured document indexing tool

The structured document indexing tool adds content from artifacts to corpora. 
It references pre-converted markdown artifacts instead of requiring inline 
document content, enabling efficient indexing workflows. When the agent calls 
this tool, it references the artifact to index.