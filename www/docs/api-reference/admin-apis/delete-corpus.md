---
id: delete-corpus
title: Delete Corpus API Definition
sidebar_label: Delete Corpus API Definition
---

import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Delete Corpus API lets you delete a corpus from the account.

## Delete Corpus Request Body

To delete a corpus, specify the `customer_id` and `corpus_id`. Upon successful 
completion, space quota consumed by the corpus will be freed, and the corpus 
will no longer be useable for future indexing or querying. Note that the 
`corpus_id` assigned to the corpus will not be reused.

:::tip

Check out our [**interactive API Playground**](/docs/rest-api/delete-corpus) that lets 
you experiment with this REST endpoint to delete a corpus.

:::

## REST Example

### Delete Corpus REST Endpoint

<Config v="names.product"/> exposes a REST endpoint at the following URL
to delete a corpus:
<code>https://<Config v="domains.rest.admin"/>/v1/delete-corpus</code>

### Delete Corpus Request Body

```json
{
  "corpusId": 5
}
```

## gRPC Example

You can find the full Delete Corpus gRPC definition 
at [admin.proto](https://github.com/vectara/protos/blob/main/admin.proto).
