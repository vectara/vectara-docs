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
- **[Advanced query features](/docs/search-and-retrieval/advanced-features)**: Explore powerful features like fuzzy matching and intelligent query rewriting to handle complex user needs.
- **[Tutorial: build a search app](/docs/search-and-retrieval/build-search-app)**: Put it all together by building a functional search UI with Vectara Answer.

### Advanced Customization

For those looking to customize Vectara's core functionality, explore these advanced topics:

- **[Custom prompts](/docs/prompts/vectara-prompt-engine)**: Customize the AI's response generation using the Vectara Prompt Engine.
- **[Bring your own LLM](/docs/search-and-retrieval/bring-your-own-llm)**: Define and use a custom LLM configuration with Vectara.










---


Search and retrieval in Vectara delivers precise, relevant query results 
tailored to the needs of your application. By combining advanced AI models 
with innovative search techniques, Vectara ensures that you can query and 
organize your data effectively. For details about different query types, 
see [Queries](/docs/rest-api/queries) in the API Reference.

This section introduces the core tools and strategies available for 
optimizing your search and retrieval workflows.

- **[Search for answers in a corpus](#search-for-answers-in-a-corpus)**: View an example 
  search.
- **[Hybrid search](#hybrid-search)**: Combine semantic and keyword search (recommended 
  starting point).
- **[Keyword search](#keyword-search)**: Pure keyword matching for specialized 
  use cases.
- **[Corpora search configuration](#corpora-search-configuration)**: Query parameters and 
  filtering.
- **[Context configuration](#context-configuration)**: Control surrounding text in 
  results.
- **[Reranker configuration](#reranker-configuration)**: Improve result relevance.
- **[Generation configuration](#generation-configuration)**: Configure AI-generated 
  summaries.
- **[Currently available prompts](#currently-available-prompts)**: Prompts for RAG, citations, 
  and tabular data.
- **[Advanced summarization customization options](#advanced-summarization-customization-options)**: Advanced 
  `model_parameter` usage.

More advanced capabilities include the following:

- **[Reranking ](./search-and-retrieval/reranking)**: Multilingual, MMR, UDF, Chain, and 
  Knee rerankers
- **[Custom prompts](./prompts/vectara-prompt-engine)**: Customize AI response generation
- **[Bring your own LLM](/docs/search-and-retrieval/bring-your-own-llm)**: Define a custom 
  LLM configuration.

## Search for answers in a corpus

Query an existing corpus and get AI-generated answers with context. In this 
example, you have a corpus with uploaded data from an Employee Handbook.

#### Example cURL command

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
      { line: 9, text: 'Limits summarization to 20 results.' },
      { line: 21, text: 'Specifies Mockingbird 2.0 as the generation preset.' }
    ]
  }}
  layout="stacked"
/>


#### Example JSON response

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

## Hybrid search

Traditional keyword-based search often fails to capture the context and intent 
behind user queries, leading to irrelevant or incomplete results. Vectara's 
Hybrid Search combines semantic search with traditional keyword-based 
approaches to offer a powerful and flexible solution for text retrieval.

We combine partial, exact, and Boolean text matching with neural models which 
blend traditional, keyword-based search with semantic search in what is 
called a "hybrid" retrieval model. This enables users to discover information 
based on a combination of keywords and the contextual meaning and relevance of 
their queries.

For example, you can use this in Vectara to:

- Include exact keyword matches for occasions where a search
  term was absent from Vectara's training data (e.g. product SKUs)
- Disable neural retrieval entirely, and instead use exact term matching
- Incorporate typical keyword modifiers like a `NOT` function, exact phrase
  matching, and wildcard prefixes of terms

### Enable hybrid search

Enable hybrid search by specifying `lexical_interpolation` value at query time,
specifically in the `search` object. This value can range from `0.0` to `1.0`
(inclusive). 

:::note
Setting `lexical_interpolation` to `1.0` is equivalent to the original BM25.
:::

As you ingest data and run queries, adjust the `lexical_interpolation` value to
achieve the perfect balance in answer quality.

### Experiment with different lexical interpolation values

The default value of `lexical_interpolation` is `0`, which _disables_ exact and
Boolean text matching. A value of `1` would disable neural retrieval instead,
[relying _only_ on Boolean and exact text matching](/docs/learn/enable-keyword-text-matching). Experimenting with
the `lexical_interpolation` value is useful if you're trying to evaluate how a keyword
system like one based on Elasticsearch or Solr may compare to Vectara.

:::tip
:bulb:
You can test queries with different `lexical_interpolation` values in
our [**API Reference**](/docs/rest-api/query) and in the Vectara Console.
:::

Vectara supports in-between values as well, which tells Vectara to try to
consider _both_ neural _and_ Boolean and exact text matching and then to blend
the scores of the results of the two different scoring models. Users often see
best results by setting this value somewhere between `0.01` and `0.1`, and
we typically recommend users start experimentation with a `lexical_interpolation`
value of `0.025`.

### Syntax interpretation

When interpreting query strings, Vectara treats the following syntax specially.

- Words that are quoted must match exactly in that order. For example, the
  query `blue shoes` must match the word `blue` followed immediately by `shoes`.

- A word fragment suffixed with an asterisk `*` is treated as a prefix match,
  meaning that it matches any word of which it is a prefix. For example,
  `Miss*` matches Mississippi.

- Words prefixed with a minus `-` sign are excluded from the results. To extend
  on the previous example, `-Mississippi` would exclude results referencing the
  Magnolia State. Using `-Miss*` would exclude references to both
  Mississippi and Missouri.

## Keyword search

In some specialized fields such as legal, compliance, and technical 
domains, relying solely on semantic search can miss information tied to 
specific phrases or terms. By default, Vectara optimizes for semantic 
understanding and disables exact and Boolean text matching, which is similar 
to a traditional, keyword-based search. However, users can enable precise 
keyword matching by setting the `lexical_interpolation` value to `1` at query 
time.

Vectara offers flexibility in balancing keyword matching with advanced semantic 
capabilities. Keyword search is particularly useful when searching for 
specific legal clauses, regulations, error codes, and precise identifiers. 
This level of control enables users to tailor their searches to the specific 
requirements of their domain, balancing between semantic understanding and 
exact keyword matching as needed.

To enable exact keyword matching and disable neural retrieval, specify the 
`lexical_interpolation` value as `1` in the `search` object at query time:

:::note
Setting `lexical_interpolation` to `1.0` is equivalent to the original BM25.
:::

Experimenting with the `lexical_interpolation` value is useful if you're trying
to evaluate how a keyword system like one based on Elasticsearch or Solr may 
compare to Vectara.

Configuring your query parameters enables you to get the most relevant and 
accurate results. This section covers the key configuration parameters that 
control search behavior, result retrieval, reranking, context handling, and 
AI-generated responses.

### Context configuration

The `context_configuration` object controls how much surrounding text is
included with each search result:

- **sentences_before/sentences_after**: Number of sentences to include
  before/after matching text.
- **characters_before/characters_after**: Alternative character-based
  boundaries for precise control.
- **start_tag/end_tag**: HTML tags for highlighting matching text in
  results.

:::note 
You can only use **sentences before/after** or **characters before/after**, but not both.
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

