---
id: create-corpus
title: Create Corpus
sidebar_label: API Definition
---

import {Config} from '../definitions.md';
import {vars} from '@site/static/variables.json';

## Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to index content into a corpus:
<code>https://<Config v="domains.rest.admin"/>/v1/create-corpus</code>
This page describes the details of interacting with this endpoint.

Only the `name` and `description` fields are mandatory when creating a corpus.
The response message returns a unique id, `corpus_id`, by which the corpus can
be subsequently referenced. Note that the name needn't be unique within an
account.

In order to reference metadata in [filter expressions](/docs/search-apis/sql/filter-overview), the
referenceable attributes must be declared at creation time in the **filter
attributes**. This list cannot be changed once the corpus is created.

For information on **custom dimensions** please see
[Custom Dimensions](/docs/custom-dimensions). Like filter attributes, custom
dimensions cannot be changed after the corpus is created.

```protobuf
message CreateCorpusRequest {
  Corpus corpus = 1;
}

message CreateCorpusResponse {
  uint32 corpus_id = 1;
  Status status = 2;
}

message Corpus {
  uint32 id = 1;
  string name = 2;
  string description = 3;
  int64 dt_provision = 4;
  bool enabled = 5;
  bool swap_qenc = 6;
  bool swap_ienc = 7;
  bool textless = 8;
  bool encrypted = 9;

  uint64 encoder_id = 10;
  uint32 metadata_max_bytes = 11;
  string faiss_index_type = 12;

  repeated Dimension custom_dimensions = 13;
  repeated FilterAttribute filter_attributes = 14;
}
```

#### Filter Attribute

A filter attribute must specify a **name**, and a **level** which indicates
whether it exists in the document or part level metadata. At indexing time,
metadata with this name will be extracted and made available for filter
expressions to operate on.

If **indexed** is true, the system will build an index on the extracted values
to further improve the performance of filter expressions involving the
attribute. 

Finally, filter attributes must specify a **type**, which is validated when
documents are indexed. The three supported types are **integer**, which stores
signed whole-number values up to eight bytes in length; **real**, for storing
floating point values in [IEEE 754 8-byte format][1]; and **text** for storing 
textual strings in [UTF-8 encoding][2].

[1]: https://en.wikipedia.org/wiki/Double-precision_floating-point_format
[2]: https://en.wikipedia.org/wiki/UTF-8


```
message FilterAttribute {
  string name = 5;                     // Name, as seen in metadata
  string description = 10;             // Optional description
  bool indexed = 15;                   // Index for maximum query speed.
  FilterAttributeType type = 20;       // Type of the attribute
  FilterAttributeLevel level = 25;     // Document or part level?
}

enum FilterAttributeType {
  FILTER_ATTRIBUTE_TYPE__UNDEFINED = 0;
  FILTER_ATTRIBUTE_TYPE__INTEGER = 5;
  FILTER_ATTRIBUTE_TYPE__REAL = 15;
  FILTER_ATTRIBUTE_TYPE__TEXT = 25;
}

enum FilterAttributeLevel {
  FILTER_ATTRIBUTE_LEVEL__UNDEFINED = 0;
  FILTER_ATTRIBUTE_LEVEL__DOCUMENT = 5;         // Document-level attribute
  FILTER_ATTRIBUTE_LEVEL__DOCUMENT_PART = 10;   // Part-level attribute
}
```
