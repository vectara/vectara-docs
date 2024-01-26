---
id: reset-corpus
title: Reset Corpus API Definition
sidebar_label: Reset Corpus API Definition
---

import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Reset Corpus API lets you reset a corpus in the account. A reset purges 
all the data within a corpus, but it leaves the corpus definition intact.

## Reset Corpus Request Body

To reset a corpus, specify the `customer_id` and `corpus_id`. Upon 
successful completion, space quota consumed by the corpus will be freed.

:::tip

Check out our [**interactive API Playground**](/docs/rest-api/reset-corpus) that lets 
you experiment with this REST endpoint to reset a corpus.

:::

## REST Example

### Reset Corpus REST Endpoint

<Config v="names.product"/> exposes a REST endpoint at the following URL
to reset a corpus:
<code>https://<Config v="domains.rest.admin"/>/v1/reset-corpus</code>

### Reset Corpus Request Body

```json
{
  "corpusId": 5
}
```

## gRPC Example

You can find the full Reset Corpus gRPC definition 
at [admin.proto](https://github.com/vectara/protos/blob/main/admin.proto).

