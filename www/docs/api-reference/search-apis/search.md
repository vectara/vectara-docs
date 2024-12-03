---
id: search
title: Query API Definition
sidebar_label: Query API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

Organizations often struggle to extract relevant information from large 
datasets and get meaningful answers to complex queries. The Vectara Query API 
offers a powerful and flexible solution for performing sophisticated searches 
across one or more corpora and significantly enhance the accuracy and 
relevance of search results.

The Query API lets you perform a query while defining its parameters
that specify the query text, pagination details, metadata filters, and other
search settings that enable application builders to tailor their queries to
specific use cases.

After you index data into one or more corpora, you can run queries
and display the results. This page provides a detailed reference for how
to run queries and also describes some of Vectara's capabilities in metadata
filtering, reranking, Retrieval Augmented Generation (RAG), and hybrid search.

## Query Types

The Vectara REST API 2.0 has different types of queries for you use
depending on your search needs. Depending on the type, queries enable you to
define parameters that control the behavior of the query and summarization:

- **Search Parameters**: Filter data by metadata, apply lexical weighting, add additional
  context about the data, and rerank the results
- **Summarization Parameters**: Choose model and prompt, and response settings like
  length and factual scoring, and even more nuanced model parameters
- **Stream Response**: Optionally have the summarized response stream in real time.

The exact request format depends on the specific query type that you want to
use.

:::tip

Check out our [**interactive API Reference**](/docs/rest-api/query) that you experiment
with these query types. You can also perform a **[simple single corpus query](/docs/rest-api/search-corpus)**, 
**[advanced single corpus query](/docs/rest-api/query-corpus)**, and a **[multiple corpora query](/docs/rest-api/query)**.

:::

### Multiple Corpora Query

The [`/v2/query` endpoint](/docs/rest-api/query) allows you to perform Retrieval Augmented Generation
(RAG) across one or more corpora in your account. You send a POST request in 
the body that specifies the following:

- `query` - Contains your query text
- `stream_response` - Indicates whether to stream the response in real-time (`true`) or
  to send a complete summary at the end of processing the request (`false`)
- `search` - Specifies the search parameters
- `generation` - Specifies the summarization parameters and `generation_preset_name`. 

Excluding this generation field disables summarization. The [generation preset](/docs/rest-api/list-generation-presets) 
contains the `name`, `description`, `llm_name`, `prompt_template`, and other 
fields make up the preset.

This query type is useful when you want to query all your
data sources at once.

### Simple Single Corpus Query

Send a [simplified GET request](/docs/rest-api/search-corpus) to `/v2/corpora/:corpus_key/query` for querying
a single corpus that specifies the following:

- `q`: Contains the query string
- `limit`: Specifies the maximum number of results
- `offset`: Specifies the starting position in results

This query types provides a lightweight way to search a single corpus.

### Advanced Single Corpus Query

Send a POST request to `/v2/corpora/:corpus_key/query` to [query a specific
corpus](/docs/rest-api/query-corpus) with more advanced capabilities. The request body is similar to the
Query Corpora type and specifies the same parameters:

- `query` - Contains your query text
- `stream_response` - Indicates whether to stream the response in real-time or
  to send a complete summary at the end of processing the request
- `search` - Specifies the search parameters
- `generation` - Specifies the summarization parameters and `generation_preset_name`.

Excluding this generation field disables summarization. The [generation preset](/docs/rest-api/list-generation-presets) 
contains the `name`, `description`, `llm_name`, `prompt_template`, and other 
fields make up the preset.

This advanced type provides additional search filtering and customization
options compared to the simple GET method.

The query response message encapsulates a single query result. It is a subdocument
provided at indexing time. The `text` is the subdocument text, the `score`
indicates how well the text answers the query (higher scores are better).

The `metadata` list holds any subdocument-level metadata that was stored with
the item at indexing time. The `corpus_key` indicates which corpus the result
came from: recall that a single query can execute against multiple corpora.
While it's most often the case that a query is run against a single
corpus, it's sometimes useful to run against several in parallel.

Finally, the `document_index` points at a specific document within the
enclosing response set's `document` array. This is useful for retrieving the
document id and document-level metadata.

## Corpus Key Definition

If you want to query a specific corpus or corpora, include the unique
`corpus_key` in the path of the request such as `v2/corpora/:corpus_key`.

