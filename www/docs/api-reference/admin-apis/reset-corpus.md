---
id: reset-corpus
title: Reset Corpus
sidebar_label: API Definition
---

import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Reset Corpus API lets you reset a corpus. This operation deletes the 
contents of a corpus, but it does not delete the corpus itself.

To reset a corpus, specify the `customer_id` and `corpus_id`. Upon 
successful completion, space quota consumed by the corpus will be freed.

:::tip

Check out our [**API Playground**](/docs/rest-api/reset-corpus) that lets you experiment with this REST endpoint 
to reset corpora.

:::

## REST Example

### Reset Corpus REST Endpoint

<Config v="names.product"/> exposes a REST endpoint at the following URL
to reset a corpus:
<code>https://<Config v="domains.rest.admin"/>/v1/reset-corpus</code>

The API Playground shows the full [Delete Corpus](/docs/rest-api/delete-corpus) REST definition.

## gRPC Example

You can find the full Reset Corpus gRPC definition at [admin.proto](https://github.com/vectara/protos/blob/main/admin.proto).