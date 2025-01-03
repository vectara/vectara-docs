---
id: knee-reranker
title: Knee Reranker
sidebar_label: Knee Reranker
---

import {Config} from '@site/docs/definitions.md';

Retrieval Augmented Generation (RAG) systems often struggle with determining 
optimal cutoff points for query results. Fixed score thresholds provide a 
simple solution but lack the flexibility to adapt to varying score 
distributions across queries. The knee reranker addresses this challenge by 
detecting natural boundaries between relevant and irrelevant results 
automatically.

The knee reranker combines statistical analysis with configurable parameters 
to provide intelligent, adaptive filtering. Designed specifically to work 
after the Slingshot reranker, it analyzes score patterns to identify 
significant drops in relevance while maintaining safeguards against 
over-aggressive filtering. For more details about how this reranker works, see 
this blog post.

## Enable the knee reranker

Enable the knee reranker by adding it your reranking chain after the Slingshot 
reranker. The default settings balance precision and recall, making them 
suitable for most use cases.

```json title="Default Configuration"
{
  "reranker": {
    "type": "chain",
    "rerankers": [
      { "type": "customer_reranker", "reranker_name": "Rerank_Multilingual_v1" },
      { "type": "userfn", "user_function": "knee()", "cutoff": 0.5 }
    ]
  }
}
```
Customize the behavior of the knee reranker through two key parameters:

* **Sensitivity:** Controls how sharply the score must drop to identify a cutoff.
  Use higher values when you need increased precision.
  - **Default:** `0.5`
  - **Range:** `0` to `1`
* **Early bias:** Adjusts preference for cutting off results earlier in the 
  ranking list. Use higher values when you want to reduce latency and focus on 
  top results.
  - **Default:** `0.2`
  - **Range:** `0` to `1`

### Combining parameters

A high sensitivity combined with high early bias narrows the results to only 
the top-scoring entries. Alternatively, a low sensitivity combined with low 
early bias broadens the results, favoring inclusivity.

For latency-sensitive applications, prioritize early bias to reduce downstream 
processing. For discovery tasks, prioritize low sensitivity to allow nuanced 
patterns and variations in the data. Test different parameter values to 
determine the best fit for your use case.

Adjust both parameters to customize filtering behavior for specific use cases:
* **Balanced defaults:** General-purpose filtering where precision and recall 
  are equally important, such as content recommendation systems or general 
  RAG workflows.
  
  `"user_function": "knee(0.5, 0.2)"`
* **High precision:** Applications requiring strict relevance, where irrelevant 
  results must be aggressively filtered out
  
  `"user_function": "knee(0.8, 0.5)"`
* **Broader exploration:** Exploratory research or academic queries, where 
  inclusiveness is more critical than immediate precision
  
  `"user_function": "knee(0.3, 0.1)"`

