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
results to reduce redundancy while maintaining relevance to the query. MMR 
reranks the results to include documents that are both relevant to your 
query but also different from the documents already listed in the search 
results.

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
