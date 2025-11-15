---
id: search-and-retrieval
title: Search and retrieval
sidebar_label: Search and retrieval
---

import { Grid } from "@site/src/components/ui/Grid";
import { Spacer } from "@site/src/components/ui/Spacer";
import { TopicButton } from "@site/src/components/ui/TopicButton";

import CodePanel from '@site/src/theme/CodePanel';


Search and retrieval in Vectara delivers precise, relevant query results 
tailored to the needs of your application. By combining advanced AI models 
with innovative search techniques, Vectara ensures that you can query and 
organize your data effectively. For details about different query types, 
see [Queries](/docs/rest-api/queries) in the API Reference.

This section introduces the core tools and strategies available for 
optimizing your search and retrieval workflows.

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

## Basic query

This basic query example has a minimal configuration:

<CodePanel snippets={[{language: "json", code: `{
    "query": "What are black holes?",  // The search query text
    "search": {
      "corpora": [{
        "corpus_key": "my-corpus"  // Identifier for the corpus to search
      }],
    },
    "generation": {
      "generation_preset_name": "mockingbird-2.0",  // Name of the generation preset to use
      "max_used_search_results": 20  // Maximum number of search results to use for generation
    }
  }`}]} title="Basic Query Example" layout="stacked" />


Vectara offers different search methods to fit different scenarios and 
requirements.

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

## Configure queries

Queries have several configurable components.

### Corpora search configuration

The `search` object controls which corpora to search and how to filter and
retrieve results:

- **corpus_key** (required): Unique identifier for the corpus to search.
- **metadata_filter**: SQL-like filter to narrow results (`doc.year = '2024'`).
- **lexical_interpolation**: Balance between semantic (`0.0`) and keyword
  (`1.0`) search. **Default:** `0.025`.
- **limit**: Maximum results to retrieve before reranking. **Default:** `10`.
- **offset**: Number of results to skip for pagination.
- **semantics**: Query interpretation mode ("`query`", "`response`", or
  "`default`").

<CodePanel snippets={[{language: "json", code: `{
   "search": {
     "corpora": [{
       "corpus_key": "my-corpus",
       "metadata_filter": "doc.year = '2025' AND doc.category = 'technology'",
       "lexical_interpolation": 0.005
     }],
     "limit": 10,
     "offset": 0,
     "semantics": "default"
   }
}`}]} title="Search Configuration Example" layout="stacked" />

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

### Reranker configuration

[Rerankers](/docs/search-and-retrieval/rerankers/reranking-overview) improve result quality by reordering search results to place the
most relevant content first:

- **type**: Reranker type
  - `customer_reranker`: Default multilingual reranker (recommended).
  - `mmr`: Maximal Marginal Relevance to reduce redundancy.
  - `none`: Disables reranking (not recommended).
- **reranker_name**: Specific reranker model (`Rerank_Multilingual_v1`).
- **limit**: Maximum results after reranking.
- **cutoff**: Minimum relevance score (`0.0-1.0`) for result inclusion.
  Typically `0.3-0.7`.
- **include_context**: Use surrounding context text for more accurate
  scoring.

<CodePanel snippets={[{language: "json", code: `{
   "search": {
     "reranker": {
       "type": "customer_reranker",
       "reranker_name": "Rerank_Multilingual_v1",
       "limit": 10,
       "cutoff": 0.5,
       "include_context": true
     }
   }
}`}]} title="Reranker Configuration Example" layout="stacked" />

### Generation configuration

The `generation` object controls how the agent creates natural language 
responses. Excluding this `generation` field disables summarization.
- **enabled**: Enable or disable generative summarization.
- **generation_preset_name**: Pre-configured prompt and model bundle (`mockingbird-2.0`).
- **max_used_search_results**: Number of top results to send to the LLM..
  **Default:** `5`
- **max_response_characters**: Soft limit for response length.
- **response_language**: Response language code (`auto`, `eng`, `spa`, etc.).
- **citations**: Citation formatting.
  - **style**: Citation format (`numeric`, `html`, `markdown`, or `none`).
  - **url_pattern**: URL template using metadata variables
  (`https://docs.example.com/{doc.id}`).
  - **text_pattern**: Display text template (`[{doc.title}]`).
- **prompt_template**: Override default prompt using Apache Velocity syntax.
- **model_parameters**: LLM settings (temperature, max_tokens, etc.).
- **enable_factual_consistency_score**: Validate factual consistency of
  responses.

<CodePanel snippets={[{language: "json", code: `{
   "generation": {
     "generation_preset_name": "mockingbird-2.0",
     "max_used_search_results": 10,
     "max_response_characters": 500,
     "response_language": "eng",
     "citations": {
       "style": "numeric"
     },
     "enable_factual_consistency_score": true,
     "model_parameters": {
       "temperature": 0.7,
       "max_tokens": 300
     }
   }
}`}]} title="Generation Configuration Example" layout="stacked" />


The `generation_preset_name` is specified in the `generation` object of a [**query**](/docs/rest-api/queries). 
Excluding this `generation` field disables summarization.

## Currently available prompts

Vectara provides several official prompts (generation presets) to our users 
that you specify in the `generation_preset_name` within the `generation` object. 
We recommend the following generation presets: 

