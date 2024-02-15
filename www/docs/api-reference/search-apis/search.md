---
id: search
title: Search API Definition
sidebar_label: Search API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Search endpoint lets you perform a query while defining its parameters 
that specify the query text, pagination details, metadata filters, and other 
settings that enable application builders to tailor their queries to specific 
use cases.

After you index data into one or more corpora, you can run queries 
and display the results. This page provides a detailed reference for how
to run queries and also describes some of Vectara's capabilities in metadata 
filtering, reranking, Retrieval Augmented Generation (RAG), and hybrid search.

:::tip

Check out our [**interactive API Playground**](/docs/rest-api/query) that lets you experiment with this REST endpoint to manage your corpus details.

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
see [Reranking](/docs/api-reference/search-apis/reranking).

## Corpus Key Definition

The `corpusKey` specifies the ID of the corpus being searched. The `metadata_filter` allows 
specifying a predicate expression that restricts the search to a part of the 
corpus. The filter is written in a simplified SQL dialect and can reference 
metadata that was marked as filterable during corpus
creation. 

:::note

See the [**Filter Expressions Overview**](/docs/learn/metadata-search-filtering/filter-overview) for a 
description of their syntax, and [**Corpus Administration**](/docs/api-reference/admin-apis/admin) to learn how 
referenceable metadata is specified during corpus creation.

:::

By default, <Config v="names.product"/> only uses its neural/semantic retrieval model, 
and does not attempt to use keyword matching. To enable [hybrid search](/docs/learn/hybrid-search) with a 
mix of both keyword and neural results, edit the `lambda` value.

If the corpus specifies custom dimensions, weights can be assigned to each
dimension as well.

Finally, it's possible to override the semantic interpretation of the query
string. Usually, the default settings for the corpus are sufficient. In more
advanced scenarios, it's desirable to force it to be treated as a query, or,
more rarely, as a response.

### Retrieval Augmented Generation - Summarization Grounded in Data

To use Retrieval Augmented Generation (RAG), which <Config v="names.product"/> also refers to as
"Grounded Generation" -- our groundbreaking way of producing generative 
summaries on top of your own data -- you can submit a `SummarizationRequest` alongside your query. 
This produces a `summary` that attempts to answer the end-user's question, 
citing the results as references. For more information, read about [Retrieval Augmented Generation](/docs/learn/grounded-generation/grounded-generation-overview).

### Chat Conversation Located within the Summary

The `summary` within the query can also contain a conversation from [Vectara Chat](/docs/api-reference/chat-apis/chat-apis-overview) which 
includes a `conversationId`. You enable Vectara Chat by setting the `store` value to `true`.

## REST Example

### Query API Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to search content from a corpus:
<code>https://<Config v="domains.rest.serving"/>/v1/query</code>

### Query Request Headers

To interact with the Query service via REST calls, you need the following 
headers:

* `customer_id` is the customer ID to use for the request.
* An API Key or JWT token is your authentication method
* (Optional) `grpc-timeout` lets you specify how long to wait for queries that 
  have the potential to take longer to process. We recommend 
  `-H "grpc-timeout: 30S"`

### Query Request

The Query request body specifies different parameters that ask questions about 
the data within corpora. The Query request requires the following parameters:

* `query` - Contains your question and number of results to return.
* `corpusKey` - Specifies which corpora to run the query. For multiple corpora, 
  use an array

```json
{
  "query": [
    {
      "query": "What is the answer to the life, the universe, and everything?",
      "start": 0,
      "numResults": 10,
      "contextConfig": {
        "charsBefore": 30,
        "charsAfter": 30,
        "sentencesBefore": 3,
        "sentencesAfter": 3,
        "startTag": "<b>",
        "endTag": "</b>"
      },
      "corpusKey": [
        {
          "customerId": 123456789,
          "corpusId": 1,
          "semantics": "DEFAULT",
          "dim": [],
          "metadataFilter": "part.lang = 'eng'",
          "lexicalInterpolationConfig": {
            "lambda": 0.025
          }
        }
      ],
      "rerankingConfig": {
        "rerankerId": 272725718,
        "mmrConfig": {
          "diversityBias": 0
        }
      },
      "summary": [
        {
          "summarizerPromptName": "vectara-summary-ext-v1.2.0",
          "maxSummarizedResults": 5,
          "responseLang": "eng",
          "chat": {
            "store": true,
            "conversationId": "0191086a-4b8a-4aec-b600-affa9b261acf"
          },
        }
      ]
    }
  ]
}
```

## gRPC Example

You can find the full Query gRPC definition at [serving.proto](https://github.com/vectara/protos/blob/main/serving.proto).

### Query Service

Fundamentally, the system accepts a query and returns a response, which contains
a list of results. However, for efficiency, one or more queries can be batched
into a single request.

### Query Request

The request provides several fields and nested messages that configure the 
query, its context, and how the results should be processed and presented.
The `query` contains the search terms that the system needs to match against 
the data. Then `ContextConfig` specifies the amount of text or number of 
sentences before and after the result snippet.

#### Corpus Key

The `corpus_key` allows the query to be executed across multiple corpora. 
The `CorpusKey` identifies a specific corpus or corpora to include in the query.
Specifying the `customer_id` is optional, since it defaults to the
customer attached to the gRPC request.

#### Summarization Request Example

The full Query defintion provides the detailed summary request. When <Config v="names.product"/> responds 
with the list of results that most semantically answer the user, it will also 
then produce a summary of the results with its sources cited. For more details 
on Retrieval Augmented Generation, have a look at the
[chatbots and grounded generation overview](/docs/learn/grounded-generation/grounded-generation-overview).

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

Attribute represents a named piece of metadata. Both the **name** and its
**value** are string typed.

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

