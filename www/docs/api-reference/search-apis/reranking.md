---
id: reranking
title: Rerank Search Results
sidebar_label: Rerank Search Results
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

Reranking involves a process of rescoring and refining an initial set of query 
results to achieve a more precise ranking. It employs a machine learning model 
that while slower than the rapid retrieval step, offers more accurate results. 
We currently have two rerankers.

## English Reranker (Scale Only)

The English reranker is only available to Scale users and you enable it by 
specifying `272725717` as the `reranker_id`.

In most scenarios, it makes sense to use the default query `start` value of `0` so 
that you're reranking all of the best initial results. You can also set 
`numResults` to the total number of documents you wish to rerank. The
default value is `10`.

## Maximal Marginal Relevance (MMR) Reranker

The Maximal Marginal Relevance (MMR) Reranker enables you to diversify search 
results to reduce redundancy while maintaining relevance to the query. You 
enable the MMR reranker by specifying the `reranker_id` as `272725718`.

Having a diverse set of relevant results has different benefits depending on 
the use case:
* In a pure search scenario, it improves user engagement with results by 
  avoiding repetition.
* In a generative AI scenario, it produces more comprehensive summaries.
* Diversifying results can potentially represent all points of view in the 
  data or reduce bias.

In addition to specifying the `reranker_id` as `272725718` at query time, you also 
specify a `diversity bias` range between `0.0` and `1.0`. Note that the diversity 
reranker is currently in beta. 

You can also enable the beta MMR Reranker in the console UI as follows:

1. Open a corpus from the list and select the **Query** tab.
2. Click **Configure retrieval** and a navigation drawer opens.
3. Enable the **Rerank search results** option.

   ![Diversity Reranker](/img/diversity_reranker.png)
4. Enter a value between `0.0` and `1.0` in the `Diversity factor` field. Values 
   closer to `1.0` optimize for the most diverse results.
5. Close the Configure retrieval drawer and click **Reload results**.

By applying the MMR Reranker to queries, users get results that are not just 
relevant but diverse and comprehensive.