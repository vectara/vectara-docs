---
id: hallucination-evaluation
title: Hallucination Evaluation
sidebar_label: Hallucination Evaluation
---

import {Config} from '@site/docs/definitions.md';

Vectara uses the `Hughes Hallucination Evaluation Model` (HHEM) to assess the
likelihood of hallucinations in an AI-generated summary based on search results.
The output of this evaluation is presented as a `Factual Consistency Score` (FCS)
and is included in the output. The FCS uses a scale of `0` to `1` with a higher
score (closer to `1`) indicating a greater probability of being factually accurate,
while a lower score indicates a greater probability of hallucinations.

For example, a score of `0.95` suggests a 95% likelihood that the summary is free of hallucinations and would align with the original content. A lower score of `0.40` indicates a 40% chance the summary is free of hallucinations, meaning it's more likely to contain one or more factual inaccuracies, however minor. We suggest starting with a setting of `0.5` as an initial guideline.

:::note

The FCS measures only the factual accuracy of a generated summary based on search results. Each search result's independent `score` is based on the query settings used for that query (e.g. which embedding model is used, whether lambda and/or reranking is used). These scores are different.

:::

## Factual Consistency Score language support

The Factual Consistency Score supports English, German, French, Portuguese, Spanish, Arabic, Chinese, and Korean. Set the `response_language` parameter to `eng`, `deu`, `fra`, `por`, `spa`, `ara`, `zho`, or `kor`.

## Enable the Factual Consistency Score

In your summarization request, set the `enable_factual_consistency_score` field to `true`. The Factual Consistency Score returns a calibrated value in the `factual_consistency_score` field of the summary message. The score field contains the value between `0.0` and `1.0`.

```json showLineNumbers title="Enable the Factual Consistency Score"
"generation": {
    "prompt_name": "vectara-summary-ext-v1.3.0",
    "max_used_search_results": 3,
    "enable_factual_consistency_score": true
  }
```

In the following example, the summary shows a `factual_consistency_score` of `0.98`, which is 98%.

```json showLineNumbers title="Example Factual Consistency Score"
{
  "summary": "According to the novel 'The Hitchhiker's Guide to the Galaxy' by Douglas 
    Adams, the answer to the ultimate question of life, the universe, and everything is 42.",
  "summary_language": "en",
  "factual_consistency_score": 0.98,
  "search_results": [
    // ...
  ]
}
```
