---
id: search
title: Search API
sidebar_label: API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

## Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to search content from a corpus:
<code>https://<Config v="domains.rest.serving"/>/v1/query</code>

Once you've indexed data into one or more corpora, you're ready to run queries
and display the results. This page provides a detailed reference guide for how
to do that.

## Full Definition

The full definition of the gRPC interface is covered below.

### Service

Fundamentally, the system accepts a query and returns a response, which contains
a list of results. However, for efficiency, one or more queries can be batched
into a single request.

```protobuf
service QueryService {
  rpc Query(BatchQueryRequest) returns (BatchQueryResponse) { }
}
```

### Query

A single query consists of a **query**, which is specified in plain text. For
example, *"Where can I buy the latest iPhone?"*. Optionally, the **query
context** provides additional information that the system may use to refine the
results. For example, *"The Apple store near my house is closed due to Covid."*

The **start** field controls the starting position within the list of results,
while **num_results** dictates how many results are returned. Thus, setting
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
}
```

### Corpus Key

At the most basic level, the corpus key specifies the id of the corpus being
searched. Specifying the **customer_id** is optional, since it defaults to the
customer attached to the gRPC request.

The **metadata_filter** allows specifying a predicate expression that restricts
the search to a part of the corpus. The filter is written in a simplified SQL
dialect and can reference metadata that was marked as filterable during corpus
creation. See the [Filter Expressions Overview](/docs/common-use-cases/filtering-by-metadata/filter-overview) for a 
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

### Response

The response message encapsulates a single query result. It is a subdocument
provided at indexing time. The **text** is the subdocument text, the **score**
indicates how well the text answers the query (higher scores are better).

The **metadata** list holds any subdocument-level metadata that was stored with
the item at indexing time. The **corpus_key** indicates which corpus the result
came from: recall that a single query can execute against multiple corpora.

Finally, the **document_index** points at a specific document within the
enclosing response set's **document** array. This is useful for retrieving the
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
with a list of **statuses** and enclosing **documents**. Since it's possible for
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

### Searching Multiple Corpora
Sometimes, it's advantageous to search multiple corpora at the same time.  In
those cases, you need two things:
1. Permissions (e.g. via an API key) that's set up to have access to all of
the corpora you're interested in searching
2. A modification to the query body as outlined below

The query body modification that's necessary is that `corpusKey` can take an
array of objects.  So if you're currently searching 1 corpus as follows:
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

As long as the API key you're using has permissions to each of these corpora,
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
This then means that the `query` will return results across the queried
corpora.  The `corpusKey` will be returned in the response for each document
if you need to use it in your application.

