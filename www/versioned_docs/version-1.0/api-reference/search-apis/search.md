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

:::tip

Check out our [**interactive API Playground**](/docs/1.0/rest-api/query) that lets you experiment with 
this REST endpoint to send queries.

:::

## Query Request Body and Response

The Query request body specifies different parameters that ask questions about 
the data within corpora. The Query request requires the following parameters:

* `query` - Contains your question and number of results to return.
* `corpusKey` - Specifies which corpora to run the query 

The query response message encapsulates a single query result. It is a subdocument
provided at indexing time. The `text` is the subdocument text, the `score`
indicates how well the text answers the query (higher scores are better).

The `metadata` list holds any subdocument-level metadata that was stored with
the item at indexing time. The `corpus_key` indicates which corpus the result
came from: recall that a single query can execute against multiple corpora.

Finally, the `document_index` points at a specific document within the
enclosing response set's `document` array. This is useful for retrieving the
document id and document-level metadata.


## Query Definition

A single query consists of a **query**, which is specified in plain text. For
example, *"Where can I buy the latest iPhone?"*. Optionally, the **query
context** provides additional information that the system may use to refine the
results. For example, *"The Apple store near my house is closed due to Covid."*

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
see [Reranking](/docs/1.0/api-reference/search-apis/reranking).

## Corpus Key Definition

The `corpusKey` specifies the ID of the corpus being searched. The 
`metadata_filter` allows specifying a predicate expression that restricts 
the search to a part of the corpus. The filter is written in a simplified SQL 
dialect and can reference metadata that was marked as filterable during corpus 
creation. 

:::note

See the [**Filter Expressions Overview**](/docs/1.0/learn/metadata-search-filtering/filter-overview) for a 
description of their syntax, and [**Corpus Administration**](/docs/1.0/api-reference/admin-apis/admin) to learn how 
referenceable metadata is specified during corpus creation.

:::

By default, <Config v="names.product"/> only uses its neural/semantic retrieval model, 
and does not attempt to use keyword matching. To enable [hybrid search](/docs/1.0/learn/hybrid-search) with a 
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
read about [Retrieval Augmented Generation](/docs/1.0/learn/grounded-generation/grounded-generation-overview).

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

The `summarizerPromptName` allows you to specify one of our [available summarizers](/docs/1.0/learn/grounded-generation/select-a-summarizer).
Use `promptText` to override the default prompt text with a [custom prompt](/docs/1.0/prompts/vectara-prompt-engine). 
Your use case might require a chatbot to be more human like, so you decide to 
create a custom response format that behaves more playfully in a conversation 
or summary. 

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


### Chat Conversation Located within the Summary

If you enabled chat on the corpus, the `summary` object contains a 
conversation from [Vectara Chat](/docs/1.0/api-reference/chat-apis/chat-apis-overview) which 
includes a `conversationId`. You enable Vectara Chat by setting the `store` value to `true`.

The [Vectara Chat APIs](/docs/1.0/api-reference/chat-apis/chat-apis-overview) have more details about conversations.

## REST Example

### Query API Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to search content from a corpus:
<code>https://<Config v="domains.rest.serving"/>/v1/query</code>

The API Playground shows the full [Query REST definition](/docs/1.0/rest-api/query).

## gRPC Example

You can find the full Query gRPC definition at [serving.proto](https://github.com/vectara/protos/blob/main/serving.proto).

### Query Service and Request

The definition shows details about the `query` service. The system accepts a 
`query` and returns a response, which contains a list of results. For 
efficiency, one or more queries can be batched into a single request. `query` 
contains the search terms that the system needs to match against 
the data. Then `ContextConfig` specifies the amount of text or number of 
sentences before and after the result snippet.

#### Corpus Key

The `corpus_key` allows the query to be executed across multiple corpora. 
The `CorpusKey` identifies a specific corpus or corpora to include in the query.
Specifying the `customer_id` is optional, since it defaults to the
customer attached to the gRPC request.

#### Summarization Request Example

The full Query definition provides the detailed summary request. When <Config v="names.product"/> responds 
with the list of results that most semantically answer the user, it will also 
then produce a summary of the results with its sources cited. For more details 
on Retrieval Augmented Generation, have a look at the
[chatbots and grounded generation overview](/docs/1.0/learn/grounded-generation/grounded-generation-overview).

The summary comes back in a format where the `text` contains a summary of the 
relevant results to the given search with those relevant results included as 
cited sources.  <Config v="names.product"/> cites these by `[number]` format. 
For example, if the 1st result is in the summary, it is cited as `[1]`.

#### ResponseSet

The response set groups a list of responses, sorted in order of score, together
with a list of `statuses` and enclosing `documents`. Since it's possible for
several results to come from the same document, the length of the document list
may be less than the length of the response list.

#### Attribute

Attribute represents a named piece of metadata. Both the `name` and its
`value` are string typed.

```
message Attribute {
  string name = 5;
  string value = 10;
}
```

#### Batch Query and Response

The batch query request and response messages simply aggregate several
individual queries and response sets, respectively. The response sets will match
the queries in both number and order. For example, the third response set in
the batch response will correspond with the third query in the batch request.

```protobuf
message BatchQueryRequest {
  repeated QueryRequest query = 5;
}

message BatchQueryResponse {
  repeated ResponseSet response_set = 5;

  repeated Status status = 1000;
}
```

## Advanced Scenarios

### Search Multiple Corpora

There are situations where searching multiple corpora simultaneously can be 
beneficial. To do this effectively, you need two things:

1. **Proper Permissions:** Setting up an API Key that grants access to all corpora 
   that you intend to search.
2. **Query Body Adjustment:** Specific modifications to the query body as outlined below.


The query body modification that's necessary is that `corpusKey` can take an
array of objects.

#### Search a Single Corpus Example

So if you're currently searching 1 corpus as follows:


```json
...
"corpusKey": [
  {
    "customerId": 1234,
    "corpusId": 5678,
    "semantics": 0,
    "metadataFilter": "",
    "dim": []
  }
]
...
```

#### Search Multiple Corpora Example


As long as your API key has permissions to each of these corpora,
you can search multiple corpora at once as follows:

```json
...
"corpusKey": [
  {
    "customerId": 1234,
    "corpusId": 5678,
    "semantics": 0,
    "metadataFilter": "",
    "dim": []
  },
  {
    "customerId": 1234,
    "corpusId": 9876,
    "semantics": 0,
    "metadataFilter": "",
    "dim": []
  }
]
...
```
In this example, the `query` returns results across the queried
corpora. The `corpusKey` is returned in the response for each document
if you need to use it in your application.

