---
id: citations
title: Citations in Search and Retrieval
sidebar_label: Citations
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import {vars} from '@site/static/variables.json';
import { Spacer } from "@site/src/components/ui/Spacer";
import CodePanel from '@site/src/theme/CodePanel';

Citations provide important source attribution in query results, enabling 
users to verify information and trace content back to its original sources. 
This transparency is essential for building trust in AI-generated content and 
supporting fact-checking workflows.

## How citations work

When Vectara generates summaries or retrieval results, it automatically 
includes citations that reference the specific sources used. These citations 
create a direct link between the generated content and the underlying 
documents, ensuring traceability and accountability.

### Citation numbering

Citations appear in the format `[number]` within summary text, where:
- Numbers start from 1
- Each number corresponds to a result in the `search_results` array
- Numbers increment sequentially for each unique source referenced

## Example with citations

Here's an example query response showing how citations appear in a summary:

<CodePanel
  title="Example response with citations"
  snippets={[
    {
      language: 'json',
      code: `{
   "summary": "The Infinite Improbability Drive is a form of propulsion developed by the Galactic 
     Government on Damogran which allows for vast interstellar distances to be crossed in a 
     nothingth of a second without the use of hyperspace [3]. It is incredibly powerful and rare, 
     with only rumors circulating of its existence prior to its development [1]. It has been known 
     to cause problems with other forms of propulsion, like the photon drive [4]. It is a remarkable 
     breakthrough in Improbability Physics [2].",
   "search_results": [
     {
       "text": "Ford was wildly excited. \\"Arthur!\\" he said, \\"this is fantastic! We've been picked 
         up by a ship powered by the Infinite Improbability Drive!...",
       "score": 0.9203816652297974,
       "document_id": "doc_123456789"
     },
     {
       "text": "Look, I was right.\\" Ford jabbed at one of the pages and showed it to Arthur. \\"It 
         says: 'Sensational new breakthrough in Improbability Physics...",
       "score": 0.8904105424880981,
       "document_id": "doc_123456789"
     }
   ]
}`
    }
  ]}
  annotations={{
    json: [
      { line: 4, text: 'Citations [1], [2], [3], [4] reference specific search results' },
      { line: 11, text: 'This is search result [1] referenced in the summary' },
      { line: 16, text: 'This is search result [2] referenced in the summary' }
    ]
  }}
  layout="stacked"
/>

Notice how each citation number in the summary corresponds to a specific result 
in the search_results array. The citations are ordered based on their 
appearance in the summary text, not by relevance score.

## Citation formatting options

Vectara supports multiple citation formats to suit different application 
needs. You can control how citations appear in summaries using the 
`citations_options` parameter in your query. We support the following formats:

### Numeric (default)


<CodePanel 
  title="Numeric citation format"
  snippets={[
    {
      language: "json", 
      code: `{
   "generation": {
     "citations_options": {
       "style": "numeric"
     }
   }
}`
    }
  ]}
  annotations={{
    json: [
      { line: 4, text: 'Default format - can be omitted' }
    ]
  }}
/>

Citations appear as numbers in square brackets: `[1]`, `[2]`, `[3]`

This is the default citation format. If you don't specify citations_options, Vectara will use numeric citations automatically.

<Spacer size="l" />
<Spacer size="l" />
<Spacer size="l" />


### None
Disables citations entirely, producing clean text without source references

Use this option when you want clean summary text without any source attribution. This is useful for conversational interfaces where citations might disrupt the flow.

### HTML
Formats citations as HTML links for web applications


Perfect for web applications where you want clickable citations. You can style these links with CSS and add JavaScript handlers to show source details on click.

### Markdown
Formats citations as Markdown links, useful for Markdown-based applications

Ideal for documentation systems, chat applications, or any interface that renders Markdown. The links can be processed by your Markdown renderer.

## Advanced citation options

<CodePanel 
  title="Advanced citation customization"
  snippets={[
    {
      language: "json", 
      code: `{
   "generation": {
     "citations_options": {
       "style": "numeric",
       "url_pattern": "{url}",
       "text_pattern": "{text}"
     }
   }
}`
    }
  ]}
  annotations={{
    json: [
      { line: 5, text: 'Custom URL pattern with template variable' },
      { line: 6, text: 'Custom text pattern with template variable' }
    ]
  }}
/>

You can further customize citation behavior with additional parameters:

These advanced options allow you to customize how citations are formatted 
beyond the standard styles. Use `url_pattern` and `text_pattern` to create 
custom citation formats that match your application's needs.

<Spacer size="l" />
<Spacer size="l" />
<Spacer size="l" />

## Enable citations in queries

**Query with custom citation format**

<CodePanel 
  title="Query with custom citation format"
  snippets={[
    {
      language: "json",
      code: `{
   "query": "Explain the installation process",
   "search": {
     "corpora": [
       {
         "corpus_key": "technical-docs"
       }
     ],
     "limit": 20
   },
   "generation": {
     "prompt_name": "mockingbird-2.0",
     "max_used_search_results": 20,
     "citations_options": {
       "style": "markdown"
     }
   }
}`
    }
  ]}
  annotations={{
    json: [
      { line: 2, text: 'Enter your query.' },
      { line: 6, text: 'Enter the corpus_key that contains the data.' },
      { line: 13, text: 'Make sure to enter a value for max_used_search_results.' },
      { line: 15, text: 'Use Markdown-style citations.' }
    ]
  }}
  layout="stacked"
/>

This example explicitly sets the citation style to Markdown, making it perfect for documentation or chat interfaces that render Markdown content.

## Best practices for citations

* **Choose the right format**
  - Use `numeric` for general-purpose applications
  - Use `HTML` for web-based interfaces where clickable citations enhance UX
  - Use `Markdown` for documentation systems or chat applications that render Markdown
  - Use `none` only when source attribution is not required
* **Optimize citation density**
  - Balance between sufficient citations and readability
  - Use `max_used_search_results` to control how many sources can be cited
* **Present citations clearly**
  - Ensure cited sources are easily accessible to users
  - Consider displaying source details on hover or click
  - Provide clear visual indicators for citations
* **Verify citation accuracy**
  - Citations are automatically generated based on content relevance
  - The Mockingbird LLM provides improved citation accuracy
  - Always validate critical information against source documents