When creating a new corpus, you have the flexibility to specify a custom
`corpus_key` that follows a naming convention of your choice. This allows you to
assign easily identifiable keys to your corpora, making it easier to manage and
reference them in your application.

:::caution

As part of the migration from API 1.0 to 2.0, all existing corpora have been
assigned a new `corpus_key` based on their original name and `corpus_id`. The 
`corpus_key` is created by combining the name of the corpus (with underscores 
replacing spaces) and the original numeric ID.

:::

## Query Definition

A single query consists of a **query**, which is specified in plain text. For
example, _"Where can I buy the latest iPhone?"_. Optionally, the **query
context** provides additional information that the system may use to refine the
results. For example, _"The Apple store near my house is closed due to Covid."_

Within the `search` object, add `custom_dimensions` weights (Pro or Enterprise), 
`metadata_filter` and set the `lexical_interpolation` (formerly `lambda` in
the REST API v1.0). Setting to `0` disables exact and Boolean text matching,
while a value of `1` disables neural retrieval. Users often see best results by
setting this value somewhere between 0.01 and 0.1, and we typically
recommend users start experimentation with a `0.025`.

The `semantics` parameter indicates whether to consider a query against this
corpus as a query or a response. The `offset` field controls the starting
position within the list of results, while `limit` dictates how many results
are returned. Thus, setting `offset=5` and `limit=20` would return twenty
results beginning at position five. These fields are mainly used to provide
pagination.

The `context_configuration` object lets you specify whether you want a specific
number of characters or sentences before or after the matching document part.

Finally, the **reranking configuration** enables reranking of results, to
further increase relevance in certain scenarios. For details about our 
Multilingual, Maximal Marginal Relevance (MMR), and User Defined Function 
rerankers, see [Rerank Search Results](/docs/api-reference/search-apis/reranking).

## Query Request and Response

The `corpus_key` specifies the ID of the corpus being searched. The
`metadata_filter` allows specifying a predicate expression that restricts
the search to a part of the corpus. The filter is written in a simplified SQL
dialect and can reference metadata that was marked as filterable during corpus
creation.

:::note

See the [**Filter Expressions Overview**](/docs/learn/metadata-search-filtering/filter-overview) for a
description of their syntax, and [**Corpus Administration**](/docs/api-reference/admin-apis/admin) to learn how
referenceable metadata is specified during corpus creation.

:::

By default, <Config v="names.product"/> only uses its neural/semantic retrieval model,
and does not attempt to use keyword matching. To enable [hybrid search](/docs/learn/hybrid-search) with a
mix of both keyword and neural results, edit the `lexical_interpolation` value.

If the corpus specifies custom dimensions (Pro or Enterprise), weights can be 
assigned to each dimension as well.

Finally, it's possible to override the semantic interpretation of the query
string. Usually, the default settings for the corpus are sufficient. In more
advanced scenarios, it's desirable to force it to be treated as a query, or,
more rarely, as a response.

### Reranking Configuration

The `reranker` object enables the reranking of query results, to further 
increase relevance in certain scenarios. The `cutoff` property lets you 
specify a minimum score threshold for search results to be included after 
reranking. The `limit` property of this `reranker` object allows you to have 
more granular control over the number of results returned after reranking. For 
more details about these properties, see [Rerank Search Results](/docs/api-reference/search-apis/reranking):

