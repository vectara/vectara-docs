---
id: read-corpus
title: Get Corpus API Definition
sidebar_label: Get Corpus API Definition
---

import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Get Corpus API lets you view metadata about a specific corpus.
This is useful for getting information about a corpus without performing a
search.

This capability helps administrators understand the access control details and
monitor the size of corpora to understand information like the amount of quota
consumed. You can also use this information for optimizing
search and storage utilization.

For example, you can track the read and write activity of a specific corpus
which can help you change your security strategy proactively. You noticed a
corpus with an API key with read/write access that is only being used for high
volume reads. You may decide to switch to a read-only key.

In another case, you might respond to a security incident by disabling a
specific corpus because of information returned by this endpoint.

## Get Corpus Metadata Request and Response

To get corpus metadata, send a GET request to `/v2/corpora/:corpus_key`, where
`corpus_key` is the unique identifier for the corpus.

The response includes details such as the corpus ID, key, name, description,
enabled status, encoder information, filter attributes, custom dimensions,
and usage limits..

## REST 2.0 URL

### Get Corpus REST Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to get information about the corpus:
<code>https://<Config v="domains.rest.admin"/>/v2/corpora/:corpus_key</code>

The API Reference shows the full [Get Corpus](/docs/rest-api/get-corpus) REST definition.

## gRPC Example

You can find the full Read Corpus gRPC definition at [admin.proto](https://github.com/vectara/protos/blob/main/admin.proto).
