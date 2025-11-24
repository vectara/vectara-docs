---
id: search-and-retrieval
title: Search and retrieval
sidebar_label: Search and retrieval
---

import { Grid } from "@site/src/components/ui/Grid";
import { Spacer } from "@site/src/components/ui/Spacer";
import { TopicButton } from "@site/src/components/ui/TopicButton";

import CodePanel from '@site/src/theme/CodePanel';

Vectara provides a powerful, end-to-end search that retrieves relevant answers 
from your data. You can start with a simple query and then refine it with 
advanced features like hybrid search, reranking, and metadata filtering to 
achieve pinpoint accuracy.

This section provides the following core search and retrieval information:

- **[Get started](/docs/search-and-retrieval/get-started)**: Run your first query in minutes and learn the fundamental concepts of search and retrieval.
- **[Hybrid search](/docs/search-and-retrieval/hybrid-search)**: Combine the precision of traditional keyword search with the contextual understanding of modern semantic search.
- **[Reranking](/docs/search-and-retrieval/reranking)**: Go beyond simple retrieval to reorder your results for maximum relevance and accuracy. Learn about cutoffs, result diversity, and custom rerankers.
- **[Filters](/docs/search-and-retrieval/filters)**: Narrow your search results using metadata, custom dimensions, and more to give users exactly what they're looking for.
- **[Fuzzy matching](/docs/search-and-retrieval/fuzzy-metadata-search)**: Combine exact filtering with approximate matching.
- **[Prompts and templates](/docs/prompts/vectara-prompt-engine)**: Customize prompt templates with variables and metadata.
- **[Tutorial: build a search app](/docs/search-and-retrieval/build-search-app)**: Put it all together by building a functional search UI with Vectara Answer.


## Search for answers in a corpus

Query an existing corpus and get AI-generated answers with context. In this 
example, you have a corpus with uploaded data from an Employee Handbook.

### Example query

<CodePanel
  snippets={[
    {
      language: 'bash',
      code: `curl -L -X POST 'https://api.vectara.io/v2/corpora/employee-handbook/query' \\
-H 'Content-Type: application/json' \\
-H 'Accept: application/json' \\
-H 'x-api-key: YOUR_API_KEY' \\
-d '{
    "query": "How much PTO is offered to employees each year?",
    "stream_response": false,
    "search": {
      "limit": 20,
      "context_configuration": {
        "sentences_before": 3,
        "sentences_after": 3,
        "start_tag": "<b>",
        "end_tag": "</b>"
      },
      "metadata_filter": "part.lang = \'eng\'",
      "lexical_interpolation": 0.005,
    },
    "generation": [
      {
        "generation_preset_name": "mockingbird-2.0",
        "max_used_search_results": 20
      }
    ]
  }'`
    }
  ]}
  title="Vectara API Query"
  annotations={{
    bash: [
      { line: 4, text: 'Replace with your actual API key.' },
      { line: 9, text: 'Sets context to 3 sentences before and after finding matching text.' },
      { line: 10, text: 'Limits summarization to 20 results.' },
      { line: 21, text: 'Specifies Mockingbird 2.0 as the generation preset.' }
    ]
  }}
  layout="stacked"
/>


### Example response

Let’s take a closer look at the first response:

<CodePanel
  snippets={[
    {
      language: 'json',
      code: `{
    "summary": "Employee Handbook PTO is 20 days a year for all new employees. \n<b>Employees earn more vacation days per year of service up to 5 extra days.\n</b> Example: Once you begin your 5th year, you now have 25 vacation days.",
    "summary_language": "eng",
    "search_results": [
      {
       "text": "Employee Handbook PTO is 20 days a year for all new employees. \n<b>Employees earn more vacation days per year of service up to 5 extra days.\n</b> Example: Once you begin your 5th year, you now have 25 vacation days.",
       "score": 4.30505,
       "part_metadata": {
         "lang": "eng",
         "section": "1",
         "offset": "63",
         "len": "73"
       },
       "document_metadata": {},
       "document_id": "doc_123456789",
       "request_corpora_index": 0
     }
   ]
   // More results....
}`
    }]}
  title="Example JSON Response"
  annotations={{
    json: [
      { line: 2, text: 'Summary of the query result with highlighted text.' },
      { line: 5, text: 'Detailed search result with metadata.' }
    ]
  }}
  layout="stacked"
/>

The result answers the question and returns additional details about the
query, such as the language, section, and offset.

### Context configuration

The `context_configuration` object controls how much surrounding text is
included with each search result:

- **sentences_before/sentences_after**: The number of sentences to include
  before/after matching text.
- **characters_before/characters_after**: The alternative character-based
  boundaries for precise control.
- **start_tag/end_tag**: The HTML tags for highlighting matching text in
  results.

:::note 
You can only use **sentences before/after** or **characters before/after**, 
but not both.
:::

<CodePanel snippets={[{language: "json", code: `{
   "search": {
     "context_configuration": {
       "sentences_before": 2,
       "sentences_after": 2,
       "start_tag": "<mark>",
       "end_tag": "</mark>"
     }
   }
}`}]} title="Context Configuration Example" layout="stacked" />

Now you can [get started](/docs/search-and-retrieval/get-started) with the basics of retrieval in Vectara.
