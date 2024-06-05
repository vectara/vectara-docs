---
id: create-corpus
title: Create Corpus API Definition
sidebar_label: Create Corpus API Definition
---

import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The [Create Corpus API](/docs/rest-api/create-corpus) lets you create a corpus to store and manage your 
documents. A corpus is a container for documents and their associated 
metadata. When creating a corpus, you can specify various settings such as the 
corpus key, name, description, encoder, and filter attributes.

## Corpus Object

When you create a `corpus` object, the `key` property is required to uniquely 
identify the corpus. The `name` parameter is optional and defaults to the 
value of `key`. The optional `description` properties lets you provide 
additional information about the corpus.

You can specify whether to treat queries or documents in the corpus as 
questions or answers using the `queries_are_answers` and `documents_are_questions` 
boolean properties. These settings affect the semantics of the encoder used at 
query time and indexing time.

The `encoder_id` property allows you to choose the encoder for the corpus. If 
not specified, it defaults to the latest Vectara encoder.

In order to reference metadata in [filter expressions](/docs/learn/metadata-search-filtering/filter-overview), the attributes 
must be declared at creation time in the `filter_attributes` array. This list 
cannot be changed once the corpus is created.

Scale users can specify `custom_dimensions` to allow weighting of document parts 
during indexing and querying. Like filter attributes, custom dimensions cannot 
be changed after corpus creation.

The response message returns a unique `id` that you use to reference the 
corpus. The `name` does not need to be unique within an account.


## Filter Attribute

In order to reference metadata in [filter expressions](/docs/learn/metadata-search-filtering/filter-overview), the
referenceable attributes must be declared at creation time in the **filter
attributes**. This list cannot be changed once the corpus is created.

For information on **custom dimensions**, a Scale-only feature, please see
[Custom Dimensions](/docs/learn/semantic-search/add-custom-dimensions).
Like filter attributes, custom dimensions cannot be changed after the corpus 
is created.

A filter attribute must specify a `name`, and a `level` which indicates
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

## REST 2.0 URL

### Create Corpus REST 2.0 Endpoint

<Config v="names.product"/> exposes a REST endpoint at the following URL
to create a corpus:
<code>https://<Config v="domains.rest.admin"/>/v2/corpora</code>

The API Playground shows the full [Create Corpus](/docs/rest-api/create-corpus) REST definition.

## gRPC Example

You can find the full Create Corpus gRPC definition at [admin.proto](https://github.com/vectara/protos/blob/main/admin.proto).

The `CreateCorpusRequest` message contains a Corpus message with the name, 
description, and other customization options. The `CreateCorpusResponse` 
provides the response with the new Corpus ID and status.
