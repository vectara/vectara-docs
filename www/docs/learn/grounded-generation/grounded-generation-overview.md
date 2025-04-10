---
id: grounded-generation-overview
title: Retrieval Augmented Generation (RAG) Fundamentals
sidebar_label: Retrieval Augmented Generation (RAG) Fundamentals
---


Retrieval Augmented Generation (RAG) ensures that generated content is both
verifiable and anchored to the data you supply. This minimizes the occurrence
of [hallucinations](https://vectara.com/avoiding-hallucinations-in-llm-powered-applications/) (inaccurate or
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

## Mockingbird: Vectara's advanced RAG-specific LLM​

[**Mockingbird**](/docs/learn/mockingbird-llm) is Vectara's cutting-edge new LLM designed specifically for 
Retrieval Augmented Generation (RAG) use cases. Mockingbird is available to 
all Vectara users by specifying `mockingbird-1.0-2024-07-16` as the `prompt_name`. 
Mockingbird is ideal for enterprise applications requiring high-quality 
summaries and structured outputs:

- Superior RAG output quality
- Enhanced citation accuracy
- Excellent multilingual performance
- High-precision structured data generation

:::tip

You can test summarizations with queries in our [**API Reference**](/docs/rest-api/query) and
in the Vectara Console. The `prompt_name` is optional and defaults to
the best summarizer available to your account type. Users can also
select other [available summarizers](/docs/learn/grounded-generation/select-a-summarizer).

:::

This example shows a complex question with a summary that contains several
citations and the search result highlights relevant information:

![Retrieval Augmented Generation (RAG) Summary Example](/img/grounded_generation_summary_example.png)
