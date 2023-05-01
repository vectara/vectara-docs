---
id: core_indexing
title: Low-level Indexing
sidebar_label: API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '../definitions.md';
import {vars} from '@site/static/variables.json';

The low-level indexing API provides low-level access to the semantic indexing
capabilities of the platform. It is reserved for advanced use cases and
normal users should use the [Standard API](indexing).

## Full Definition

The full definition of the gRPC interface is covered below.

### Service

The indexing service operates in two modes: _incremental_ and _batch_. In
incremental mode, individual documents or messages are sent to be indexed. In
a short period of time, generally a few minutes, the new content will become
available in the search index.

The definition of the incremental service is shown below.


```protobuf
service CoreIndexService {
  // Adds a document to the corpus.
  rpc Index(IndexCoreDocumentRequest) returns (IndexCoreDocumentResponse) {}
}
```

When there are a large number of documents to process, it is more efficient to
process them using the batch interface. This is described below.

### Document Index Request

A request to add data into a corpus consists of three key pieces of information:
the customer ID, the corpus ID, and the data itself, represented as a
**CoreDocument** message.

```protobuf
message IndexCoreDocumentRequest {
  // The Customer ID to issue the request for.
  int64 customer_id = 1;
  // The Corpus ID to index the document into.
  int64 corpus_id = 2;
  com.vectara.indexing.CoreDocument document = 3;
}
```

The reply from the server consists of nothing yet. Note that the reply does not
block. In other words, the information in the request is not yet available in
the index when the RPC returns.

```protobuf
message IndexDocumentReply {
}
```

### Core Document

The document is a container of related textual items that are indexed. It
defines an ID, **document_id**, which must be unique among all the documents in
the same corpus. It may optionally define metadata, **metadata_json**.

Two fields, **default_part_context** and **custom_dims**, provide default values
for the corresponding sub-document fields, should they fail to define either
of these explicitly.

Most importantly, **parts** defines the actual text items to be indexed.

```protobuf
// A document to index.
message CoreDocument {
  // A document ID to assign to this document.
  string document_id = 1;
  // Metadata about the document. This should be a json string. It can be
  // retrieved at query time.
  string metadata_json = 2;
  // All parts of this document.
  repeated CoreDocumentPart parts = 3;
  // This field provides a way to specify a blanket context for all parts. If
  // the context in a part is empty, this context will be used.
  string default_part_context = 4;
  // A list of custom dimension values that are included in the generated
  // representation of all parts.
  repeated CustomDimension custom_dims = 5;
}
}
```

### Core Document Part

The document part is the atomic unit of <Config v="names.product"/>. Every part is added to
the index, and when search results are returned, each result is a document part.

The **text** field defines the text. This should generally be a sentence: it
should not be shorter, but may be longer, up to the length of an entire
paragraph, although performance may suffer.

The **context** defines the context of the text. It may include any additional
textual information that helps in disambiguating the meaning. For instance, it
may include the preceding or following paragraphs, the chapter title, or the
document title.

The part metadata, held in **metadata_json**, is returned with the document part
in search query results. It can contain, for example, information that links the
item to records in other systems.

Finally, **custom_dims** allows you to specify additional factors that can be
used at query time to control the ranking of results. The dimensions must be
defined ahead of time for the corpus, or else they'll be ignored.

```protobuf
message CoreDocumentPart {
  // A part of the document. e.g., a sentence.
  string text = 1;
  // Context of the part.
  string context = 2;
  // Metadata about this part of the document. This should be a json string.
  // It is passed through the system, without being used at indexing time. It
  // can be retrieved at query time.
  string metadata_json = 3;
  // A list of custom dimension values that are included in the generated
  // representation of this part.  These are optional and take on the corpus
  // default custom dimension value if not explicitly provided for the document
  repeated CustomDimension custom_dims = 4;
}
```
