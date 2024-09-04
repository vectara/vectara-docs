---
id: chain-reranker
title: Chain Reranker
sidebar_label: Chain Reranker
---

import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

When refining query results where relevance and diversity are critical to 
getting the best answers, relying on a single ranking strategy may not be 
enough for business-critical search scenarios. The Chain Reranker addresses 
this challenge by enabling you to apply two ranking strategies sequentially. 

This is particularly useful in complex search scenarios that require multiple 
dimensions of relevance. For example, enhancing diversity with the 
[Maximal Marginal Relevance (MMR) reranker](/docs/learn/mmr-reranker) while also boosting documents 
with specific metadata.

## Enable the chain reranker

To enable the chain reranker, set the `type` to `chain` and then specify the 
two rerankers that you want to combine.

```json
{
  "reranker": {
    "type": "chain",
    "rerankers": [
      {
        "type": "customer_specific",
        "reranker_id": "rnk_272725719"
      },
      {
        "type": "userfn",
        "user_function": "get('$.metadata.popularity')"
      }
    ]
  }
}

```

In this example, the Vectara Multilingual Reranker refines the results across 
over 100 languages, while the [User Defined Function reranker](/docs/learn/user-defined-function-reranker) boosts 
relevance based on metadata for popularity.
