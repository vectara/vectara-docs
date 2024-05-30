---
id: grounded-generation-overview
title: Retrieval Augmented Generation Fundamentals
sidebar_label: Retrieval Augmented Generation Fundamentals
---

import {Config} from '@site/docs/definitions.md';

## Retrieval Augmented Generation (RAG) fundamentals

Retrieval Augmented Generation (RAG) ensures that generated content is both 
verifiable and anchored to the data you supply. This minimizes the occurrence 
of [hallucinations](https://vectara.com/avoiding-hallucinations-in-llm-powered-applications/) (innaccurate or 
misleading information) commonly found in generative AI systems. <Config v="names.product"/>'s
Retrieval Augmented Generation summarizes search results that answer complex 
queries directly while providing citations that ground these search results in 
facts from the data.

Implementing Retrieval Augmented Generation can transform the way information 
retrieval and AI interactions are conducted, especially in use cases where the 
integrity of information is critical.

## Data retrieval

The Retrieval Augmented Generation process involves retrieving relevant data 
from a structured corpus. This data provides a grounding layer for the 
generative component with a factual basis for its response.

## Content generation

The Vectara platform utilizes the retrieved data to generate informative and 
contextually relevant answers. Retrieval Augmented Generation is our 
groundbreaking way of producing generative summaries on top of your own data.

:::tip

You can test summarizations with queries in our [**API Playground**](/docs/rest-api/query) and 
in the Vectara Console. The `model_id` is optional and defaults to 
the best summarizer available to your account type. Scale users can 
select other [available summarizers](/docs/learn/grounded-generation/select-a-summarizer).

:::

This example shows a complex question with a summary that contains several 
citations and the search result highlights relevant information:

![Retrieval Augmented Generation (RAG) Summary Example](/img/grounded_generation_summary_example.png)
