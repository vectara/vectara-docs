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

## Query API Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to search content from a corpus:
<code>https://<Config v="domains.rest.serving"/>/v1/query</code>

Once you've indexed data into one or more corpora, you're ready to run queries
and display the results. This page provides a detailed reference guide for how
to do that.

### Query Request Headers

To interact with the Query service via REST calls, you need the following 
headers:

* `customer_id` is the customer ID to use for the request.
* An API Key or JWT token is your authentication method
* (Optional) `grpc-timeout` lets you specify how long to wait for queries that 
  have the potential to take longer to process. We recommend 
  `-H "grpc-timeout: 30S"`

### Query Request Body

The Query request body specifies different parameters that ask questions about 
the data within corpora. The Query request requires the following parameters:

* `query` - Contains your question and number of results to return.
* `corpusKey` - Specifies which corpora to run the query 

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
          "customerId": 0,
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
        "rerankerId": 272725717
      },
      "summary": [
        {
          "summarizerPromptName": "vectara-summary-ext-v1.2.0",
          "maxSummarizedResults": 5,
          "responseLang": "eng"
        }
      ]
    }
  ]
}
```


## Full Search API Definition

The full definition of the gRPC interface is covered below.

### Query Service

Fundamentally, the system accepts a query and returns a response, which contains
a list of results. However, for efficiency, one or more queries can be batched
into a single request.

```protobuf
service QueryService {
  rpc Query(BatchQueryRequest) returns (BatchQueryResponse) { }
}
```

### Query Request

A single query consists of a **query**, which is specified in plain text. For
example, *"Where can I buy the latest iPhone?"*. Optionally, the **query
context** provides additional information that the system may use to refine the
results. For example, *"The Apple store near my house is closed due to Covid."*

The `start` field controls the starting position within the list of results,
while `num_results` dictates how many results are returned. Thus, setting
`start=5` and `num_results=20` would return twenty results beginning at position
five. These fields are mainly used to provide pagination.

The `CorpusKey` specifies a list of corpora against which to run the
query. While it's most often the case that a query is run against a single
corpus, it's sometimes useful to run against several in parallel.

Finally, the **reranking configuration** enables reranking of results, to
further increase relevance in certain scenarios. For details, see
[Reranking](#reranking) under the Advanced Scenarios section below.

```protobuf
message QueryRequest {
  // The query text to use from the end user.
  string query = 5;

  // The start position in the result set
  uint32 start = 15;
  // The number of results to return.
  uint32 num_results = 20;
  message ContextConfig {
    // The amount of context before. Ignored if sentences_before is set.
    int32 chars_before = 5;
    // The amount of context after. Ignored if sentences_after is set.
    int32 chars_after = 10;
    // The amount of context before, in sentences.
    int32 sentences_before = 15;
    // The amount of context after, in sentences.
    int32 sentences_after = 20;
    // The tag that wraps the snippet at the start.
    string start_tag = 25;
    // The tag that wraps the snippet at the end.
    string end_tag = 30;
  }
  ContextConfig context_config = 22;

  // The query is run on all these corpora, and the results are
  // merged together in the response, ranked by score.
  repeated CorpusKey corpus_key = 25;

  // Configuration options to apply to the reranking.
  message RerankingConfig {
    // Which reranking model to use if reranking.  Currently, the only ID
    // available is ID 272725717
    uint32 reranker_id = 5;
  }
  RerankingConfig reranking_config = 30;

  // Optionally, one or more requests to summarize the results.
  repeated SummarizationRequest summary = 35;
}
```

### Corpus Key

At the most basic level, the corpus key specifies the ID of the corpus being
searched. Specifying the `customer_id` is optional, since it defaults to the
customer attached to the gRPC request.

The `metadata_filter` allows specifying a predicate expression that restricts
the search to a part of the corpus. The filter is written in a simplified SQL
dialect and can reference metadata that was marked as filterable during corpus
creation. See the [Filter Expressions Overview](/docs/learn/metadata-search-filtering/filter-overview) for a 
description of their syntax, and [Corpus Administration](/docs/api-reference/admin-apis/admin) to learn how 
referenceable metadata is specified during corpus creation.

If the corpus specifies custom dimensions, weights can be assigned to each
dimension as well.

Finally, it's possible to override the semantic interpretation of the query
string. Usually, the default settings for the corpus are sufficient. In more
advanced scenarios, it's desirable to force it to be treated as a query, or,
more rarely, as a response.


```protobuf
message CorpusKey {
  // The Customer ID.
  uint32 customer_id = 5;
  // The Corpus ID.
  uint32 corpus_id = 10;

  // Semantics controls the interpretation of the query string by the
  // server, and can be used to override the default semantics assigned
  // in the corpus definition.
  enum Semantics {
    // Use corpus-assigned semantics.  This is the most common setting.
    DEFAULT = 0;
    // Use query semantics.  This is also common.
    QUERY = 1;
    // Use response semantics.  Usage of this is rare.
    RESPONSE = 2;
  }
  Semantics semantics = 15;

  // Weights on custom dimensions for the corpus.
  repeated CustomDimension dim = 20;

  string metadata_filter = 25;

  LinearInterpolation lexical_interpolation_config = 30;
}
```

### Generative Summarization Grounded in Data

If you'd like to use "Grounded Generation" -- <Config v="names.product"/>'s
groundbreaking way of producing generative summaries on top of your own data --
you can submit a `SummarizationRequest` alongside your query.  This produces a
summary that atttempts to answer the end-user's question, citing the results
as references.  The format of the summary request is as follows:

```protobuf
message SummarizationRequest {
  // The name of the summarizer+prompt combination to use for summarization.
  string summarizer_prompt_name = 3;
  // Maximum number of results to summarize.
  uint32 max_summarized_results = 15;
  // ISO 639-1 or ISO 639-3 language code for the response, or "auto" to indicate that
  // the auto-detected language of the incoming query should be used.
  string response_lang = 20;
}
```

When <Config v="names.product"/> responds with the list of results that most
semantically answer the user, it will also then produce a summary of the results
with its sources cited.  For more details on use cases for grounded generation
and details on how to use grounded generation and common use cases to consider,
have a look at the
[chatbots and grounded generation](/docs/learn/grounded-generation/grounded-generation-overview)
use case documentation.

The summary comes back in the following format:

```protobuf
message Summary {
  // The summary text.
  string text = 10;

  // ISO 639 language code of the summary. If the requested language was set to "AUTO", the
  // summary language is the same as the auto-detected language of the query.
  string lang = 15;


  // Statuses are marked “repeated” for consistency and flexibility. A failed
  // summary should bubble up into the status code of the entire ResponseSet.
  repeated Status status = 1000;
  // Populated for streaming requests only.
  int32 future_id = 1010;
}
```

The `text` contains a summary of the relevant results to the given search
with those relevant results included as cited sources.  <Config v="names.product"/>
cites these by `[number]` format.  For example, if the 1st result is in the
summary, it is cited as `[1]`.

### Query Response

The response message encapsulates a single query result. It is a subdocument
provided at indexing time. The `text` is the subdocument text, the `score`
indicates how well the text answers the query (higher scores are better).

The `metadata` list holds any subdocument-level metadata that was stored with
the item at indexing time. The `corpus_key` indicates which corpus the result
came from: recall that a single query can execute against multiple corpora.

Finally, the `document_index` points at a specific document within the
enclosing response set's `document` array. This is useful for retrieving the
document id and document-level metadata.

```
message Response {
  string text = 5;
  // The score used for ranking results.  The higher the score, the better the match.
  float score = 10;
  repeated Attribute metadata = 20;
  // Use this ID to find the document in the ResponseSet.
  uint32 document_index = 25;
  CorpusKey corpus_key = 30;
}
```

### ResponseSet

The response set groups a list of responses, sorted in order of score, together
with a list of `statuses` and enclosing `documents`. Since it's possible for
several results to come from the same document, the length of the document list
may be less than the length of the response list.

```
message ResponseSet {
  repeated Response response = 5;
  // Potentially multiple warnings.
  repeated Status status = 10;

  message Document {
    string id = 5;
    repeated Attribute metadata = 10;
  }
  repeated Document document = 15;

  // A summary. If using synchronous APIs for querying, the summary will be
  // included directly in this response. However, if using the streaming APIs
  // for query, the summary messages only set the future_id field. Later, as
  // summary results are computed and returned over the stream, the future_id
  // within the summary can be used for correlation.
  repeated Summary summary = 25;

  // Populated for streaming requests only.
  int32 future_id = 1010;
}
```

### Attribute

Attribute represents a named piece of metadata. Both the **name** and its
**value** are string typed.

```
message Attribute {
  string name = 5;
  string value = 10;
}
```

### Batch Query and Response

The batch query request and response messages simply aggregate several
individual queries and response sets, respectively. The response sets will match
the queries in both number and order, so, for example, the third response set in
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
benefitcial. To do this effectively, you need two things:

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

