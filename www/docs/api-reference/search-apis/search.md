---
id: search
title: Query API Definition
sidebar_label: Query API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

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
- **Summarization Parameters**: Choose model and prompt (Scale only), and response settings like
  length and factual scoring, and even more nuanced model parameters (Scale only)
- **Stream Response**: Optionally have the summarized response stream in real time.

The exact request format depends on the specific query type that you want to 
use.

### Query Corpora

The [`/v2/query` endpoint](/docs/rest-api/query) allows you to perform Retrieval Augmented Generation 
(RAG) across one or more corpora in your account. You send a POST request in 
the body that specifies the following:

- `query` - Contains your query text
- `stream_response` - Indicates whether to stream the response in real-time or 
  to send a complete summary at the end of processing the request
- `search` - Specifies the search parameters
- `summarization` - Specifies the summarization parameters

This query type is useful when you want to query all your 
data sources at once.

### Simple Single-Corpus Query

Send a [simplified GET request](/docs/rest-api/search-corpus) to `/v2/corpora/{corpus_key}/query` for querying 
a single corpus that specifies the following:

- `q`: Contains the query string
- `limit`: Specifies the maximum number of results 
- `offset`: Specifies the starting position in results

This query types provides a lightweight way to search a single corpus.

### Advanced Corpus Query

Send a POST request to `/v2/corpora/{corpus_key}/query` to [query a specific 
corpus](/docs/rest-api/query-corpus) with more advanced capabilities. The request body is similar to the 
Query Corpora type and specifies the same parameters:

- `query` - Contains your query text
- `stream_response` - Indicates whether to stream the response in real-time or 
  to send a complete summary at the end of processing the request
- `search` - Specifies the search parameters
- `summarization` - Specifies the summarization parameters 

This advanced type provides additional search filtering and customization 
options compared to the simple GET method.

## Corpus Key

If you want to query a specific corpus or corpora, include the unique 
`corpus_key` in the path of the request such as `v2/corpora/:corpus_key`.

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


## Query Definition

A single query consists of a **query**, which is specified in plain text. For
example, *"Where can I buy the latest iPhone?"*. Optionally, the **query
context** provides additional information that the system may use to refine the
results. For example, *"The Apple store near my house is closed due to Covid."*

Within the `search` object, add `custom_dimensions` weights (Scale only), 
`metadata_filter` and set the `lexical_interpolation` (formerly `lambda`) in 
the REST API v1.0. Setting to `0` disables exact and Boolean text matching, 
while a value of `1` disabls neural retrieval. Users often see best results by 
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
further increase relevance in certain scenarios. For details about our English 
cross-attentional (Scale only) and Maximal Marginal Relevance (MMR) rerankers, 
see [Reranking](/docs/api-reference/search-apis/reranking).

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
mix of both keyword and neural results, edit the `lambda` value.

If the corpus specifies custom dimensions (Scale only), weights can be 
assigned to each dimension as well.

Finally, it's possible to override the semantic interpretation of the query
string. Usually, the default settings for the corpus are sufficient. In more
advanced scenarios, it's desirable to force it to be treated as a query, or,
more rarely, as a response.

### Reranking Configuration 

The `rerankingConfig` object enables reranking of results, to further increase 
relevance in certain scenarios. Scale users can modify the `rerankerId` of 
this object. When using `mmrConfig`, specify a `diversityBias` value between `0.0` 
and `1.0`. For details about our English cross-attentional (Scale only) and 
Maximal Marginal Relevance (MMR) rerankers, see [Reranking](/docs/api-reference/search-apis/reranking).

## Query Summarization Request - Retrieval Augmented Generation 

To use Retrieval Augmented Generation (RAG), which <Config v="names.product"/> also refers to as
"Grounded Generation" -- our groundbreaking way of producing generative 
summaries on top of your own data -- you can submit a `summarization` that attempts to answer the 
end-user's question, citing the results as references. For more information, 
read about [Retrieval Augmented Generation](/docs/learn/grounded-generation/grounded-generation-overview).

The `summarization` object enables you to tailor the results of the query 
summarization. Growth users can specify the `maxSummarizedResults` and 
`responseLang`.

## Factual Consistency Score

The Factual Consistency Score, based on a more advanced version of 
[Hughes Hallucination Evaluation Model (HHEM)](https://huggingface.co/vectara/hallucination_evaluation_model),
enables you to evaluate the likelihood of an AI-generated summary being 
factually correct based on search results. This calibrated score can 
range from `0.0` to `1.0`. A higher scores indicates a greater probability of 
being factually accurate, while a lower score indicates a greater probability 
of hallucinations.

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

When generating a summary, Vectara enables you to format the `style` of 
`citationParams` object with one of the following formats: 

* `NUMERIC` (default) - Appear as numbers `[1]`, `[2]`, `[N]`, and so on.
* `NONE` - No citations appear in the summary.
* `HTML` - Appears as a URL such as `<a href="https://my.doc/foo">[N]</a>`
* `MARKDOWN` - Appears in Markdown such as `[N](https://my.doc/foo)`

If set to `HTML` or `MARKDOWN`, you can then customize the citation using 
the `urlPattern` and `textPattern` fields and enable dynamic citation 
generation. Both of these parameters can access all part and document level 
fields. For example, the `urlPattern` field can specify `{doc.id}` and `{part.page}`, 
such as `https://mypdf.doc/foo/{doc.id}#page={part.page}`. The `textPattern` field 
specifies the field name in curly braces. For example, use `{doc.title}`  
and the final result appears as [Title](https://my.doc/foo/2/1).

## Advanced Summarization Customization Options

[Scale users](https://vectara.com/pricing/) have access to more powerful summarization 
capabilities, which present a powerful toolkit for tailoring summarizations to 
specific application and user needs. 

The `model_id` allows you to specify one of our [available summarizers](/docs/learn/grounded-generation/select-a-summarizer).
Use `prompt_id` and `prompt_text` to override the default prompt with a 
[custom prompt](/docs/prompts/vectara-prompt-engine). Your use case might 
require a chatbot to be more human like, so you decide to create a custom 
response format that behaves more playfully in a conversation or summary.

The `debug` option lets you view detailed logs to help in troubleshooting and 
optimization. The `responseChars` lets you control the length of the summary, but 
note that it is **not a hard limit** like with the `maxTokens` parameter. The 
`modelParams` object provides even more fine-grained controls for the summarizer 
model:
* `maxToken` specifies a hard limit on the number of characters in a response. 
    This value supercedes the `responseChars` parameter in the `summary` object.
* `temperature` indicates whether you want the summarization to not be creative at all `0.0`,
    or for the summarization to take more creative liberties as you approach 
    the maximium value of `1.0`.
* `frequencyPenalty` provides even more granular control to help ensure that the 
  summarization decreases the likelihood of repeating words. The values range from `0.0` to `1.0`
* `presencePenalty` provides more control over whether you want the summary to 
  include new topics. The values also range from `0.0` to `1.0`.

By leveraging these advanced capabilities, application builders can fine-tune 
the behavior and output style of the summarizer to align with your unique 
application requirements.


## REST Example

### Query API Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to search content from a corpus:
<code>https://<Config v="domains.rest.serving"/>/v2/query</code>

The API Playground shows the full [Query REST definition](/docs/rest-api/query).

