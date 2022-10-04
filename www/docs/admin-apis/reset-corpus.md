---
id: reset-corpus
title: Reset Corpus
sidebar_label: API Definition
---

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