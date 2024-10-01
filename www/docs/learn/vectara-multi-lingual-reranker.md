---
id: vectara-multi-lingual-reranker
title: Vectara Multilingual Reranker
sidebar_label: Vectara Multilingual Reranker
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

Generative AI applications often struggle with ranking the most relevant 
information, leading to hallucinations and irrelevant responses. The new 
Vectara Multilingual Reranker V1, also known as Slingshot, is a 
state-of-the-art reranking model that significantly enhances the precision of 
retrieved results. Providing advanced neural ranking, it refines the output of 
initial models like [Boomerang](https://vectara.com/blog/introducing-boomerang-vectaras-new-and-improved-retrieval-model/), 
offering even more accurate document scoring and response quality in Retrieval 
Augmented Generation (RAG) pipelines.

The Vectara Multilingual Reranker operates as a second-pass refinement tool, 
building on Boomerang’s high-recall capabilities. While Boomerang quickly 
retrieves a broad set of relevant documents, the Multilingual Reranker 
delivers more precise results, ensuring that the top-ranked documents are the 
most relevant. This reranker also excels across both English and multilingual 
datasets, making it a powerful tool for global use cases.

While more computationally expensive and introducing some additional latency, 
the multilingual reranker improves neural ranking beyond Boomerang’s initial 
selection by providing more precise text scoring. Think of the Slingshot 
reranker as a "better Boomerang" for refining results, with the multilingual 
capability serving primarily as a differentiator from other rerankers in the 
market, which are often English-only.

Using this reranker requires both the `type` and `reranker_id` in the 
`reranker` object. Set the `type` as `customer_reranker` and the `reranker_name` 
as `Rerank_Multilingual_v1`. 

```json
"reranker": {
      "type": "customer_reranker",
      "reranker_name": "Rerank_Multilingual_v1"
    }
```

:::note
The `reranker_id` and `rnk_272725719` have been deprecated. Use `reranker_name` and 
`Rerank_Multilingual_v1` instead.
:::

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
