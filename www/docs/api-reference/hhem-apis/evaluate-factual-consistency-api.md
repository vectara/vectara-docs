---
id: evaluate-factual-consistency
title: Evaluate Factual Consistency API Definition
sidebar_label: Evaluate Factual Consistency API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import {vars} from '@site/static/variables.json';

import CodePanel from '@site/src/theme/CodePanel';


The Evaluate Factual Consistency API enables users to assess how accurately a 
generated text (such as a summary or answer) reflects the content of one or 
more source documents. This API is especially useful for detecting 
hallucinations or misstatements produced by large language models (LLMs), 
ensuring that generated responses are grounded in verifiable information.

Use this API to programmatically validate generated content against trusted 
source materials—an essential capability for applications in high-integrity 
environments such as legal, healthcare, scientific publishing, and enterprise 
knowledge systems.

## Evaluate Factual Consistency Request and Response Details

To evaluate factual consistency, send a `POST` request to `/v2/evaluate_factual_consistency`. The request body must include the following parameters:
* **model_parameters:** (Optional) Specifies the evaluation model to use. Default 
  is `hhem_v2.2`.
* **generated_text**: The output text you want to evaluate, such as a 
  model-generated summary, answer, or response.
* **source_texts**: An array of source documents or passages used to verify the 
  accuracy of the generated text.
* **language**: The ISO 639-3 code representing the language of the provided texts 
  (`eng` for English, `fra` for French).


### Example request

This example evaluates whether a generated statement about the Eiffel Tower 
is factually accurate based on two reference documents.

<CodePanel snippets={[{language: "json", code: `{
   "generated_text": "The Eiffel Tower is located in Berlin.",
   "source_texts": [
     "The Eiffel Tower is a famous landmark located in Paris, France.",
     "It was built in 1889 and remains one of the most visited monuments in the world."
   ],
   "language": "eng"
}`
}]} title="Request Example" layout="stacked" />

### Example response

The response includes a factual consistency score and probability estimates.

<CodePanel snippets={[{language: "json", code: `{
   "score": 0.23,
   "p_consistent": 0.12,
   "p_inconsistent": 0.88
}`
}]} title="Response Example" layout="stacked" />

* **score**: A normalized value between `0.0` and `1.0` that reflects the overall 
  factual alignment between the generated text and the source texts. Higher 
  scores indicate stronger consistency. 
* **p_consistent**: The model’s estimated probability that the generated text 
  is factually consistent with the sources.
* **p_inconsistent**: The model’s estimated probability that the generated text 
  contains factual inaccuracies relative to the source documents.

### Error responses

* **400 Bad Request** – The request body was malformed or contained invalid 
  parameters.
* **403 Forbidden** – The user does not have permission to perform factual 
  consistency evaluation.
* **422 Unprocessable Entity** – The specified language is not supported by 
  the evaluation service.


## REST 2.0 URL

### Evaluate Factual Consistency Endpoint Address

Vectara provides an HTTP endpoint for evaluating factual consistencies:

https://api.vectara.io/v2/evaluate_factual_consistency
