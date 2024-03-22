---
id: delete-corpus
title: Delete Corpus API Definition
sidebar_label: Delete Corpus API Definition
---

import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Delete Corpus API lets you delete a corpus. To delete a corpus, specify 
the `customer_id` and `corpus_id`. Upon successful completion, space quota 
consumed by the corpus will be freed, and the corpus will no longer be useable 
for future indexing or querying. 

:::note

The corpus_id assigned to the corpus will not be reused.

:::

:::tip

Check out our [**API Playground**](/docs/rest-api/delete-corpus) that lets you experiment with this REST endpoint 
to delete corpora.

:::

## REST Example

### Delete Corpus REST Endpoint

<Config v="names.product"/> exposes a REST endpoint at the following URL
to delete a corpus:
<code>https://<Config v="domains.rest.admin"/>/v1/delete-corpus</code>

The API Playground shows the full [Delete Corpus](/docs/rest-api/delete-corpus) REST definition.

## gRPC Example

You can find the full Delete Corpus gRPC definition at [admin.proto](https://github.com/vectara/protos/blob/main/admin.proto).
