---
id: delete-corpus
title: Delete Corpus
sidebar_label: API Definition
---

import {Config} from '../definitions.md';
import {vars} from '@site/static/variables.json';

<Config v="names.product"/> exposes a REST endpoint at the following URL
to index content into a corpus:
<code>https://<Config v="domains.rest.admin"/>/v1/delete-corpus</code>
This page describes the details of interacting with this endpoint.

To delete a corpus, specify the **customer id** and **corpus id**. Upon
successful completion, space quota consumed by the corpus will be freed,
and the corpus will no longer be usable for future indexing or querying.
Note that the corpus id assigned to the corpus will not be reused.

```protobuf
message DeleteCorpusRequest {
  // The Customer ID that contains the corpus to be deleted.
  uint32 customer_id = 1;
  // The Corpus ID to be deleted.
  uint32 corpus_id = 2;
}

message DeleteCorpusResponse {
  Status status = 1;
}
```
