---
id: create-corpus
title: Create Corpus API Definition
sidebar_label: Create Corpus API Definition
---

import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Create Corpus API lets you create a corpus that contains specific 
properties and attributes.

:::tip

Check out our [**API Playground**](/docs/1.0/rest-api/create-corpus) that lets you experiment with this REST endpoint 
to create corpora.

:::

## Corpus Object

When you create a `corpus` object, only the `name` and `description` fields are 
mandatory.

The response message returns a unique id, `corpus_id`, by which the corpus 
can be subsequently referenced. Note that the name needn't be unique 
within an account.

In order to reference metadata in [filter expressions](/docs/1.0/learn/metadata-search-filtering/filter-overview), the
referenceable attributes must be declared at creation time in the **filter
attributes**. This list cannot be changed once the corpus is created.

For information on **custom dimensions**, a Scale-only feature, please see
[Custom Dimensions](/docs/1.0/learn/semantic-search/add-custom-dimensions).
Like filter attributes, custom dimensions cannot be changed after the corpus 
is created.

## Filter Attribute

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

## REST Example

### Create Corpus REST Endpoint

<Config v="names.product"/> exposes a REST endpoint at the following URL
to create a corpus:
<code>https://<Config v="domains.rest.admin"/>/v1/create-corpus</code>

The API Playground shows the full [Create Corpus](/docs/1.0/rest-api/create-corpus) REST definition.

## gRPC Example

You can find the full Create Corpus gRPC definition at [admin.proto](https://github.com/vectara/protos/blob/main/admin.proto).

The `CreateCorpusRequest` message contains a Corpus message with the name, 
description, and other customization options. The `CreateCorpusResponse` 
provides the response with the new Corpus ID and status.
