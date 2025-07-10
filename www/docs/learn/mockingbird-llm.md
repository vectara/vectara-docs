---
id: mockingbird-llm
title: "Mockingbird 2: Vectara's Advanced LLM for RAG"
sidebar_label: Mockingbird 2 LLM
---


import CodePanel from '@site/src/theme/CodePanel';


Generating accurate and reliable summaries from large datasets is a challenge. 
Mockingbird 2 is the latest evolution of Vectara’s cutting-edge Large 
Language Model (LLM), purpose-built for Retrieval Augmented Generation (RAG) 
use cases. With advanced cross-lingual capabilities and enhanced generation 
quality, Mockingbird 2 delivers unparalleled accuracy, quality, and efficiency 
when summarizing retrieved results. Tailor-made for RAG scenarios, Mockingbird 
2 outperforms leading models, making it the ideal choice for applications 
requiring precise and trustworthy summaries of large datasets:

* Summarize search results for research and analysis
* Extract specific information from documents for structured insights
* Build knowledge bases or question-answering systems that provide quick and 
  precise answers to user queries

These features empower organizations to create comprehensive, reliable 
knowledge repositories, improving information accessibility and operational 
efficiency.

## What’s New in Mockingbird 2

The following list shows what's new in Mockingbird 2:
* **Cross-Lingual Functionality**: Query, document, and summary languages can 
  differ across English, Spanish, French, Arabic, Chinese, Japanese, and Korean.
* **Enhanced Generation Quality**: Higher Nugget Assignment scores, improved 
  ROUGE and BERTScore metrics for cross-lingual summaries.
* **Hallucination Mitigation**: Mockingbird-2-Echo achieves a 0.9% hallucination 
  rate with HHEM and HCM integration.
* **System Prompt Support**: Prompts now allow an optional system role for 
  greater flexibility.

:::caution
JSON output is not officially supported in Mockingbird 2. Existing 
Mockingbird 1 users should update their API calls to use `mockingbird-2.0` 
as the `generation_preset_name` and review prompt changes.
:::


## Significantly improved quality for Retrieval Augmented Generation (RAG)

Mockingbird 2 enhances RAG performance, surpassing general-purpose LLMs in 
critical enterprise applications. It excels in citation accuracy and supports 
advanced cross-lingual RAG scenarios, making it ideal for enterprise-grade 
solutions and AI workflows. Evaluated using the Open RAG eval toolkit, 
Mockingbird 2 achieves higher Nugget Assignment scores across all supported 
languages compared to Mockingbird v1, ensuring key facts and claims are 
accurately included in responses.


## Increased accuracy in summarizing retrieved results

Mockingbird 2 sets a new standard for summarizing large collections of search 
results, enabling users to quickly grasp essential information without manual 
review. With improved ROUGE and BERTScore metrics in cross-lingual evaluations, 
it outperforms other models in RAG quality, citation accuracy, and 
multilingual performance.

When paired with Vectara’s Hallucination Correction Model (HCM), 
Mockingbird-2-Echo achieves a hallucination rate of 0.9% on the HHEM 
leaderboard, making it one of the most reliable models for data-intensive 
workflows.


## Hallucination mitigation with Mockingbird-2-Echo

Mockingbird 2 integrates with Vectara’s Hughes Hallucination Evaluation Model 
(HHEM) and Hallucination Correction Model (HCM) to form Mockingbird-2-Echo 
(MB2-Echo). With a total parameter count under 10B, MB2-Echo delivers a 
hallucination rate of 0.9%, positioning it among the top performers on the HHEM 
leaderboard. This makes it ideal for enterprises requiring high accuracy and 
deployable on-premise or in any VPC.


## Multilingual and cross-lingual capabilities

Mockingbird 2 supports English, Spanish, French, Arabic, Chinese, Japanese, 
and Korean, with full cross-lingual functionality. Users can query in one 
language, retrieve documents in another, and generate summaries in a third, 
enabling seamless multilingual workflows.

:::caution 
While cross-lingual capabilities are robust, performance is 
optimized when the summary language aligns with the document or query language 
for certain complex scenarios.
:::

## Secure deployment within Vectara's infrastructure

Mockingbird 2 operates entirely within Vectara’s secure infrastructure, 
ensuring data privacy. Vectara guarantees that your data is never used to 
train or improve our models, maintaining compliance with the strictest 
security standards.

## Use Mockingbird 2 for summarization in the console

To use Mockingbird 2 in the Vectara Console:

1. Select **Corpora** from the main menu and go to a corpus.
2. Select the **Query** tab.
3. Click **LLM** from the **Generation** drop-down in the Corpus Query 
   Configuration panel.
4. Click the Edit icon and choose the **Mockingbird 2** model (`mockingbird-2.0`).
5. Send a query to your corpus.

## Use Mockingbird 2 in an API call

To use Mockingbird 2 in a [query](/docs/api-reference/search-apis/search) request, set the `generation_preset_name` in the 
generation object to `mockingbird-2.0`:

<CodePanel snippets={[{language: "json", code: `{
  "query": "What is the infinite probability drive?",
  "generation": {
    "generation_preset_name": "mockingbird-2.0",
    "max_used_search_results": 5,
    "response_language": "eng",
    "enable_factual_consistency_score": true
  }
}`}]} title="Code Example" layout="stacked" />
## Default Mockingbird 2 prompt

Mockingbird 2 supports a `system` role in prompts and uses the following 
default `prompt_text` (similar to v1 with an empty system message):

<CodePanel snippets={[{language: "json", code: `[
  {
    "role": "system",
    "content": ""
  },
  {
    "role": "user",
    "content": "You are a search bot that takes search results and summarizes them as a coherent answer. Only use information provided in this chat. Generate a comprehensive and informative answer for the query \\n\\n <query>\${vectaraQuery}</query> \\n\\n solely based on the following search results:\\n\\n #foreach (\$qResult in \$vectaraQueryResults) \\n [\$foreach.index + 1) \${qResult.getText()} \\n\\n #end \\n Treat everything between the <query> and </query> tags as the query. You must only use information from the provided results. Combine search results into a coherent answer. Do not repeat text. Cite search results using [number] notation. Only cite the most relevant results that answer the question accurately. If the search results are not valid, respond with - No result found. Please generate your answer in the language of \$vectaraLangName"
  }
]`}]} title="Code Example" layout="stacked" />
## Custom prompts and prompt templates

Custom prompts for Mockingbird 2 follow these rules:

* A `system` role is allowed at the beginning (optional).
* Only specify `system`, `assistant`, and `user` roles.
* The `assistant` and `user` roles must alternate (no consecutive `assistant` or 
  `user` messages).
* The last message must be a `user` message, as Mockingbird 2’s response will 
  be an `assistant` message.
