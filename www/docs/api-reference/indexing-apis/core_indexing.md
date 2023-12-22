---
id: core_indexing
title: Low-level Indexing API Definition
sidebar_label: Low-level Indexing API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Low-level Indexing API provides low-level access to the semantic indexing 
capabilities of the platform. The Standard Indexing API organizes documents 
into sections that have IDs, titles, and descriptions, like traditional, 
hierarchical document structures. This Low-level Indexing API differs by 
focusing on document `parts` which allow for specific text and context 
definitions within 
a document.

This more granular control over documents enables you to tailor your indexing 
strategies. This API is reserved for advanced use cases and normal 
users should use the [Standard API](indexing).

:::tip

Check out our [**interactive API Playground**](/docs/rest-api/core-index) that lets you experiment 
with this endpoint to index documents from your browser.

:::

### Low-Level Index Document Request and Response

The indexing service operates by accepting individual documents or messages to 
be indexed. In a short period of time, generally a few minutes, the new 
content becomes available in the search index. This index request requires the 
following parameters:

* Customer ID 
* Corpus ID
* Document object

The reply from the server consists of nothing yet. Note that the reply does not
block. In other words, the information in the request is not yet available in
the index when the RPC returns.

## Document Container

The `document` object is a container of related textual items that are indexed. 
This object has a `document_id`, which must be unique among all the documents in
the same corpus. It may optionally define `metadata_json`.

Two fields, `default_part_context` and `custom_dims` (Scale only), provide 
default values for the corresponding sub-document fields, should they fail to 
define either of these explicitly.

Most importantly, `parts` defines the actual text items to be indexed.

## Documents Parts

The document part is the atomic unit of <Config v="names.product"/>. Every 
part is added to the index, and when search results are returned, each result 
is a document part:
* Text
* Context
* Metadata
* Custom Dimensions

The `text` field defines the text. This should generally be a sentence: it
should not be shorter, but may be longer, up to the length of an entire
paragraph, although performance may suffer.

The `context` defines the context of the text. It may include any additional
textual information that helps in disambiguating the meaning. For instance, it
may include the preceding or following paragraphs, the chapter title, or the
document title.

The part metadata, held in `metadata_json`, is returned with the document part
in search query results. For example, it can contain information that links the
item to records in other systems.

Finally, `custom_dims` allows you to specify additional factors that can be
used at query time to control the ranking of results. The dimensions must be
defined ahead of time for the corpus, or else they'll be ignored.

## REST Example

### Low-level Indexing REST Endpoint

<Config v="names.product"/> exposes a REST endpoint at the following URL
to index content into a corpus:
<code>https://<Config v="domains.rest.indexing"/>/v1/core-index</code>


### Low-level Indexing Request and Response

The request body provides the following parameters:

* `customerID`
* `corpusID`
* `document` object containing the `documentID`, `metadataJson`, and contextual `parts`

```json
{
  "customerId": "123456789",
  "corpusId": "8",
  "document": {
    "documentId": "Research_Doc_1",
    "metadataJson": "{\"category\":\"Research Papers\"}",
    "parts": [
      {
        "text": "Introduction to Quantum Computing",
        "context": "Quantum Computing Overview that summarizes the main points of the paper's purpose",
        "metadataJson": "{\"section\":\"Introduction\"}",
        "customDims": [
          {
            "name": "relevance",
            "value": 10
          }
        ]
      },
      {
        "text": "Quantum Entanglement and Superposition",
        "context": "Chapter 1: Key Quantum Computing Concepts",
        "metadataJson": "{\"section\":\"Chapter 1\"}",
        "customDims": [
          {
            "name": "complexity",
            "value": 15
          }
        ]
      }
      // Continue with additional parts that you want indexed
    ],
    "defaultPartContext": "Quantum Computing Research Study",
    "customDims": [
      {
        "name": "difficulty",
        "value": 6
      }
    ]
  }
}
```
The response from the server includes a status code and the amount of quota 
consumed:

```json
{
  "status": {
    "code": "OK",
    "statusDetail": ""
  },
  "quotaConsumed": {
    "numChars": "1572",
    "numMetadataChars": "332"
  }
}

```

## gRPC Example

You can find the full Low-level Indexing gRPC definition at [indexing_core.proto](https://github.com/vectara/protos/blob/main/indexing_core.proto).

### Index Document Request and Response

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

### Document Container Format

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
```

### Part within the Document

```protobuf
// Part of a document. A document consists of several such parts.
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
