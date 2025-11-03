---
id: mmr-reranker
title: Maximal Marginal Relevance (MMR) reranker
sidebar_label: Maximal Marginal Relevance (MMR) reranker
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {vars} from '@site/static/variables.json';

import CodePanel from '@site/src/theme/CodePanel';

The Maximal Marginal Relevance (MMR) reranker enables you to diversify search 
results to reduce redundancy while maintaining relevance to the query. 
Search queries often result in a collection of similar documents that, while 
relevant, may lack variety. MMR addresses this by reranking the results to 
include documents that are both relevant to your query but also different 
from the documents already listed in the search results.

This approach provides users with a more balanced set of results as they may 
show different perspectives related to your query.

## Enable the MMR reranker

You enable the MMR reranker by specifying the `type` as `mmr`. Having a 
diverse set of relevant results has different benefits depending on 
the use case:
* In a pure search scenario, it improves user engagement with results by 
  avoiding repetition.
* In a generative AI scenario, it produces more comprehensive summaries.
* Diversifying results can potentially represent all points of view in the 
  data or reduce bias.

In addition to specifying the `type` as `mmr` at query time, you also 
specify a `diversity bias` range between `0.0` and `1.0`. Values closer to `1.0` 
optimize for the most diverse results. This setting is only available with the 
MMR Reranker.

<CodePanel snippets={[{language: "json", code: `"reranker": {
   "type": "mmr",
   "diversity_bias": 0.4
 },`}]} title="Code Example" layout="stacked" />

To enable the Maximal Marginal Relevance Reranker in the Vectara Console UI:

1. Open a corpus from the list and select the **Query** tab.
2. Click **Retrieval** and a navigation drawer opens.
3. Enable the **Rerank search results** option. 

   ![Diversity Reranker](/img/diversity_reranker.png)
4. Enter a value between `0.0` and `1.0` in the `Diversity factor` field.
5. Close the Configure retrieval drawer and click **Reload results**.

By applying the MMR Reranker to queries, users get results that are not just 
relevant but diverse and comprehensive.
