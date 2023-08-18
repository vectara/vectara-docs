---
id: reset-corpus
title: Reset Corpus
sidebar_label: API Definition
---

import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

<Config v="names.product"/> exposes a REST endpoint at the following URL
to reset an index:
<code>https://<Config v="domains.rest.admin"/>/v1/reset-corpus</code>
This page describes the details of interacting with this endpoint.

To reset an index, specify the **customer id** and **corpus id**. Upon
successful completion, space quota consumed by the index will be freed.

```protobuf
message ResetCorpusRequest {
  uint32 customer_id = 1;
  // The index is the Corpus ID to be reset.
  uint32 corpus_id = 2;
}

message ResetCorpusResponse {
  Status status = 1;
}
```
