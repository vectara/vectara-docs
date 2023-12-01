---
id: reset-corpus
title: Reset Corpus API Definition
sidebar_label: Reset Corpus API Definition
---

import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

<Config v="names.product"/> exposes a REST endpoint at the following URL
to reset a corpus:
<code>https://<Config v="domains.rest.admin"/>/v1/reset-corpus</code>
This page describes the details of interacting with this endpoint.

To reset a corpus, specify the `customer_id` and `corpus_id`. Upon 
successful completion, space quota consumed by the corpus will be freed.

```protobuf
message ResetCorpusRequest {
  uint32 customer_id = 1;
  // The corpus id to reset.
  uint32 corpus_id = 2;
}

message ResetCorpusResponse {
  Status status = 1;
}
```
