---
id: hallucination-evaluation
title: Hallucination Evaluation
sidebar_label: Hallucination Evaluation
---

import {Config} from '@site/docs/definitions.md';

The Vectara Factual Consistency Score automatically evaluates and detects 
hallucinations in generated output. Based on a more advanced version of 
[Hughes Hallucination Evaluation Model (HHEM)](https://huggingface.co/vectara/hallucination_evaluation_model),
the Factual Consistency Score enables you to evaluate the likelihood of an AI-generated summary being 
factually correct based on search results. This calibrated score can 
range from `0.0` to `1.0`. A higher scores indicates a greater probability of 
being factually accurate, while a lower score indicates a greater probability 
of hallucinations.

In your summarization request, set the `factual_consistency_score` field to `true`. 
The Factual Consistency Score returns a calibrated value in the 
`factual_consistency` field of the summary message. The score field 
contains the value between `0.0` and `1.0`.

For example, a score of `0.95` suggests a 95% likelihood that the summary is 
free of hallucinations and would align with the original content. A lower 
score of `0.40` indicates a 40% chance which would be probably much less 
factually accurate. We suggest starting with a setting of `0.5` as an initial 
guideline for cutoffs between good and bad. 

## Enable the Factual Consistency Score

In your summarization request, you can set the `factual_consistency_score` field 
to `true`.

```json showLineNumbers title="Enable the Factual Consistency Score"
"summary": [
        {
          "max_summarized_results": 3,
          "response_lang": "en",
          "factual_consistency_score": true
          },
        }
      ]
```

In the following example, the summary shows a `factualConsistency` score of `0.98`, 
which is 98%.

```json showLineNumbers title="Example Factual Consistency Score"
"summary": [
        {
          "text": "According to the novel 'The Hitchhiker's Guide to the Galaxy' by Douglas Adams, the answer to the ultimate question of life, the universe, and everything is 42.",
          "lang": "en",
          "factualConsistency": {
            "score": 0.98
            "status":{
               "code":"OK",
               "statusDetail":"",
               "cause":null
            }
          },
        }
      ]
```
