---
id: query-configuration
title: Configure Query Parameters
sidebar_label: Configure Query Parameters
---

import CodePanel from '@site/src/theme/CodePanel';

Configuring your query parameters enables you to get the most relevant and 
accurate results. This section covers the key configuration parameters that 
control search behavior, result retrieval, reranking, context handling, and 
AI-generated responses.

## Corpora search configuration

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

## Context configuration

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

## Reranker configuration

[Rerankers](/docs/api-reference/search-apis/reranking) improve result quality by reordering search results to place the
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

## Generation configuration

The `generation` object controls how the agent creates natural language
responses:

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
