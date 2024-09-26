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

## Available rerankers

Vectara currently provides the following rerankers: 

* [**Multilingual Reranker v1**](/docs/learn/vectara-multi-lingual-reranker) (`type=customer_specific` and `reranker_id=rnk_272725719`) 
  provides more accurate neural ranking than the initial Boomerang retrieval. 
  While computationally more expensive, it offers improved text scoring across 
  a wide range of languages, making it suitable for diverse content..
* [**Maximal Marginal Relevance (MMR) Reranker**](/docs/learn/mmr-reranker) (`type=mmr`) 
  for diversifying results while maintaining relevance.
* [**User Defined Function Reranker**](/docs/learn/user-defined-function-reranker) (`type=userfn`) for 
  custom scoring based on metadata.


### Chain reranking

The Vectara Chain Reranker (`type=chain`) lets you combine multiple reranking 
strategies in sequence to meet more complex search requirements. This lets you 
completely customize the functionality of Vectara to your needs by giving you 
absolute control over the ranking functions. For details, see [Chain Reranker](/docs/learn/chain-reranker).

## Enable reranking

To enable reranking, specify the appropriate value for the `type` in the 
`reranker` object. For the MMR reranker, use `mmr`. In most scenarios, 
it makes sense to use the default query `start` value of `0` so that you're 
reranking all of the best initial results. You can also set `limit` of the 
`query` to the total number of documents you wish to rerank. The default value 
is `25`.

The following example shows the `limit` and `type` values in a query. Note that 
this simplified example intentionally omits several parameter values.

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
          "type": "mmr",
          "diversity_bias": "0.4"
    },
  "generation": [],
  "enable_factual_consistency_score": true
}
```

You can also enable reranking in the Vectara console after navigating to the 
Query tab of a corpus and selecting **Retrieval**.

## Search cutoffs limit

The `limit` property of the `reranker` object allows you to have more 
granular control over the number of results returned after reranking. This 
limit is applied per each reranking stage, such as if you use chain reranking, 
and this limit affects the output and not the input to the reranker. 
When you apply this limit to the Multilingual reranker, Maximal Marginal Relevance 
(MMR) Reranker, or User Defined Function reranker, it performs the following 
steps:

1. Reranks all input results based on the selected reranker.
2. Eliminates results that return null scores.
3. Sorts the reranked results based on their new scores.
4. Returns the top *N* results, where *N* is the value specified by this limit.

Imagine a scenario where you want to limit the output of results to a reranker, 
whether a single reranker, or within rerankers that are in a chain. For 
example, you want to process blog posts and ignore non-blog posts. You would 
set up a UDF to filter for blog categories and return null score for non-blog 
content. 

`"get('$.document_metadata.category') === 'blog' ? get('$.score') : null";`

This would remove non-blog posts from the results. Then you can set a 
limit of `10` to get only the top 10 blog post results.


