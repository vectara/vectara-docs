---
id: stream-query
title: Stream Query API Definition
sidebar_label: Stream Query API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Stream Query API enables continuous streamed responses as data becomes
available, improving responsiveness and reducing latency. Instead of receiving
a complete response like with the [Standard Query API](/docs/api-reference/search-apis/search), consumers  
receive partial responses in this order:

1. Search results.
2. If summarization is enabled, chunks of the summary, like "This", "is", "a", "summary".
3. If the [Factual Consistency Score (FCS)](#factual-consistency-score) is enabled, then
   the FCS is the final response.

This streaming approach is beneficial when generating summaries using LLMs
like GPT-4, which can have significant latencies of 5-10 seconds.
The Standard Query API makes users wait for the full summarization process
before receiving any results. Streaming processes the summary request
with near-zero latency, significantly enhancing the user experience.

:::tip

Check out our [**interactive API Playground**](/docs/rest-api/stream-query) that lets you experiment with
this REST endpoint to stream query responses.

:::

## Stream Query Request Body

The Stream Query API has the same request parameters as the [Standard Query API](/docs/api-reference/search-apis/search).
The `stream-query` endpoint enables streaming. Use this endpoint instead of
the standard `query` endpoint.

The Stream Query request body specifies different parameters that ask
questions about the data within corpora. The Stream Query request requires the
following parameters:

- `query` - Contains your question and number of results to return.
- `corpusKey` - Specifies which corpora to run the query

The query response message encapsulates a single query result. It is a subdocument
provided at indexing time. The `text` is the subdocument text, the `score`
indicates how well the text answers the query (higher scores are better).

The `metadata` list holds any subdocument-level metadata that was stored with
the item at indexing time. The `corpus_key` indicates which corpus the result
came from: recall that a single query can execute against multiple corpora.

Finally, the `document_index` points at a specific document within the
enclosing response set's `document` array. This is useful for retrieving the
document id and document-level metadata.

## Stream Query Response Types

Each streamed chunk contains a portion of the summary text, identified by a
unique `future_id`. Once the full summary is streamed, you receive a final
response with the `done` field set to `true`, allowing flexible handling and
processing of results. If you enabled the Factual Consistency Score, this
value appears after the summary shows `done` as `true`. The Stream Query API
request has three different types
of responses:

### Preamble Response

This initial response serves as a preamble, like a "heads up." It contains the
`batchQueryResponse` with placeholders for different parts of the response,
such as search results or the summary. These placeholders help you correlate
the subsequent streamed chunks with their respective parts.

### Search Results Response

This second response type contains the search results as the
`batchQueryResponse` populates with these results in real time.

### Streamed Parts of the Summary Response

The third response type, which streams until you get the final `done` value,
returns the subsequent streamed chunks of the summary. Each response has a
`batchQueryResponse` that contains a portion of the `summary` text.

## Combining the Streamed Summary Response

The consuming code must combine the stream's chunks as it receives them. The
best method for doing so will depend on the language being used.

### JavaScript

If the consuming code is JavaScript, we recommend using our
[Stream-Query-Client](https://www.npmjs.com/package/@vectara/stream-query-client)
to mediate requests to the Stream Query API. It will handle the complexity of
combining the streamed chunks for you.

To refer to how this is done, see the
[Stream-Query-Client source code](https://github.com/vectara/stream-query-client).

## Query Definition

A single query consists of a **query**, which is specified in plain text. For
example, _"Where can I buy the latest iPhone?"_. Optionally, the **query
context** provides additional information that the system may use to refine the
results. For example, _"The Apple store near my house is closed due to Covid."_

The `start` field controls the starting position within the list of results,
while `num_results` dictates how many results are returned. Thus, setting
`start=5` and `num_results=20` would return twenty results beginning at position
five. These fields are mainly used to provide pagination.

The `corpusKey` specifies a list of corpora against which to run the
query. While it's most often the case that a query is run against a single
corpus, it's sometimes useful to run against several in parallel.

Finally, the **reranking configuration** enables reranking of results, to
further increase relevance in certain scenarios. For details about our English
cross-attentional (Scale only) and Maximal Marginal Relevance (MMR) rerankers,
see [Reranking](/docs/api-reference/search-apis/reranking).

## Corpus Key Definition

The `corpusKey` specifies the ID of the corpus being searched. The
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

## Query Summarization Request - Retrieval Augmented Generation

To use Retrieval Augmented Generation (RAG), which <Config v="names.product"/> also refers to as
"Grounded Generation" -- our groundbreaking way of producing generative
summaries on top of your own data -- you can submit a `SummarizationRequest`
alongside your query. This produces a `summary` that attempts to answer the
end-user's question, citing the results as references. For more information,
read about [Retrieval Augmented Generation](/docs/learn/grounded-generation/grounded-generation-overview).

The `summary` object enables you to tailor the results of the query
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

In your summarization request, set the `factual_consistency_score` field to `true`.
The Factual Consistency Score returns a calibrated value in the
`factual_consistency` field of the summary message. The score field
contains the value between `0.0` and `1.0`.

For example, a score of `0.95` suggests a 95% likelihood that the summary is
free of hallucinations and would align with the original content. A lower
score of `0.40` indicates a 40% chance which would be probably much less
factually accurate. We suggest starting with a setting of `0.5` as an initial
guideline for cutoffs between good and bad.

## Advanced Summarization Customization Options

[Scale users](https://vectara.com/pricing/) have access to more powerful summarization
capabilities, which present a powerful toolkit for tailoring summarizations to
specific application and user needs.

The `summarizerPromptName` allows you to specify one of our [available summarizers](/docs/learn/grounded-generation/select-a-summarizer).
Use `promptText` to override the default prompt text with a [custom prompt](/docs/prompts/vectara-prompt-engine).
Your use case might require a chatbot to be more human like, so you decide to
create a custom response format that behaves more playfully in a conversation
or summary.

The `debug` option lets you view detailed logs to help in troubleshooting and
optimization. The `responseChars` lets you control the length of the summary, but
note that it is **not a hard limit** like with the `maxTokens` parameter. The
`modelParams` object provides even more fine-grained controls for the summarizer
model:

- `maxToken` specifies a hard limit on the number of characters in a response.
  This value supercedes the `responseChars` parameter in the `summary` object.
- `temperature` indicates whether you want the summarization to not be creative at all `0.0`,
  or for the summarization to take more creative liberties as you approach
  the maximium value of `1.0`.
- `frequencyPenalty` provides even more granular control to help ensure that the
  summarization decreases the likelihood of repeating words. The values range from `0.0` to `1.0`
- `presencePenalty` provides more control over whether you want the summary to
  include new topics. The values also range from `0.0` to `1.0`.

By leveraging these advanced capabilities, application builders can fine-tune
the behavior and output style of the summarizer to align with your unique
application requirements.

### Chat Conversation Located within the Summary

If you enabled chat on the corpus, the `summary` object contains a
conversation from [Vectara Chat](/docs/api-reference/chat-apis/chat-apis-overview) which
includes a `conversationId`. You enable Vectara Chat by setting the `store` value to `true`.

The [Vectara Chat APIs](/docs/api-reference/chat-apis/chat-apis-overview) have more details about conversations.

## REST Example

### Stream Query API Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to search content from a corpus:
<code>https://<Config v="domains.rest.serving"/>/v1/stream-query</code>

The API Playground shows the full [Stream Query REST definition](/docs/rest-api/stream-query).

## gRPC Example

You can find the full Stream Query gRPC definition at [serving.proto](https://github.com/vectara/protos/blob/main/serving.proto).
