---
id: reranking
title: Rerank Search Results
sidebar_label: Rerank Search Results
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

Reranking is a process by which an initial set of query results is rescored 
to produce a more refined and accurate reanking. It's usually performed with a
machine learned model that, in contrast to the extremely fast retrieval step,
is slower but more accurate.

Reranking is a beta feature in the platform, and only available as a single
reranker for English results, and can be enabled by specifying 272725717 as
the `reranker_id`.

To use the reranker, you specify two additional parameters in
the request: `start` and `numResults`. These parameters tell <Config v="names.product"/>
which results to rerank. In most scenarios, it makes sense to set `start` to
0 so that you're reranking all of the best initial results, and then to set
`numResults` to the total number of documents you wish to rerank.

## Maximal Marginal Relevance Reranking

The Maximal Marginal Relevance (MMR) Reranker enables you to diversify search 
results to reduce redundancy while maintaining relevance to the query. Having 
a diverse set of relevant results can help ensure that users get answers from 
a many sources of data.

In addition to specifying the `reranker_id` at query time, you also 
specify a `diversity bias` range between `0` and `1`. You can also enable the 
MMR Reranker in the console UI as follows:

1. Open a corpus from the list and select the **Search** tab.
2. Click **Advanced Options** and a navigation drawer opens.

   ![Diversity Reranker](/img/diversity_reranker.png)
3. Enter a value between `0` and `1` in the `Diversity factor` field. Values 
   closer to 1 are optimized for the most diverse results.
4. Close the Advance options drawer and click **Reload results**.

By applying the MMR Reranker to your queries, users get results that 
are not just relevant but diverse and comprehensive.