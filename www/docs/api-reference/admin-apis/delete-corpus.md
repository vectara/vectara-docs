---
id: delete-corpus
title: Delete Corpus
sidebar_label: API Definition
---

import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

<Config v="names.product"/> exposes a REST endpoint at the following URL
to delete an index:
<code>https://<Config v="domains.rest.admin"/>/v1/delete-corpus</code>

To delete an index, specify the **customer_id** and **corpus_id**. Upon
successful completion, space quota consumed by the index will be freed,
and the index will no longer be usable for future indexing or querying.
Note that the corpus_id assigned to the index will not be reused.

```protobuf
message DeleteCorpusRequest {
  // The Customer ID that contains the corpus to be deleted.
  uint32 customer_id = 1;
  // The index is the Corpus ID to be deleted.
  uint32 corpus_id = 2;
}

message DeleteCorpusResponse {
  Status status = 1;
}
```
