---
id: knee-reranking
title: Knee Reranking
sidebar_label: Knee Reranking
---


Retrieval Augmented Generation (RAG) systems often struggle with determining 
optimal cutoff points for query results. Fixed score thresholds provide a 
simple solution but lack the flexibility to adapt to varying score 
distributions across queries. Knee reranking addresses this challenge by 
detecting natural boundaries between relevant and irrelevant results 
automatically.

Knee reranking combines statistical analysis with configurable parameters 
to provide intelligent, adaptive filtering. Designed specifically to work 
after the Slingshot reranker, it analyzes score patterns to identify 
significant drops in relevance while maintaining safeguards against 
over-aggressive filtering. For more details about how this reranker works, see 
this [**blog post**](https://www.vectara.com/blog/introducing-the-knee-reranking-smart-result-filtering-for-better-results).

## Enable knee reranking

Enable knee reranking by adding it your reranking chain after the Slingshot 
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
Customize the behavior of knee reranking through two key parameters:

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

* **High Sensitivity:** Identifies subtle score drops, triggering knee reranking 
  and providing stricter relevance filtering.
* **High Early Bias:** Places stronger emphasis on earlier knees if they are 
  similar in magnitude
* **Low Sensitivity and Early Bias:** Captures broader sets of results, suitable 
  for exploratory or discovery tasks.

Test different parameter values to determine the best fit for your use case.

