---
id: vectara-trial
title: Vectara Trial
sidebar_label: Vectara Trial
---

import {Config} from '@site/docs/definitions.md';

The Vectara trial offers access to most of our advanced features for 30 days, 
allowing you to explore how our RAG-as-a-Service platform can transform your 
AI and search capabilities. This guide will walk you through what to expect 
during your trial.

## Getting started with your trial

Your Vectara trial begins upon account registration and lasts for 30 days. 
During this trial period, you can use Vectara’s powerful query customization 
capabilities, generative models, and rerankers to see how our platform can 
meet your business needs.

:::note
If you signed up through the AWS Marketplace, your trial follows the same 
process.
:::

## Included features

The Vectara trial lets you access most of the advanced capabilities of our 
Standard and Pro plan users:

### Generative AI models

Experiment with different models to experience how different AI models handle 
various tasks:

* **Mockingbird:** Vectara’s custom LLM designed specifically for Retrieval 
  Augmented Generation (RAG) use cases. [Mockingbird](/docs/learn/mockingbird-llm) delivers superior 
  performance in summarizing retrieved results, especially in enterprise 
  environments requiring multilingual support, citation accuracy, and 
  structured output generation.
* **GPT 3.5, 4, 4o:** Popular models for general-purpose generative tasks, 
  particularly useful for research and knowledge-intensive applications.
* **BYOK**: Bring your own OpenAI key.

:::caution
The Vectara trial provides up to 15,000 GPT4 requests and includes access to 
all GPT4-based summarizers. If you upgrade to Standard, Pro, or Enterprise, 
you can purchase separate GPT4 bundles or BYOK. Vectara bundles offer the 
advantage of HIPAA compliance.
:::

### Custom prompts

[Vectara’s Prompt Engine](/docs/prompts/vectara-prompt-engine) enables users to customize prompt templates and 
fine-tune responses, tailored to their specific use cases, making it an 
ideal solution for advanced workflows such as RAG:

* Craft responses based on previous answers for complex tasks like RFI or RFP 
  documents.
* Create structured outputs for business questions.
* Draft support tickets based on user feedback.

### Additional Rerankers

Vectara provides [several powerful rerankers](/docs/api-reference/search-apis/reranking) to enable more precise scoring of 
query results:

* **Multilingual Reranker v1 (Slingshot):** Provides more accurate neural ranking than 
  the initial Boomerang retrieval. While computationally more expensive, it offers 
  improved text scoring across a wide range of languages, making it suitable for 
  diverse content.
* **Maximal Marginal Relevance (MMR) Reranker:** Balances relevance and diversity, 
  to reduce redundancy while maintaining relevance to the query.
* **User-Defined Function Reranker:** Customize ranking logic using metadata filters 
  and scoring for use cases that require fine-grained control over how search 
  results are ordered.
* **Chain Reranker:** Combine our multiple rerankers in a custom sequence to meet more 
  complex search requirements. This lets you completely customize the functionality of 
  Vectara to your needs by giving you absolute control over the ranking functions.


### Full Query Control

Vectara’s [Query API](/docs/api-reference/search-apis/search) enables granular control over query parameters, allowing 
developers to tailor their searches to specific use cases. You get access to 
a comprehensive set of parameters:

* Max tokens and response length
* Temperature, frequency, and presence penalties

## Trial quotas and usage limits

* **Queries:** 15,000
* **Generative requests (non-GPT4):** 15,000
* **Generative requests (GPT-4):** 15,000
* **Storage:** 500 MB
* **Results per query:** 500
* **Reranker requests:** 100 results per reranking request
* **Number of users:** Unlimited
* **Number of administrators:** 1
* **Chat turns per chat:** 30
* **Number of corpora:** 50 corpora
* **Replicas:** 2

:::tip
**Pro and Enterprise level features not included in the trial:**

* [**Custom dimensions**](/docs/learn/semantic-search/add-custom-dimensions)
* [**Customer-managed keys**](/docs/learn/data-privacy/encryption#create-your-aws-kms-key)

For more details about the differences between our different plans, see [Pricing](https://vectara.com/pricing/).
:::

