---
id: reset-corpus
title: Reset Corpus
sidebar_label: API Definition
---

import {Config} from './definitions.md';
import {vars} from '@site/static/variables.json';

<Config v="names.product"/> exposes a REST endpoint at the following URL
to index content into a corpus:
<code>https://<Config v="domains.rest.admin"/>/v1/reset-corpus</code>
This page describes the details of interacting with this endpoint.

To reset a corpus, specify the **customer id** and **corpus id**. Upon
successful completion, space quota consumed by the corpus will be freed.

```protobuf
message ResetCorpusRequest {
  uint64 customer_id = 1;
  uint64 corpus_id = 2;
}

message ResetCorpusResponse {
  Status status = 1;
}
```
