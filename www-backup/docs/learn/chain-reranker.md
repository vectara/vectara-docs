---
id: chain-reranker
title: Chain Reranker
sidebar_label: Chain Reranker
---

import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

When refining query results where relevance and diversity are critical to 
getting the best answers, relying on a single ranking strategy may not be 
flexible enough for some scenarios. The Vectara Chain Reranker 
addresses this challenge by enabling you to apply multiple ranking strategies 
sequentially, giving you absolute control over the ranking process. 

This powerful capability enables you to completely customize Vectara's 
functionality to your specific needs, ensuring that your search results and 
generative AI applications align with your business requirements precisely.

## Why use the chain reranker?

Chaining multiple rerankers is particularly useful in complex search scenarios
that require several dimensions of ranking. For example, enhancing 
diversity with the [Maximal Marginal Relevance (MMR) reranker](/docs/learn/mmr-reranker), refining 
the results across multiple languages, and then boosting documents with 
specific metadata or other custom business logic with the 
[User Defined Function reranker](/docs/learn/user-defined-function-reranker) to finalize the results.

1. **Multidimensional relevance**: Combine multiple ranking strategies in sequence 
   to optimize query results across various dimensions and meeting complex 
   business scenarios.
2. **Enhance RAG outcomes**: Improve the retrieval process by sequentially 
   applying multiple rerankers that balance relevance, diversity, and custom 
   business priorities to produce more contextually appropriate AI-generated 
   responses in Retrieval Augmented Generation (RAG) systems.
3. **Absolute control**: Tailor the ranking process to your exact specifications, 
   ensuring that the query results reflect your custom business logic.
   

## Enable the chain reranker

To enable the chain reranker, set the `reranker` object `type` to `chain` and then 
specify the multiple rerankers that you want to combine in a `rerankers` array. 
You can specify up to 50 rerankers in a chain.

## Chain reranker examples

In this example, the Vectara Multilingual Reranker first refines the results 
with improved text scoring, while the [User Defined Function reranker](/docs/learn/user-defined-function-reranker) 
then boosts relevance based on metadata for popularity. This simple chain 
example can be useful for multilingual content platforms such as blogs, news 
aggregators, and knowledge bases.


```json
{
  "reranker": {
    "type": "chain",
    "rerankers": [
      {
        "type": "customer_reranker",
        "reranker_name": "Rerank_Multilingual_v1"
      },
      {
        "type": "userfn",
        "user_function": "get('$.metadata.popularity') * get('$.metadata.score')"
      }
    ]
  }
}
```

In this example, the [Vectara Multilingual reranker](/docs/learn/vectara-multi-lingual-reranker) improves the precision of 
results by refining the output of initial models like Boomerang, while the 
[User Defined Function reranker](/docs/learn/user-defined-function-reranker) boosts relevance based on metadata for popularity.
Now let's take a look at a more complex chain reranker example. In this 
e-commerce example, the Vectara Multilingual Reranker first refines the 
initial results, providing a better ranking order than Boomerang. This 
improves the overall relevance of the product results. The MMR reranker then 
diversifies the results so that the customer sees some variety, rather than 
only very similar products.

```json
{
  "type": "mmr",
  "diversity_bias": 0.2
},
```

We set the diversity bias to `0.2` to have more emphasis on relevance while 
still providing some diversity. You can increase this value to `0.3` or `0.4` 
for more diversity.

Finally, we apply a User Defined Function that combines several e-commerce 
factors including a relevance score boost of 60%, a 20% boost if the product 
is currently in stock, and then another 20% boost that favors products with 
better customer reviews.

This chain reranker maintains a balance between showing relevant products that 
match what the customer is looking for, ensuring that the products are in 
stock, and also takes into account customer satisfaction rating of the 
products.

```json
{
  "reranker": {
    "type": "chain",
    "rerankers": [
      {
        "type": "customer_reranker",
        "reranker_name": "Rerank_Multilingual_v1"
      },
      {
        "type": "mmr",
        "diversity_bias": 0.2
      },
      {
        "type": "userfn",
        "user_function": "get('$.metadata.relevance_score') * 0.6 + (get('$.metadata.in_stock') ? 0.2 : 0) + get('$.metadata.customer_rating') * 0.2"
      }
    ]
  }
}
```

