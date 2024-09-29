---
id: vectara-multi-lingual-reranker
title: Vectara Multilingual Reranker
sidebar_label: Vectara Multilingual Reranker
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The new Vectara Multilingual Reranker V1 is a state-of-the-art reranking model 
that significantly enhances the precision of retrieved results across 100+ 
languages. Using this reranker requires both the `type` and `reranker_id` in the 
`reranker` object. Set the `type` as `customer_reranker` and the `reranker_id` as `rnk_272725719`. 

```json
"reranker": {
      "type": "customer_reranker",
      "reranker_id": "rnk_272725719"
    }
```

The Vectara Multilingual Reranker ensures impressive zero-shot performance on 
unseen data and domains, and it **never** trains on customer data. In RAG use 
cases, this reranker distinguishes the scores of relevant and irrelevant 
documents in a query-independent manner. For more details about our 
Multilingual Reranker v1, check out these [feature announcement](https://vectara.com/blog/unlocking-the-state-of-the-art-reranker-introducing-the-vectara-multilingual-reranker_v1/) and 
[technical deep dive](https://vectara.com/blog/deep-dive-into-vectara-multilingual-reranker-v1-state-of-the-art-reranker-across-100-languages/) blogs.

Based on our experimentation we suggest using a cut-off threshold of `0.5` as 
a good starting point. This threshold value is the relevance score returned by 
Vectara with each responseAny results that achieve a score of greater than or 
equal to `0.5` can be considered relevant and anything below that can be 
considered as non-relevant.
