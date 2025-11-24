---
id: reranking-overview
title: Reranking Overview
sidebar_label: Overview
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {vars} from '@site/static/variables.json';

import CodePanel from '@site/src/theme/CodePanel';

## Cutoffs and limits

After reranking is applied, you can use the `cutoff` and `limit` parameters to 
control the final result set.

### Search cutoffs

The `cutoff` property of the `reranker` specifies a minimum score threshold 
for search results to include after reranking.

Setting this value lets you control which results are considered
relevant enough to return, filtering out results that do not meet the desired
level of relevance. For example, when you set the `cutoff` to `0.5`, only results
with a score of `0.5` or higher are considered.

This cutoff is applied per reranking stage. In a chain of rerankers, each
reranker can have its own cutoff value, potentially further reducing the
number of results at each stage. If both `limit` and `cutoff` are specified, the
cutoff is applied first.

:::caution
Search cutoffs are most effective when used with neural rerankers like
the Vectara Multilingual reranker (Slingshot). This provides normalized
scores between `0.0` and `1.0`. If you use hybrid search methods that involve BM25,
scores may be unbounded, making cutoff values less predictable.
:::

### Search limits

The `limit` property allows more granular control over the number of results 
returned. This limit is applied per each reranking stage, such as if you use 
chain reranking, and this limit affects the output and **not** the input to 
the reranker. It returns the top *N* results, where *N* is the value specified 
by this limit.

Imagine a scenario where you want to limit the output of results to a reranker,
whether a single reranker, or within rerankers that are in a chain. For
example, you want to process blog posts and ignore non-blog posts. You would
set up a UDF to filter for blog categories and return null score for non-blog
content.

`if (get('$.document_metadata.category') == 'blog') get('$.score') else null`

This would remove non-blog posts from the results. Then you can set a
limit of `10` to get only the top 10 blog post results.

## Combine cutoffs and limits

Using both cutoffs and limits in a chain allows for more refined control over
query results.

<CodePanel snippets={[{language: "json", code: `{
  "reranker": {
    "type": "chain",
    "rerankers": [
      {
        "type": "userfn",
        "user_function": "if (get('\$.document_metadata.category') == 'blog') get('\$.score') else null",
        "limit": 10
      },
      {
        "type": "customer_reranker",
        "reranker_name": "Rerank_Multilingual_v1",
        "cutoff": 0.5,
        "limit": 3
      }
    ]
  }
}`}]} title="Code Example" layout="stacked" />

This filters out non-blog content where the UDF reranker limits the output to
10, and sends these 10 results to the Vectara Multilingual reranker which both
removes results with a score below `0.5` and returns the top 3 results from
the remaining set.

### Improve summarization

You can also improve LLM summarization by using cutoffs and limits. For
example, filter out low-scoring results with a high threshold before sending
them for summarization, which can improve the quality of the generated
summary.

This example uses both Slingshot and a User Defined Function to send
only highly relevant and recent documents for summarization.

<CodePanel snippets={[{language: "json", code: `"reranker": {
    "type": "chain",
    "rerankers": [
      {
        "type": "customer_reranker",
        "reranker_name": "Rerank_Multilingual_v1",
        "cutoff": 0.75,
        "limit": 10
      },
      {
        "type": "userfn",
        "user_function": "get('\$.document_metadata.publish_ts')"
      }
    ]
  },`}]} title="Code Example" layout="stacked" />

1. The first stage in the chain filters out documents with scores lower than
   `0.75` and it also limits the results to `10`.
2. The next stage prioritizes documents based on their `publish_ts` value,
   which represents the publication timestamp.

:::tip
You can also enable reranking in the Vectara console after navigating to the
Query tab of a corpus and selecting **Retrieval**. Use this for exploration
and experimenting with the API.
:::
