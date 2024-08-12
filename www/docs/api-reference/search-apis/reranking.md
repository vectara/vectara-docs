---
id: reranking
title: Rerank Search Results
sidebar_label: Rerank Search Results
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

Initial search results often fail to capture nuanced relevance or diversity, 
potentially leading to suboptimal user experiences. Utilizing Vectara's 
reranking can significantly enhance the quality and usefulness of 
search results, leading to more effective information retrieval. Reranking 
search results involves a process of rescoring and refining an initial set 
of query results to achieve a more precise ranking. It employs a machine 
learning model that while slower than the rapid retrieval step, offers more 
accurate results.

We currently provides the following rerankers: 

* [Multilingual Reranker v1](/docs/learn/vectara-multi-lingual-reranker) `272725719` for accurate results across over 100 languages.
* [Maximal Marginal Relevance (MMR) Reranker](/docs/learn/mmr-reranker) (`272725718`) for diversifying results while maintaining relevance.
* [User Defined Function Reranker](/docs/learn/user-defined-function-reranker) `272725722` for custom scoring based on metadata.

## Enable reranking

To enable reranking, specify the appropriate value for the `reranker_id`. 
The MMR reranker ID is `272725718` and the Multilingual Reranker v1 ID is 
`272725719`. In most scenarios, it makes sense to use the default query `start` 
value of `0` so that you're reranking all of the best initial results. You can 
also set `limit` of the `query` to the total number of documents you wish 
to rerank. The default value is `25`.

The following example shows the `limit` and `reranker_id` 
values in a query. Note that this simplified example intentionally omits 
several parameter values.

```json
{
  "query": "What is my question?",
  "stream_response": false,
    "search": {
    "start": 0,
    "limit": 25,
    "context_configuration": {},
    },
    "reranker": {
          "type": "customer_reranker",
          "reranker_id": "272725719"
    },
  "generation": [],
  "enable_factual_consistency_score": true
}
```

You can also enable reranking in the Vectara console after navigating to the 
Query tab of a corpus and selecting **Retrieval**.

:::note

Scale users have a drop-down menu to select different rerankers.

:::
