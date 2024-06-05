---
id: reranking
title: Reranking
sidebar_label: Reranking
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

Reranking search results involves a process of rescoring and refining an 
initial set of query results to achieve a more precise ranking. It employs 
a machine learning model that while slower than the rapid retrieval step, 
offers more accurate results. We currently support two rerankers: the [Maximal Marginal Relevance 
(MMR) Reranker](/docs/api-reference/search-apis/reranking#maximal-marginal-relevance-mmr-reranker) and the new Scale-only [Multilingual Reranker v1](/docs/api-reference/search-apis/reranking#vectara-multilingual-reranker-v1).

## Enable reranking

To enable reranking, specify the appropriate value for the `rerankerId`. 
The MMR reranker ID is `272725718` and the Multilingual Reranker v1 ID is 
`272725719`. In most scenarios, it makes sense to use the default query `start` 
value of `0` so that you're reranking all of the best initial results. You can 
also set `numResults` of the `query` to the total number of documents you wish 
to rerank. The default value is `25`.

The following example shows the `numResults` and `rerankerId` 
values in a query. Note that this simplified example intentionally omits  
several parameter values.

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
          "type": "customer_reranker",
          "reranker_id": "272725719"
    },
  "summarization": [],
  "enable_factual_consistency_score": true
}
```

You can also enable reranking in the Vectara console after navigating to the 
Query tab of a corpus and selecting **Retrieval**.

:::note

Scale users have a drop-down menu to select different rerankers.

:::

## Vectara Multilingual Reranker v1

The new Vectara Multilingual Reranker V1 is a state-of-the-art reranking model 
that significantly enhances the precision of retrieved results across 100+ 
languages. To use this reranker, set the `rerankerID` as `272725719`. 

```json
"reranker": {
      "type": "customer_reranker",
      "reranker_id": "272725719"
    }
```

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

## Maximal Marginal Relevance (MMR) reranker

The Maximal Marginal Relevance (MMR) reranker enables you to diversify search 
results to reduce redundancy while maintaining relevance to the query. 
Search queries often result in a collection of similar documents that, while 
relevant, may lack variety. MMR addresses this by reranking the results to 
include documents that are both relevant to your query but also different 
from the documents already listed in the search results. This approach 
provides users with a more balanced set of results as they may show 
different perspectives related to your query.

You enable the MMR reranker by specifying the `reranker_id` as `272725718`. 
Having a diverse set of relevant results has different benefits depending on 
the use case:
* In a pure search scenario, it improves user engagement with results by 
  avoiding repetition.
* In a generative AI scenario, it produces more comprehensive summaries.
* Diversifying results can potentially represent all points of view in the 
  data or reduce bias.

In addition to specifying the `rerankerId` as `272725718` at query time, you also 
specify a `diversity bias` range between `0.0` and `1.0`. Values closer to `1.0` 
optimize for the most diverse results. This setting is only available with the 
MMR Reranker.

```json
"reranker": {
   "type": "customer_reranker",
   "reranker_id": "272725718"
   "mmrConfig": {
      "diversityBias": 0.4
    }
 },
```

To enable the Maximal Marginal Relevance Reranker in the Vectara Console UI:

1. Open a corpus from the list and select the **Query** tab.
2. Click **Retrieval** and a navigation drawer opens.
3. Enable the **Rerank search results** option. 

   ![Diversity Reranker](/img/diversity_reranker.png)
4. Enter a value between `0.0` and `1.0` in the `Diversity factor` field.
5. Close the Configure retrieval drawer and click **Reload results**.

By applying the MMR Reranker to queries, users get results that are not just 
relevant but diverse and comprehensive.
