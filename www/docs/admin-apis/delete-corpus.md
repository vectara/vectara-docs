---
id: delete-corpus
title: Delete Corpus
sidebar_label: API Definition
---

To delete a corpus, specify the **customer id** and **corpus id**. Upon
successful completion, space quota consumed by the corpus will be freed,
and the corpus will no longer be usable for future indexing or querying.
Note that the corpus id assigned to the corpus will not be reused.

```protobuf
message DeleteCorpusRequest {
  uint64 customer_id = 1;
  uint64 corpus_id = 2;
}

message DeleteCorpusResponse {
  Status status = 1;
}
```