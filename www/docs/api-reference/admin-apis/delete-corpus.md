---
id: delete-corpus
title: Delete Corpus
sidebar_label: API Definition
---

import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

<Config v="names.product"/> exposes a REST endpoint at the following URL
to ingest content into an index:
<code>https://<Config v="domains.rest.admin"/>/v1/delete-corpus</code>
This page describes the details of interacting with this endpoint.

To delete an index, specify the `customer_id` and `corpus_id`. Upon
successful completion, space quota consumed by the index will be freed,
and the index will no longer be useable for data ingestion or querying.
Note that the corpus_id assigned to the index will not be reused.

```protobuf
message DeleteCorpusRequest {
  // The Customer ID that contains the corpus to be deleted.
  uint32 customer_id = 1;
  // The corpus ID uniquely identifies the index to delete.
  uint32 corpus_id = 2;
}

message DeleteCorpusResponse {
  Status status = 1;
}
```
