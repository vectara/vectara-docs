---
id: create-corpus
title: Create Corpus
sidebar_label: Create Corpus API Definition
---

import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Create Corpus endpoint lets you create a corpus that contains specific 
properties and attributes.

## Create Corpus REST Endpoint

<Config v="names.product"/> exposes a REST endpoint at the following URL
to ingest content into a corpus:
<code>https://<Config v="domains.rest.admin"/>/v1/create-corpus</code>

### Create Corpus Request Headers

To interact with the Create Corpus service via REST calls, you need the following 
headers:

* `customer_id` is the customer ID to use for the request.
* JWT token as your `Bearer Token`
* (Optional) `grpc-timeout` lets you specify how long to wait for the calls 
* that have the potential to take longer to process. We recommend 
  `-H "grpc-timeout: 30S"`

### Create Corpus Request Body

Only the `name` and `description` fields are mandatory when creating a corpus.

```json
{
  "corpus": {
    "id": 0,
    "name": "string",
    "description": "string",
    "dtProvision": "string",
    "enabled": true,
    "swapQenc": true,
    "swapIenc": true,
    "textless": true,
    "encrypted": true,
    "encoderId": "string",
    "metadataMaxBytes": 0,
    "customDimensions": [
      {
        "name": "string",
        "description": "string",
        "servingDefault": 0,
        "indexingDefault": 0
      }
    ],
    "filterAttributes": [
      {
        "name": "string",
        "description": "string",
        "indexed": true,
        "type": "FILTER_ATTRIBUTE_TYPE__UNDEFINED",
        "level": "FILTER_ATTRIBUTE_LEVEL__UNDEFINED"
      }
    ]
  }
}
```

The response message returns a unique id, `corpus_id`, by which the corpus can
be subsequently referenced. Note that the name needn't be unique within an
account.

In order to reference metadata in [filter expressions](/docs/learn/metadata-search-filtering/filter-overview), the
referenceable attributes must be declared at creation time in the **filter
attributes**. This list cannot be changed once the corpus is created.

For information on **custom dimensions** please see
[Custom Dimensions](/docs/learn/semantic-search/add-custom-dimensions).
Like filter attributes, custom dimensions cannot be changed after the corpus is created.

```protobuf
message CreateCorpusRequest {
  Corpus corpus = 1;
}

message CreateCorpusResponse {
  // The corpus id that was created.
  uint32 corpus_id = 1;
  Status status = 2;
}

message Corpus {
  // The corpus id.
  uint32 id = 1;
  // The name of the corpus.
  string name = 2;
  // A description for the corpus.
  string description = 3;
  // The time at which the corpus was provisioned.
  int64 dt_provision = 4;
  // Whether the corpus is enabled for use or not.
  bool enabled = 5;

  
  bool swap_qenc = 6;
  // The default query encoder is designed for normal question-answering types
  // of queries when the text contains the answer.  Swapping the index encoder
  // is generally rare, but can be used to help directly match questions to
  // questions.  This can be useful if you have a FAQ dataset and you want to
  // directly match the user question to the question in the FAQ.
  bool swap_ienc = 7;
  // When a corpus is "textless", Vectara does not store the original text.
  // Instead, Vectara converts the text to vectors and only retains metadata.
  bool textless = 8;
  // Encryption is on by default and cannot be turned off.
  bool encrypted = 9;

  // This is an advanced setting for changing the underlying model type.  The
  // default value is "1", which is Vectara's high-performing global model.
  // Underlying models may be swapped for some paying customers by contacting
  // our support team.
  uint64 encoder_id = 10;
  // An optional maximum size of the metadata that each document can contain.
  uint32 metadata_max_bytes = 11;

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
documents are indexed. The four supported types are **integer**, which stores
signed whole-number values up to eight bytes in length; **real**, for storing
floating point values in [IEEE 754 8-byte format][1]; **text** for storing
textual strings in [UTF-8 encoding][2], and **boolean** for storing true/false
values.

[1]: https://en.wikipedia.org/wiki/Double-precision_floating-point_format
[2]: https://en.wikipedia.org/wiki/UTF-8


```
message FilterAttribute {
  // Name of the field, as seen in metadata.
  string name = 5;
  // An optional description.
  string description = 10;
  // Whether the field is indexed for maximum query speed.
  bool indexed = 15;
  // The data type of the attribute.
  FilterAttributeType type = 20;
  // Whether the attribute lives at the document or part level.
  FilterAttributeLevel level = 25;
}

enum FilterAttributeType {
  FILTER_ATTRIBUTE_TYPE__UNDEFINED = 0;
  FILTER_ATTRIBUTE_TYPE__INTEGER = 5;
  FILTER_ATTRIBUTE_TYPE__REAL = 15;
  FILTER_ATTRIBUTE_TYPE__TEXT = 25;
  FILTER_ATTRIBUTE_TYPE__BOOLEAN = 35;
}

enum FilterAttributeLevel {
  FILTER_ATTRIBUTE_LEVEL__UNDEFINED = 0;
  FILTER_ATTRIBUTE_LEVEL__DOCUMENT = 5;         // Document-level attribute
  FILTER_ATTRIBUTE_LEVEL__DOCUMENT_PART = 10;   // Part-level attribute
}
```