* Specify the `type` as `customer_reranker` and `reranker_name` as 
  `Rerank_Multilingual_v1` to use the [Multilingual Reranker v1](/docs/api-reference/search-apis/reranking#vectara-multilingual-reranker-v1), 
  also known as Slingshot.
* Specify the `type` as `mmr` to use the [Maximal Marginal Relevance (MMR) Reranker](/docs/learn/mmr-reranker).
  This reranker lets you specify a `diversity_bias` value between `0.0` and `1.0`. 
* Specify the `type` as `userfn` to use the [User Defined Function Reranker(/docs/learn/user-defined-function-reranker)].
* Specify the `type` as `chain` to use the [Chain Reranker](/docs/learn/chain-reranker).
* If you do not want to use a reranker, set the type to `none`.

## Query Summarization Request - Retrieval Augmented Generation

To use Retrieval Augmented Generation (RAG), which <Config v="names.product"/> also refers to as
"Grounded Generation" -- our groundbreaking way of producing generative
summaries on top of your own data -- you can submit a `generation` that attempts to answer the
end-user's question, citing the results as references. For more information,
read about [Retrieval Augmented Generation](/docs/learn/grounded-generation/grounded-generation-overview).

The `generation` object enables you to tailor the results of the query
summarization. Growth users can specify the `max_summarized_results`, 
`response_language`, and `enable_factual_consistency_score`.


```json
"generation": {
    "generation_preset_name": "vectara-summary-ext-v1.2.0",
    "max_used_search_results": 5,
    "prompt_template": "[\n  {\"role\": \"system\", \"content\": \"You are a helpful search assistant.\"},\n  #foreach ($qResult in $vectaraQueryResults)\n     {\"role\": \"user\", \"content\": \"Given the $vectaraIdxWord[$foreach.index] search result.\"},\n     {\"role\": \"assistant\", \"content\": \"${qResult.getText()}\" },\n  #end\n  {\"role\": \"user\", \"content\": \"Generate a summary for the query '\''${vectaraQuery}'\'' based on the above results.\"}\n]\n",
    "max_response_characters": 300,
    "response_language": "eng",
    "model_parameters": {
      "max_tokens": 0,
      "temperature": 0,
      "frequency_penalty": 0,
      "presence_penalty": 0
    },
```
Users also have access to [advanced summarization customization options](/docs/api-reference/search-apis/search#advanced-summarization-customization-options).

## Generation Presets

The `generation-preset-name` field in `generation` object specifies the prompt 
template to use. Generation presets bundle several properties that configure 
generation for the request, providing more flexibility in how parameters are 
set. The preset includes the `prompt_template`, the LLM, and other settings 
like `max_tokens` and `temperature`.

```json
"generation-preset-name": "vectara-summary-ext-v1.3.0"
```


To view available generation presets, use the [List Generation Presets API](/docs/api-reference/generation-presets/list-generation-presets).

:::note
The `generation-preset-name` field replaces the `prompt_name` field that was 
previously in the `generation` object. The `prompt_name` field is now deprecated 
but still supported for backward compatibility.
:::

### Mockingbird: Enhanced RAG Performance

For users seeking superior RAG performance, <Config v="names.product"/> offers Mockingbird, 
our advanced LLM specifically designed for RAG tasks.

To use Mockingbird for your RAG tasks, specify `mockingbird-1.0-2024-07-16` in 
the `generation-preset-name` field the `generation` object, like in this example:

```json
{
  "generation": {
    "generation_preset_name": "mockingbird-1.0-2024-07-16",
    "max_used_search_results": 5,
    "response_language": "eng",
    "enable_factual_consistency_score": true
  }
}
```
Mockingbird is particularly beneficial for enterprise applications requiring 
high-quality summaries and structured outputs. For more details on Mockingbird's 
capabilities and performance, see the [Mockingbird LLM section](/docs/learn/mockingbird-llm).

## Factual Consistency Score

The Factual Consistency Score, based on a more advanced version of
[Hughes Hallucination Evaluation Model (HHEM)](https://huggingface.co/vectara/hallucination_evaluation_model),
enables you to evaluate the likelihood of an AI-generated summary being
factually correct based on search results. This calibrated score can
range from `0.0` to `1.0`. A higher scores indicates a greater probability of
being factually accurate, while a lower score indicates a greater probability
of hallucinations. It also supports English, German, and French (`eng`, `deu`, `fra`) 
as the `response_language`.

In your summarization request, set the `enable_factual_consistency_score` field to `true`.
The Factual Consistency Score returns a calibrated value in the
`factual_consistency_score` field of the summary message. The score field
contains the value between `0.0` and `1.0`.

For example, a score of `0.95` suggests a 95% likelihood that the summary is
free of hallucinations and would align with the original content. A lower
score of `0.40` indicates a 40% chance which would be probably much less
factually accurate. We suggest starting with a setting of `0.5` as an initial
guideline for cutoffs between good and bad.

## Citation Format in Summary

When generating a summary, Vectara enables users to format the `style` of 
`citations` object with one of the following formats:

- `numeric` (default) - Citations appear as numbers `[1]`, `[2]`, `[N]`, and so on.
- `none` - No citations appear in the summary.
- `html` - Citations appears as a URL: `<a href="https://my.doc/foo">[N]</a>`
- `MARKDOWN` - Citations appears in Markdown: `[N](https://my.doc/foo)`

If set to `html` or `markdown`, you must customize the citation using
both of the `url_pattern` and `text_pattern` fields to enable dynamic citation
generation. Both of these parameters can access all part and document level
**metadata** fields.

For example, the `url_pattern` field can specify `{doc.id}` and `{part.page}`
metadata as `https://mypdf.doc/foo/{doc.id}#page={part.page}`.
The `text_pattern` field specifies the document and part metadata name in curly
braces. For example, use `{doc.title}` and the final result appears as
[Title](https://my.doc/foo/2/1).

To use citations, you must specify one of the following summarizers
in `generation_preset`:

- `mockingbird-1.0-2024-07-16` - (Vectara's Mockingbird LLM)
- `vectara-summary-ext-24-05-sml` - (gpt-3.5-turbo)
- `vectara-summary-ext-24-05-med-omni` - (gpt-4o)
- `vectara-summary-ext-24-05-med` - (gpt-4.0)
- `vectara-summary-ext-24-05-large` - (gpt-4.0-turbo)

:::note

For more information, see the [**documentation**](/docs/learn/grounded-generation/select-a-summarizer) about selecting summarizers.

:::

### Default Citation Behavior

- If `text_pattern` is not specified, it defaults to the numerical position of the result ([1], [2], [N].).
- The `url_pattern` **does not** have a default, so this field must be explicitly defined.

### Citation Example

In this example, you want Vectara to say `as seen in [Document-Title]` with a
link to the specific page:

```json
{
  "citations": {
    "style": "MARKDOWN",
    "url_pattern": "{doc.id}#page={section.page}",
    "text_pattern": "as seen in {doc.title}"
  }
}
```

The response will look something like this:

```
In the Metropolitan Transportation Authority (MTA) rules, it is prohibited to
destroy, mark, soil, paint, draw, inscribe, or place graffiti on any facility
or conveyance of the authority [as seen in Rules of Conduct and
Fines](https://new.mta.info/document/36821#page=3).
```

## Disable query summarization

To disable summarization, exclude the `generation` object from a query.

## Advanced Summarization Customization Options

Vectara also provides more powerful summarization capabilities for tailoring 
summarizations to specific application and user needs. If they need to change 
generation beyond what the preset specifies, you can override most parameters 
in a query. For example:

```json
{
  "generation": {
    "generation-preset-name": "vectara-summary-ext-v1.3.0",
    "max_tokens": 300,
    "temperature": 0.7
  }
}
```
To provide even more customization beyond, you can override certain parameters 
in your query. This enables you to use a preset as a starting point while you 
tailor specific aspects of the generation.

The `generation_preset_name` allows you to specify one of our [available summarizers](/docs/learn/grounded-generation/select-a-summarizer).
Use `generation_preset_name` and `prompt_template` to override the default prompt with a
[custom prompt](/docs/prompts/vectara-prompt-engine). Your use case might
require a chatbot to be more human like, so you decide to create a custom
response format that behaves more playfully in a conversation or summary.

The `max_response_characters` lets you control the length of the summary, but
note that it is **not a hard limit** like with the `max_tokens` parameter. The
`model_parameters` object provides even more fine-grained controls for the summarizer
model:

- `max_tokens` specifies a hard limit on the number of characters in a response.
  This value supercedes the `responseChars` parameter in the `summary` object.
- `temperature` indicates whether you want the summarization to not be creative at all `0.0`,
  or for the summarization to take more creative liberties as you approach
  the maximum value of `1.0`.
- `frequency_penalty` provides even more granular control to help ensure that the
  summarization decreases the likelihood of repeating words. The values range from `0.0` to `1.0`
- `presence_penalty` provides more control over whether you want the summary to
  include new topics. The values also range from `0.0` to `1.0`.

By leveraging these advanced capabilities, application builders can fine-tune
the behavior and output style of the summarizer to align with your unique
application requirements.

## REST 2.0 URL

### Query API Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to search content from a corpus:
<code>https://<Config v="domains.rest.serving"/>/v2/query</code>

The API Reference shows the full [Query REST definition](/docs/rest-api/query).
