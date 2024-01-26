---
id: create-corpus
title: Create Corpus API Definition
sidebar_label: Create Corpus API Definition
---

import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';


The Create Corpus API lets you create a corpus that contains specific 
properties and attributes. A corpus is a container where you upload your data 
to be ingested for querying.

:::tip

Check out our [**interactive API Playground**](/docs/rest-api/create-corpus) that lets 
you experiment with this REST endpoint to create a corpus.

:::

## Create Corpus Request Body and Response

Only the `name` and `description` fields are mandatory when creating a corpus.

The response message returns a unique id, `corpus_id`, by which the corpus can
be subsequently referenced. 

:::note

The name does not need to be unique within an account.

:::

In order to reference metadata in [filter expressions](/docs/learn/metadata-search-filtering/filter-overview), the
referenceable attributes must be declared at creation time in the **filter
attributes**. This list cannot be changed once the corpus is created.

For information on **custom dimensions** please see
[Custom Dimensions](/docs/learn/semantic-search/add-custom-dimensions).
Like filter attributes, custom dimensions cannot be changed after the corpus is created.


## Filter Attributes Definition

The `filterAttributes` object must specify a `name`, and a `level` which indicates
whether it exists in the document or part level metadata. At indexing time,
metadata with this name will be extracted and made available for filter
expressions to operate on.

If `indexed` is true, the system will build an index on the extracted values
to further improve the performance of filter expressions involving the
attribute.

Finally, filter attributes must specify a `type`, which is validated when
documents are indexed. The four supported types are `integer`, which stores
signed whole-number values up to eight bytes in length; `real`, for storing
floating point values in [IEEE 754 8-byte format][1]; `text` for storing
textual strings in [UTF-8 encoding][2], and `boolean` for storing true/false
values.

[1]: https://en.wikipedia.org/wiki/Double-precision_floating-point_format
[2]: https://en.wikipedia.org/wiki/UTF-8


## REST Example

### Create Corpus REST Endpoint

<Config v="names.product"/> exposes a REST endpoint at the following URL
to create a corpus:
<code>https://<Config v="domains.rest.admin"/>/v1/create-corpus</code>

### Create Corpus Request Body

```json
{
  "corpus": {
    "id": 1,
    "name": "NHL Rules",
    "description": "Contains rulebooks for the NHL",
    "dtProvision": "",
    "enabled": true,
    "swapQenc": true,
    "swapIenc": true,
    "textless": true,
    "encrypted": true,
    "encoderId": "1",
    "metadataMaxBytes": 0,
    "customDimensions": [
      {}
    ],
    "filterAttributes": [
      {
        "name": "name-of-field",
        "description": "Description about the name",
        "indexed": true,
        "type": "FILTER_ATTRIBUTE_TYPE__UNDEFINED",
        "level": "FILTER_ATTRIBUTE_LEVEL__UNDEFINED"
      }
    ]
  }
}
```

## gRPC Example

You can find the full Create Corpus gRPC definition 
at [admin.proto](https://github.com/vectara/protos/blob/main/admin.proto).

```protobuf
message Corpus {
  // The Corpus ID.
  // This value is ignored during Corpus creation.
  uint32 id = 1;
  // The name of the corpus.
  string name = 2;
  // A description for the corpus.
  string description = 3;
  // The time at which the corpus was provisioned.
  // This value is ignored during Corpus creation.
  int64 dt_provision = 4;
  // Whether the corpus is enabled for use or not.
  // This value is ignored during Corpus creation.
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