- `mockingbird-2.0` (Vectara's cutting-edge LLM for Retrieval Augmented Generation. See [Mockingbird LLM](/docs/learn/mockingbird-llm) for more details.)
- `vectara-summary-ext-24-05-med-omni` (gpt-4o, for citations)
- `vectara-summary-ext-24-05-large` (gpt-4.0-turbo, for citations)
- `vectara-summary-ext-24-05-med` (gpt-4.0, for citations)
- `vectara-summary-ext-24-05-sml` (gpt-3.5-turbo, for citations)

Use the following prompt if you have tables:
`vectara-summary-table-query-ext-dec-2024-gpt-4o`

#### Legacy prompts

These prompts will soon be deprecated:

- `vectara-summary-ext-v1.2.0`
- `vectara-summary-ext-v1.3.0`

### Default max_used_search_results limit

The default limit of `max_used_search_results` is 25 search results. Setting 
the values closer to the limit generates a more comprehensive summary, but 
using a lower value can balance the results with quality and response time.

:::caution Note
Too many results will prevent the prompt from generating a response. If that 
happens, try reducing this number.
:::

### max_used_search_results example

This generation preset example attempts to balance creating a good quality 
summary with a reasonably fast response by setting `max_used_search_results` to 
`50`.

## Advanced summarization customization options

Our users also have access to more powerful summarization capabilities, which 
present a powerful toolkit for tailoring summarizations to specific 
application and user needs.

Use `generation_preset_name` and `prompt_template` to override the default prompt with a
[custom prompt](/docs/prompts/vectara-prompt-engine). Your use case might
require a chatbot to be more human like, so you decide to create a custom
response format that behaves more playfully in a conversation or summary.

In `generation`, `max_response_characters` lets you control the length of the summary, but
note that it is **not a hard limit** like with the `max_tokens` parameter. The
`model_parameters` object provides even more fine-grained controls for the summarizer
model:

- `llm_name` specifies the name of the LLM model to use for summarization, such as 
  `gpt-4`. If specified, it overrides the model behind `generation_preset_name`.
- `max_tokens` specifies a hard limit on the number of characters in a response.
  This value supercedes the `max_response_characters` parameter in the `summary` 
  object.
- `temperature` indicates whether you want the summarization to not be creative at all `0.0`,
  or for the summarization to take more creative liberties as you approach
  the maximium value of `1.0`.
- `frequency_penalty` provides even more granular control to help ensure that the
  summarization decreases the likelihood of repeating words. The values range from `0.0` to `1.0`
- `presence_penalty` provides more control over whether you want the summary to
  include new topics. The values also range from `0.0` to `1.0`.

By leveraging these advanced capabilities, application builders can fine-tune
the behavior and output style of the generation preset to align with your unique
application requirements.

## Response languages

The `response_language` field in <Config v="names.product"/> allows control of the language
for sumarization requests. You *can* ask <Config v="names.product"/> to attempt
to guess the language of the query and respond in that guessed language by
setting `response_language` to `auto`.  However, this guessing is not perfect: 
many languages have many borrowed words and phrases which makes
guessing the language difficult to impossible at times. For that reason, it's
recommended that you send the user's preferred language when you know it.

One possible way to do this is just to ask the user to configure their
preferred language or to use the localization of your application to determine
the best language to send to <Config v="names.product"/>.  Alternatively, if
your application is a web-based application, you can consider using the
[Navigator.language](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language)
and [Navigator.languages](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/languages)
API.

For the most up-to-date list of languages supported by <Config v="names.product"/>'s
models, see
[https://github.com/vectara/protos/blob/main/common.proto#L10](https://github.com/vectara/protos/blob/main/common.proto#L10).

Both [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) and
[ISO 639-3](https://en.wikipedia.org/wiki/ISO_639-3) language codes are supported
in this API.

Some features, such as `factual_consistency_score`, may not work on all
languages. The [Factual Consistency Score](/docs/hallucination-and-evaluation/hallucination-evaluation) is supported in English, German, and French (`eng`,`deu`,`fra`).

## Citations

Citations provide important source attribution in query results, enabling 
users to verify information and trace content back to its original sources. 
This transparency is essential for building trust in AI-generated content and 
supporting fact-checking workflows.

When Vectara generates summaries or retrieval results, it automatically 
includes citations that reference the specific sources used. These citations 
create a direct link between the generated content and the underlying 
documents, ensuring traceability and accountability.

Citations appear in the format `[number]` within summary text, where:
- Numbers start from 1.
- Each number corresponds to a result in the `search_results` array.
- Numbers increment sequentially for each unique source referenced.

### Citation formatting options

Vectara supports multiple citation formats to suit different application 
needs. You can control how citations appear in summaries using the 
`citations_options` parameter in your query. We support the following formats:

#### Numeric (default)


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


#### None
Disables citations entirely, producing clean text without source references

Use this option when you want clean summary text without any source attribution. This is useful for conversational interfaces where citations might disrupt the flow.

#### HTML
Formats citations as HTML links for web applications


Perfect for web applications where you want clickable citations. You can style these links with CSS and add JavaScript handlers to show source details on click.

#### Markdown
Formats citations as Markdown links, useful for Markdown-based applications

Ideal for documentation systems, chat applications, or any interface that renders Markdown. The links can be processed by your Markdown renderer.

#### Code Output Support

Markdown citation style enables formatting of code blocks and technical content 
in responses, making it easier to display code snippets, YAML configurations, 
or structured technical output.

### Advanced citation options

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

This example explicitly sets the citation style to Markdown.
