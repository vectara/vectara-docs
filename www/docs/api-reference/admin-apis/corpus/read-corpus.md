---
id: read-corpus
title: Read Corpus API Definition
sidebar_label: Read Corpus API Definition
---

import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Read Corpus API lets you view detailed information about corpora 
within your account. It enables you to view different aspects about the corpus 
including basic information like the ID, name, whether it is enabled or 
disabled, and other metadata. You can also view the corpus size, associated 
API keys, custom dimensions, and filter attributes.

This capability helps administrators understand the access control details and 
monitor the size of corpora to understand information like the amount of quota 
consumed. You can also use this information for optimizing 
search and storage utilization. 

For example, you can track the read and write activity of a specific corpus 
which can help you change your security strategy proactively. You noticed a 
corpus with an API key with read/write access that is only being used for high 
volume reads. You may decide to switch to a read-only key.

In another case, you might respond to a security incident by [disabling a specific corpus](/docs/api-reference/admin-apis/corpus/update-corpus-enablement) 
because of information returned by this endpoint.

:::tip

Check out our [**interactive API Playground**](/docs/rest-api/read-corpus) that lets you experiment with this 
REST endpoint to manage your corpus details.

:::

## Read Corpus Request and Response

The request to read corpus data provides detailed information about the corpus.
You specify either `true` or `false` whether you want to view basic 
information, corpus size, associated API keys, custom dimensions, and filter 
attributes. This read corpus request also requires `corpus_id` and `customer_id` 
parameters.

The response includes detailed information about the corpus depending on what 
you specified in the request. For example, you wanted to know the associated 
API keys with a specific corpus.

## REST Example

### Read Corpus REST Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to read a corpus:
<code>https://<Config v="domains.rest.admin"/>/v1/read-corpus</code>

The API Playground shows the full [Read Corpus](/docs/rest-api/read-corpus) REST definition.

## gRPC Example

You can find the full Read Corpus gRPC definition at [admin.proto](https://github.com/vectara/protos/blob/main/admin.proto).
