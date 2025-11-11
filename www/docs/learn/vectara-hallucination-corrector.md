---
id: vectara-hallucination-corrector
title: Hallucination corrector
sidebar_label: Hallucination corrector
---


import CodePanel from '@site/src/theme/CodePanel';

Hallucinations remain one of the most pressing challenges in deploying Large 
Language Models (LLMs) in real-world applications. These inaccuracies can 
erode user trust and expose organizations to serious business risks.

The Vectara Hallucination Corrector addresses this problem directly by not 
only detecting unsupported claims in AI-generated summaries, but also 
offering corrected versions that align with the factual source material. This 
capability is critical in building safe, reliable AI applications across 
regulated and high-stakes industries like finance, legal, and healthcare.

### Why correcting hallucinations matters

The impact of AI hallucinations extends far beyond user frustration:

* **Regulatory and compliance risks:** In industries with strict reporting or 
  documentation requirements, hallucinated AI output can trigger regulatory 
  violations.
* **Reputational damage:** Misinformation in public- or customer-facing content 
  can reduce trust in your brand.
* **Decision-making errors:** Inaccurate summaries can lead teams to make the 
  wrong calls, especially when used in analytics or reporting contexts. 

The Vectara Hallucination Corrector helps reduce these risks by acting as a 
factual safeguard before content is delivered or acted upon.

:::tip Note
For more information, see the [**Correct Hallucination API**](/docs/api-reference/llms-apis/hallucination_correctors) documentation.
:::

### What the Vectara Hallucination Corrector does

The Vectara Hallucination Corrector provides:
* **Evaluation:** Identifies which parts of an AI-generated summary are not 
  grounded in the source content.
* **Explanation:** Describes why each inaccurate statement is unsupported.
* **Correction:** Returns a revised version of the summary, applying only the 
  minimal changes needed to restore factual alignment.

This ensures that summaries passed through the Vectara Hallucination Corrector 
retain their intended meaning while reducing or eliminating hallucinations.

### How hallucination correction works

1. **Input:** You provide the AI-generated summary and one or more source documents.
2. **Analysis:** The Vectara Hallucination Corrector compares the summary to the 
   documents to identify any unsupported or incorrect claims.
3. **Output:** The system returns the summary and corrections:
    * `corrected_summary`: A minimally modified, factually accurate version of 
  the original
    * `corrections`: A description of what was changed and why


### A trusted platform for AI

Hallucination correction is part of Vectara’s broader observability and quality 
framework for LLM-powered applications. It complements other platform tools 
like factual consistency scoring (HHEM) and metadata-based context filtering. 
When used together, these capabilities offer:

* Higher-quality summaries and answers
* Trustworthy outputs for downstream tasks
* Greater transparency and governance for AI-generated content

Vectara is also releasing an open source **Hallucination Correction Benchmark**—a 
toolkit that provides standardized, model-agnostic ways to evaluate correction 
performance.
